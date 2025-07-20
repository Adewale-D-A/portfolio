import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface Message {
  id: string;
  text: string;
  date_time: string;
  user_id: string;
}

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const payment_id = searchParams.get("payment_id") || "";

  if (!payment_id) {
    return NextResponse.json(
      {
        success: false,
        message: "Both payment ID is required",
        data: {},
      },
      { status: 400 }
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorised to perform this action",
          data: [],
        },
        { status: 400 }
      );
    }
    // const auth_user_id = session?.user?.id;
    // query for orders completed by this vendor
    const { data, error } = await supabase
      .from("vendor_payments")
      .select("conversations")
      .eq("payment_id", payment_id);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message || "Failed to get conversation",
          data: [],
        },
        { status: 400 }
      );
    }
    const result = data?.[0]?.conversations || [];
    const conversations: Message[] = JSON.parse(result);
    return NextResponse.json(
      { success: true, data: conversations },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
