import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { MODELS } from "@/services/constants";

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

    // count total orders count
    const { data: total_orders, count: total_orders_count } = await supabase
      .from(MODELS.ORDERS)
      .select("delivery_fee", { count: "exact" })
      .eq("user_id", user_id)
      .neq("progress", "cancelled");

    // query for orders completed by this user
    const { count: completed_orders_count } = await supabase
      .from(MODELS.ORDERS)
      .select("delivery_fee", { count: "exact", head: true })
      .eq("user_id", user_id)
      .eq("progress", "completed");

    // count total pending orders count
    const { count: pending_orders_count } = await supabase
      .from(MODELS.ORDERS)
      .select("id", { count: "exact", head: true })
      .eq("user_id", user_id)
      .neq("progress", "completed")
      .neq("progress", "cancelled");

    const numOr0 = (n: any) => (isNaN(n) ? 0 : n);

    const summed_up_deliveries_fee =
      total_orders?.reduce(function (
        acc, //accumulated value
        val //current value in the array
      ) {
        return numOr0(acc) + numOr0(val?.delivery_fee);
      }, 0) || 0;

    const result = {
      amount_spent: summed_up_deliveries_fee,
      total_orders: total_orders_count || 0,
      completed_orders: completed_orders_count || 0,
      pending_order: pending_orders_count || 0,
    };
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
