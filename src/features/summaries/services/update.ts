import prisma from "@/src/lib/prisma";
import { Prisma } from "@/prisma/generated/client";

/** サマリー更新 */
export const updateSummary = async (
  id: number,
  userId: string,
  data: Prisma.SummaryUpdateInput,
) => {
  const updatedSummary = await prisma.summary.update({
    where: { id, userId },
    data,
  });

  return updatedSummary;
};
