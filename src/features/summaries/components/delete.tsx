"use client";

import { deleteSummaryAction } from "../actions/delete";
import { Icon } from "@/src/components/ui/icon";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/src/lib/utils/handle-error";
import { ConfirmDialog } from "@/src/components/confirm-dialog";

/** サマリ削除ボタン
 * @param id サマリID
 */
export const DeleteSummary = ({ id }: { id: number }) => {
  const { showSnackbar } = useSnackbar();

  /** 削除ボタンのクリックハンドラ */
  const handleClick = async () => {
    try {
      await deleteSummaryAction(id);
      showSnackbar("サマリを削除しました", "success");
    } catch (error) {
      const message = handleError(error);
      showSnackbar(message, "error");
    }
  };

  return (
    <ConfirmDialog
      text="このサマリを削除しますか？"
      label="削除"
      onConfirm={handleClick}
    >
      {/* 削除アイコン */}
      <Icon icon={faTrash} clickable size="small" />
    </ConfirmDialog>
  );
};
