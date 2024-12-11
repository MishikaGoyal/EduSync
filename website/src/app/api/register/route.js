import bcrypt from "bcrypt";
import { PrismaClient, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const { loginId, password, role } = await req.json();
  console.log(loginId);

  try {
    if (!password || !loginId || !role) {
      return NextResponse.json("Data is missing", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        loginId,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "User Already Exists", flag: false },
        { status: 400 }
      );
    }

    let hashedPassword = await bcrypt.hash(
      password,
      "$2b$10$Bbysmq4.NGojA/6dBMCSRO"
    );
    await prisma.user.create({
      data: {
        loginId: loginId,
        password: hashedPassword,
        role: role === "teacher" ? Role.Teacher : Role.SMC,
        udiseId: "",
      },
    });

    return NextResponse.json(
      { message: "User Created Succesfully", flag: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Internal Server Error", flag: null },
      { status: 500 }
    );
  }
}
