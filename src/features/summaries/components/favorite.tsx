"use client";

import { updateSummaryFavoriteAction } from "../actions/update";
import { Icon } from "@/src/components/ui/icon";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const FavoriteSummary = ({
  id,
  favorite,
}: {
  id: number;
  favorite: boolean;
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleClick = async () => {
    await updateSummaryFavoriteAction(id, !isFavorite);
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Icon
        icon={faStar}
        clickable
        color={isFavorite ? "warning" : "secondary"}
        size="small"
        onClick={handleClick}
      />
    </>
  );
};
