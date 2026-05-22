## Project Overview (概要)

本プロジェクトは、Next.jsとTypeScriptを使用したフルスタックアプリケーションです。
Prismaを使用したDB操作を備え、外部API から取得したデータを加工して DB に保持します。

## Technology Stack (技術スタック)

- React 19.2.4
- Next.js 16.2.4
- TailwindCSS 4
- Auth.js 5.0.0 (beta)
- Prisma 7.8
- Docker

## Project Structure (ディレクトリ構成)

```
.
├── docker/
│   └── front/
│       └── Dockerfile
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   ├── generated/ # Prisma自動生成ファイル（編集不可）
│   └── migrations/
├── public/
├── src/
│   ├── app/ # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── login/ # ログイン画面
│   │   ├── (authenticated)/
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       └── news/
│   │           └── route.ts
│   ├── features/ # 機能ごとに分けて管理
│   │   ├── index.ts # 他ディレクトリで使うものだけを export
│   │   └── 機能に関連するコンポーネントや処理などをまとめる
│   ├── components/ # 共通コンポーネント
│   │   └── ui/ # 基底コンポーネント
│   ├── lib/
│   │   ├── auth.ts # Auth.js 設定
│   │   ├── prisma.ts # Prisma Client の初期化
│   │   ├── utils/
│   │   └── prompts/
│   └── types # 共通で使う型
│　　   └── design-tokens # デザイントークンをまとめた Enum 型
├── docker-compose.yml
├── next.config.ts
├── prisma.config.ts
└── tsconfig.json
```

## Code Style（コード規約・スタイル）

- React19、Next.js16 のベストプラクティスに沿った記述をしてください。
- ディレクトリ名、ファイル名はケバブケースにしてください。
- 変数名、関数名はキャメルケースにしてください。
- 機能に関するロジックはすべて features ディレクトリに配置します。src/app/ 側にロジックが固まりすぎないように留意してください。
- features ディレクトリ内で、同じ features 内のものを import するときは、相対パスで記述してください。
- features ディレクトリ外から特定の features 内のものを import するときは、必ず features/index.ts から import します。
- src/lib や src/components など、全体で共通して使用するディレクトリから import するときは、パスエイリアスを利用した絶対パスで記述してください。
  以下、実例です。

```
import { Text } from "@/src/components/ui/text";

```

- features ディレクトリ内で、他の features ディレクトリ内のものを直接 import することは禁止します。

- Prismaを使った DB 操作は、必ず features/services ディレクトリ内に配置します。
- データの追加、更新、削除は基本的に ServerActions で実装します。 ServerActions は features/actions ディレクトリ内に配置し、内部で servicesディレクトリの処理を呼び出すようにします。
- Server Actions のファイルは先頭に必ず "use server" を記述すること。

- any 型の使用は原則として禁止します。
- 関数には必ず JSDoc 形式のコメントを付けてください。
- コンポーネントは原則として Server Component として実装してください。状態管理（useState等）やイベントリスナー（onClick等）、ブラウザAPIが必要な場合のみファイルの先頭に "use client" を記述し、Client Component の範囲を最小限に留めてください。
- 可読性を極限まで高めてください。

## NEVER (絶対にやらないこと)

- node_modules/ や .next/ などの git 追跡外ディレクトリを直接編集しないでください。
- Prisma のマイグレーションファイルを直接編集しないでください。
- .envファイルをコードに含めないでください。

## Other (その他)

- チャットは日本語で回答してください。
- ソースコードを変更する前に、必ず変更の差分を提示して、ユーザーの承認を得るようにしてください。
- 新しい画面を追加する場合は、必ず App Router を使ってください (Pages Routerは段階的に廃止中であるため)
