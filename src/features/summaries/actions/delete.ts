"use server";

import { deleteSummary } from "../services/delete";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";

/** サマリー削除
 * @param id サマリID
 * @returns 削除されたサマリ
 */
export const deleteSummaryAction = async (id: number) => {
  // 認証チェック
  const { userId } = await getUserId();
  if (!userId) {
    throw new Error("認証されていません");
  }

  // 型チェック
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("無効なサマリIDです");
  }

  // DB操作
  try {
    const deletedSummary = await deleteSummary(id, userId);
    revalidatePath("/");
    return deletedSummary;
  } catch {
    throw new Error("ServerActions 想定外エラー");
  }
};
