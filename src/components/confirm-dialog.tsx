"use client";

import { Dialog, useDialog } from "@/src/components/ui/dialog"; // useDialogをここでimport
import { Button } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";

/** * 確認ダイアログ
 * @param children - ダイアログを開くためのトリガー要素（アイコンやボタンなど）
 * @param text - ダイアログに表示するテキスト
 * @param label - 確認ボタンに表示するラベル
 * @param onConfirm - 確認ボタンがクリックされたときの処理
 */
export function ConfirmDialog({
  children,
  text,
  label,
  onConfirm,
}: {
  children: React.ReactNode;
  text: string;
  label: string;
  onConfirm: () => void;
}) {
  const { dialogRef, openDialog, closeDialog } = useDialog();

  /** 確認ボタンがクリックされたら処理を実行し、ダイアログを閉じる */
  const handleConfirm = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <>
      {/** トリガーとなる要素 */}
      <span className="contents" onClick={openDialog}>
        {children}
      </span>

      <Dialog ref={dialogRef}>
        <div className="p-6">
          <Text>{text}</Text>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={closeDialog} size="sm" color="secondary">
              キャンセル
            </Button>
            <Button onClick={handleConfirm} size="sm" color="error">
              {label}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
