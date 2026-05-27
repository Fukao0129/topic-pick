"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ColorTokens, TextSizeTokens } from "@/src/types/design-tokens";

/** 色のpropsをTailwaindのクラスに変換する */
const colorClasses: Record<ColorTokens, string> = {
  primary: "text-primary",
  foreground: "text-foreground",
  secondary: "text-secondary",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
  white: "text-white",
};

/** サイズのpropsをTailwaindのクラスに変換する */
const sizeClasses: Record<TextSizeTokens, string> = {
  xs: "text-xs",
  small: "text-sm",
  default: "text-md",
  large: "text-lg",
  xl: "text-xl",
};

/** アイコンコンポーネント
 * @param icon - 表示するアイコン
 * @param clickable - クリック可能かどうか
 * @param color - アイコンの色
 * @param size - アイコンのサイズ
 * @param className - 追加のクラス名
 * @param onClick - クリック時のハンドラ
 */
export function Icon({
  icon,
  clickable = false,
  color = "secondary",
  size = "default",
  className = "",
  onClick,
}: {
  icon: IconProp;
  clickable?: boolean;
  color?: ColorTokens;
  size?: TextSizeTokens;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${clickable ? "cursor-pointer" : ""} ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
      tabIndex={clickable ? 0 : -1}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick?.();
        }
      }}
    />
  );
}
