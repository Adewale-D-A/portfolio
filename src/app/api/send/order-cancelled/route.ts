import { OrderCancelledEmail } from "@/components/emails/OrderCancelledTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { orderId, destinationEmail, cancellationReason } = body;
  if (!orderId || !destinationEmail || !cancellationReason) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Cartway <hello@cartwayhq.com>",
      to: destinationEmail,
      subject: "Your order has been cancelled",
      react: OrderCancelledEmail({ orderId, cancellationReason }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
