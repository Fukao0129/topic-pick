"use client";

import { deleteSummaryAction } from "../actions/delete";
import { Icon } from "@/src/components/ui/icon";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

/** サマリ削除ボタン
 * @param id サマリID
 */
export const DeleteSummary = ({ id }: { id: number }) => {
  const { showSnackbar } = useSnackbar();

  const handleClick = async () => {
    if (confirm("このサマリを削除しますか？")) {
      try {
        await deleteSummaryAction(id);
        showSnackbar("サマリを削除しました", "success");
      } catch {
        showSnackbar("削除に失敗しました", "error");
      }
    }
  };

  return <Icon icon={faTrash} clickable size="small" onClick={handleClick} />;
};
