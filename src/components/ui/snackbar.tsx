"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Icon } from "@/src/components/ui/icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/** ────────────────────────────────────────────────────
 * 型定義
 * ──────────────────────────────────────────────────── */
/** スナックバーの種別 */
type SnackbarType = "success" | "error";

/** スナックバーの表示状態 */
type SnackbarState = {
  message: string;
  type: SnackbarType;
  /** 連続表示時にタイマーをリセットするための識別子 */
  id: number;
} | null;

/** コンテキストの値 */
type SnackbarContextValue = {
  showSnackbar: (message: string, type: SnackbarType) => void;
};

/** ────────────────────────────────────────────────────
 * Context作成
 * ──────────────────────────────────────────────────── */
const SnackbarContext = createContext<SnackbarContextValue | undefined>(
  undefined,
);

/** スナックバーの表示時間（ミリ秒） */
const SNACKBAR_DURATION = 4000;

/** 種別のpropsをTailwaindのクラスに変換する */
const bgClasses: Record<SnackbarType, string> = {
  success: "bg-success",
  error: "bg-danger",
};

/** ────────────────────────────────────────────────────
 * スナックバーの UI コンポーネント
 *
 * @param message - 表示するメッセージ
 * @param type - スナックバーの種別（success / error）
 * @param onClose - 閉じるボタンが押されたときのハンドラ
 * ──────────────────────────────────────────────────── */
function Snackbar({
  message,
  type,
  onClose,
}: {
  message: string;
  type: SnackbarType;
  onClose: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg px-4 py-3 text-sm text-white shadow-lg ${bgClasses[type]}`}
    >
      <span>{message}</span>
      <Icon
        icon={faXmark}
        color="white"
        size="small"
        clickable
        onClick={onClose}
      />
    </div>
  );
}

/** ────────────────────────────────────────────────────
 * スナックバーの Provider コンポーネント
 *
 * @param children - 子コンポーネント
 * ──────────────────────────────────────────────────── */
export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>(null);

  /** スナックバーを表示する */
  const showSnackbar = useCallback((message: string, type: SnackbarType) => {
    setSnackbar({ message, type, id: Date.now() });
  }, []);

  /** スナックバーを閉じる */
  const closeSnackbar = useCallback(() => {
    setSnackbar(null);
  }, []);

  /** 一定時間で非表示にする */
  useEffect(() => {
    if (!snackbar) return;
    const timer = setTimeout(closeSnackbar, SNACKBAR_DURATION);
    return () => clearTimeout(timer);
  }, [snackbar, closeSnackbar]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <Snackbar
          key={snackbar.id}
          message={snackbar.message}
          type={snackbar.type}
          onClose={closeSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
}

/** ────────────────────────────────────────────────────
 * スナックバーを表示するためのカスタムフック
 *
 * @returns showSnackbar - スナックバーを表示する関数
 * ──────────────────────────────────────────────────── */
export function useSnackbar(): SnackbarContextValue {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar は SnackbarProvider の内側で使用してください");
  }
  return context;
}
