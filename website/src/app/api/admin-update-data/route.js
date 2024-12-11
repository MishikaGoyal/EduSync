import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const requestData = await prisma.updates.findMany({
      where: {
        status: "Pending",
      },
    });
    return NextResponse.json(requestData);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json("Internal Sever Error", { status: 500 });
  }
}
