import { aiSummarize } from "@/src/lib/utils/ai-summarize";
import { filterDuplicate } from "@/src/lib/utils/filter-duplicate";
import type { HNHit } from "@/src/types/hacker-news";
import { SOURCES } from "@/src/constants/sources";
import { mainTextPrompt } from "./prompt";
import type { SummaryInput } from "../types";

/** HackerNews APIから記事を取得し、AIで要約して返す処理
 * @param topic トピック情報
 * @param userId ユーザーID
 * @returns 要約されたサマリの配列
 */
export async function fetchHackerNews(
  topic: { id: number; name: string },
  userId: string,
): Promise<SummaryInput[]> {
  // APIでデータを取得
  const res = await fetch(
    `${SOURCES.HACKER_NEWS.API_URL}/search_by_date?tags=story&query=${encodeURIComponent(topic.name)}&numericFilters=points>100`,
  );
  if (!res.ok) {
    console.error(`[HN API Error] Topic: ${topic.name}, Status: ${res.status}`);
    return [];
  }
  const data = await res.json();

  // 既にサマリに使ったことがある記事は除外
  const filteredHits = await filterDuplicate<"objectID", HNHit>(
    data.hits,
    userId,
    "objectID",
  );

  // トークン節約のため絞る
  const truncatedData = filteredHits?.slice(0, 5) || [];

  if (truncatedData.length === 0) {
    console.log(
      `[HN API Info] ${topic.name} の新しい記事は見つかりませんでした。`,
    );
    return [];
  }

  // AIに渡すデータを要約に必要な項目のみに絞り込む
  const aiPayload = truncatedData.map((item) => ({
    title: item.title,
    story_text: item.story_text,
    children: item.comment_text,
  }));

  // AIに要約してもらう
  const aiSummary = await aiSummarize(aiPayload, mainTextPrompt);
  if (!aiSummary || !Array.isArray(aiSummary)) return [];

  return truncatedData.map((item, index) => ({
    originalID: String(item.objectID),
    url: String(item.url || item.story_url || ""),
    mainText: aiSummary[index] || "",
    userId,
    topicId: topic.id,
    sourceId: SOURCES.HACKER_NEWS.ID,
  }));
}
