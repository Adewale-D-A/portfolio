import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import { handleVendorOutstandingPayment } from "../api-utils/handle-vendor-outstanding";
import { createVendorPaymentId } from "@/lib/utils";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET || "";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    //validate event
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers.get("x-paystack-signature")) {
      // Retrieve the request's body
      const body = await req.json();
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
