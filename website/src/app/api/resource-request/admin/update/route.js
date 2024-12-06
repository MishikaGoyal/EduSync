import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient

export async function PATCH(req) {
    try {
        const body = await req.json()
        const { resourceId, status, max_date_for_resource_delivery } = body;

        if (!resourceId || (!status && !max_date_for_resource_delivery)) {
            return NextResponse.json(
                { error: "Missing required fields: resourceId, status, or max_date_for_resource_delivery" },
                { status: 400 }
            );
        }

        const updatedResource = await prisma.resource.update({
            where: { id: resourceId },
            data: {
                status,
                max_date_for_resource_delivery: max_date_for_resource_delivery
                    ? new Date(max_date_for_resource_delivery)
                    : undefined,
            }
        })

        return NextResponse.json(updatedResource, { status: 200 });
    } catch (error) {
        console.error("Error updating resource:", error);
        return NextResponse.json(
            { error: "Failed to update resource request" },
            { status: 500 }
        );
    }finally{
        await prisma.$disconnect();
    }
}