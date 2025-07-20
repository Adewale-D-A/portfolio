import { createClient } from "@/temp/client";
import { MODELS } from "@/temp/constants";

export const logCoupon = async (payload: {
  user_id: string;
  coupon_code: string;
  order_id: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(MODELS.COUPONS_USAGE_TRACKER)
    .insert([payload]);

  // if (error) {
  //   throw new Error("Error creating order: " + error.message);
  // }

  return data;
};
