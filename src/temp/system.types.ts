export type SystemConfigurationParameter = "pricing" | "email" | "notification";

export interface SystemConfigurationItem<
  PropertyType extends SystemConfigurationParameter
> {
  id: string;
  name: string;
  property: PropertyType;
  value: PropertyType extends "pricing"
    ? {
        upper_km_limit: number;
        price_per_km: number;
        minimum_food_price: number;
        minimum_package_price: number;
      }
    : PropertyType extends "email"
    ? {
        orders: string;
        contact: string;
        website: string;
      }
    : {
        [key: string]: any;
      };
  created_at: string;
  updated_at: string;
}

export type SystemConfiguration = [
  SystemConfigurationItem<"pricing">,
  SystemConfigurationItem<"email">
];
