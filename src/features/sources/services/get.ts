import prisma from "@/src/lib/prisma";
import { cache } from "react";

/** 全てのソースを取得する
 * @returns ソースの配列
 */
export const getSources = cache(async () => {
  return await prisma.source.findMany();
});

/** ユーザーが選択しているソースを取得する
 * @param userId - ユーザーID
 * @returns 選択されているソースの配列
 */
export const getUserSources = cache(async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      sources: true,
    },
  });

  // 未設定の場合は全ソースをデフォルトで返す
  if (!user || user.sources.length === 0) {
    return await prisma.source.findMany();
  }

  return user.sources;
});
