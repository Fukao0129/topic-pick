"use client";

import { deleteTopicAction } from "../actions/delete";
import { Icon } from "@/src/components/ui/icon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const DeleteTopics = ({ id }: { id: number }) => {
  const handleClick = async () => {
    if (
      confirm(
        "このトピックに関するサマリも全て削除されます。本当に削除しますか？",
      )
    ) {
      await deleteTopicAction(id);
    }
  };

  return (
    <Icon
      icon={faTrash}
      clickable
      size="small"
      color="error"
      onClick={handleClick}
    />
  );
};
