import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { handleOrderPayment } from "../api-utils/handle-order";
import { createClient } from "@/temp/server";
import { Resend } from "resend";
import NewOrderAlertEmail from "@/temp/NewOrderAlertTemplate";
import OrderCreatedEmail from "@/temp/OrderCreatedTemplate";
import { handleVendorOutstandingPayment } from "../api-utils/handle-vendor-outstanding";
import { handleAODPayment } from "../api-utils/handle-aod";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET || "";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Send response immediately and process the request afterwards

  try {
    //validate event
    const body = await req.json();
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(JSON.stringify(body))
      .digest("hex");

    // 7. Send notification to user
    await resend.emails.send({
      from: "Cartway Website <website@cartwayhq.com>",
      to: "adewale.d.a@outlook.com", //"orders@cartwayhq.com",
      subject: "🔔New Order Alert",
      react: NewOrderAlertEmail({
        orderId: `order_id - ${hash == req.headers.get("x-paystack-signature")}`,
        name: `sender_name - ${body.event}`,
        phone: "sender_phone",
        email: "adewale.d.a@outlook.com",
      }),
    });
    // if (hash == req.headers.get("x-paystack-signature")) {
    //   // Retrieve the request's body
    //   const body = await req.json();
    //   // Do something with event
    //   if (body.event === "charge.success") {
    //     const data = body.data;
    //     const customerEmail = data?.customer?.email;
    //     const result = {
    //       isValidReference: data.status,
    //       message: data.message,
    //       paymentStatus: data.status,
    //       referenceId: data.reference,
    //       amount: data.amount / 100,
    //       metaData: data.metadata, //order_id, user_id , payment_type : "order" | "vendor_debt" | "aod_subscription"
    //     };
    //     if (result?.metaData?.payment_type === "order") {
    //       const order_id = result?.metaData?.order_id;
    //       const { allow_order_notification, sender_name, sender_phone } =
    //         await handleOrderPayment({ supabase, result });
    //       if (allow_order_notification) {
    //         // 6. Send notifications
    //         await resend.emails.send({
    //           from: "Cartway <hello@cartwayhq.com>",
    //           to: customerEmail,
    //           subject: "We have received your order",
    //           react: OrderCreatedEmail({ orderId: order_id }),
    //         });

    //         // 7. Send notification to user
    //         await resend.emails.send({
    //           from: "Cartway Website <website@cartwayhq.com>",
    //           to: "adewale.d.a@outlook.com", //"orders@cartwayhq.com",
    //           subject: "🔔New Order Alert",
    //           react: NewOrderAlertEmail({
    //             orderId: order_id,
    //             name: sender_name,
    //             phone: sender_phone,
    //             email: customerEmail,
    //           }),
    //         });
    //       }
    //     } else if (
    //       result?.metaData?.payment_type === "vendor_debt" ||
    //       result?.metaData?.payment_type === "vendor_debt_dva"
    //     ) {
    //       await handleVendorOutstandingPayment({ supabase, result });
    //     } else if (result?.metaData?.payment_type === "aod_subscription") {
    //       await handleAODPayment({ supabase, result });
    //     }
    //   }
    // }
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 200 });
  }
}
