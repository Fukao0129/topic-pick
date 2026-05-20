import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // const alice = await prisma.user.upsert({
  //   where: { email: "alice@prisma.io" },
  //   update: {},
  //   create: {
  //     email: "alice@prisma.io",
  //     name: "Alice",
  //   },
  // });
  // await prisma.user.upsert({
  //   where: { email: "bob@prisma.io" },
  //   update: {},
  //   create: {
  //     email: "bob@prisma.io",
  //     name: "Bob",
  //   },
  // });

  // await prisma.topic.upsert({
  //   where: { id: 1 },
  //   update: {},
  //   create: {
  //     name: "Test",
  //     userId: alice.id,
  //   },
  // });

  await prisma.source.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Hacker News",
    },
  });
  await prisma.source.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Qiita",
    },
  });
  await prisma.source.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Zenn",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
