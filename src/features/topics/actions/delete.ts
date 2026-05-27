"use server";

import { deleteTopic } from "../services/delete";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";

/** トピック削除
 * @param id トピックID
 * @returns 削除されたトピック
 */
export const deleteTopicAction = async (id: number) => {
  const { userId } = await getUserId();

  if (!userId) {
    throw new Error("認証されていません");
  }

  const deletedTopic = await deleteTopic(id, userId);
  revalidatePath("/topics");
  return deletedTopic;
};
