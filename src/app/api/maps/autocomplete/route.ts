import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";
import axios from "axios";
export async function GET(req: NextRequest) {
  // const supabase = createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  try {
    // if (!session) {
    //   return NextResponse.json({ success: false, data: [] }, { status: 400 });
    // }
    const { searchParams } = new URL(req.url);
    const input = searchParams.get("input") || "";
    // const location = "7.3775,3.9470"; // Coordinates for Ibadan, Nigeria
    // const radius = 32; // 32 km radius
    // const bounds = "7.1813,3.7891|7.6223,4.0931"; // Bounds for Ibadan, Nigeria
    const components = "country:NG"; // Restrict to Nigeria

    let response;
    // if (input?.length > 5) {
    response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input: `${input} ibadan`,
          // bounds,
          // radius,
          // location,
          components,
          key: process.env.MAPS_API_KEY,
        },
      }
    );
    // }
    const filteredByIbadan =
      response?.data?.predictions?.filter((item: { description: string }) =>
        item?.description?.toLowerCase()?.includes("ibadan")
      ) || [];
    return NextResponse.json(
      { success: true, data: filteredByIbadan },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
