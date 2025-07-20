import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface Message {
  id: string;
  text: string;
  date_time: string;
  user_id: string;
}
export async function POST(req: NextRequest) {
  const supabase = createClient();
  const body = await req.json();
  const { payment_id, text } = body;

  // validate request body to contain both paymend ID and the conversation message (text)
  if (!payment_id || !text) {
    return NextResponse.json(
      {
        success: false,
        message: "Both payment ID and the text field is required",
        data: {},
      },
      { status: 400 }
    );
  }
  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    // validate that the user is authenticated
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

    const auth_user_id = session?.user?.id;

    const date_time = new Date().toString();
    const id_generated = (Math.random() + 1).toString(36).substring(7);
    // Create a message body
    const conversation = {
      id: id_generated,
      text: text,
      date_time,
      user_id: auth_user_id,
    };

    // Fetch conversation histries
    const { data: chatHistories, error: chatHistoriesErr } = await supabase
      .from("vendor_payments")
      .select("conversations")
      .eq("payment_id", payment_id);

    // Reject if histories failed to be fetched
    // doin this because the DB is string based and
    //this is need to concatenate prvious messages to new
    //message in order for the histories to be preserved
    if (chatHistoriesErr) {
      return NextResponse.json(
        {
          success: false,
          message:
            chatHistoriesErr?.message ||
            "An error occured while trying to update conversation",
          data: {},
        },
        { status: 400 }
      );
    }
    const result = chatHistories?.[0]?.conversations || [];
    const conversationHistories: Message[] = JSON.parse(result);
    const replaceWith = JSON.stringify([
      ...conversationHistories,
      conversation,
    ]);
    // Update the conversation itself
    const { error, data } = await supabase
      .from("vendor_payments")
      .update({
        conversations: replaceWith,
      })
      .eq("payment_id", payment_id);

    // Throw errror is updating failed
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message || "Failed to update conversation",
          data: {},
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, data: conversation },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
