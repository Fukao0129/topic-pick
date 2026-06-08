import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { getTopics } from "@/src/features/topics";
import { createSummary } from "@/src/features/summaries";
import { getUserSources } from "@/src/features/sources";
import { sourceFetchers, type SourceFetcher } from "@/src/lib/sources";

/** 登録しているトピックごとに全ソースからニュースを取得し、AIで要約を生成してDBに保存する */
export async function GET(request: Request) {
  // シークレットキー未定義の場合はシステムエラーを返す
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error(
      "[Security] CRON_SECRET is not set in environment variables.",
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  // シークレットキーが不正な場合は未認証エラーを返す
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { message: "認証されていません。" },
      { status: 401 },
    );
  }

  try {
    // 全ユーザーのIDを取得
    const users = await prisma.user.findMany({
      select: { id: true },
    });

    let successCount = 0;
    let errorCount = 0;

    // Rate Limit対策と不可分散のため、ユーザー単位では直列で処理を回す
    for (const user of users) {
      try {
        // ユーザーが登録しているトピック一覧を取得
        const topics = await getTopics(user.id);
        if (!topics || topics.length === 0) continue;

        // ユーザーが設定しているソースIDに対応するフェッチャーを抽出
        const userSources = await getUserSources(user.id);
        const activeFetchers = userSources
          .map((source) => sourceFetchers[source.id])
          .filter((fetcher): fetcher is SourceFetcher => !!fetcher);

        // 各トピック × 設定されたソースを並列実行してサマリを収集
        const allSummaries = await Promise.all(
          topics.flatMap((topic) =>
            activeFetchers.map((fetcher) => fetcher(topic, user.id)),
          ),
        );

        // 取得したサマリーをDBへ保存
        await Promise.all(
          allSummaries.flat().map((item) => createSummary(item)),
        );

        successCount++;
      } catch (userError) {
        // 特定のユーザーでエラーが起きても全体を止めず、ログに残して次のユーザーへ
        console.error(
          `[Cron Error] Failed to process user ${user.id}:`,
          userError,
        );
        errorCount++;
      }
    }

    return NextResponse.json(
      {
        message: "Cron job finished",
        details: {
          total: users.length,
          success: successCount,
          failed: errorCount,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Fatal Cron Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
