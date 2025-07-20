import type { PaymentMethod, DeliveryType } from "@/temp/order-types/types";

export enum PackageOrderStatus {
  Pending = "pending",
  Accepted = "accepted",
  Assigned = "assigned", // on delivery object
  Delivering = "delivering", // on delivery object
  Completed = "completed", //completion - whole screen change - on delivery object
  Cancelled = "cancelled", //completion - whole screen change
  // PickedUp = "picked_up",
  // PickUpRoute = "on_pick_up_route",
  // AtPickUp = "at_pick_up",
  // OnDeliveryRoute = "on_delivery_route",
  // Delivered = "delivered",
  // OnHold = "on_hold",
}
export type orderStatuses =
  | "assigned"
  | "accepted"
  | "picked_up"
  | "completed"
  | "cancelled"
  | string;

export interface IPackageOrder {
  user_id: string;
  status: PackageOrderStatus;
  progress: PackageOrderStatus;
  sender_name: string;
  sender_phone: string;
  pickup_location: string;
  receiver_name: string;
  receiver_phone: string;
  dropoff_location: string;
  delivery_fee: number;
  distance: number; //made unrequired for the vendor ordering
  item_category: string;
  payment_receipt?: string | null; //made unrequired for the vendor ordering
  payment_method?: PaymentMethod | null; //made unrequired for the vendor ordering
  order_id: string;
  delivery_type: DeliveryType;
  note: string;
  coupon_code: string | null;
  discount: number;
  discounted_fee: number;
  has_multiple_dropff?: boolean;
  is_payment_on_vendor_debt?: boolean;
  deferred_payment_reason?: string;
  is_payment_on_aod?: boolean;
}
export interface IMultipleDropoffs {
  user_id: string;
  order_id: string;
  address: string;
  longitude: number;
  latitude: number;
  priority_index: number;
  delivery_fee: number;
}
export interface IDeliveries {
  order_id: string;
  rider_id: string;
  rider_name: string;
  rider_phone: string;
  customer_id: string;
  receiver_address: string;
  receiver_name: string;
  receiver_phone: string;
  sender_address: string;
  sender_name: string;
  sender_phone: string;
  // status: any; //orderStatuses | string;
  sender_latitude: number;
  sender_longitude: number;
  receiver_latitude: number;
  receiver_longitude: number;
  item_category: string;
  vendor_id?: string;
  is_vendor_delivery?: boolean;
  status: PackageOrderStatus;
  progress: PackageOrderStatus;
}

export { PaymentMethod, DeliveryType };
