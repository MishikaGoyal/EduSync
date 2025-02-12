import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const udise_code = url.searchParams.get("udise_code");

    if (!udise_code) {
      return NextResponse.json(
        { error: "UDISE_CODE is required in session storage or headers" },
        { status: 400 }
      );
    }

    // Query the school table with the given UDISE_CODE
    const school = await prisma.school.findUnique({
      where: {
        UDISE_CODE: udise_code,
      },
      select: {
        School_Name: true, // Select only the School_Name field
      },
    });

    if (!school) {
      return NextResponse.json(
        { error: "No school found with the provided UDISE_CODE" },
        { status: 404 }
      );
    }

    return NextResponse.json(school, { status: 200 });
  } catch (error) {
    console.error("Error fetching school name:", error);
    return NextResponse.json(
      { error: "Failed to fetch school name" },
      { status: 500 }
    );
  }
}
