const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const user = {
    loginId: "principal0",
    password: "abcdefgh",
    role: Role.Principal,
    udiseId: "29  20  01  23  910",
  };

  const hashedPassword = await bcrypt.hash(user.password, 10);
  await prisma.user.create({
    data: {
      loginId: user.loginId,
      password: hashedPassword,
      role: user.role,
      udiseId: user.udiseId,
    },
  });

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
