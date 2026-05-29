import prisma from "@/src/lib/prisma";
import { cache } from "react";

/** トピック一覧取得
 * @param userId ユーザーID
 * @returns トピックの配列
 */
export const getTopics = cache(async (userId: string) => {
  return await prisma.topic.findMany({
    where: { userId },
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
});
