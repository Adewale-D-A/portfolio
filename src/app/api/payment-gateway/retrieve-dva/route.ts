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
export async function GET(req: NextRequest) {
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
  const { searchParams } = new URL(req.url);
  const customerCode = searchParams.get("customerCode") || "";
  // Check if the required fields are present
  if (!customerCode) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  try {
    const response = await axios.get(
      `https://api.paystack.co/customer/${customerCode}`,
      headers
    );
    const dedicatedAccount = response.data.data.dedicated_account;
    const dvaDetails = response.data.data;
    if (dedicatedAccount) {
      return NextResponse.json(
        {
          data: {
            dedicated_account: dedicatedAccount,
            customer_code: customerCode,
            properties: dvaDetails,
          },
          isSuccess: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          data: null,
          isSuccess: false,
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.response?.data, data: [] },
      { status: 400 }
    );
  }
}
