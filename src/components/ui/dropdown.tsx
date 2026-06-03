"use client";

import { useState } from "react";
import { Card } from "@/src/components/ui/card";

/** ドロップダウンコンポーネント
 * @param trigger - ドロップダウンを開くためのトリガー
 * @param menu - ドロップダウンの内容
 */
export function Dropdown({
  trigger,
  menu,
}: {
  trigger: React.ReactNode;
  menu: React.ReactNode;
}) {
  const [dropdown, setDropdown] = useState(false);

  /** Escキーでドロップダウンを閉じる */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setDropdown(false);
    }
  };

  return (
    <>
      {/** オーバーレイ */}
      {dropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdown(false)}
          onKeyDown={handleKeyDown}
        />
      )}

      <div className="relative z-50">
        {/** トリガー */}
        <span
          className="cursor-pointer"
          tabIndex={0}
          onClick={() => setDropdown((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setDropdown((prev) => !prev);
            }
          }}
        >
          {trigger}
        </span>

        {/** ドロップダウンメニュー */}
        {dropdown && <Card className="absolute right-0 mt-2">{menu}</Card>}
      </div>
    </>
  );
}
