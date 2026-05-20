// export type HNSearchResponse = {
//   hits: HNHit[]; // 検索結果の配列
//   nbHits: number; // ヒットした総件数
//   page: number; // 現在のページ番号（0始まり）
//   nbPages: number; // 総ページ数
//   hitsPerPage: number; // 1ページあたりの件数
//   processingTimeMS: number; // 処理時間
//   query: string; // 検索クエリ
//   params: string; // 使用された検索パラメータ
// };

export type HNHit = {
  created_at: string; // 作成日時 (ISO 8601)
  title: string | null; // タイトル（Storyの場合）
  url: string | null; // URL（Storyの場合）
  author: string; // 投稿者
  points: number | null; // ポイント数
  story_text: string | null; // 記事本文
  comment_text: string | null; // コメント本文
  num_comments: number | null; // コメント数
  story_id: number | null; // 親記事のID
  story_title: string | null; // 親記事のタイトル
  story_url: string | null; // 親記事のURL
  parent_id: number | null; // 親コメントのID
  created_at_i: number; // 作成日時のUnixタイムスタンプ
  _tags: string[]; // タグ（"story", "comment", "author_xxx" など）
  objectID: string; // AlgoliaのユニークID（HNのアイテムIDと一致）
};
