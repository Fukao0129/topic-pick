"use server";

import { deleteTopic } from "../services/delete";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";

/** トピック削除
 * @param id トピックID
 * @returns 削除されたトピック
 */
export const deleteTopicAction = async (id: number) => {
  // 認証チェック
  const { userId } = await getUserId();
  if (!userId) {
    throw new Error("認証されていません");
  }

  // 型チェック
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("無効なトピックIDです");
  }

  // DB操作
  try {
    const deletedTopic = await deleteTopic(id, userId);
    revalidatePath("/topics");
    return deletedTopic;
  } catch {
    throw new Error("ServerActions 想定外エラー");
  }
};
