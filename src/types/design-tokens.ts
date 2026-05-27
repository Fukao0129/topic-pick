/** 各種デザイントークンにenum型を定義する */

// カラー
export const COLOR_TOKENS = [
  "primary", // メインカラー
  "foreground",
  "secondary", // 補助テキストカラー
  "info", // 情報
  "success", // 成功
  "warning", // 警告
  "error", // エラー
  "white", // 白
] as const;
export type ColorTokens = (typeof COLOR_TOKENS)[number];

// テキストサイズ
export const TEXT_SIZE_TOKENS = [
  "xs",
  "small",
  "default",
  "large",
  "xl",
] as const;
export type TextSizeTokens = (typeof TEXT_SIZE_TOKENS)[number];

// テキストの配置
export const TEXT_ALIGN_TOKENS = [
  "left",
  "center",
  "right",
  "justify",
] as const;
export type TextAlignTokens = (typeof TEXT_ALIGN_TOKENS)[number];

// ボタンの種類
export const BUTTON_VARIANT_TOKENS = ["filled", "outlined"] as const;
export type ButtonVariantTokens = (typeof BUTTON_VARIANT_TOKENS)[number];

// ボタンのサイズ
export const BUTTON_SIZE_TOKENS = ["lg", "md", "sm", "xs"] as const;
export type ButtonSizeTokens = (typeof BUTTON_SIZE_TOKENS)[number];
