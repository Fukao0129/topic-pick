import { SOURCES } from "@/src/constants/sources";

const sourceName = SOURCES.QIITA.NAME;
const originalIdKey = "id";
const mainTextPrompt = `元データのtitle、body を使って作成します。
  titleは記事のタイトル、bodyは記事の本文です。
  これらを総合的に判断し、50文字～100文字の日本語のテキストを作ってください。
  テキストには、記事のタイトルと本文を読んであなたが感じた重要なポイントや要点を含めてください。
  ただ本文を要約するだけではなく、情報に深みを持たせるように、記事の内容が持つ影響、背景、社会的意義なども考慮してください。`;

export const qiita = {
  sourceName,
  originalIdKey,
  mainTextPrompt,
};
