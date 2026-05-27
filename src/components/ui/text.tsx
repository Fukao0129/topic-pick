import type {
  ColorTokens,
  TextSizeTokens,
  TextAlignTokens,
} from "@/src/types/design-tokens";

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

/** 配置のpropsをTailwaindのクラスに変換する */
const alignClasses: Record<TextAlignTokens, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/** テキストコンポーネント
 * @param color テキストの色
 * @param size テキストのサイズ
 * @param align テキストの配置
 * @param bold 太字にするかどうか
 * @param tag 使用するHTMLタグ
 * @param className 追加のクラス名
 * @param children テキストの内容
 */
export function Text({
  color = "foreground",
  size = "default",
  align = "left",
  bold = false,
  tag = "p",
  className = "",
  children,
}: {
  color?: ColorTokens;
  size?: TextSizeTokens;
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  align?: TextAlignTokens;
  bold?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = tag;
  return (
    <Tag
      className={`${colorClasses[color]} ${sizeClasses[size]} ${alignClasses[align]} ${bold ? "font-bold" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
