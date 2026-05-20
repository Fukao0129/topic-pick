import { auth } from "@/src/lib/auth";

/** ログイン中のユーザーIDを取得する
 * @returns ユーザーID
 */
export async function getUserId() {
  const session = await auth();
  return {
    userId: session ? session.user?.id : null,
  };
}
