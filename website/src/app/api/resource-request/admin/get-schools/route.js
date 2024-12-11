import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Test: Log the fetched resources to ensure query is working
    const resources = await prisma.resource.findMany();
    console.log("Fetched Resources:", resources);

    // If resources are fetched successfully, continue with your logic
    const schools = resources.reduce((acc, resource) => {
      const { UDISE_CODE, School_Name, ...rest } = resource;

      // Check if the school already exists in the accumulator
      let school = acc.find((s) => s.id === UDISE_CODE);
      if (!school) {
        school = {
          id: UDISE_CODE,
          name: School_Name, // Ensure School_Name is included
          resources: [],
        };
        acc.push(school);
      }

      // Add resource to the school's resource array
      school.resources.push({
        id: rest.id,
        name: rest.resource_type,
        quantity: rest.quantity,
        description: rest.description,
        requestTime: new Date(rest.date).toLocaleString(),
        status: rest.status,
        maxDeliveryDate: rest.max_date_for_resource_delivery
          ? new Date(rest.max_date_for_resource_delivery).toLocaleDateString()
          : null,
        reRequestCount: rest.rerequest_count,
      });

      return acc;
    }, []);

    return NextResponse.json(schools, { status: 200 });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: `Failed to fetch resources: ${error.message}` },
      { status: 500 }
    );
  }
}
