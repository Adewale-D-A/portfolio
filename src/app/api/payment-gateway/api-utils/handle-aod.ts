import { MODELS } from "@/temp/constants";
import { TypedSupabaseClient } from "@/temp/types";
import { formatISO, addDays } from "date-fns";

type ResultType = {
  isValidReference: boolean;
  message: string;
  paymentStatus: string;
  referenceId: string;
  amount: number;
  metaData: { aod_plan_id: string; user_id: string }; //aod_plan_id, user_id
};

const today = new Date();
const formattedDate = formatISO(today);

export async function handleAODPayment({
  supabase,
  result,
}: {
  supabase: TypedSupabaseClient;
  result: ResultType;
}) {
  if (result?.paymentStatus === "success") {
    // Check if payment has been previously logged
    const { count } = await supabase
      .from(MODELS.AOD_PLAN_SUBSCIPTIONS)
      .select("*", { count: "exact", head: true })
      .eq("paystack_reference_id", result?.referenceId);
    // Proceed to log payment provided its not been logged
    if (!Boolean(count)) {
      const { data, count, error } = await supabase
        .from(MODELS.AOD_PLANS)
        .select("*")
        .eq("id", Number(result?.metaData?.aod_plan_id))
        .single();

      // Need to know the validity days to know how long the subscription should last
      if (error || !Boolean(data?.plan_validity_days)) {
        return {
          is_error_occured: true,
          allow_order_notification: false,
          error_message:
            "Payment successfully verified: But failed to log payment due to AOD plan not found",
        };
      }

      const futureDate = addDays(today, Number(data?.plan_validity_days));
      const futureDateFormatted = formatISO(futureDate);

      const { data: insertData } = await supabase
        .from(MODELS.AOD_PLAN_SUBSCIPTIONS)
        .insert([
          {
            start_date: formattedDate,
            end_date: futureDateFormatted,
            user_id: result?.metaData?.user_id,
            aod_plan_id: result?.metaData?.aod_plan_id,
            amount_paid: result?.amount,
            paystack_reference_id: result?.referenceId,
            status: "active",
          },
        ])
        .select();
      // Make all existing user's AOD plans expired
      if (insertData?.[0]?.id) {
        await supabase
          .from(MODELS.AOD_PLAN_SUBSCIPTIONS)
          .update({
            is_expired: true,
          })
          .eq("user_id", result?.metaData?.user_id)
          .not("id", "eq", insertData?.[0]?.id);
      }

      return {
        is_error_occured: false,
        allow_order_notification: true,
        error_message: "Proceed to send notifications",
      };
    }
    return {
      is_error_occured: false,
      allow_order_notification: false,
      error_message: "Payment already logged",
    };
  } else {
    return {
      is_error_occured: false,
      allow_order_notification: false,
      error_message: "Payment not successful",
    };
  }
}
