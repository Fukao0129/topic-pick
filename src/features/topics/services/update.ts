import prisma from "@/src/lib/prisma";

/** トピック更新 */
export const updateTopic = async (id: number, name: string) => {
  const updatedTopic = await prisma.topic.update({
    where: { id },
    data: { name },
  });

  return updatedTopic;
};
