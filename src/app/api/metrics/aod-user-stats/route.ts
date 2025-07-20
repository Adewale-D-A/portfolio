import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { MODELS } from "@/services/constants";

const NOW = new Date().toISOString();
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
          message: "You need to be logged in!",
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

    // Step 0: get current, active non expired AOD plan
    const { data: current_aod_plan, error: current_aod_plan_err } =
      await supabase
        .from(MODELS.AOD_PLAN_SUBSCIPTIONS)
        .select("*, aod_plans(*)")
        .eq("status", "active")
        .is("is_expired", false)
        .eq("user_id", user_id)
        .lte("start_date", NOW)
        .gte("end_date", NOW)
        .single();

    // If non exists, inform client that user is not on any plan
    if (current_aod_plan_err) {
      const result = {
        is_wallet_balance: false,
        wallet_balance: 0,
        is_user_on_active_aod: false,
      };
      return NextResponse.json(
        { success: true, data: result },
        { status: 200 }
      );
    }
    // Step 1: get all non cancelled user's orders on aod payment
    const {
      data: non_cancelled_aod_orders,
      error: non_cancelled_aod_orders_err,
    } = await supabase
      .from(MODELS.ORDERS)
      .select("delivery_fee", { count: "exact" })
      .is("is_payment_on_aod", true)
      .eq("user_id", user_id)
      .neq("progress", "cancelled");

    // Step 2: get all user's AOD plans
    const { data: all_aod_plans, error: all_aod_plans_error } = await supabase
      .from(MODELS.AOD_PLAN_SUBSCIPTIONS)
      .select("amount_paid")
      .eq("user_id", user_id);

    const numOr0 = (n: any) => (isNaN(n) ? 0 : n);

    const summed_up_deliveries_fee =
      non_cancelled_aod_orders?.reduce(function (
        acc, //accumulated value
        val //current value in the array
      ) {
        return numOr0(acc) + numOr0(val?.delivery_fee);
      }, 0) || 0;
    const summed_up_aod_plans =
      all_aod_plans?.reduce(function (
        acc, //accumulated value
        val //current value in the array
      ) {
        return numOr0(acc) + numOr0(val?.amount_paid);
      }, 0) || 0;

    const wallet_balance = summed_up_aod_plans - summed_up_deliveries_fee;
    const result = {
      is_wallet_balance: wallet_balance >= 0 ? true : false,
      wallet_balance,
      current_aod_plan,
      is_user_on_active_aod: Boolean(current_aod_plan?.id),
    };
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
