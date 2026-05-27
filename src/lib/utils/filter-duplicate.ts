import { getOriginalIds } from "@/src/features/summaries";

/** 既にサマリが作成されている記事を除外する
 * @param data APIで取得した記事データ
 * @param userId ユーザーID
 * @param key 比較するキー（string型のプロパティ名）
 * @returns 重複を除外した記事データ
 */
export const filterDuplicate = async <
  K extends string,
  T extends Record<K, string>,
>(
  data: T[],
  userId: string,
  key: K,
) => {
  const originalIds = await getOriginalIds(userId);
  return data.filter((item) => !originalIds.includes(item[key]));
};
