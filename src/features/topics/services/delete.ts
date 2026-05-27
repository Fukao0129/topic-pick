import prisma from "@/src/lib/prisma";

/** トピック削除
 * @param id トピックID
 * @param userId ユーザーID
 */
export const deleteTopic = async (id: number, userId: string) => {
  const deletedTopic = await prisma.topic.delete({
    where: { id, userId },
  });
  return deletedTopic;
};
