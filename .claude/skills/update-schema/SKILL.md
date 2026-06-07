---
name: update-schema
description: "Prismaスキーマやデータベース定義の変更を行う際のガイドライン。schema.prismaの修正から、関連するService/Actionレイヤーへの影響確認、マイグレーション実行の案内を含みます。"
user-invocable: true
---

# Prisma Schema & Database Update Guidelines

## When to Use

- ユーザーから「〇〇というテーブルを追加したい」「カラムを増やしたい」「DBの設計を変更したい」などのDB変更に関する依頼を受けた場合

## Core Principles

1. **規約の遵守 (Enforce Project Rules)**
   - 全体共通のコーディング規約や命名規則については、必ず `.github/copilot-instructions.md` に従ってください。
   - スキーマモデル名（PascalCase）やカラム名（camelCaseなど）、プロジェクトのPrisma命名規則に従って慎重に定義してください。
2. **影響範囲の特定 (Identify Impact)**
   - スキーマを変更することで影響を受ける既存のコードを事前に洗い出してください。
   - 特に `features/[feature-name]/services/` 内の Prisma 呼び出し箇所、 `features/[feature-name]/actions/` のデータ更新ロジック、あるいはそれに紐づく型定義が影響を受けないか確認します。
3. **安全なマイグレーション案内**
   - AIは直接 Prisma のマイグレーションファイル（`prisma/migrations/` 配下）を編集してはいけません。
   - スキーマ変更を提案した上で、ユーザー自身にマイグレーションコマンドを実行するように案内してください。

## データベース変更の進め方

1. **スキーマ変更案の提示**:
   - まず `prisma/schema.prisma` の変更案（追加・修正するモデルコード）を提示し、リレーション（1対多、多対多など）やCascade削除などの制約が意図通りかユーザーに確認します。
2. **マイグレーションと型生成手順のアドバイス**:
   - スキーマ変更が承認されたら、ユーザーにマイグレーションの実行と Prisma Client の再生成を促します（例: `npx prisma migrate dev --name <name>` および `npx prisma generate`）。
   - プロジェクトは Docker 環境（`docker/`）を持っているため、コンテナ内でのコマンド実行が必要となる可能性にも配慮して案内します。
3. **関連アプリケーションコードの修正**:
   - ユーザー側でマイグレーションと Prisma Client の再生成が完了したら、次に `features/` ディレクトリ配下（services, actions, components）の変更ステップに移行し、修正コードを提案します。
