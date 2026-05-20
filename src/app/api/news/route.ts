import { NextResponse } from "next/server";
import { getUserId } from "@/src/lib/utils/get-user-id";
import { getTopics } from "@/src/features/topics";
import { createSummary } from "@/src/features/summaries";
import { sourceFetchers } from "@/src/lib/sources";
import type { SourceFetcher } from "@/src/lib/sources";
import { getUserSources } from "@/src/features/sources";

/** 登録しているトピックごとに全ソースからニュースを取得し、AIで要約を生成してDBに保存する */
export async function GET() {
  try {
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

    // ユーザーの設定したソースを取得
    const userSources = await getUserSources(userId);

    // 設定されたソースIDに対応するフェッチャーを抽出
    const activeFetchers = userSources
      .map((source) => sourceFetchers[source.id])
      .filter((fetcher): fetcher is SourceFetcher => !!fetcher);

    // 各トピック × 設定されたソースを並列実行してサマリを収集
    const allSummaries = await Promise.all(
      topics.flatMap((topic) =>
        activeFetchers.map((fetcher) => fetcher(topic, userId)),
      ),
    );

    // 全サマリをまとめてDB保存
    await Promise.all(allSummaries.flat().map((item) => createSummary(item)));

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    console.error("[Fatal Route Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
