import prisma from "@/src/lib/prisma";

/** トピック追加
 * @param name トピック名
 * @param userId ユーザーID
 */
export const createTopic = async (name: string, userId: string) => {
  const newTopic = await prisma.topic.create({
    data: {
      name,
      userId,
    },
  });
  return newTopic;
};
