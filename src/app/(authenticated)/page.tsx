import {
  Pagination,
  getSummaries,
  groupingSummary,
  SummaryGroups,
  convertDate,
  resolveDateParams,
} from "@/src/features/summaries";
import { requireAuth } from "@/src/lib/utils/require-auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userId = await requireAuth();

  // クエリパラメータから日付を取得する
  const date = await resolveDateParams({ searchParams });

  const { startDate, endDate } = convertDate(date);

  // サマリを取得してトピックごとにグループ化する
  const summaries = await getSummaries(startDate, endDate, userId);
  const groupedSummaries = groupingSummary(summaries);

  return (
    <div className="flex flex-col gap-6">
      <Pagination currentDate={date} />
      <SummaryGroups groupedSummaries={groupedSummaries} />
    </div>
  );
}
