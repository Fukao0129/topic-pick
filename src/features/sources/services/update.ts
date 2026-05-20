import prisma from "@/src/lib/prisma";

/** ユーザーの選択しているソースを更新する
 * @param userId - ユーザーID
 * @param sourceIds - 選択されたソースIDの配列
 * @returns 更新されたユーザー情報
 */
export const updateUserSources = async (userId: string, sourceIds: number[]) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      sources: {
        set: sourceIds.map((id) => ({ id })),
      },
    },
  });
};
