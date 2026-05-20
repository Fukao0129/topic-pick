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
  if (!userId) {
    return { type: "error", text: "認証されていません" };
  }

  const sourceIds = formData.getAll("sourceIds").map(Number);

  // バリデーションチェック
  if (sourceIds.length === 0) {
    return { type: "error", text: "最低1つ以上のソースを選択してください" };
  }

  // DB操作
  await updateUserSources(userId, sourceIds);
  revalidatePath("/sources");

  return { type: "success", text: "設定を保存しました。" };
};
