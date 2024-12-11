import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Log phone number for debugging
console.log("Phone number to send message:", to);

const message = await client.messages.create({
  body: "There is an update! Please check",
  from: +13204313003,
  to: +918792067476, // Use the dynamic phone number from the request body
});
