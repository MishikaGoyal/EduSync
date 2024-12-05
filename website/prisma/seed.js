const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const messages = [
    {
      userId: "admin123",
      userRole: Role.Admin,
      text: "Welcome to the chat! Let me know if you need help.",
      timestamp: "2024-12-05T10:00:00Z",
    },
    {
      userId: "principal456",
      userRole: Role.Principal,
      text: "Thanks! Can you guide me on the dashboard?",
      timestamp: "2024-12-05T10:02:00Z",
    },
  ];

  for (m of messages) {
    await prisma.message.create({
      data: {
        loginId: m.userId,
        role: m.userRole,
        text: m.text,
        timestamp: m.timestamp,
        displayName: "",
      },
    });
  }

  console.log("Users seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
