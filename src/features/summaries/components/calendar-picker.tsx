"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dayjs } from "@/src/lib/dayjs";
import { Icon } from "@/src/components/ui/icon";
import { Text } from "@/src/components/ui/text";
import {
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export function CalendarPicker({ currentDate }: { currentDate: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => Dayjs.tz(currentDate));
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ツールチップ外のクリック検知
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  /** 開閉処理 */
  const toggleOpen = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    if (nextIsOpen) {
      setViewDate(Dayjs.tz(currentDate));
    }
  };

  /** 日付選択時の処理 */
  const handleSelectDate = (date: string) => {
    setIsOpen(false);
    router.push(`/?date=${date}`);
  };

  /** 月変更時の処理 */
  const changeMonth = (diff: number) => {
    setViewDate((prev) => prev.add(diff, "month"));
  };

  /** カレンダー生成 */
  const generateCalendar = () => {
    const startOfMonth = viewDate.startOf("month");
    const endOfMonth = viewDate.endOf("month");
    const startDate = startOfMonth.startOf("week"); // 日曜日開始
    const endDate = endOfMonth.endOf("week");

    const days = [];
    let day = startDate;
    while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
      days.push(day);
      day = day.add(1, "day");
    }
    return days;
  };

  const calendarDays = generateCalendar();
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/** 開閉用アイコン */}
      <Icon
        icon={faCalendarDays}
        color="secondary"
        clickable
        onClick={toggleOpen}
      />

      {/** カレンダー本体 */}
      {isOpen && (
        <div className="absolute -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border border-secondary-subtle p-4 w-64">
          {/** ヘッダー部分 */}
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
              title="前月"
            >
              <Icon icon={faChevronLeft} color="secondary" size="small" />
            </button>
            <Text bold>{viewDate.format("YYYY年M月")}</Text>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
              title="翌月"
            >
              <Icon icon={faChevronRight} color="secondary" size="small" />
            </button>
          </div>

          {/** 曜日部分 */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekDays.map((wd) => (
              <Text key={wd} size="xs" color="secondary" align="center">
                {wd}
              </Text>
            ))}
          </div>

          {/** 日付部分 */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, i) => {
              const isCurrentMonth = date.month() === viewDate.month();
              const isSelected =
                date.format("YYYY-MM-DD") ===
                Dayjs.tz(currentDate).format("YYYY-MM-DD");

              return (
                <button
                  key={`${date.format("YYYY-MM-DD")}-${i}`}
                  type="button"
                  onClick={() => handleSelectDate(date.format("YYYY-MM-DD"))}
                  className={`
                    p-1 text-sm rounded-full flex items-center justify-center w-8 h-8 mx-auto hover:bg-gray-100 transition-colors
                    ${
                      isSelected
                        ? "bg-primary text-white"
                        : !isCurrentMonth
                          ? "text-gray-300"
                          : "text-gray-700"
                    }
                  `}
                >
                  {date.date()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
