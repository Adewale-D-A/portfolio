import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;
const HOST_URL = process.env.HOST_URL;

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "You are not authenticated", data: [] },
      { status: 400 }
    );
  }
  const body = await req.json();
  // Initialize transaction with callback URL
  const { email, amount, user_id, vendor_id, callback_path, payment_id } = body;
  // Check if the required fields are present
  if (!email || !amount || !user_id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const callbackPath = callback_path || "debt-payment-verification";
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        metadata: {
          user_id,
          vendor_id,
          payment_id,
          payment_type: "vendor_debt",
        },
        callback_url: `${HOST_URL}/${callbackPath}`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(
      {
        data: response.data,
        isSuccess: true,
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
