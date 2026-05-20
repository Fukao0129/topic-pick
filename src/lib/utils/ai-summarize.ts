import { GoogleGenAI } from "@google/genai";
import type { HNHit } from "@/src/types/hacker-news";
import type { QiitaResponse } from "@/src/types/qiita";
import { SOURCES } from "@/src/constants/sources";
import { qiita } from "@/src/lib/prompts/qiita";
import { hackerNews } from "@/src/lib/prompts/hacker-news";

const ai = new GoogleGenAI({});
const model = "gemini-3-flash-preview";

/** 取得したニュースをAIに要約させる
 * @param data ニュースのデータ
 * @returns AIが要約したニュースのデータ
 */
export const aiSummarize = async <T extends HNHit[] | QiitaResponse[]>(
  data: T,
  sourceId: number,
) => {
  // ソースによってプロンプトを分ける
  const { sourceName, originalIdKey, mainTextPrompt } = (() => {
    switch (sourceId) {
      case SOURCES.HACKER_NEWS.ID:
        return hackerNews;
      case SOURCES.QIITA.ID:
        return qiita;
      default:
        throw new Error("Unsupported sourceId");
    }
  })();

  const prompt = `
  以下は${sourceName} APIで取得したニュースの一覧です。
  各データを加工してJSON形式で返却してください。

  ${JSON.stringify(data)}

  想定されるJSONの型は以下の通りです。
  TypeScriptで使用するので、その前提で組み立ててください。
    {
      originalID : string | null
      mainText : string | null
      url : string | null
    }[]

  originalIDは、元データの${originalIdKey}をそのまま返却してください。
  urlはそのまま返却してください。
  それぞれ、元データが無ければnullを返却してください。

  mainTextは以下のようにしてください。
  ${mainTextPrompt}

  返却するのは上記のJSONのみにしてください。
  それ以外のテキストやコメントなどは一切不要です。
  JSONをMarkdown形式のバッククォートで囲うことも禁止します。

  
  なお、元データが空配列またはnullなどの場合は、空の配列を返却してください。
  `;

  const result = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  console.log(result);

  if (!result.text) return [];

  return JSON.parse(result.text);
};
