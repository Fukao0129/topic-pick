"use server";

import { deleteSummary } from "../services/delete";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/src/lib/utils/get-user-id";

/** サマリー削除 */
export const deleteSummaryAction = async (id: number) => {
  const { userId } = await getUserId();

  if (!userId) {
    throw new Error("認証されていません");
  }

  const deletedSummary = await deleteSummary(id, userId);
  revalidatePath("/");
  return deletedSummary;
};
