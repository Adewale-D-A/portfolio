import { MODELS } from "@/temp/constants";
import { TypedSupabaseClient } from "@/temp/types";

type ResultType = {
  isValidReference: boolean;
  message: string;
  paymentStatus: string;
  referenceId: string;
  amount: number;
  metaData: { vendor_id: string; user_id: string; payment_id: string }; //aod_plan_id, user_id
};

export async function handleVendorOutstandingPayment({
  supabase,
  result,
}: {
  supabase: TypedSupabaseClient;
  result: ResultType;
}) {
  if (result?.paymentStatus === "success") {
    // Check if payment has been previously logged
    const { count } = await supabase
      .from(MODELS.VENDOR_DEBT_PAYMENTS)
      .select("*", { count: "exact", head: true })
      .eq("payment_id", result?.metaData?.payment_id);

    // Proceed to log payment provided its not been logged
    if (!count) {
      const { error: order_inser_err } = await supabase
        .from(MODELS.VENDOR_DEBT_PAYMENTS)
        .insert([
          {
            user_id: result?.metaData?.user_id,
            vendor_id: result?.metaData?.vendor_id,
            amount: result?.amount,
            payment_id: result?.metaData?.payment_id,
            paystack_reference_id: result?.referenceId,
            status: "approved",
          },
        ]);
      if (order_inser_err) {
        return {
          is_error_occured: true,
          allow_order_notification: false,
          error_message:
            "Payment successfully verified: But could not be logged",
        };
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
