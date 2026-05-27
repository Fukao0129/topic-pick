import { Dayjs } from "@/src/lib/dayjs";

/** クエリパラメータから日付を取得する処理
 * @param searchParams クエリパラメータ
 * @returns date 日付文字列
 */
export async function resolveDateParams({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // クエリパラメータから日付を取得する
  const resolvedSearchParams = await searchParams;
  const dateParam =
    typeof resolvedSearchParams.date === "string"
      ? resolvedSearchParams.date
      : undefined;

  // 形式チェック
  const date =
    dateParam && isValidDateParam(dateParam)
      ? dateParam
      : Dayjs.tz().format("YYYY-MM-DD"); // デフォルトは現在の日付

  return date;
}

/** クエリパラメータの日付文字列が有効な形式かどうかを検証する
 * @param date 日付文字列
 * @returns YYYY-MM-DD 形式かつ有効な日付であれば true
 */
const isValidDateParam = (date: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  return Dayjs(date, "YYYY-MM-DD", true).isValid();
};
