---
name: check-security
description: "コードのセキュリティ上のリスクや改善点がないかをチェックする際のガイドライン・規約。XSS、SQLインジェクション、CSRF、認証・認可の不備などの脆弱性を防ぐためのルールを含みます。"
user-invocable: true
---

# Security Check Guidelines

## When to Use

- ユーザーから「セキュリティチェックをしてほしい」「脆弱性がないか確認してほしい」「セキュアに実装できているかレビューしてほしい」などの依頼を受けた場合
- 新規機能追加やリファクタリングの際に、セキュリティ上の懸念がある場合

## Core Principles

1. **全体規約の遵守 (Enforce Project Rules)**
   - `.github/copilot-instructions.md` に記載されているアーキテクチャや技術スタック（Next.js App Router, React Server Components, Auth.js, Prisma）を前提としたセキュリティ対策を考慮してください。
2. **入力値の検証とサニタイズ (Input Validation & Sanitization)**
   - クライアントからの入力値（フォームデータ、URLパラメータなど）は必ずサーバー側で検証（Validation）してください。
   - 悪意のあるスクリプト実行（XSS）を防ぐため、ユーザー入力をそのままHTMLとしてレンダリングしていないか確認してください。(`dangerouslySetInnerHTML` などの使用に注意)
3. **認証と認可 (Authentication & Authorization)**
   - ルーティングやAPIエンドポイント（API Routes / Server Actions）において、適切な認証チェック（Auth.js によるセッション確認）が行われているか確認してください。
   - 他のユーザーのリソースに不正にアクセスできないように、認可（Authorization）のロジック（例: データがログインユーザーに紐づくものか確認するなど）が実装されているかチェックしてください。
4. **データベースアクセス (Secure Database Access)**
   - Prisma の API `$queryRaw` や `$executeRaw` にユーザー入力を渡す場合は、安全にパラメータ化されているか厳密に確認してください。
   - 過剰なデータ取得を防ぐため、意図せずパスワードハッシュや個人情報等の機密情報がクライアントに送信されていないか、クライアントへのレスポンス内容を確認してください。
5. **環境変数と機密情報 (Environment Variables & Secrets)**
   - APIキーやシークレットなどの機密情報が、誤ってクライアントサイドに露出していないか確認してください（Next.js の場合、意図しない `NEXT_PUBLIC_` プレフィックスの使用など）。
   - コードベース内にハードコードされた認証情報がないか確認してください。
6. **CSRF対策 (Cross-Site Request Forgery)**
   - Server Actions や API Routes において、CSRFに対する保護が適切に機能しているか、または意図せず無効化されていないか確認してください。
7. **不要な変更の排除 (Avoid Unnecessary Changes)**
   - セキュリティ上のリスクがないと判断した場合は、「セキュリティ上のリスクはありません」とだけ出力して終了してください。

**その他、セキュリティ上のリスクがあると判断した場合は、詳細と具体的な修正案を提示してください。**

## セキュリティチェックの進め方

1. **レビュー対象の特定**: ユーザーから指定されたコード、または関連する機能群（Server Actions、API Route、Componentなど）を特定します。
2. **多角的なチェック**: 上記 Core Principles に沿って、入力検証、認証・認可、データアクセスなどの側面から潜在的なリスクを洗い出します。
3. **改善案の提示**: リスクが見つかった場合は、その詳細と具体的な修正コードを提示し、なぜその修正が必要なのか（どのような脆弱性を防げるか）を説明します。
