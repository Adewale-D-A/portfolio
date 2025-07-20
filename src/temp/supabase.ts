export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      deliveries: {
        Row: {
          cancellation_reason: string | null;
          created_at: string | null;
          customer_id: string | null;
          id: string;
          on_hold_reason: string | null;
          order_id: string;
          order_on_hold: boolean | null;
          receiver_address: string | null;
          receiver_name: string | null;
          receiver_phone: string | null;
          rider_id: string;
          rider_name: string | null;
          rider_phone: string | null;
          sender_address: string | null;
          sender_name: string | null;
          sender_phone: string | null;
          status: Database["public"]["Enums"]["delivery_status"];
          progress: Database["public"]["Enums"]["delivery_status"];
          updated_at: string | null;
          sender_latitude: number | null;
          sender_longitude: number | null;
          receiver_latitude: number | null;
          receiver_longitude: number | null;
          is_vendor_delivery: boolean;
          has_multiple_dropff?: boolean;
        };
        Insert: {
          cancellation_reason?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          id?: string;
          on_hold_reason?: string | null;
          order_id: string;
          order_on_hold?: boolean | null;
          receiver_address?: string | null;
          receiver_name?: string | null;
          receiver_phone?: string | null;
          rider_id: string;
          rider_name?: string | null;
          rider_phone?: string | null;
          sender_address?: string | null;
          sender_name?: string | null;
          sender_phone?: string | null;
          status?: Database["public"]["Enums"]["delivery_status"];
          progress?: Database["public"]["Enums"]["delivery_status"];
          updated_at?: string | null;
          sender_latitude?: number | null;
          sender_longitude?: number | null;
          receiver_latitude?: number | null;
          receiver_longitude?: number | null;
          vendor_id?: string;
          is_vendor_delivery?: boolean;
          has_multiple_dropff?: boolean;
        };
        Update: {
          cancellation_reason?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          id?: string;
          on_hold_reason?: string | null;
          order_id?: string;
          order_on_hold?: boolean | null;
          receiver_address?: string | null;
          receiver_name?: string | null;
          receiver_phone?: string | null;
          rider_id?: string;
          rider_name?: string | null;
          rider_phone?: string | null;
          sender_address?: string | null;
          sender_name?: string | null;
          sender_phone?: string | null;
          status?: Database["public"]["Enums"]["delivery_status"];
          progress?: Database["public"]["Enums"]["delivery_status"];
          updated_at?: string | null;
          sender_latitude?: number | null;
          sender_longitude?: number | null;
          receiver_latitude?: number | null;
          receiver_longitude?: number | null;
          has_multiple_dropff?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "deliveries_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "deliveries_customer_id_fkey1";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "deliveries_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "package_orders";
            referencedColumns: ["order_id"];
          }
        ];
      };
      order_points: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          location: string;
          metadata: Json | null;
          name: string;
          order_id: string;
          phone: string;
          type: Database["public"]["Enums"]["order_point_type"];
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          location: string;
          metadata?: Json | null;
          name: string;
          order_id: string;
          phone: string;
          type: Database["public"]["Enums"]["order_point_type"];
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          location?: string;
          metadata?: Json | null;
          name?: string;
          order_id?: string;
          phone?: string;
          type?: Database["public"]["Enums"]["order_point_type"];
        };
        Relationships: [
          {
            foreignKeyName: "order_points_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
      order_status_timelines: {
        Row: {
          created_at: string;
          id: number;
          order_id: string;
          status: Database["public"]["Enums"]["delivery_status"];
        };
        Insert: {
          created_at?: string;
          id?: number;
          order_id: string;
          status: Database["public"]["Enums"]["delivery_status"];
        };
        Update: {
          created_at?: string;
          id?: number;
          order_id?: string;
          status?: Database["public"]["Enums"]["delivery_status"];
        };
        Relationships: [
          {
            foreignKeyName: "order_status_timelines_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          cancellation_reason: string | null;
          coupon_code: string | null;
          created_at: string | null;
          delivery_fee: number | null;
          delivery_type: string | null;
          discount: number | null;
          discounted_fee: number | null;
          distance: number | null;
          id: string;
          item_category: string | null;
          note: string | null;
          on_hold_reason: string | null;
          order_category: Database["public"]["Enums"]["order_category"];
          order_id: string;
          payment_method: string | null;
          payment_receipt: string | null;
          payment_settled: boolean;
          schedule_date: string | null;
          status: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at: string | null;
          user_id: string | null;
          is_payment_on_vendor_debt: boolean;
        };
        Insert: {
          cancellation_reason?: string | null;
          coupon_code?: string | null;
          created_at?: string | null;
          delivery_fee?: number | null;
          delivery_type?: string | null;
          discount?: number | null;
          discounted_fee?: number | null;
          distance?: number | null;
          id?: string;
          item_category?: string | null;
          note?: string | null;
          on_hold_reason?: string | null;
          order_category?: Database["public"]["Enums"]["order_category"];
          order_id: string;
          payment_method?: string | null;
          payment_receipt?: string | null;
          payment_settled?: boolean;
          schedule_date?: string | null;
          status?: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          cancellation_reason?: string | null;
          coupon_code?: string | null;
          created_at?: string | null;
          delivery_fee?: number | null;
          delivery_type?: string | null;
          discount?: number | null;
          discounted_fee?: number | null;
          distance?: number | null;
          id?: string;
          item_category?: string | null;
          note?: string | null;
          on_hold_reason?: string | null;
          order_category?: Database["public"]["Enums"]["order_category"];
          order_id?: string;
          payment_method?: string | null;
          payment_receipt?: string | null;
          payment_settled?: boolean;
          schedule_date?: string | null;
          status?: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      package_orders: {
        Row: {
          cancellation_reason: string | null;
          coupon_code: string | null;
          created_at: string | null;
          delivery_fee: number | null;
          delivery_type: string | null;
          discount: number | null;
          discounted_fee: number | null;
          distance: number | null;
          dropoff_location: string | null;
          id: string;
          item_category: string | null;
          note: string | null;
          on_hold_reason: string | null;
          order_id: string;
          payment_method: string | null;
          payment_receipt: string | null;
          pickup_location: string | null;
          receiver_name: string | null;
          receiver_phone: string | null;
          sender_name: string | null;
          sender_phone: string | null;
          status: Database["public"]["Enums"]["package_order_status"] | null;
          progress: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at: string | null;
          user_id: string | null;
          sender_latitude: number | null;
          sender_longitude: number | null;
          receiver_latitude: number | null;
          receiver_longitude: number | null;
          is_vendor_order: boolean;
          vendor_id: string | null;
          paystack_reference_id?: string | null;
          has_multiple_dropff?: boolean;
          is_payment_on_vendor_debt?: boolean;
          deferred_payment_reason: string;
          is_payment_on_aod?: boolean;
        };
        Insert: {
          cancellation_reason?: string | null;
          coupon_code?: string | null;
          created_at?: string | null;
          delivery_fee?: number | null;
          delivery_type?: string | null;
          discount?: number | null;
          discounted_fee?: number | null;
          distance?: number | null;
          dropoff_location?: string | null;
          id?: string;
          item_category?: string | null;
          note?: string | null;
          on_hold_reason?: string | null;
          order_id: string;
          payment_method?: string | null;
          payment_receipt?: string | null;
          pickup_location?: string | null;
          receiver_name?: string | null;
          receiver_phone?: string | null;
          sender_name?: string | null;
          sender_phone?: string | null;
          status?: Database["public"]["Enums"]["package_order_status"] | null;
          progress?: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at?: string | null;
          user_id?: string | null;
          sender_latitude?: number | null;
          sender_longitude?: number | null;
          receiver_latitude?: number | null;
          receiver_longitude?: number | null;
          paystack_reference_id?: string | null;
          has_multiple_dropff?: boolean;
          is_payment_on_vendor_debt?: boolean;
          deferred_payment_reason?: string;
          is_payment_on_aod?: boolean;
        };
        Update: {
          cancellation_reason?: string | null;
          coupon_code?: string | null;
          created_at?: string | null;
          delivery_fee?: number | null;
          delivery_type?: string | null;
          discount?: number | null;
          discounted_fee?: number | null;
          distance?: number | null;
          dropoff_location?: string | null;
          id?: string;
          item_category?: string | null;
          note?: string | null;
          on_hold_reason?: string | null;
          order_id?: string;
          payment_method?: string | null;
          payment_receipt?: string | null;
          pickup_location?: string | null;
          receiver_name?: string | null;
          receiver_phone?: string | null;
          sender_name?: string | null;
          sender_phone?: string | null;
          status?: Database["public"]["Enums"]["package_order_status"] | null;
          progress?: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at?: string | null;
          user_id?: string | null;
          sender_latitude?: number | null;
          sender_longitude?: number | null;
          receiver_latitude?: number | null;
          receiver_longitude?: number | null;
          paystack_reference_id?: string | null;
          has_multiple_dropff?: boolean;
          is_payment_on_vendor_debt?: boolean;
          deferred_payment_reason?: string;
          is_payment_on_aod?: boolean;
        };
        Relationships: [];
      };
      floating_package_orders: {
        Row: {
          cancellation_reason: string | null;
          coupon_code: string | null;
          created_at: string | null;
          delivery_fee: number | null;
          delivery_type: string | null;
          discount: number | null;
          discounted_fee: number | null;
          distance: number | null;
          dropoff_location: string | null;
          id: string;
          item_category: string | null;
          note: string | null;
          on_hold_reason: string | null;
          order_id: string;
          payment_method: string | null;
          payment_receipt: string | null;
          pickup_location: string | null;
          receiver_name: string | null;
          receiver_phone: string | null;
          sender_name: string | null;
          sender_phone: string | null;
          status: Database["public"]["Enums"]["package_order_status"] | null;
          progress: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at: string | null;
          user_id: string | null;
          sender_latitude: number | null;
          sender_longitude: number | null;
          receiver_latitude: number | null;
          receiver_longitude: number | null;
          is_vendor_order: boolean;
          vendor_id: string | null;
          paystack_reference_id?: string | null;
          assigned_rider_id?: string | null;
          has_multiple_dropff?: boolean;
        };
        Insert: {
          cancellation_reason?: string | null;
          coupon_code?: string | null;
          created_at?: string | null;
          delivery_fee?: number | null;
          delivery_type?: string | null;
          discount?: number | null;
          discounted_fee?: number | null;
          distance?: number | null;
          dropoff_location?: string | null;
          id?: string;
          item_category?: string | null;
          note?: string | null;
          on_hold_reason?: string | null;
          order_id: string;
          payment_method?: string | null;
          payment_receipt?: string | null;
          pickup_location?: string | null;
          receiver_name?: string | null;
          receiver_phone?: string | null;
          sender_name?: string | null;
          sender_phone?: string | null;
          status?: Database["public"]["Enums"]["package_order_status"] | null;
          progress?: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at?: string | null;
          user_id?: string | null;
          sender_latitude?: number | null;
          sender_longitude?: number | null;
          receiver_latitude?: number | null;
          receiver_longitude?: number | null;
          paystack_reference_id?: string | null;
          assigned_rider_id?: string | null;
          has_multiple_dropff?: boolean;
        };
        Update: {
          cancellation_reason?: string | null;
          coupon_code?: string | null;
          created_at?: string | null;
          delivery_fee?: number | null;
          delivery_type?: string | null;
          discount?: number | null;
          discounted_fee?: number | null;
          distance?: number | null;
          dropoff_location?: string | null;
          id?: string;
          item_category?: string | null;
          note?: string | null;
          on_hold_reason?: string | null;
          order_id?: string;
          payment_method?: string | null;
          payment_receipt?: string | null;
          pickup_location?: string | null;
          receiver_name?: string | null;
          receiver_phone?: string | null;
          sender_name?: string | null;
          sender_phone?: string | null;
          status?: Database["public"]["Enums"]["package_order_status"] | null;
          progress?: Database["public"]["Enums"]["package_order_status"] | null;
          updated_at?: string | null;
          user_id?: string | null;
          sender_latitude?: number | null;
          sender_longitude?: number | null;
          receiver_latitude?: number | null;
          receiver_longitude?: number | null;
          paystack_reference_id?: string | null;
          assigned_rider_id?: string | null;
          has_multiple_dropff?: boolean;
        };
        Relationships: [];
      };
      aod_plans: {
        Row: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          single_delivery_discount_percentage: number;
          lower_limit: number;
          lower_limit_percentage_discount: number;
          upper_limit: number;
          upper_limit_percentage_discount: number;
          plan_description: string;
          applicable_user_type: string;
          plan_validity_days: number;
          plan_price: number;
          badge_icon_name: string;
          status?: string;
          created_by?: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          single_delivery_discount_percentage: number;
          lower_limit: number;
          lower_limit_percentage_discount: number;
          upper_limit: number;
          upper_limit_percentage_discount: number;
          plan_description: string;
          applicable_user_type: string;
          plan_validity_days: number;
          plan_price: number;
          badge_icon_name: string;
          status?: string;
          created_by?: string;
        };
        Update: {
          id: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          single_delivery_discount_percentage: number;
          lower_limit: number;
          lower_limit_percentage_discount: number;
          upper_limit: number;
          upper_limit_percentage_discount: number;
          plan_description: string;
          applicable_user_type: string;
          plan_validity_days: number;
          plan_price: number;
          badge_icon_name: string;
          status?: string;
          created_by?: string;
        };
        Relationships: [];
      };
      aod_subscriptions: {
        Row: {
          id?: string;
          created_at?: string;
          start_date: string;
          end_date: string;
          user_id: string;
          aod_plan_id: number;
          amount_paid: number;
          status: string;
          paystack_reference_id: string;
          is_expired: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          start_date: string;
          end_date: string;
          user_id: string;
          aod_plan_id: number;
          amount_paid: number;
          status: string;
          paystack_reference_id: string;
          is_expired: boolean;
        };
        Update: {
          id: string;
          created_at?: string;
          start_date: string;
          end_date: string;
          user_id: string;
          aod_plan_id: number;
          amount_paid: number;
          status: string;
          paystack_reference_id: string;
          is_expired: boolean;
        };
        Relationships: [];
      };
      multiple_dropoffs: {
        Row: {
          id: string;
          created_at: string;
          order_id: string;
          user_id: string;
          address: string;
          longitude: number;
          latitude: number;
          name: string;
          phone: string;
          priority_index: number;
          item_type: string;
          delivery_fee: number;
        };
        Insert: {
          order_id: string;
          user_id: string;
          address: string;
          longitude: number;
          latitude: number;
          name: string;
          phone: string;
          priority_index: number;
          item_type: string;
          delivery_fee: number;
        };
        Update: {
          order_id?: string;
          user_id?: string;
          address?: string;
          longitude?: number;
          latitude?: number;
          name?: string;
          phone?: string;
          priority_index?: number;
          item_type: string;
          delivery_fee: number;
        };
        Relationships: [];
      };
      aod_usage_logs: {
        Row: {
          id: string;
          created_at: string;
          order_id: string;
          user_id: string;
          delivery_fee: number;
          aod_subsription_id: string;
          aod_plan_id: string;
        };
        Insert: {
          order_id: string;
          user_id: string;
          delivery_fee: number;
          aod_subsription_id: string;
          aod_plan_id: string;
        };
        Update: {
          order_id?: string;
          user_id?: string;
          delivery_fee: number;
          aod_subsription_id: string;
          aod_plan_id: string;
        };
        Relationships: [];
      };
      vendor_debt_financing_payments: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          vendor_id: string;
          paystack_reference_id: string;
          amount: number;
          status: string;
          payment_id: string;
        };
        Insert: {
          id: string;
          created_at: string;
          user_id: string;
          vendor_id: string;
          paystack_reference_id?: string;
          amount: number;
          status: string;
          payment_id: string;
        };
        Update: {
          id: string;
          created_at: string;
          user_id: string;
          vendor_id: string;
          paystack_reference_id?: string;
          amount: number;
          status: string;
          payment_id: string;
        };
        Relationships: [];
      };
      recurring_orders: {
        Row: {
          created_at: string;
          end_date: string | null;
          frequency: Database["public"]["Enums"]["recurring_frequency"];
          id: string;
          order_id: string;
          schedule: string;
          start_date: string | null;
        };
        Insert: {
          created_at?: string;
          end_date?: string | null;
          frequency: Database["public"]["Enums"]["recurring_frequency"];
          id?: string;
          order_id: string;
          schedule: string;
          start_date?: string | null;
        };
        Update: {
          created_at?: string;
          end_date?: string | null;
          frequency?: Database["public"]["Enums"]["recurring_frequency"];
          id?: string;
          order_id?: string;
          schedule?: string;
          start_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "recurring_orders_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: true;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
      role_permissions: {
        Row: {
          id: number;
          permission: Database["public"]["Enums"]["app_permission"];
          role: Database["public"]["Enums"]["app_role"];
        };
        Insert: {
          id?: number;
          permission: Database["public"]["Enums"]["app_permission"];
          role: Database["public"]["Enums"]["app_role"];
        };
        Update: {
          id?: number;
          permission?: Database["public"]["Enums"]["app_permission"];
          role?: Database["public"]["Enums"]["app_role"];
        };
        Relationships: [];
      };
      roles: {
        Row: {
          id: number;
          role_name: Database["public"]["Enums"]["app_role"] | null;
        };
        Insert: {
          id?: number;
          role_name?: Database["public"]["Enums"]["app_role"] | null;
        };
        Update: {
          id?: number;
          role_name?: Database["public"]["Enums"]["app_role"] | null;
        };
        Relationships: [];
      };
      vendor_pending_applications: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          business_address: string;
          business_name: string;
          business_latitude: number;
          business_longitude: number;
        };
        Insert: {
          user_id: string;
          business_address: string;
          business_name: string;
          business_latitude?: number;
          business_longitude?: number;
        };
        Update: {
          user_id?: string;
          business_address?: string;
          business_name?: string;
          business_latitude?: number;
          business_longitude?: number;
        };
        Relationships: [];
      };
      system_configuration: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          property: Database["public"]["Enums"]["system_configuration_parameter"];
          updated_at: string;
          value: Json;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          property: Database["public"]["Enums"]["system_configuration_parameter"];
          updated_at?: string;
          value: Json;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          property?: Database["public"]["Enums"]["system_configuration_parameter"];
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: number;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          business_name: string | null;
          cac_certificate_url: string | null;
          created_at: string | null;
          email: string | null;
          enabled: boolean;
          first_name: string | null;
          id: string;
          id_document_url: string | null;
          id_type: string | null;
          last_name: string | null;
          license_plate_number: string | null;
          phone: string | null;
          role: Database["public"]["Enums"]["app_role"] | null;
          updated_at: string | null;
          vehicle_make: string | null;
          address?: string;
          address_latitude?: number;
          address_longitude?: number;
          profile_img_url?: string;
        };
        Insert: {
          business_name?: string | null;
          cac_certificate_url?: string | null;
          created_at?: string | null;
          email?: string | null;
          enabled?: boolean;
          first_name?: string | null;
          id: string;
          id_document_url?: string | null;
          id_type?: string | null;
          last_name?: string | null;
          license_plate_number?: string | null;
          phone?: string | null;
          role?: Database["public"]["Enums"]["app_role"] | null;
          updated_at?: string | null;
          vehicle_make?: string | null;
          address?: string;
          address_latitude?: number;
          address_longitude?: number;
          profile_img_url?: string;
        };
        Update: {
          business_name?: string | null;
          cac_certificate_url?: string | null;
          created_at?: string | null;
          email?: string | null;
          enabled?: boolean;
          first_name?: string | null;
          id?: string;
          id_document_url?: string | null;
          id_type?: string | null;
          last_name?: string | null;
          license_plate_number?: string | null;
          phone?: string | null;
          role?: Database["public"]["Enums"]["app_role"] | null;
          updated_at?: string | null;
          vehicle_make?: string | null;
          address?: string;
          address_latitude?: number;
          address_longitude?: number;
          profile_img_url?: string;
        };
        Relationships: [];
      };
      vendor_outlets: {
        Row: {
          active: boolean;
          contact_email: string | null;
          contact_phone: string | null;
          created_at: string;
          id: string;
          is_primary: boolean;
          location: string | null;
          name: string;
          vendor_id: string;
        };
        Insert: {
          active?: boolean;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_at?: string;
          id?: string;
          is_primary?: boolean;
          location?: string | null;
          name: string;
          vendor_id: string;
        };
        Update: {
          active?: boolean;
          contact_email?: string | null;
          contact_phone?: string | null;
          created_at?: string;
          id?: string;
          is_primary?: boolean;
          location?: string | null;
          name?: string;
          vendor_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vendor_outlets_vendor_id_fkey";
            columns: ["vendor_id"];
            isOneToOne: false;
            referencedRelation: "vendors";
            referencedColumns: ["id"];
          }
        ];
      };
      vendors: {
        Row: {
          active: boolean;
          alias: string;
          cac_certificate_url: string | null;
          created_at: string;
          id: string;
          location: string | null;
          logo: string | null;
          name: string;
          official_business_name: string | null;
          status: Database["public"]["Enums"]["vendor_status"];
          user_id: string;
          vendor_id: string;
          assigned_riders: string;
          zones_and_prices: string | null;
          business_latitude: string | null;
          business_longitude: string | null;
          allow_debt_financing: boolean;
          allow_zone_pricing: boolean;
          debt_threshold: number;
          assign_all_riders: boolean;
        };
        Insert: {
          active?: boolean;
          alias: string;
          cac_certificate_url?: string | null;
          created_at?: string;
          id?: string;
          location?: string | null;
          logo?: string | null;
          name: string;
          official_business_name?: string | null;
          status?: Database["public"]["Enums"]["vendor_status"];
          user_id: string;
          vendor_id: string;
          allow_debt_financing: boolean;
          allow_zone_pricing: boolean;
          debt_threshold: number;
          assign_all_riders: boolean;
        };
        Update: {
          active?: boolean;
          alias?: string;
          cac_certificate_url?: string | null;
          created_at?: string;
          id?: string;
          location?: string | null;
          logo?: string | null;
          name?: string;
          official_business_name?: string | null;
          status?: Database["public"]["Enums"]["vendor_status"];
          user_id?: string;
          vendor_id?: string;
          allow_debt_financing?: boolean;
          allow_zone_pricing?: boolean;
          debt_threshold?: number;
          assign_all_riders?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "vendors_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      visitors_ip_tracking: {
        Row: {
          created_at: string;
          id: string;
          host: string;
          ip: string;
        };
        Insert: {
          host: string;
          ip: string;
        };
        Update: {
          host: string;
          ip: string;
        };
      };
      vendor_payments: {
        Row: {
          created_at: string;
          id: string;
          payment_id: string;
          amount_paid_claim: string;
          receipt_url: string;
          conversations: string;
          updated_at: string;
          user_id: string;
          status: string;
          amount_received: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          payment_id: string;
          amount_paid_claim: string;
          receipt_url: string;
          conversations?: string;
          updated_at?: string;
          user_id: string;
          status?: string;
          amount_received?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          payment_id?: string;
          amount_paid_claim?: string;
          receipt_url?: string;
          conversations?: string;
          updated_at?: string;
          user_id?: string;
          status?: string;
          amount_received?: string;
        };
      };
      // system_configuration: {
      //   Row: SystemConfiguration[number];
      //   Insert: Omit<SystemConfiguration[number], 'id' | 'created_at'>;
      //   Update: Omit<SystemConfiguration[number], 'id' | 'created_at'>;
      // }
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"];
        };
        Returns: boolean;
      };
      custom_access_token_hook: {
        Args: {
          event: Json;
        };
        Returns: Json;
      };
      get_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      app_permission:
        | "package_orders.create"
        | "orders.update"
        | "user_roles.read"
        | "user_roles.update"
        | "package_orders.update"
        | "package_orders.read"
        | "documents.read"
        | "deliveries.create"
        | "deliveries.read"
        | "deliveries.update"
        | "users.read"
        | "users.read.admin"
        | "users.read.superadmin"
        | "users.update.admin"
        | "users.update.superadmin"
        | "vendors.manage"
        | "vendors.read"
        | "orders.manage"
        | "orders.read"
        | "vendor_outlets.manage"
        | "vendor_outlets.read"
        | "order_points.read"
        | "order_points.manage"
        | "recurring_orders.manage"
        | "system_configuration.read"
        | "system_configuration.manage";
      app_role: "superadmin" | "admin" | "vendor" | "rider" | "customer";
      delivery_status:
        | "assigned"
        | "accepted"
        | "picked_up"
        | "completed"
        | "cancelled"
        | "on_pick_up_route"
        | "at_pick_up"
        | "delivering"
        | "delivered"
        | "on_hold";
      order_category: "on_demand" | "scheduled" | "recurring";
      order_point_type: "pickup" | "dropoff" | "mapped";
      order_status:
        | "pending"
        | "assigned"
        | "accepted"
        | "preparing"
        | "ready_for_pickup"
        | "delivering"
        | "completed"
        | "cancelled"
        | "picked_up"
        | "on_pick_up_route"
        | "at_pick_up"
        | "delivered"
        | "on_hold";
      package_order_status:
        | "pending"
        | "assigned"
        | "accepted"
        | "preparing"
        | "ready_for_pickup"
        | "delivering"
        | "completed"
        | "cancelled"
        | "picked_up"
        | "on_pick_up_route"
        | "at_pick_up"
        | "delivered"
        | "on_hold";
      recurring_frequency:
        | "daily"
        | "weekly"
        | "bi-weekly"
        | "monthly"
        | "quarterly";
      role_type: "admin" | "customer" | "vendor";
      system_configuration_parameter: "pricing" | "email" | "notifications";
      vendor_status:
        | "verified"
        | "unverified"
        | "requested_verification"
        | "pending_verification";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
