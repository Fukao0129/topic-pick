"use server";

import { updateSummary } from "../services/update";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";

/** お気に入り操作
 * @param id サマリID
 * @param favorite お気に入り状態
 * @returns 更新されたサマリ
 */
export const updateSummaryFavoriteAction = async (
  id: number,
  favorite: boolean,
) => {
  const { userId } = await getUserId();
  // 認証チェック
  if (!userId) {
    throw new Error("認証されていません");
  }

  // 型チェック
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("無効なサマリIDです");
  }

  // DB操作
  try {
    const updatedSummary = await updateSummary(id, userId, { favorite });
    revalidatePath("/");
    return updatedSummary;
  } catch {
    throw new Error("ServerActions 想定外エラー");
  }
};
