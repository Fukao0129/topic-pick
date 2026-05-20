import Link from "next/link";
import { Text } from "@/src/components/ui/text";
import { Dayjs } from "@/src/lib/dayjs";
import { Icon } from "@/src/components/ui/icon";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export function Pagination({ currentDate }: { currentDate: string }) {
  const prevDate = Dayjs.tz(currentDate)
    .subtract(1, "day")
    .format("YYYY-MM-DD");
  const nextDate = Dayjs.tz(currentDate).add(1, "day").format("YYYY-MM-DD");

  return (
    <div
      className={`flex items-center justify-between py-4 border-b border-gray-200`}
    >
      {/** 前日へのリンク */}
      <Link
        href={`/?date=${prevDate}`}
        className="flex items-center gap-2 hover:opacity-70 transition-opacity text-gray-600"
      >
        <Icon icon={faChevronLeft} color="secondary" />
        <Text size="small" color="secondary" className="hidden sm:inline">
          {Dayjs.tz(prevDate).format("M月D日")}
        </Text>
      </Link>

      {/** 表示中の日付 */}
      <Text bold>{Dayjs.tz(currentDate).format("YYYY年M月D日")}</Text>

      {/** 翌日へのリンク */}
      <Link
        href={`/?date=${nextDate}`}
        className="flex items-center gap-2 hover:opacity-70 transition-opacity text-gray-600"
      >
        <Text size="small" color="secondary" className="hidden sm:inline">
          {Dayjs.tz(nextDate).format("M月D日")}
        </Text>
        <Icon icon={faChevronRight} color="secondary" />
      </Link>
    </div>
  );
}
