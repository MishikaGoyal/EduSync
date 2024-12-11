import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req) {
  const data = await req.json();

  console.log(data);
  console.log(data.resource_type);
  try {
    const schoolData = await prisma.school.findUnique({
      where: {
        UDISE_CODE: data.UDISE_CODE,
      },
    });
    console.log("1");
    if (!schoolData) {
      return NextResponse.json({
        message: "School does not exist in the database",
      });
    }

    let previousValue;
    if (data.resource_type == "Total_Class_Rooms") {
      previousValue = schoolData.Total_Class_Rooms;
      await prisma.school.update({
        where: {
          UDISE_CODE: data.UDISE_CODE,
        },
        data: { Total_Class_Rooms: data.new_value },
      });
    } else if (data.resource_type == "Total_Teachers") {
      previousValue = schoolData.Total_Teachers;
      await prisma.school.update({
        where: {
          UDISE_CODE: data.UDISE_CODE,
        },
        data: { Total_Teachers: data.new_value },
      });
    } else if (data.resource_type == "Total_Washrooms") {
      previousValue = schoolData.Total_Washrooms;
      await prisma.school.update({
        where: {
          UDISE_CODE: data.UDISE_CODE,
        },
        data: { Total_Washrooms: data.new_value },
      });
    } else if (data.resource_type == "Total_Students") {
      previousValue = schoolData.Total_Students;
      await prisma.school.update({
        where: {
          UDISE_CODE: data.UDISE_CODE,
        },
        data: { Total_Students: data.new_value },
      });
    } else {
      return NextResponse.json("The type of resource is invalid", {
        status: 400,
      });
    }

    console.log("2");
    await prisma.updates.create({
      data: {
        UDISE_CODE: data.UDISE_CODE,
        status: "Pending",
        resource_type: data.resource_type,
        new_value: data.new_value,
        previous_value: previousValue,
        description: data.description,
        url: "",
      },
    });
    console.log("3");

    return NextResponse.json(
      { message: "Data updated succesfully", flag: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
