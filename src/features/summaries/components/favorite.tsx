"use client";

import { updateSummaryFavoriteAction } from "../actions/update";
import { Icon } from "@/src/components/ui/icon";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { startTransition, useOptimistic } from "react";
import { handleError } from "@/src/lib/utils/handle-error";

/** サマリのお気に入りボタン
 * @param id サマリID
 * @param favorite お気に入り状態
 */
export const FavoriteSummary = ({
  id,
  favorite,
}: {
  id: number;
  favorite: boolean;
}) => {
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(favorite);
  const { showSnackbar } = useSnackbar();

  /** お気に入りボタンのクリックハンドラ */
  const handleClick = () => {
    startTransition(async () => {
      setOptimisticFavorite(!optimisticFavorite);
      try {
        await updateSummaryFavoriteAction(id, !optimisticFavorite);
      } catch (error) {
        const message = handleError(error);
        showSnackbar(message, "error");
      }
    });
  };

  return (
    <Icon
      icon={faStar}
      clickable
      color={optimisticFavorite ? "warning" : "secondary"}
      size="small"
      onClick={handleClick}
    />
  );
};
