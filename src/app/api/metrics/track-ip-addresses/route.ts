import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const host = req.headers.get("user-agent");
  const ip = req.headers.get("x-forwarded-for");
  const { error, data } = await supabase.from("visitors_ip_tracking").insert({
    host: host,
    ip: ip,
  });
  return NextResponse.json(
    { success: true, data: { ip, host } },
    { status: 200 }
  );
}
