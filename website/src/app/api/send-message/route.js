import { Prisma, PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req) {
  const message = await req.json();

  console.log(message);
  let role =
    message.userRole === "Admin"
      ? Role.Admin
      : message.userRole === "Principal"
      ? Role.Principal
      : message.userRole === "Teacher"
      ? Role.Teacher
      : Role.SMC;

  console.log(`role: ${role}`);
  await prisma.message.create({
    data: {
      loginId: message.loginId,
      role: role,
      displayName: message.displayName,
      text: message.text,
      timestamp: message.timestamp,
    },
  });
  return NextResponse.json(
    { message: "message added succesfully" },
    { status: 200 }
  );
}
