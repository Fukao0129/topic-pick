"use client";

import { deleteSummaryAction } from "../actions/delete";
import { Icon } from "@/src/components/ui/icon";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/src/lib/utils/handle-error";

/** サマリ削除ボタン
 * @param id サマリID
 */
export const DeleteSummary = ({ id }: { id: number }) => {
  const { showSnackbar } = useSnackbar();

  /** 削除ボタンのクリックハンドラ */
  const handleClick = async () => {
    if (confirm("このサマリを削除しますか？")) {
      try {
        await deleteSummaryAction(id);
        showSnackbar("サマリを削除しました", "success");
      } catch (error) {
        const message = handleError(error);
        showSnackbar(message, "error");
      }
    }
  };

  return <Icon icon={faTrash} clickable size="small" onClick={handleClick} />;
};
