// import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
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
    const origin = searchParams.get("origin");
    //     origin=7.3775,3.9470
    // destination=7.4194,3.9053
    const destination = searchParams.get("destination");
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          origins: origin,
          destinations: destination,
          key: process.env.MAPS_API_KEY,
        },
      }
    );

    return NextResponse.json(
      { success: true, data: response.data.rows[0]?.elements[0] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
