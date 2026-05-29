"use server";

import { updateUserSources } from "../services/update";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";
import type { ActionState } from "@/src/types/action-state";

/**
 * ソース設定更新
 * @param _prevState - useActionState から渡される前の状態（未使用）
 * @param formData - フォームデータ（sourceIds を含む）
 * @returns 処理結果の状態
 */
export const updateUserSourcesAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const { userId } = await getUserId();
  // 認証チェック
  if (!userId) {
    return { type: "error", text: "認証されていません" };
  }

  const rawSourceIds = formData.getAll("sourceIds");
  const sourceIds = rawSourceIds.map(Number);

  // バリデーションチェック
  if (sourceIds.length === 0) {
    return { type: "error", text: "最低1つ以上のソースを選択してください" };
  }

  // 型チェック
  if (sourceIds.some((id) => !Number.isInteger(id) || id <= 0)) {
    return { type: "error", text: "無効なソースIDが含まれています" };
  }

  // DB操作
  try {
    await updateUserSources(userId, sourceIds);
    revalidatePath("/sources");
    return { type: "success", text: "設定を保存しました。" };
  } catch {
    return { type: "error", text: "ServerActions 想定外エラー" };
  }
};
