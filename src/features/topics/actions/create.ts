"use server";

import { createTopic } from "../services/create";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";
import type { ActionState } from "@/src/types/action-state";

/** トピック作成 */
export const createTopicAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const { userId } = await getUserId();
  if (!userId) {
    return { type: "error", text: "認証されていません" };
  }

  const name = formData.get("topicName") as string;

  // バリデーションチェック
  if (!name) {
    return {
      type: "error",
      text: "トピック名を入力してください",
      values: name,
    };
  }
  if (name.length < 2 || name.length > 10) {
    return {
      type: "error",
      text: "トピック名は2文字以上10文字以内で入力してください",
      values: name,
    };
  }

  // DB操作
  await createTopic(name, userId);
  revalidatePath("/topics");

  return { type: "success", text: "トピックを作成しました。" };
};
