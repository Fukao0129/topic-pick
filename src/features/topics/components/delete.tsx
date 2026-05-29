"use client";

import { deleteTopicAction } from "../actions/delete";
import { Icon } from "@/src/components/ui/icon";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/src/lib/utils/handle-error";
import { ConfirmDialog } from "@/src/components/confirm-dialog";

/** トピック削除ボタン
 * @param id - トピックID
 */
export const DeleteTopics = ({ id }: { id: number }) => {
  const { showSnackbar } = useSnackbar();

  /** 削除ボタンのクリックハンドラ */
  const handleDelete = async () => {
    try {
      await deleteTopicAction(id);
      showSnackbar("トピックを削除しました", "success");
    } catch (error) {
      const message = handleError(error);
      showSnackbar(message, "error");
    }
  };

  return (
    <ConfirmDialog
      text="このトピックに関するサマリも全て削除されます。本当に削除しますか？"
      label="削除"
      onConfirm={handleDelete}
    >
      {/* 削除アイコン */}
      <Icon icon={faTrash} clickable size="small" color="error" />
    </ConfirmDialog>
  );
};
