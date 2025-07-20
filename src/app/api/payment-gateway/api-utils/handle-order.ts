import { MODELS } from "@/services/constants";
import { PackageOrderStatus } from "@/services/orders/orders.types";
import { TypedSupabaseClient } from "@/lib/supabase/types";
import { logCoupon } from "@/services/coupons/coupons.service";

type ResultType = {
  isValidReference: boolean;
  message: string;
  paymentStatus: string;
  referenceId: string;
  amount: number;
  metaData: { order_id: string; user_id: string }; //order_id, user_id
};
export async function handleOrderPayment({
  supabase,
  result,
}: {
  supabase: TypedSupabaseClient;
  result: ResultType;
}) {
  const order_id = result?.metaData?.order_id;
  let stringedErrMessages = "";
  let isErrOccured = false;
  if (result?.paymentStatus === "success") {
    // 1. Query `floating_package_orders` table using result.metaData.order_id value
    const { data: floating_order, error: floating_order_error } = await supabase
      .from(MODELS.FLOATING_ORDERS)
      .select("*")
      .eq("order_id", order_id)
      .single();

    // Proccess inserting into `package_orders` table if floating order exists
    if (!floating_order_error) {
      const clonedRecord = { ...floating_order };
      // 2. Query `package_orders` table for the order_id
      const { count } = await supabase
        .from(MODELS.ORDERS)
        .select("*", { count: "exact", head: true })
        .eq("order_id", order_id);

      // Process insert into `package_order` if record does not exist
      if (!count) {
        const {
          // id,
          // created_at,
          // updated_at,
          // cancellation_reason,
          // on_hold_reason,
          // paystack_reference_id,
          // assigned_rider_id,
          // payment_status,
          has_multiple_dropff,
          user_id,
          sender_name,
          sender_phone,
          pickup_location,
          receiver_name,
          receiver_phone,
          dropoff_location,
          item_category,
          order_id,
          sender_latitude,
          sender_longitude,
          receiver_latitude,
          receiver_longitude,
          // delivery_fee,
          // distance,
          // payment_receipt,
          // note,
          // delivery_type,
          // payment_method,
          // status,
          // discounted_fee,
          // discount,
          // coupon_code,
          // vendor_id,
          // is_vendor_order,
          // progress,
          // created_by,
        } = clonedRecord;
        delete clonedRecord.id;
        delete clonedRecord.created_at;
        delete clonedRecord.updated_at;
        delete clonedRecord.cancellation_reason;
        delete clonedRecord.on_hold_reason;
        delete clonedRecord.paystack_reference_id;
        delete clonedRecord.assigned_rider_id;
        delete clonedRecord.payment_status;

        const isRiderAssigned = Boolean(floating_order?.assigned_rider_id);
        // 3. Insert into `package_orders` table if order does not already exist collection, but if it already exisits, ignore and skip processing
        const { error: order_inser_err } = await supabase
          .from(MODELS.ORDERS)
          .insert([
            { ...clonedRecord, paystack_reference_id: result?.referenceId },
          ]);

        // ERROR CHECK I
        //check for error state - package_orders insert
        if (order_inser_err?.message) {
          stringedErrMessages =
            stringedErrMessages +
            ";" +
            order_inser_err?.message +
            "-- ERR_STG_I";
          isErrOccured = true;
        }

        // Log coupon usage if available
        if (clonedRecord?.coupon_code) {
          await logCoupon({
            user_id: user_id,
            coupon_code: clonedRecord?.coupon_code,
            order_id: order_id,
          });
        }

        // 4. Provided that rider ID exists on floating record, insert record into `deliveries` table
        if (isRiderAssigned) {
          const { data: rider, error: get_rider_err } = await supabase
            .from(MODELS.USERS)
            .select("*")
            .eq("id", floating_order?.assigned_rider_id)
            .single();

          // ERROR CHECK II
          //check for error state - get rider
          if (get_rider_err?.message) {
            stringedErrMessages =
              stringedErrMessages +
              ";" +
              get_rider_err?.message +
              "-- ERR_STG_II";
            isErrOccured = true;
          }
          // Provided rider exists, insert new record into deliveries
          if (rider?.id) {
            const { error: deliveries_insert_err } = await supabase
              .from(MODELS.DELIVERIES)
              .insert([
                {
                  order_id: order_id,
                  rider_id: floating_order?.assigned_rider_id,
                  rider_name: rider?.first_name + " " + rider?.last_name,
                  rider_phone: rider?.phone,
                  status: PackageOrderStatus.Assigned,
                  progress: PackageOrderStatus.Assigned,
                  customer_id: user_id,
                  receiver_address: dropoff_location,
                  receiver_name: receiver_name,
                  receiver_phone: receiver_phone,
                  sender_address: pickup_location,
                  sender_name: sender_name,
                  sender_phone: sender_phone,
                  sender_latitude,
                  sender_longitude,
                  receiver_latitude,
                  receiver_longitude,
                  item_category: item_category,
                  has_multiple_dropff,
                },
              ]);
            // ERROR CHECK III
            //check for error state - get rider
            if (deliveries_insert_err?.message) {
              stringedErrMessages =
                stringedErrMessages +
                ";" +
                deliveries_insert_err?.message +
                "-- ERR_STG_III";
              isErrOccured = true;
            }
          }
        }

        // Provided that at least one error occured in the process, prevent `floating_package_order` item deletion
        if (isErrOccured) {
          // NOTE: Error can occur in either one of these
          // 1. Inserting order into `package_order` table failed
          // 2. If a rider is assigned, checking rider's validity on the system and not being found
          // 3. Inser into `deliveries` table failed
          await supabase
            .from(MODELS.FLOATING_ORDERS)
            .update({
              paystack_reference_id: result?.referenceId,
              payment_status: `Payment successfully verified but: ${stringedErrMessages}`,
            })
            .eq("order_id", order_id);
          return {
            is_error_occured: true,
            allow_order_notification: false,
            error_message: stringedErrMessages,
            sender_name,
            sender_phone,
          };
        } else {
          // 5. Remove order from `floating_package_orders` table
          await supabase
            .from(MODELS.FLOATING_ORDERS)
            .delete()
            .eq("order_id", order_id);

          return {
            is_error_occured: false,
            allow_order_notification: true,
            sender_name,
            sender_phone,
            error_message: "Proceed to send notifications",
          };
        }
      }
    }
    return {
      is_error_occured: false,
      allow_order_notification: false,
      error_message: "Order already placed",
      sender_name: "",
      sender_phone: "",
    };
  } else {
    await supabase
      .from(MODELS.FLOATING_ORDERS)
      .update({
        paystack_reference_id: result?.referenceId,
        payment_status: result.message,
      })
      .eq("order_id", order_id);
    return {
      is_error_occured: false,
      allow_order_notification: false,
      error_message: "Payment not successful",
      sender_name: "",
      sender_phone: "",
    };
  }
}
