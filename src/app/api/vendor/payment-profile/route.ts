import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
      .from("package_orders")
      .select("delivery_fee", { count: "exact" })
      .is("is_vendor_order", true)
      .eq("user_id", user_id)
      .eq("progress", "completed");

    // query for payments done by this vendor
    const { data: vendor_payments, error: vendor_payments_errors } =
      await supabase
        .from("vendor_payments")
        .select("amount_received")
        .eq("user_id", user_id);

    // count total orders count
    const { count: total_orders_count } = await supabase
      .from("package_orders")
      .select("delivery_fee", { count: "exact", head: true })
      .is("is_vendor_order", true)
      .eq("user_id", user_id);

    // count total pending orders count
    const { count: pending_orders_count } = await supabase
      .from("package_orders")
      .select("id", { count: "exact", head: true })
      .is("is_vendor_order", true)
      .eq("user_id", user_id)
      .neq("progress", "completed")
      .neq("progress", "cancelled");

    if (completed_vendor_orders_error || vendor_payments_errors) {
      return NextResponse.json(
        {
          success: false,
          data: {
            total_completed_orders_amount: 0,
            total_amount_paid: 0,
            outstanding_payment: 0,
            total_orders_count: 0,
            total_completed_orders_count: 0,
            total_pending_orders_count: 0,
          },
        },
        { status: 500 }
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
        return numOr0(acc) + numOr0(val?.amount_received);
      }, 0) || 0;

    const result = {
      total_completed_orders_amount: summed_up_deliveries_fee,
      total_amount_paid: summed_up_amount_received,
      outstanding_payment: summed_up_deliveries_fee - summed_up_amount_received,
      total_orders_count: total_orders_count || 0,
      total_completed_orders_count: completed_vendor_orders_count || 0,
      total_pending_orders_count: pending_orders_count || 0,
    };
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
