import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const model = "gemini-3-flash-preview";

/** 最大トークン数 */
const MAX_TOKEN_LIMIT = 50000;

/** 取得したニュースをAIに要約させる
 * @param data ニュースのデータ
 * @param promptText 要約の指示内容
 * @returns AIが要約したニュースのデータ
 */
export const aiSummarize = async (
  data: ({ title: string | null } & Record<string, unknown>)[],
  promptText: string,
): Promise<string[]> => {
  const prompt = `
  以下は外部APIで取得したニュースの一覧です。
  各データを加工してJSON形式で返却してください。

  ${JSON.stringify(data)}

  想定される出力の型は文字列の配列 ( string[] ) です。
  TypeScriptで使用するので、その前提で組み立ててください。

  返却する配列の各要素は、元の配列の順序と対応するように作成してください。
  要素の文字列の内容は以下のようにしてください。
  ${promptText}

  返却するのは上記の配列のみにしてください。
  それ以外のテキストやコメントなどは一切不要です。
  Markdown形式のバッククォートで囲うことも禁止します。

  
  なお、元データが空配列またはnullなどの場合は、空の配列を返却してください。
  `;

  // トークン数がヤバかったら中断する
  const countResult = await ai.models.countTokens({
    model,
    contents: prompt,
  });
  if (countResult.totalTokens && countResult.totalTokens > MAX_TOKEN_LIMIT) {
    console.warn(
      `トークン数が想定を超えているため、APIリクエストを中断しました。(${countResult.totalTokens} > ${MAX_TOKEN_LIMIT})`,
    );
    return data.map((item) => `【原文】${item.title}`);
  }

  // Gemini様お願いします
  try {
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    if (!result.text) return data.map((item) => `【原文】${item.title}`);

    return JSON.parse(result.text);
  } catch (error) {
    console.error("Gemini API error:", error);
    return data.map((item) => `【原文】${item.title}`);
  }
};
