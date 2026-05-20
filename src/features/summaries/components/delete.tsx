"use client";

import { deleteSummaryAction } from "../actions/delete";
import { Icon } from "@/src/components/ui/icon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const DeleteSummary = ({ id }: { id: number }) => {
  const handleClick = async () => {
    if (confirm("このサマリを削除しますか？")) {
      await deleteSummaryAction(id);
    }
  };

  return (
    <>
      <Icon icon={faTrash} clickable size="small" onClick={handleClick} />
    </>
  );
};
