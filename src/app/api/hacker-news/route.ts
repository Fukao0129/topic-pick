import { NextResponse } from "next/server";
import { getUserId } from "@/src/lib/utils/get-user-id";
import { getTopics } from "@/src/features/topics";
import { createSummary, type Summary } from "@/src/features/summaries";
import { aiSummarize } from "@/src/lib/utils/ai-summarize";
import { filterDuplicate } from "@/src/lib/utils/filter-duplicate";
import type { HNHit } from "@/src/types/hacker-news";
import { SOURCES } from "@/src/constants/sources";

/** 登録しているトピックごとにニュースを取得し、AIで要約を生成してDBに保存する */
export async function GET() {
  try {
    // トピック一覧を取得
    const { userId } = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "認証されていません。" },
        { status: 401 },
      );
    }

    const topics = await getTopics(userId);

    if (!topics || topics.length === 0) {
      return NextResponse.json(
        { message: "トピックが登録されていません。" },
        { status: 200 },
      );
    }

    // 各トピックごとの処理を並列で実行
    await Promise.all(
      topics.map(async (topic) => {
        try {
          // AlgoliaでHackerNewsAPIをコールする
          const res = await fetch(
            `${SOURCES.HACKER_NEWS.API_URL}/search_by_date?tags=story&query=${encodeURIComponent(topic.name)}&numericFilters=points>100`,
          );

          if (!res.ok) {
            console.error(
              `[HN API Error] Topic: ${topic.name}, Status: ${res.status}`,
            );
            return;
          }
          const data = await res.json();

          // 既に保存されているoriginalIDと重複する記事は除外する
          const filteredHits = await filterDuplicate<HNHit>(
            data.hits,
            userId,
            "objectID",
          );

          // APIのトークン節約のために2件に絞る。ひもじい
          const truncatedData = filteredHits?.slice(0, 2) || [];

          if (truncatedData.length === 0) {
            console.log(
              `[HN API Info] Topic: ${topic.name}, No new articles found.`,
            );
            return;
          }

          // AIでサマリ作成
          const aiSummary = await aiSummarize(
            truncatedData,
            SOURCES.HACKER_NEWS.ID,
          );

          // 生成したサマリをデータベースに保存
          if (aiSummary && Array.isArray(aiSummary)) {
            await Promise.all(
              aiSummary.map((item: Summary) =>
                createSummary({
                  ...item,
                  userId,
                  topicId: topic.id,
                }),
              ),
            );
          }
        } catch (error) {
          console.error(`[Topic Processing Error] Topic: ${topic.name}`, error);
        }
      }),
    );

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    console.error("[Fatal Route Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
