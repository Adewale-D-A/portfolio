import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

const headers = {
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET}`,
    "Content-Type": "application/json",
  },
};
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
  const { email, first_name, last_name, phone, user_id, vendor_id } = body;
  // Check if the required fields are present
  if (!email || !first_name || !last_name || !phone || !user_id || !vendor_id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  try {
    const response = await axios.post(
      "https://api.paystack.co/customer",
      {
        email,
        first_name,
        last_name,
        phone,
        metadata: {
          vendor_id,
          user_id,
          payment_type: "vendor_debt_dva",
        },
      },
      headers
    );
    const customerCode = response.data.data.customer_code;
    const accountResponse = await axios.post(
      "https://api.paystack.co/dedicated_account",
      {
        customer: customerCode,
        phone: phone,
        preferred_bank: "titan-paystack",
        metadata: {
          vendor_id,
          user_id,
          payment_type: "vendor_debt_dva",
        },
      },
      headers
    );

    return NextResponse.json(
      {
        data: {
          account_info: accountResponse.data,
          customer_code: customerCode,
        },
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
