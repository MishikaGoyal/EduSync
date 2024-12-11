// app/api/sendmessage1/route.js
import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request) {
  const { to } = await request.json();

  if (!to || typeof to !== "string") {
    return NextResponse.json(
      { success: false, error: "Invalid phone number" },
      { status: 400 }
    );
  }

  try {
    const message = await client.messages.create({
      body: "There is an update! Please check",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    return NextResponse.json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error("Twilio API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
