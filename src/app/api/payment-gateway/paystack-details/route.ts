import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;
// const isProduction = process.env.VERCEL_ENV === "production";

export async function GET(req: NextRequest) {
  const supabase = createClient();

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
    // Invalid reference ID
    if (!data.status) {
      return NextResponse.json(
        {
          success: false,
          message: data.message,
          data: {},
        },
        { status: 404 }
      );
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
