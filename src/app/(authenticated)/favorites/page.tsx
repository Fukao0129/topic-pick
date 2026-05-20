import {
  getFavoriteSummaries,
  groupingSummary,
  SummaryGroups,
} from "@/src/features/summaries";
import { Title } from "@/src/components/page-header/title";
import { requireAuth } from "@/src/lib/utils/require-auth";

const PAGE_TITLE = "お気に入り";

export const metadata = {
  title: `${PAGE_TITLE} | ${process.env.APP_NAME}`,
};

export default async function Home() {
  const userId = await requireAuth();

  /** サマリを取得してトピックごとにグループ化する */
  const summaries = await getFavoriteSummaries(userId);
  const groupedSummaries = groupingSummary(summaries);

  return (
    <div className="flex flex-col gap-6">
      <Title
        title={PAGE_TITLE}
        description="お気に入り登録したサマリ一覧です。"
      />
      <SummaryGroups groupedSummaries={groupedSummaries} />
    </div>
  );
}
