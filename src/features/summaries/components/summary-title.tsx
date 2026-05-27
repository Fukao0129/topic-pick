import { Text } from "@/src/components/ui/text";
import type { GroupedSummary } from "../types/summary";

/** サマリグループのタイトル部分
 * @param group グループ化されたサマリデータ
 */
export function SummaryTitle({ group }: { group: GroupedSummary }) {
  return (
    <div className="flex items-baseline gap-1">
      <Text
        tag="h2"
        bold
        size="large"
        className="border-l-5 border-primary pl-2"
      >
        {group.topic.name}
      </Text>
      <Text size="xs" color="secondary">
        ( {group.summaries.length} 件 )
      </Text>
    </div>
  );
}
