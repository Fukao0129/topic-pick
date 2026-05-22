import { SummaryTitle } from "./summary-title";
import { SummaryCard } from "./summary-card";
import { NoSummaries } from "./no-summaries";
import { Icon } from "@/src/components/ui/icon";
import type { GroupedSummary } from "../types/summary";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export function SummaryGroups({
  groupedSummaries,
}: {
  groupedSummaries: GroupedSummary[];
}) {
  return (
    <div className="grid gap-8">
      {groupedSummaries.length > 0 ? (
        groupedSummaries.map((group) => (
          <details key={group.topic.id} className="group" open>
            {/** グループのタイトル */}
            <summary className="flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <SummaryTitle group={group} />
              <Icon
                icon={faAngleRight}
                className="group-open:rotate-90 transition-transform duration-200"
              />
            </summary>

            {/** サマリー */}
            <div className="grid gap-4 mt-4">
              {group.summaries.length > 0 &&
                group.summaries.map((summary) => (
                  <SummaryCard key={summary.id} summary={summary} />
                ))}
            </div>
          </details>
        ))
      ) : (
        <NoSummaries />
      )}
    </div>
  );
}
