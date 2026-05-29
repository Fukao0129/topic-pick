import { aiSummarize } from "@/src/lib/utils/ai-summarize";
import { filterDuplicate } from "@/src/lib/utils/filter-duplicate";
import type { ZennFeed, ZennFeedItem } from "@/src/types/zenn";
import { SOURCES } from "@/src/constants/sources";
import { mainTextPrompt } from "./prompt";
import type { SummaryInput } from "../types";
import Parser from "rss-parser";

/** Zenn RSSから記事を取得し、AIで要約して返す処理
 * @param topic トピック情報
 * @param userId ユーザーID
 * @returns 要約されたサマリの配列
 */
export async function fetchZenn(
  topic: { id: number; name: string },
  userId: string,
): Promise<SummaryInput[]> {
  // トピック名は小文字しか受け付けない
  const topicName = topic.name.toLowerCase();

  // RSSフィードを取得
  const res = await fetch(
    `${SOURCES.ZENN.RSS_URL}/${encodeURIComponent(topicName)}/feed`,
  );
  if (!res.ok) {
    console.error(
      `[Zenn RSS Error] Topic: ${topic.name}, Status: ${res.status}`,
    );
    return [];
  }
  const xml = await res.text();

  // XMLをJSONに変換
  const parser = new Parser<ZennFeed, ZennFeedItem>();
  const data = await parser.parseString(xml);

  console.log(data);

  // 既にサマリに使ったことがある記事は除外
  const filteredHits = await filterDuplicate<"guid", ZennFeedItem>(
    data.items,
    userId,
    "guid",
  );

  // トークン節約のため絞る
  const truncatedData = filteredHits?.slice(0, 5) || [];

  if (truncatedData.length === 0) {
    console.log(
      `[Zenn RSS Info] ${topic.name} の新しい記事は見つかりませんでした。`,
    );
    return [];
  }

  // AIに渡すデータを要約に必要な項目のみに絞り込む
  const aiPayload = truncatedData.map((item) => ({
    title: item.title,
    body: item.contentSnippet,
  }));

  // AIに要約してもらう
  const aiSummary = await aiSummarize(aiPayload, mainTextPrompt);
  if (!aiSummary || !Array.isArray(aiSummary)) return [];

  return truncatedData.map((item, index) => ({
    originalID: String(item.guid),
    url: String(item.link),
    mainText: aiSummary[index] || "",
    userId,
    topicId: topic.id,
    sourceId: SOURCES.ZENN.ID,
  }));
}
