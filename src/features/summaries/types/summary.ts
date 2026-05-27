import { Prisma } from "@/prisma/generated/client";

/** サマリ一覧 */
export type Summary = Prisma.SummaryGetPayload<{
  include: { topic: true };
}>;

/** トピックごとにグループ化されたサマリ */
export type GroupedSummary = {
  topic: Pick<Summary["topic"], "id" | "name">;
  summaries: Summary[];
};
