import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { handleAODPayment } from "../api-utils/handle-aod";

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

  if (!reference) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

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
    // const customerEmail = data?.data?.customer?.email;
    const result = {
      isValidReference: data.status,
      message: data.message,
      paymentStatus: data.data.status,
      referenceId: data.data.reference,
      amount: data.data.amount / 100,
      metaData: data.data.metadata, //user_id, aod_plan_id, payment_type : "order" | "vendor_debt" | "aod_subscription"
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
    if (!(result?.metaData?.payment_type === "aod_subscription")) {
      return NextResponse.json(
        {
          success: false,
          message: "Use the correct payment verification route",
          data: {},
        },
        { status: 404 }
      );
    }

    const { is_error_occured, allow_order_notification, error_message } =
      await handleAODPayment({ supabase, result });
    // Provided that at least one error occured in the process, prevent `floating_package_order` item deletion
    if (is_error_occured) {
      return NextResponse.json(
        {
          data: { ...response?.data, is_process_completed: false },
          message: `Payment successfully verified but there was an issue with your AOD paid with paymentId ${result?.referenceId}, please contact support for further assistance.`,
          success: true,
          error_message: error_message,
        },
        { status: 200 }
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
