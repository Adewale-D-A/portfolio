import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/temp/server";
import { Resend } from "resend";
import crypto from "crypto";
import { MODELS } from "@/temp/constants";
import NewOrderAlertEmail from "@/temp/NewOrderAlertTemplate";
import cryptoRandomString from "crypto-random-string";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET || "";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const createVendorPaymentId = () =>
    `CWVP${cryptoRandomString({
      length: 6,
      type: "distinguishable",
    })}`.toUpperCase();
  try {
    // Retrieve the request's body
    const body = await req.json();
    //validate event
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(JSON.stringify(body))
      .digest("hex");
    const { data: vendor } = await supabase
      .from(MODELS.VENDORS)
      .select("*")
      .eq("dva_account_number", body?.receiver_account_number)
      .single();

    // 7. Send notification to user
    await resend.emails.send({
      from: "Cartway Website <website@cartwayhq.com>",
      to: "adewale.d.a@outlook.com", //"orders@cartwayhq.com",
      subject: "🔔New Order Alert",
      react: NewOrderAlertEmail({
        orderId: `order_id - ${JSON.stringify(body)}`,
        name: `sender_name - ${JSON.stringify(vendor)}`,
        phone: `sender_phone - ${hash}`,
        email: `customerEmail`,
      }),
    });
    if (vendor?.id) {
      const amount = body?.amount / 100;
      await supabase.from(MODELS.VENDOR_DEBT_PAYMENTS).insert([
        {
          user_id: vendor.user_id,
          vendor_id: vendor.vendor_id,
          amount: amount,
          payment_id: createVendorPaymentId(),
          paystack_reference_id: body?.narration,
          status: "approved",
        },
      ]);
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
