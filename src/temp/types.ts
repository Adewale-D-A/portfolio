import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./supabase";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Pageable = {
  page: number;
  size: number;
};

export type PackageOrder =
  Database["public"]["Tables"]["package_orders"]["Row"];

export type MultipleDropoffData =
  Database["public"]["Tables"]["multiple_dropoffs"]["Row"];

export type AodPlansType = Database["public"]["Tables"]["aod_plans"]["Row"];
export type AodPlanSubscriptionsType =
  Database["public"]["Tables"]["aod_subscriptions"]["Row"];

export type AodPlansIIType =
  Database["public"]["Tables"]["aod_plans"]["Update"];
export type AODlogsType =
  Database["public"]["Tables"]["aod_usage_logs"]["Update"];

export type AodPlanSubscriptionsIIType =
  Database["public"]["Tables"]["aod_subscriptions"]["Update"];

export type PackageOrderWithRider = PackageOrder & {
  deliveries: Array<Pick<Delivery, "id" | "rider_name" | "status">>;
};
export type Delivery = Database["public"]["Tables"]["deliveries"]["Row"];

export type UserProfile = Database["public"]["Tables"]["users"]["Row"];

export interface userInfo {
  first_name: string;
  last_name: string;
  phone: string;
  id: string;
  email: string;
  role: string;
  address?: string;
  address_latitude?: number;
  address_longitude?: number;
  profile_img_url?: string;
}

export interface FileExtension extends File {
  preview?: string;
}
export interface coupon {
  id: string;
  coupon_code: string;
  coupon_type: string;
  validity_start_date_time: string;
  validity_end_date_time: string;
  max_total_usage_count: number;
  max_usage_per_user_count: number;
  min_valid_delivery_fee: number;
  applicable_user_type: string;
  is_applicable_to_all_selected_usertype: boolean;
  applicable_users: string;
  status: string;
  created_by: userInfo;
}
