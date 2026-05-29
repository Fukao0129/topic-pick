import { useOptimistic, startTransition, useRef } from "react";
import { updateTopicsOrderAction } from "../actions/update-order";
import { useSnackbar } from "@/src/components/ui/snackbar";

export type TopicProps = {
  id: number;
  name: string;
  order: number;
};

/**
 * トピックのドラッグ＆ドロップに関する処理と状態を管理するカスタムフック
 * @param {TopicProps[]} initialTopics - 初期表示するトピックのリスト
 */
export const useTopicDragAndDrop = (initialTopics: TopicProps[]) => {
  const { showSnackbar } = useSnackbar();

  const [optimisticTopics, setOptimisticTopics] = useOptimistic(
    initialTopics,
    (_state, newTopics: TopicProps[]) => newTopics,
  );

  // 操作対象のトピックのインデックス
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  /** ──────────────────────────────────────────────
   * ドラッグ開始時の処理
   * @param {React.DragEvent<HTMLLIElement>} e - ドラッグイベント
   * @param {number} index - ドラッグ要素のインデックス
   ────────────────────────────────────────────── */
  const dragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = "move";
  };

  /** ──────────────────────────────────────────────
   * ドラッグしている要素がドロップ領域に入った時の処理
   * @param {React.DragEvent<HTMLLIElement>} e - ドラッグイベント
   * @param {number} index - ホバー中の要素のインデックス
   ────────────────────────────────────────────── */
  const dragEnter = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    dragOverItem.current = index;
    e.preventDefault();
  };

  /** ──────────────────────────────────────────────
   * ドラッグ要素が乗っている間の処理
   * @param {React.DragEvent<HTMLLIElement>} e - ドラッグイベント
   ────────────────────────────────────────────── */
  const dragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  /** ──────────────────────────────────────────────
   * ドロップ完了時の要素並び替え処理とサーバーへの反映
   * @param {React.DragEvent<HTMLLIElement>} e - ドラッグイベント
   ────────────────────────────────────────────── */
  const drop = async (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;

    const newTopics = [...optimisticTopics];
    const [draggedTopic] = newTopics.splice(dragItem.current, 1);
    newTopics.splice(dragOverItem.current, 0, draggedTopic);

    // 操作対象をリセット
    dragItem.current = null;
    dragOverItem.current = null;

    // UI更新、ServerActions実行
    startTransition(async () => {
      setOptimisticTopics(newTopics);

      const topicIds = newTopics.map((t) => t.id);
      const res = await updateTopicsOrderAction(topicIds);

      if (res?.type === "success") {
        showSnackbar(res?.text || "並び順を更新しました", "success");
      } else {
        showSnackbar(res?.text || "並び順の更新に失敗しました", "error");
      }
    });
  };

  return {
    optimisticTopics,
    dragStart,
    dragEnter,
    dragOver,
    drop,
  };
};
