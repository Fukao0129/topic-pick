"use server";

import { updateTopicsOrder } from "../services/update";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";
import type { ActionState } from "@/src/types/action-state";

/**
 * トピックの並び順を更新する
 * @param topicIds トピックIDの配列
 * @returns 更新結果
 */
export const updateTopicsOrderAction = async (
  topicIds: number[],
): Promise<ActionState> => {
  // 認証チェック
  const { userId } = await getUserId();
  if (!userId) {
    return { type: "error", text: "認証されていません" };
  }

  // 型チェック
  if (
    !Array.isArray(topicIds) ||
    !topicIds.every((id) => Number.isInteger(id) && id > 0)
  ) {
    return { type: "error", text: "無効なトピックIDが含まれています" };
  }

  // indexから並び順を生成
  const updates = topicIds.map((id, index) => ({
    id,
    order: index,
  }));

  // DB操作
  try {
    await updateTopicsOrder(updates, userId);
    revalidatePath("/topics");
    return { type: "success", text: "トピックの並び順を更新しました。" };
  } catch {
    return { type: "error", text: "ServerActions 想定外エラー" };
  }
};
