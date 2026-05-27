import prisma from "@/src/lib/prisma";
import { type Summary } from "../types/summary";

/** サマリ作成
 * @param summary サマリのデータ
 * @returns 作成されたサマリ
 */
export async function createSummary(
  summary: Omit<Summary, "id" | "createdAt" | "favorite" | "topic" | "user">,
) {
  const newSummary = await prisma.summary.create({
    data: {
      ...summary,
    },
  });

  return newSummary;
}
