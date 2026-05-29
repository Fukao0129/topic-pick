/**
 * エラーオブジェクトからエラーメッセージを取得する
 * @param error catchで取得するエラーオブジェクト
 * @returns エラーメッセージ
 */
export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "予期しないエラーが発生しました";
};
