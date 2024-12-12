import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  if (!data) {
    return NextResponse.json({ message: "Invlaid Data" }, { status: 400 });
  }

  const response = await fetch("http://127.0.0.1:5000/check", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }

  if (result === "ODD") {
  }
}
