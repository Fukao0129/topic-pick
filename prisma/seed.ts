import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/client";
import { SOURCES } from "@/src/constants/sources";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ソースのマスタデータ
  for (const source of Object.values(SOURCES)) {
    await prisma.source.upsert({
      where: { id: source.ID },
      update: { name: source.NAME },
      create: { id: source.ID, name: source.NAME },
    });
  }
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
