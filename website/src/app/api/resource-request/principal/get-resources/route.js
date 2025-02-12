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
        { error: "UDISE code is required" },
        { status: 400 }
      );
    }

    const resources = await prisma.resource.findMany({
      where: {
        UDISE_CODE: udise_code,
      },
    });

    console.log(
      "returning the resources for the school from get-resources api",
      resources
    );

    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error("Error fetching resource requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch resource requests" },
      { status: 500 }
    );
  }
}
