import { OrderPlacedOnHoldEmail } from "@/components/emails/OrderOnHoldTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { orderId, destinationEmail, onHoldReason } = body;
  if (!orderId || !destinationEmail || !onHoldReason) {
    return new NextResponse("Missing required fields", { status: 400 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const { data, error } = await resend.emails.send({
      from: "Cartway <hello@cartwayhq.com>",
      to: destinationEmail,
      subject: "Your order has been placed on hold",
      react: OrderPlacedOnHoldEmail({ orderId, onHoldReason }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
