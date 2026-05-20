import { Dayjs } from "@/src/lib/dayjs";

/** 日付文字列を、日付の開始日時と終了日時に変換する
 * @param date 日付文字列 (yyyy-mm-dd)
 * @returns {startDate: Date, endDate: Date}
 */
export const convertDate = (
  date?: string,
): { startDate: Date; endDate: Date } => {
  const startDate = Dayjs.tz(date).startOf("day").toDate();
  const endDate = Dayjs.tz(date).endOf("day").toDate();

  return {
    startDate,
    endDate,
  };
};
