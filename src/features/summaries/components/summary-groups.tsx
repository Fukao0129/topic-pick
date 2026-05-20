import { SummaryTitle } from "./summary-title";
import { SummaryCard } from "./summary-card";
import { NoSummaries } from "./no-summaries";
import type { GroupedSummary } from "../types/summary";

export function SummaryGroups({
  groupedSummaries,
}: {
  groupedSummaries: GroupedSummary[];
}) {
  return (
    <div className="grid gap-8">
      {groupedSummaries.length > 0 ? (
        groupedSummaries.map((group) => (
          <section key={group.topic.id} className="grid gap-4">
            <SummaryTitle group={group} />

            <div className="grid gap-4">
              {group.summaries.length > 0 &&
                group.summaries.map((summary) => (
                  <SummaryCard key={summary.id} summary={summary} />
                ))}
            </div>
          </section>
        ))
      ) : (
        <NoSummaries />
      )}
    </div>
  );
}
