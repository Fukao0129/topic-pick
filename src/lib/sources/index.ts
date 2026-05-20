import { fetchHackerNews } from "./hacker-news";
import { fetchQiita } from "./qiita";
import type { SourceFetcher } from "./types";
import { SOURCES } from "@/src/constants/sources";

export type { SummaryInput, SourceFetcher } from "./types";

/** ソースハンドラー一覧。ソースIDとハンドラーのマッピング */
export const sourceFetchers: Record<number, SourceFetcher> = {
  [SOURCES.HACKER_NEWS.ID]: fetchHackerNews,
  [SOURCES.QIITA.ID]: fetchQiita,
};
