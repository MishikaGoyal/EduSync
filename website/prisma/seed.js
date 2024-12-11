const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const resources = [
    {
      UDISE_CODE: "29  20  01  23  912",
      School_Name: "Blue Ridge Elementary",
      resource_type: "Computers",
      quantity: 10,
      description: "Laptops for computer lab",
      status: "pending",
      max_date_for_resource_delivery: new Date("2024-12-20T23:59:59Z"),
      rerequest_count: 0,
      adminId: "admin124",
    },
    {
      UDISE_CODE: "29  20  01  23  915",
      School_Name: "Sunrise Middle School",
      resource_type: "Sports Equipment",
      quantity: 20,
      description: "Basketballs and nets",
      status: "pending",
      max_date_for_resource_delivery: new Date("2024-12-25T23:59:59Z"),
      rerequest_count: 0,
      adminId: "admin125",
    },
  ];

  for (const resource of resources) {
    await prisma.resource.create({
      data: {
        UDISE_CODE: resource.UDISE_CODE,
        School_Name: resource.School_Name,
        resource_type: resource.resource_type,
        quantity: resource.quantity,
        description: resource.description,
        status: resource.status,
        max_date_for_resource_delivery: resource.max_date_for_resource_delivery,
        rerequest_count: resource.rerequest_count,
        adminId: resource.adminId,
      },
    });
  }

  console.log("Resources seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });