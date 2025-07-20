// import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { MODELS } from "@/services/constants";
// const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

// const headers = {
//   headers: {
//     Authorization: `Bearer ${PAYSTACK_SECRET}`,
//     "Content-Type": "application/json",
//   },
// };

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  try {
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          data: {
            total_orders_amount: 0,
            number_of_completed_orders: 0,
            total_amount_paid: 0,
            outstanding_payment: 0,
          },
        },
        { status: 400 }
      );
    }
    const { searchParams } = new URL(req.url);
    const passed_user_id = searchParams.get("user_id") || "";
    const user_id = passed_user_id || session?.user?.id;
    // query for orders completed by this vendor
    const {
      data: completed_vendor_orders,
      error: completed_vendor_orders_error,
      count: completed_vendor_orders_count,
    } = await supabase
      .from(MODELS.ORDERS)
      .select("delivery_fee", { count: "exact" })
      .is("is_vendor_order", true)
      .is("is_payment_on_vendor_debt", true)
      .eq("user_id", user_id)
      .eq("progress", "completed");

    // query for payments done by this vendor
    const { data: vendor_payments, error: vendor_payments_errors } =
      await supabase
        .from(MODELS.VENDOR_DEBT_PAYMENTS)
        .select("amount")
        .eq("user_id", user_id);

    // query for payments done by this vendor
    const { data: vendor_profile, error: vendor_profile_err } = await supabase
      .from(MODELS.VENDORS)
      .select("*, users(*)")
      .eq("user_id", user_id)
      .single();

    // INTENTION: For tracking past transactions
    // let transactions = [];
    // if (vendor_profile?.customer_dva_code) {
    //   try {
    //     const response = await axios.get(
    //       `https://api.paystack.co/customer/${vendor_profile?.customer_dva_code}`,
    //       headers
    //     );
    //     transactions = response.data.data;
    //   } catch (error) {}
    // }
    if (
      completed_vendor_orders_error ||
      vendor_payments_errors ||
      vendor_profile_err
    ) {
      return NextResponse.json(
        {
          success: false,
          data: {},
          message:
            completed_vendor_orders_error?.message ||
            vendor_payments_errors?.message ||
            vendor_profile_err?.message ||
            "Vendor stats failed to fetch",
        },
        { status: 404 }
      );
    }

    const numOr0 = (n: any) => (isNaN(n) ? 0 : n);

    const summed_up_deliveries_fee =
      completed_vendor_orders?.reduce(function (
        acc, //accumulated value
        val //current value in the array
      ) {
        return numOr0(acc) + numOr0(val?.delivery_fee);
      }, 0) || 0;
    const summed_up_amount_received =
      vendor_payments?.reduce(function (
        acc, //accumulated value
        val //current value in the array
      ) {
        return numOr0(acc) + numOr0(val?.amount);
      }, 0) || 0;

    const outstanding_payment =
      summed_up_deliveries_fee - summed_up_amount_received;
    const result = {
      total_amount_of_orders_on_deffered_payments: summed_up_deliveries_fee,
      total_amount_of_debt_financing_payments: summed_up_amount_received,
      outstanding_payment,
      is_owning: outstanding_payment >= 0 ? true : false,
      is_threshold_exceeded:
        outstanding_payment > Number(vendor_profile?.debt_threshold || 0)
          ? true
          : false,
      success: true,
      vendor_profile: vendor_profile,
    };
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
