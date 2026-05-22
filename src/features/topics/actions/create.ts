"use server";

import { createTopic } from "../services/create";
import { getTopics } from "../services/get";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";
import type { ActionState } from "@/src/types/action-state";
import { TOPIC_MAX } from "@/src/constants/index";

/** トピック作成 */
export const createTopicAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  // 認証チェック
  const { userId } = await getUserId();
  if (!userId) {
    return { type: "error", text: "認証されていません" };
  }

  const name = formData.get("topicName") as string;

  // 最大数チェック
  const topics = await getTopics(userId);
  if (topics.length >= TOPIC_MAX) {
    return {
      type: "error",
      text: `トピックは最大${TOPIC_MAX}件までです`,
      values: name,
    };
  }

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

  // 重複チェック
  if (topics.some((topic) => topic.name === name)) {
    return {
      type: "error",
      text: "同じ名前のトピックが既に存在します",
      values: name,
    };
  }

  // DB操作
  await createTopic(name, userId);
  revalidatePath("/topics");

  return { type: "success", text: "トピックを作成しました。" };
};
