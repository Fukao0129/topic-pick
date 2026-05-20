import { getTopics } from "../services/get";
import { DeleteTopics } from "./delete";
import { NoTopics } from "./no-topics";
import { requireAuth } from "@/src/lib/utils/require-auth";
import { Card } from "@/src/components/ui/card";
import { Text } from "@/src/components/ui/text";

export const Topics = async () => {
  const userId = await requireAuth();

  /** トピック一覧取得 */
  const topics = await getTopics(userId);

  return (
    <Card className="p-6">
      <ul>
        {topics.length > 0 ? (
          topics.map((topic, index) => (
            <li
              key={topic.id}
              className={`flex items-center justify-between py-3 ${index !== topics.length - 1 ? "border-b border-secondary-subtle" : ""}`}
            >
              <Text>{topic.name}</Text>
              <DeleteTopics id={topic.id} />
            </li>
          ))
        ) : (
          <NoTopics />
        )}
      </ul>
    </Card>
  );
};
