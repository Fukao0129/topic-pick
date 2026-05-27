"use client";

import { deleteTopicAction } from "../actions/delete";
import { Icon } from "@/src/components/ui/icon";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

/** トピック削除ボタン */
export const DeleteTopics = ({ id }: { id: number }) => {
  const { showSnackbar } = useSnackbar();

  const handleClick = async () => {
    if (
      confirm(
        "このトピックに関するサマリも全て削除されます。本当に削除しますか？",
      )
    ) {
      try {
        await deleteTopicAction(id);
        showSnackbar("トピックを削除しました", "success");
      } catch {
        showSnackbar("削除に失敗しました", "error");
      }
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
