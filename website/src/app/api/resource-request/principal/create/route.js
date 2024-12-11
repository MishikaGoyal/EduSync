import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma client
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    const { UDISE_CODE, resource_type, quantity, description, adminId } = body;

    // Validate required fields
    if (!UDISE_CODE || !resource_type || !quantity) {
      return NextResponse.json(
        { error: "All fields are required: UDISE_CODE, resource_type, quantity, max_date_for_resource_delivery" },
        { status: 400 }
      );
    }

    
    const currentDate = new Date();
    const maxDateForDelivery = new Date(currentDate.setMonth(currentDate.getMonth() + 1));

    const resources = await prisma.resource.create({
      data: {
        UDISE_CODE,
        resource_type,
        quantity,
        description,
        adminId,
        max_date_for_resource_delivery: maxDateForDelivery,  // Set max date to 1 month from now
      },
    });

    // Return the created resource data as a response
    return NextResponse.json(resources, { status: 201 });
  } catch (error) {
    console.error("Error creating resource request:", error);
    return NextResponse.json(
      { error: "Failed to create resource request" },
      { status: 500 }
    );
  }
}
