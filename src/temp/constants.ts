export const MODELS = {
  USERS: "users",
  ORDERS: "package_orders",
  FLOATING_ORDERS: "floating_package_orders",
  DELIVERIES: "deliveries",
  VENDORS: "vendors",
  VENDOR_OUTLETS: "vendor_outlets",
  SYSTEM_CONFIGURATION: "system_configuration",
  ORDERS_V2: "orders",
  RECURRING_ORDERS: "recurring_orders",
  ORDER_POINTS: "order_points",
  ORDER_STATUS_TIMELINES: "order_status_timelines",
  VENDOR_PAYMENTS: "vendor_payments",
  COUPONS: "coupons",
  COUPONS_USAGE_TRACKER: "coupons_usage_tracker",
  VENDOR_PENDING_APPLICATIONS: "vendor_pending_applications",
  MULTIPLE_DROPOFFS: "multiple_dropoffs",
  ZONE_PRICING: "zone_pricing",
  VENDOR_ASSIGNED_RIDERS: "vendor_assigned_riders",
  USER_ROLES: "user_roles",
  VENDOR_DEBT_PAYMENTS: "vendor_debt_financing_payments",
  AOD_PLANS: "aod_plans",
  AOD_PLAN_SUBSCIPTIONS: "aod_subscriptions",
  AOD_LOGS: "aod_usage_logs",
} as const;

export const RQUERY_KEYS = {
  USERS: "users.all",
  VENDORS: "vendors.all",
} as const;

export const mapCenters = {
  ibadan: { lat: 7.3775, lng: 3.947 },
};

export const USERTYPES = ["admin", "customer", "vendor"] as const;
export const MAX_FILE_SIZE = 5000000; // 5MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// const status = "pending, accepted, assigned, delivering, on_hold, completed, cancelled, at_pick_up, picked_up, on_pick_up_route, delivered, confirmed"

export const orderStatuses = [
  {
    label: "Accepted",
    value: "accepted",
  },
  {
    label: "On Way To Pick-up",
    value: "on_pick_up_route",
  },
  {
    label: "At Pick-up",
    value: "at_pick_up",
  },
  {
    label: "Picked up",
    value: "picked_up",
  },
  {
    label: "Delivering",
    value: "delivering",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "On Hold",
    value: "on_hold",
  },
  {
    label: "Completed",
    value: "completed",
  },
];

export const vendorPaymentStatus = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Approved",
    value: "approved",
  },
  {
    label: "Declined",
    value: "declined",
  },
];
