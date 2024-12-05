import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Successfully signed out" },
    { status: 200 }
  );

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return response;
}
