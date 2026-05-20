import { SOURCES } from "@/src/constants/sources";

const sourceName = SOURCES.HACKER_NEWS.NAME;
const originalIdKey = "objectID";
const mainTextPrompt = `元データのtitle、story_text、children を使って作成します。
  titleは記事のタイトル、story_textは記事の本文(存在しない場合もあります)、childrenは記事に対するコメントです。
  これらを総合的に判断し、50文字～100文字の日本語のテキストを作ってください。
  テキストには、記事のタイトルとコメント、(存在する場合は)本文を読んであなたが感じた重要なポイントや要点を含めてください。
  ただコメントを要約するだけではなく、情報に深みを持たせるように、記事の内容が持つ影響、背景、社会的意義なども考慮してください。`;

export const hackerNews = {
  sourceName,
  originalIdKey,
  mainTextPrompt,
};
