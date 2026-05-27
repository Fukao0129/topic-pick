---
name: add-feature
description: "機能の新規追加を行う際のガイドライン・規約。設計の提示や既存コンポーネントの再利用ルールの確認を含みます。新規機能を実装するよう指示された場合に使用してください。"
user-invocable: true
---

# Feature Addition Guidelines

## When to Use

- ユーザーから「新しい機能を追加して」「新しい画面を作って」などの新規実装を依頼された場合

## Core Principles

1. **規約の遵守 (Enforce Project Rules)**
   - 全体共通のアーキテクチャやコーディング規約（ディレクトリ構成、命名規則、技術スタック、Server Component の優先など）については、必ず `.github/copilot-instructions.md` に従ってください。
2. **設計ファースト (Design First)**
   - 実装を開始する前に、以下の設計方針を提示し、ユーザーの承認を得てください。
     - どの `features/` ディレクトリにコードを配置するか
     - Server Actions の必要性と内容
     - データベーススキーマの変更が必要か（Prisma スキーマ）
3. **キャッシュ戦略**
   - データを追加・更新・削除する Server Action を実装する際は、必ず `revalidatePath` または `revalidateTag` によるキャッシュパージを設計・実装に含めてください。
4. **既存の基底コンポーネントの再利用**
   - UI を新設する際は、まず `src/components/ui/` 配下にある既存の基底コンポーネントのみで構築できないか確認してください。
   - 足りない基底コンポーネントがある場合のみ、src/types/design-tokens から各種デザイントークンを import して、それを TailwindCSS のユーティリティクラスにマッピングする形式で実装してください。
     以下、新たに基底コンポーネントを実装するときの実例です。

```
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ColorTokens, TextSizeTokens } from "@/src/types/design-tokens";

/** 色のpropsをTailwaindのクラスに変換する */
const colorClasses: Record<ColorTokens, string> = {
  primary: "text-primary",
  foreground: "text-foreground",
  secondary: "text-secondary",
  info: "text-info",
  warning: "text-warning",
  error: "text-danger",
};

/** サイズのpropsをTailwaindのクラスに変換する */
const sizeClasses: Record<TextSizeTokens, string> = {
  xs: "text-xs",
  small: "text-sm",
  default: "text-md",
  large: "text-lg",
  xl: "text-xl",
};

export function Icon({
  icon,
  clickable = false,
  color = "secondary",
  size = "default",
  onClick,
}: {
  icon: IconProp;
  clickable?: boolean;
  color?: ColorTokens;
  size?: TextSizeTokens;
  onClick?: () => void;
}) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${clickable ? "cursor-pointer" : ""} ${colorClasses[color]} ${sizeClasses[size]}`}
      tabIndex={clickable ? 0 : -1}
      onClick={onClick}
    />
  );
}

```

- React19で変更、追加された要素に注意して作業してください。(useMemoやuseCallbackは不要、 useTransitionやuseOptimisticなどの新機能を積極的に使用してください)

## 実装の進め方

1. **設計の確認**: 実装の前に、ディレクトリ構成、必要なエンドポイントやアクション、コンポーネント分割の方針をユーザーに共有します。
2. **実装の提案**: コアとなる機能から小さなステップで実装コードを提案します。
3. **確認と完了**: ユーザーが動作確認を行えるように、追加した機能へのアクセス方法（URLやトリガー）を共有してください。
