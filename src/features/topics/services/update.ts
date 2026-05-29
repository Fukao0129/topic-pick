import prisma from "@/src/lib/prisma";

/**
 * トピックの並び順を一括更新する
 * @param updates { id: number, order: number } の配列
 * @param userId ユーザーID (認可・安全のため)
 */
export const updateTopicsOrder = async (
  updates: { id: number; order: number }[],
  userId: string,
) => {
  // 複数レコードを更新するのでトランザクションを張る
  const transactions = updates.map((update) => {
    return prisma.topic.update({
      where: {
        id: update.id,
        userId: userId,
      },
      data: {
        order: update.order,
      },
    });
  });

  await prisma.$transaction(transactions);
};
