import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { resourceId } = await req.json();

        if (!resourceId) {
            return NextResponse.json(
                { error: "Resource ID is required" },
                { status: 400 }
            );
        }

        const resource = await prisma.resource.findUnique({
            where: { id: resourceId },
        });

        if (!resource) {
            return NextResponse.json(
                { error: "Resource not found" },
                { status: 404 }
            );
        }

        const updatedResource = await prisma.resource.update({
            where: { id: resourceId },
            data: {
                status: "pending",
                rerequest_count: { increment: 1 },
            },
        });

        return NextResponse.json(
            {
                message: "Resource status updated to pending and re-request count incremented",
                updatedResource,
            },
            { status: 200 }
        );
        
    } catch (error) {
        console.error("Error in re-request route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
