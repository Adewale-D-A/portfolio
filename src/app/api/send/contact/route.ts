import ContactEmailTemplate from "@/components/emails/ContactTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const isProduction = process.env.VERCEL_ENV === "production";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // body of our request - to be sent from the Client-side in our form above
  const { fullName, phoneNumber, email, message } = body;

  // Check if the required fields are present
  if (!fullName || !phoneNumber || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Cartway Website <website@cartwayhq.com>",
      to: isProduction ? "cartwayhq@gmail.com" : email,
      subject: "New message from Cartway website",
      react: ContactEmailTemplate({ email, fullName, message, phoneNumber }),
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
