import { aiSummarize } from "@/src/lib/utils/ai-summarize";
import { filterDuplicate } from "@/src/lib/utils/filter-duplicate";
import type { QiitaResponse } from "@/src/types/qiita";
import { SOURCES } from "@/src/constants/sources";
import type { SummaryInput } from "./types";

/** Qiita APIから記事を取得し、AIで要約して返す処理 */
export async function fetchQiita(
  topic: { id: number; name: string },
  userId: string,
): Promise<SummaryInput[]> {
  const res = await fetch(
    `${SOURCES.QIITA.API_URL}/items?query=${encodeURIComponent(topic.name + " lgtm:>=10")}`,
  );

  if (!res.ok) {
    console.error(
      `[Qiita API Error] Topic: ${topic.name}, Status: ${res.status}`,
    );
    return [];
  }
  const data = await res.json();

  const filteredHits = await filterDuplicate<QiitaResponse>(data, userId, "id");

  const truncatedData = filteredHits?.slice(0, 2) || [];

  if (truncatedData.length === 0) {
    console.log(
      `[Qiita API Info] Topic: ${topic.name}, No new articles found.`,
    );
    return [];
  }

  const aiSummary = await aiSummarize(truncatedData, SOURCES.QIITA.ID);

  if (!aiSummary || !Array.isArray(aiSummary)) return [];

  return aiSummary.map((item) => ({
    ...item,
    userId,
    topicId: topic.id,
    sourceId: SOURCES.QIITA.ID,
  }));
}
