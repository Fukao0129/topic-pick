import prisma from "@/src/lib/prisma";
import { cache } from "react";

/** サマリ一覧取得 */
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

/** お気に入りのサマリを取得 */
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

/** 既存のサマリのoriginalIDを取得 */
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
