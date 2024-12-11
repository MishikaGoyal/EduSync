import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req) {
  const { udiseId } = await req.json();
  const schoolData = await prisma.school.findFirst({
    where: {
      UDISE_CODE: udiseId,
    },
  });

  if (!schoolData) {
    return NextResponse.json(
      { message: "Could not find school" },
      { status: 400 }
    );
  }
  console.log(schoolData);
  let formattedSchoolData = {
    ...schoolData,
    Boundary_Wall: `${schoolData.Boundary_Wall === false ? "2" : "1"}`,
    Library_Available: `${schoolData.Library_Available === false ? "2" : "1"}`,
    Separate_Room_for_HM: `${
      schoolData.Separate_Room_for_HM === false ? "2" : "1"
    }`,
    Drinking_Water_Available: `${
      schoolData.Drinking_Water_Available === false ? "2" : "1"
    }`,
    Playground_Available: `${
      schoolData.Playground_Available === false ? "2" : "1"
    }`,
    Electricity_Availability: `${
      schoolData.Electricity_Availability === false ? "2" : "1"
    }`,
  };

  return NextResponse.json(
    { message: "School data found ", data: formattedSchoolData },
    { status: 200 }
  );
}
