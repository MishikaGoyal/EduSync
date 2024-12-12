import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const schools = await prisma.school.findMany({
            select: {
                id: true,
                UDISE_CODE: true,
                School_Name: true,
                State: true,
                School_Category: true,
                School_Management: true,
                School_Type: true,
                Grade_Configuration: true,
                Year_of_Establishment: true,
                Boundary_Wall: true,
                Total_Class_Rooms: true,
                Library_Available: true,
                Separate_Room_for_HM: true,
                Drinking_Water_Available: true,
                Playground_Available: true,
                Electricity_Availability: true,
                Total_Teachers: true,
                Total_Washrooms: true,
                CWSN: true,
                Severity: true,
                Total_Students: true,
                Result: true
            }
        });

        return NextResponse.json({
            success: true,
            count: schools.length,
            data: schools
        }, { status: 200 });

    } catch (error) {

        console.error('Error fetching school data:', error);


        return NextResponse.json({
            success: false,
            message: 'Failed to retrieve school data',
            error: error.message || 'Unknown error'
        }, { status: 500 });
    } finally {

        await prisma.$disconnect();
    }
}