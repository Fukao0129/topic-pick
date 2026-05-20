import prisma from "@/src/lib/prisma";

/** トピック作成 */
export const createTopic = async (name: string, userId: string) => {
  const newTopic = await prisma.topic.create({
    data: {
      name,
      userId,
    },
  });
  return newTopic;
};
