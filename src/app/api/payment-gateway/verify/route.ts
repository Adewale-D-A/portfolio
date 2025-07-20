import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import NewOrderAlertEmail from "@/components/emails/NewOrderAlertTemplate";
import OrderCreatedEmail from "@/components/emails/OrderCreatedTemplate";
import { handleOrderPayment } from "../api-utils/handle-order";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;
// const isProduction = process.env.VERCEL_ENV === "production";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const resend = new Resend(process.env.RESEND_API_KEY);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "You are not authenticated!", data: {} },
      { status: 400 }
    );
  }
  // Verify transaction
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference") || "";
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );
    const data = response.data;
    const customerEmail = data?.data?.customer?.email;
    const result = {
      isValidReference: data.status,
      message: data.message,
      paymentStatus: data.data.status,
      referenceId: data.data.reference,
      amount: data.data.amount / 100,
      metaData: data.data.metadata, //order_id, user_id, payment_type : "order" | "vendor_debt" | "aod_subscription"
    };

    // Invalid reference ID
    if (!result?.isValidReference) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          data: {},
        },
        { status: 404 }
      );
    }

    if (!(result?.metaData?.payment_type === "order")) {
      return NextResponse.json(
        {
          success: false,
          message: "Use the correct payment verification route",
          data: {},
        },
        { status: 404 }
      );
    }

    const order_id = result?.metaData?.order_id;

    const {
      is_error_occured,
      allow_order_notification,
      sender_name,
      sender_phone,
    } = await handleOrderPayment({ supabase, result });
    // Provided that at least one error occured in the process, prevent `floating_package_order` item deletion
    if (is_error_occured) {
      return NextResponse.json(
        {
          data: { ...response?.data, is_process_completed: false },
          message: `Payment successfully verified but there was an issue with your order with orderId ${order_id}, please contact support for further assistance.`,
          success: true,
        },
        { status: 200 }
      );
    }
    if (allow_order_notification) {
      // 6. Send notifications
      await resend.emails.send({
        from: "Cartway <hello@cartwayhq.com>",
        to: customerEmail,
        subject: "We have received your order",
        react: OrderCreatedEmail({ orderId: order_id }),
      });

      // 7. Send notification to user
      await resend.emails.send({
        from: "Cartway Website <website@cartwayhq.com>",
        to: "orders@cartwayhq.com",
        subject: "🔔New Order Alert",
        react: NewOrderAlertEmail({
          orderId: order_id,
          name: sender_name,
          phone: sender_phone,
          email: customerEmail,
        }),
      });
    }
    return NextResponse.json(
      {
        data: { ...response?.data, is_process_completed: true },
        message: "Payment successfully verified.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.response?.data, data: [] },
      { status: 400 }
    );
  }
}
