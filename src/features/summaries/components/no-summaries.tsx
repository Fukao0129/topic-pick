import { Text } from "@/src/components/ui/text";

/** サマリが存在しない場合の表示 */
export function NoSummaries() {
  return (
    <Text color="secondary" className="italic">
      サマリはありません。
    </Text>
  );
}
