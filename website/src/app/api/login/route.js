import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import crypto from "crypto";

const prisma = new PrismaClient();
const secretKey = crypto.createSecretKey(
  Buffer.from(process.env.JWT_SECRET, "utf-8")
);

export async function POST(req) {
  try {
    const { loginId, password } = await req.json();

    if (!loginId || !password) {
      return NextResponse.json({ message: "Invalid data" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { loginId } });

    if (!user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    const token = await new SignJWT({ userId: user.loginId, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secretKey);

    const response = NextResponse.json(
      {
        message: "Successfully logged in",
        role: user.role,
        userId: user.loginId,
        udiseId: user.udiseId,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 120, // 1 hour
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export function GET() {
  return NextResponse.json("Hello, world!");
}
