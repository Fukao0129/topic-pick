import { aiSummarize } from "@/src/lib/utils/ai-summarize";
import { filterDuplicate } from "@/src/lib/utils/filter-duplicate";
import type { QiitaResponse } from "@/src/types/qiita";
import { SOURCES } from "@/src/constants/sources";
import { mainTextPrompt } from "./prompt";
import type { SummaryInput } from "../types";

/** Qiita APIから記事を取得し、AIで要約して返す処理 */
export async function fetchQiita(
  topic: { id: number; name: string },
  userId: string,
): Promise<SummaryInput[]> {
  // APIでデータを取得
  const res = await fetch(
    `${SOURCES.QIITA.API_URL}/items?query=${encodeURIComponent(topic.name + " stocks:>=10")}`,
  );
  if (!res.ok) {
    console.error(
      `[Qiita API Error] Topic: ${topic.name}, Status: ${res.status}`,
    );
    return [];
  }
  const data = await res.json();

  // 既にサマリに使ったことがある記事は除外
  const filteredHits = await filterDuplicate<QiitaResponse>(data, userId, "id");

  // トークン節約のため絞る
  const truncatedData = filteredHits?.slice(0, 5) || [];

  if (truncatedData.length === 0) {
    console.log(
      `[Qiita API Info] ${topic.name} の新しい記事は見つかりませんでした。`,
    );
    return [];
  }

  // AIに渡すデータを要約に必要な項目のみに絞り込む
  const aiPayload = truncatedData.map((item) => ({
    title: item.title,
    body: item.body,
  }));

  // AIに要約してもらう
  const aiSummary = await aiSummarize(aiPayload, mainTextPrompt);
  if (!aiSummary || !Array.isArray(aiSummary)) return [];

  return truncatedData.map((item, index) => ({
    originalID: String(item.id),
    url: String(item.url),
    mainText: aiSummary[index] || "",
    userId,
    topicId: topic.id,
    sourceId: SOURCES.QIITA.ID,
  }));
}
