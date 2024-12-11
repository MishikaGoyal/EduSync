import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.formData();

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      cache: "no-store",
      body: data,
    });

    const schoolData = await response.json();
    console.log(schoolData);
    const code = schoolData["UDISE CODE"];

    const isThere = await prisma.school.findUnique({
      where: {
        UDISE_CODE: code,
      },
    });

    if (isThere) {
      return NextResponse.json({
        message: "School data already uploaded",
        flag: false,
      });
    }

    console.log(data);
    await prisma.school.create({
      data: {
        UDISE_CODE: schoolData["UDISE CODE"] || "",
        School_Name: schoolData["School Name"] || "",
        State: schoolData["State"] || "",
        School_Category: schoolData["School Category"] || "",
        School_Management: schoolData["School Management"] || "",
        School_Type: schoolData["School Type"] || "",
        Grade_Configuration: schoolData["Grade Configuration"] || "",
        Year_of_Establishment: schoolData["Year of Establishment"] || "",
        Boundary_Wall: parseInt(schoolData["Boundary Wall"]) === 1,
        Total_Class_Rooms: schoolData["Total Class Rooms"] || "",
        Library_Available: parseInt(schoolData["Library Available"]) === 1,
        Separate_Room_for_HM:
          parseInt(schoolData["Separate Room for HM"]) === 1,
        Drinking_Water_Available:
          parseInt(schoolData["Drinking Water Available"]) === 1,
        Playground_Available:
          parseInt(schoolData["Playground Available"]) === 1,
        Electricity_Availability:
          parseInt(schoolData["Electricity Availability"]) === 1,
        Total_Teachers: schoolData["Total Teachers"] || "",
        Total_Washrooms: schoolData["Total Washrooms"] || "",
        CWSN: parseInt(schoolData["CWSN"]) === 1,
        Total_Students: schoolData["Total Students"],
        Result: schoolData["Result"],
        Severity: schoolData["Severity"],
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "unexpected error occured",
      flag: null,
    });
  }

  return NextResponse.json(
    { message: "Data added succesfully", flag: true },
    { status: 200 }
  );
}
