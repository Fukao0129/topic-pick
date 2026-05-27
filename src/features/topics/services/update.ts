import prisma from "@/src/lib/prisma";

/** トピック更新
 * @param id トピックID
 * @param name トピック名
 * @returns 更新されたトピック
 */
export const updateTopic = async (id: number, name: string) => {
  const updatedTopic = await prisma.topic.update({
    where: { id },
    data: { name },
  });

  return updatedTopic;
};
