import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/temp/server";
import { Resend } from "resend";
import cryptoRandomString from "crypto-random-string";
import { handleVendorOutstandingPayment } from "../api-utils/handle-vendor-outstanding";
import NewOrderAlertEmail from "@/temp/NewOrderAlertTemplate";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET || "";

export async function POST(req: NextRequest) {
  const createVendorPaymentId = () =>
    `CWVP${cryptoRandomString({
      length: 6,
      type: "distinguishable",
    })}`.toUpperCase();
  const supabase = createClient();
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // Retrieve the request's body
    const body = await req.json();
    //validate event
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
        orderId: `order_id - ${JSON.stringify(body)}`,
        name: `sender_name`,
        phone: `sender_phone`,
        email: `customerEmail`,
      }),
    });
    if (hash == req.headers.get("x-paystack-signature")) {
      // Do something with event
      if (body.event === "charge.success") {
        const data = body.data;
        const { amount, metadata, customer } = data;
        const amountRecalculated = amount / 100;

        const result = {
          isValidReference: true,
          message: "OKAY",
          paymentStatus: "OKAY",
          referenceId: "",
          amount: amountRecalculated,
          metaData: {
            vendor_id: customer?.metadata?.vendor_id || metadata?.vendor_id,
            user_id: customer?.metadata?.user_id || metadata?.user_id,
            payment_id: createVendorPaymentId(),
          },
        };
        await handleVendorOutstandingPayment({ supabase, result });
      }
    }
    return NextResponse.json({
      status: 200,
      decision: "ACCEPT", //REJECT
      reason: "All payments are accepted",
    });
  } catch (error: any) {
    return NextResponse.json({ status: 200 });
  }
}
