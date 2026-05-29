import prisma from "@/src/lib/prisma";

/** トピック追加
 * @param name トピック名
 * @param userId ユーザーID
 */
export const createTopic = async (name: string, userId: string) => {
  // 現在のトピックの最大orderを取得
  const maxOrder = await prisma.topic.aggregate({
    where: { userId },
    _max: { order: true },
  });

  // 次のorderを計算
  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const newTopic = await prisma.topic.create({
    data: {
      name,
      userId,
      order: nextOrder,
    },
  });
  return newTopic;
};
