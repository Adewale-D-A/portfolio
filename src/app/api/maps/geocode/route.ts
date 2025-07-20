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
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${lat},${lng}`,
          key: process.env.MAPS_API_KEY,
        },
      }
    );
    // console.log({ response, placeId });
    return NextResponse.json(
      { success: true, data: response.data?.results },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
