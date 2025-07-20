export type PaymentMethod =
  | "monnify"
  | "bank_transfer"
  | "debt"
  | "coupon"
  | "deposit"
  | "paystack";

export type DeliveryType = "local" | "interstate";

export type DedicatedAccount = {
  bank: {
    name: string;
    id: number;
    slug: string;
  };
  id: number;
  account_name: string;
  account_number: string;
  created_at: string;
  updated_at: string;
  currency: string;
  split_config: null;
  active: boolean;
  assigned: boolean;
  assignment: {
    assignee_id: number;
    assignee_type: string;
    account_type: string;
    integration: number;
  };
};

export type customerDVAinfo = {
  data: {
    transactions: [];
    subscriptions: [];
    authorizations: [];
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    metadata: {};
    domain: string;
    customer_code: string;
    risk_action: string;
    id: number;
    integration: number;
    createdAt: string;
    updatedAt: string;
    created_at: string;
    updated_at: string;
    total_transactions: number;
    total_transaction_value: [];
    dedicated_account: DedicatedAccount;
    dedicated_accounts: DedicatedAccount[];
    identified: false;
    identifications: null;
  };
};

export type PaystackDetails = {
  id: number;
  domain: string;
  status: string;
  reference: string;
  receipt_number: string;
  amount: number;
  message: string;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: {
    order_id: string;
    user_id: string;
    payment_type: string;
    referrer: string;
  };
  log: {
    start_time: number;
    time_spent: number;
    attempts: number;
    errors: number;
    success: boolean;
    mobile: boolean;
    input: [];
    history: {
      type: string;
      message: string;
      time: number;
    }[];
  };
  fees: number;
  fees_split: null;
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: null;
    receiver_bank_account_number: null;
    receiver_bank: null;
  };
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    customer_code: string;
    phone: null;
    metadata: null;
    risk_action: string;
    international_format_phone: null;
  };
  plan: null;
  split: {};
  order_id: null;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: null;
  source: null;
  fees_breakdown: null;
  connect: null;
  transaction_date: string;
  plan_object: {};
  subaccount: {};
};
