"use client";

import { useFormStatus } from "react-dom";

/**
 * チェックボックスコンポーネント
 * @param props - HTML input要素のプロパティ（typeはcheckbox固定なので除く）
 * @param props.label - チェックボックスのラベルテキスト
 */
export function Checkbox({
  className = "",
  label,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  label?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        className={`rounded border-secondary text-primary focus:ring-primary w-4 h-4 transition-colors ${className}`}
        disabled={pending}
        {...props}
      />
      {label && (
        <span className="text-foreground text-sm font-medium">{label}</span>
      )}
    </label>
  );
}
