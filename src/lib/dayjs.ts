import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale(ja);
dayjs.tz.setDefault("Asia/Tokyo");

export const Dayjs = dayjs;
