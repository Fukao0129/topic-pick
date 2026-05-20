import { getOriginalIds } from "@/src/features/summaries";
import type { HNHit } from "@/src/types/hacker-news";
import type { QiitaResponse } from "@/src/types/qiita";

/** 既にサマリが作成されている記事を除外する
 * @param data APIで取得した記事データ
 * @param userId ユーザーID
 * @param key 比較するキー
 * @returns 重複を除外した記事データ
 */
export const filterDuplicate = async <T extends HNHit | QiitaResponse>(
  data: T[],
  userId: string,
  key: keyof T,
) => {
  const originalIds = await getOriginalIds(userId);
  return data.filter((item) => !originalIds.includes(item[key] as string));
};
