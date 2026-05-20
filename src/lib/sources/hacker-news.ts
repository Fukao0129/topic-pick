import { aiSummarize } from "@/src/lib/utils/ai-summarize";
import { filterDuplicate } from "@/src/lib/utils/filter-duplicate";
import type { HNHit } from "@/src/types/hacker-news";
import { SOURCES } from "@/src/constants/sources";
import type { SummaryInput } from "./types";

/** HackerNews APIから記事を取得し、AIで要約して返す処理 */
export async function fetchHackerNews(
  topic: { id: number; name: string },
  userId: string,
): Promise<SummaryInput[]> {
  const res = await fetch(
    `${SOURCES.HACKER_NEWS.API_URL}/search_by_date?tags=story&query=${encodeURIComponent(topic.name)}&numericFilters=points>100`,
  );

  if (!res.ok) {
    console.error(`[HN API Error] Topic: ${topic.name}, Status: ${res.status}`);
    return [];
  }
  const data = await res.json();

  const filteredHits = await filterDuplicate<HNHit>(
    data.hits,
    userId,
    "objectID",
  );

  const truncatedData = filteredHits?.slice(0, 2) || [];

  if (truncatedData.length === 0) {
    console.log(`[HN API Info] Topic: ${topic.name}, No new articles found.`);
    return [];
  }

  const aiSummary = await aiSummarize(truncatedData, SOURCES.HACKER_NEWS.ID);

  if (!aiSummary || !Array.isArray(aiSummary)) return [];

  return aiSummary.map((item) => ({
    ...item,
    userId,
    topicId: topic.id,
    sourceId: SOURCES.HACKER_NEWS.ID,
  }));
}
