const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const schoolData = require("../../model/datasets/schools_data.json");

async function main() {
  console.log("Seeding database...");
  for (const school of schoolData) {
    const isThere = await prisma.school.findUnique({
      where: {
        UDISE_CODE: school["UDISE CODE"],
      },
    });

    if (isThere) continue;
    await prisma.school.create({
      data: {
        UDISE_CODE: school["UDISE CODE"],
        School_Name: school["School Name"] || "",
        State: school["State"] || "",
        School_Category: school["School Category"] || "",
        School_Management: school["School Management"] || "",
        School_Type: school["School Type"] || "",
        Grade_Configuration: school["Grade Configuration"] || "",
        Year_of_Establishment: school["Year of Establishment"] || "",
        Boundary_Wall: parseInt(school["Boundary Wall"]) === 1,
        Total_Class_Rooms: school["Total Class Rooms"] || "",
        Library_Available: parseInt(school["Library Available"]) === 1,
        Separate_Room_for_HM: parseInt(school["Separate Room for HM"]) === 1,
        Drinking_Water_Available:
          parseInt(school["Drinking Water Available"]) === 1,
        Playground_Available: parseInt(school["Playground Available"]) === 1,
        Electricity_Availability:
          parseInt(school["Electricity Availability"]) === 1,
        Total_Teachers: school["Total Teachers"] || "",
        Total_Washrooms: school["Total Washrooms"] || "",
        Total_Students: school["Total Students"] || "",
        Result: school["Result"] || "",
        Severity: school["Severity"] || "",
        CWSN: parseInt(school["Is Special School for CWSN"]) === 1,
      },
    });
  }
  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
