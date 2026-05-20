/** Server Actions で useActionState と組み合わせて使う共通の状態型 */
export type ActionState = {
  type: "success" | "error";
  text: string;
  values?: string; // バリデーションチェックでエラーになったとき、リセットされないように現在の値を返す
} | null;
