import prisma from "@/src/lib/prisma";
import { cache } from "react";

/** トピック一覧取得
 * @param userId ユーザーID
 * @returns トピックの配列
 */
export const getTopics = cache(async (userId: string) => {
  return await prisma.topic.findMany({
    where: { userId },
  });
});

/** トピック詳細取得(未使用)
 * @param id トピックID
 * @returns トピックの詳細
 */
export const getTopic = cache(async (id: number) => {
  return await prisma.topic.findUnique({
    where: { id },
  });
});
