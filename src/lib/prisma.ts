// Prisma Clientの初期化
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg"; // https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
import { PrismaClient } from "@/prisma/generated/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
