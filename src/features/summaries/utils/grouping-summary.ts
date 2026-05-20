import type { Summary, GroupedSummary } from "../types/summary";

/** サマリ一覧をトピックごとにグループ化する
 * @param summaries サマリ一覧
 * @returns トピックごとにグループ化されたサマリ一覧
 */
export const groupingSummary = (summaries: Summary[]) => {
  const groupedSummaries = summaries.reduce(
    (acc, summary) => {
      const topicId = summary.topicId;
      if (!acc[topicId]) {
        acc[topicId] = {
          topic: {
            id: topicId,
            name: summary.topic.name,
          },
          summaries: [],
        };
      }
      acc[topicId].summaries.push(summary);
      return acc;
    },
    {} as Record<string, GroupedSummary>,
  );
  return Object.values(groupedSummaries);
};
