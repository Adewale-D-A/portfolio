import OrderCreatedEmail from "@/components/emails/OrderCreatedTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // body of our request - to be sent from the Client-side in our form above
  const { orderId, destinationEmail } = body;

  // Check if the required fields are present
  if (!orderId || !destinationEmail) {
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
      subject: "We have received your order",
      react: OrderCreatedEmail({ orderId }),
      // headers: {
      //   "X-Entity-Ref-ID": new Date().getTime() + "",
      // },
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
