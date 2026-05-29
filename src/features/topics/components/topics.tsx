import { getTopics } from "../services/get";
import { TopicsList } from "./topics-list";
import { requireAuth } from "@/src/lib/utils/require-auth";
import { Text } from "@/src/components/ui/text";
import { Card } from "@/src/components/ui/card";
import { NoTopics } from "./no-topics";
import { TOPIC_MAX } from "@/src/constants/index";

/** トピック一覧 */
export const Topics = async () => {
  const userId = await requireAuth();

  // トピック一覧取得
  const topics = await getTopics(userId);

  return (
    <>
      {/** トピック数の表示 */}
      <Text
        size="small"
        color="secondary"
        align="right"
        className="mb-2"
      >{`${topics.length}/${TOPIC_MAX}`}</Text>

      {/** トピック一覧 */}
      {topics.length > 0 ? (
        <Card className="py-3 px-6">
          <TopicsList initialTopics={topics} />
        </Card>
      ) : (
        <NoTopics />
      )}
    </>
  );
};
