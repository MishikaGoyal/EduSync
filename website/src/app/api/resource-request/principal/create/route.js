import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient
export async function POST(req) {
    try {
        const body = await req.json()
        const { UDISE_CODE, resource_type, quantity, description ,adminId } = body

        if (!UDISE_CODE || !resource_type || !quantity ) {
            return NextResponse.json(
                { error: "All fields are required: UDISE_CODE, resource_type, quantity, max_date_for_resource_delivery" },
                { status: 400 }
            );
        }

        const resources = await prisma.resource.create({
            data: {
                UDISE_CODE,
                resource_type,
                quantity,
                description,
                adminId
            }
        })

        return NextResponse.json(resources, { status: 201 });
    } catch (error) {
        console.error("Error creating resource request:", error);
        return NextResponse.json(
            { error: "Failed to create resource request" },
            { status: 500 }
        );
    }
}