import { redirect } from "next/navigation";
import { getUserId } from "@/src/lib/utils/get-user-id";

/** 未認証の場合はログインページにリダイレクトする
 * @returns ユーザーID (認証済の場合はそのまま返す)
 */
export async function requireAuth() {
  const { userId } = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  return userId;
}
