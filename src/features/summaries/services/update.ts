import prisma from "@/src/lib/prisma";
import { Prisma } from "@/prisma/generated/client";

/** サマリー更新
 * @param id サマリID
 * @param userId ユーザーID
 * @param data 更新データ
 * @returns 更新されたサマリ
 */
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
