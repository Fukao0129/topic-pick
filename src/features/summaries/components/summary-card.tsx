import Link from "next/link";
import { Text } from "@/src/components/ui/text";
import { Card } from "@/src/components/ui/card";
import { Dayjs } from "@/src/lib/dayjs";
import { DeleteSummary } from "../components/delete";
import { FavoriteSummary } from "../components/favorite";
import type { Summary } from "../types/summary";

export function SummaryCard({ summary }: { summary: Summary }) {
  return (
    <Card className="p-4">
      <Text>{summary.mainText}</Text>
      {summary.url && (
        <Link
          href={summary.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 break-all text-sm"
        >
          {summary.url}
        </Link>
      )}
      <Text size="xs" color="secondary">
        {Dayjs.tz(summary.createdAt).fromNow()}
      </Text>
      <FavoriteSummary id={summary.id} favorite={summary.favorite} />
      <DeleteSummary id={summary.id} />
    </Card>
  );
}
