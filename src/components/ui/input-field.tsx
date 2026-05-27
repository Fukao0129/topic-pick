"use client";

import { Text } from "@/src/components/ui/text";

/** 入力フィールドコンポーネント
 * @param type inputタグのtype属性
 * @param className 追加のクラス名
 * @param label ラベルテキスト
 * @param errorMessage エラーメッセージ
 * @param ref 入力フィールドの参照
 * @param props その他のinputタグ属性
 */
export function InputField({
  type = "text",
  className = "",
  label = "",
  errorMessage = "",
  ref,
  ...props
}: React.ComponentProps<"input"> & { errorMessage?: string; label?: string }) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Text color="secondary" size="xs" className="mb-1">
          {label}
        </Text>
      )}
      <input
        ref={ref}
        type={type}
        className={`p-2 rounded border bg-white w-full ${errorMessage ? "border-danger" : "border-secondary-subtle"}`}
        {...props}
      />
      {errorMessage ? (
        <Text color="error" size="xs" bold className="mt-1">
          {errorMessage}
        </Text>
      ) : (
        <Text size="xs" className="mt-1">
          {`\u00A0`}
        </Text>
      )}
    </div>
  );
}
