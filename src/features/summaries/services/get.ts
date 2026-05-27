import prisma from "@/src/lib/prisma";
import { cache } from "react";

/** サマリ一覧取得
 * @param startDate 開始日
 * @param endDate 終了日
 * @param userId ユーザーID
 * @returns サマリの配列
 */
export const getSummaries = cache(
  async (startDate?: Date, endDate?: Date, userId?: string) => {
    return await prisma.summary.findMany({
      include: {
        topic: true,
      },
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        userId,
      },
    });
  },
);

/** お気に入りのサマリを取得
 * @param userId ユーザーID
 * @returns お気に入りのサマリの配列
 */
export const getFavoriteSummaries = cache(async (userId: string) => {
  const summaries = await prisma.summary.findMany({
    where: {
      userId,
      favorite: true,
    },
    include: {
      topic: true,
    },
  });
  return summaries;
});

/** 既存のサマリのoriginalIDを取得
 * @param userId ユーザーID
 * @returns 既存のサマリのoriginalIDの配列
 */
export const getOriginalIds = cache(async (userId: string) => {
  const summaries = await prisma.summary.findMany({
    select: {
      originalID: true,
    },
    where: {
      userId,
    },
  });
  return summaries.map((summary) => summary.originalID);
});
