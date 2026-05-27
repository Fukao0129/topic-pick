import prisma from "@/src/lib/prisma";

/** サマリー削除
 * @param id サマリID
 * @param userId ユーザーID
 * @returns 削除されたサマリ
 */
export const deleteSummary = async (id: number, userId: string) => {
  const deletedSummary = await prisma.summary.delete({
    where: { id, userId },
  });
  return deletedSummary;
};
