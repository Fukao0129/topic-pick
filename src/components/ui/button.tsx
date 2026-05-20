"use client";

import { useFormStatus } from "react-dom";

import type {
  ColorTokens,
  ButtonVariantTokens,
  ButtonSizeTokens,
} from "@/src/types/design-tokens";

/** サイズのpropsをTailwaindのクラスに変換する */
const sizeClasses: Record<ButtonSizeTokens, string> = {
  lg: "px-6 py-3 text-lg",
  md: "px-4 py-2 text-base",
  sm: "px-3 py-1.5 text-sm",
  xs: "px-2 py-1 text-xs",
};

/** 種別と色のpropsをTailwaindのクラスに変換する */
const variantClasses: Record<
  ButtonVariantTokens,
  Record<ColorTokens, string>
> = {
  filled: {
    primary: "bg-primary text-white border-transparent hover:bg-primary-strong",
    foreground: "bg-foreground text-white border-transparent hover:opacity-80",
    secondary: "bg-secondary text-white border-transparent hover:opacity-80",
    info: "bg-info text-white border-transparent hover:opacity-80",
    warning: "bg-warning text-white border-transparent hover:opacity-80",
    error: "bg-danger text-white border-transparent hover:opacity-80",
  },
  outlined: {
    primary: "bg-white text-primary border-primary hover:bg-primary/10",
    foreground:
      "bg-white text-foreground border-foreground hover:bg-foreground/10",
    secondary: "bg-white text-secondary border-secondary hover:bg-secondary/10",
    info: "bg-white text-info border-info hover:bg-info/10",
    warning: "bg-white text-warning border-warning hover:bg-warning/10",
    error: "bg-white text-danger border-danger hover:bg-danger/10",
  },
};

export function Button({
  type = "button",
  className = "",
  color = "primary",
  variant = "filled",
  size = "md",
  children,
  ...props
}: React.ComponentProps<"button"> & {
  color?: ColorTokens;
  variant?: ButtonVariantTokens;
  size?: ButtonSizeTokens;
}) {
  const { pending } = useFormStatus();
  const isDisabled = props.disabled || pending;
  const baseClass =
    "inline-flex items-center justify-center rounded border cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      className={`${baseClass} ${sizeClasses[size]} ${variantClasses[variant][color]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {pending ? "Loading..." : children}
    </button>
  );
}
