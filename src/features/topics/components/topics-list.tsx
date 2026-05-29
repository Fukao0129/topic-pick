"use client";

import { DeleteTopics } from "./delete";
import { Text } from "@/src/components/ui/text";
import { Icon } from "@/src/components/ui/icon";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import {
  useTopicDragAndDrop,
  type TopicProps,
} from "../hooks/use-topic-drag-and-drop";

/**
 * トピックの並び順変更や削除を行うリストコンポーネント
 *
 * @params {TopicProps[]} initialTopics - 初期表示するトピックのリスト
 */
export const TopicsList = ({
  initialTopics,
}: {
  initialTopics: TopicProps[];
}) => {
  const { optimisticTopics, dragStart, dragEnter, dragOver, drop } =
    useTopicDragAndDrop(initialTopics);

  return (
    <ul>
      {optimisticTopics.map((topic, index) => (
        <li
          key={topic.id}
          draggable
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragOver={dragOver}
          onDrop={drop}
          className={`flex items-center justify-between py-3 cursor-grab active:cursor-grabbing ${index !== optimisticTopics.length - 1 ? "border-b border-secondary-subtle" : ""}`}
        >
          <div className="flex items-center gap-3">
            <Icon icon={faGripVertical} color="secondary" size="small" />
            <Text>{topic.name}</Text>
          </div>
          <DeleteTopics id={topic.id} />
        </li>
      ))}
    </ul>
  );
};
