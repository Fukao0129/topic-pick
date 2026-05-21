import Link from "next/link";
import { Text } from "@/src/components/ui/text";
import { Card } from "@/src/components/ui/card";
import { Dayjs } from "@/src/lib/dayjs";
import { DeleteSummary } from "../components/delete";
import { FavoriteSummary } from "../components/favorite";
import type { Summary } from "../types/summary";

export function SummaryCard({ summary }: { summary: Summary }) {
  return (
    <Card className="p-4 flex flex-col gap-2">
      {/** メインテキスト  */}
      <Text>{summary.mainText}</Text>

      {/** URL  */}
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

      {/** 作成日時  */}
      <Text size="xs" color="secondary">
        {Dayjs.tz(summary.createdAt).fromNow()}
      </Text>

      {/** 操作ボタン  */}
      <div className="flex justify-end items-center gap-1">
        <FavoriteSummary id={summary.id} favorite={summary.favorite} />
        <DeleteSummary id={summary.id} />
      </div>
    </Card>
  );
}
