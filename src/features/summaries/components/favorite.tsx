"use client";

import { updateSummaryFavoriteAction } from "../actions/update";
import { Icon } from "@/src/components/ui/icon";
import { useSnackbar } from "@/src/components/ui/snackbar";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
  const [isFavorite, setIsFavorite] = useState(favorite);
  const { showSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      await updateSummaryFavoriteAction(id, !isFavorite);
      setIsFavorite(!isFavorite);
    } catch {
      showSnackbar("お気に入りの更新に失敗しました", "error");
    }
  };

  return (
    <Icon
      icon={faStar}
      clickable
      color={isFavorite ? "warning" : "secondary"}
      size="small"
      onClick={handleClick}
    />
  );
};
