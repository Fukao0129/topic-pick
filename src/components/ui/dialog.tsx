"use client";

import { useImperativeHandle, useRef } from "react";

export type DialogHandle = {
  open: () => void;
  close: () => void;
};

/** ダイアログコンポーネント
 * @param children - ダイアログ内のコンテンツ
 * @param ref - ダイアログの操作用ref
 */
export function Dialog({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref?: React.Ref<DialogHandle>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  /** 背景クリックで閉じる */
  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleOutsideClick}
      className="backdrop:bg-black/50 rounded-md shadow-lg fixed inset-0 m-auto"
    >
      {children}
    </dialog>
  );
}

/** 呼び出し用カスタムフック */
export function useDialog() {
  const dialogRef = useRef<DialogHandle>(null);
  const openDialog = () => dialogRef.current?.open();
  const closeDialog = () => dialogRef.current?.close();

  return { dialogRef, openDialog, closeDialog };
}
