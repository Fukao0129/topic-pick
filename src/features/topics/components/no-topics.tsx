import { Text } from "@/src/components/ui/text";

/** トピックが存在しない場合の表示 */
export function NoTopics() {
  return (
    <Text color="secondary" className="italic">
      トピックが登録されていません。
    </Text>
  );
}
