# 旅人（Tabibito）- 旅行情報サイト

Next.jsとSupabaseを使用した旅行情報サイト「旅人」のソースコードです。このサイトは、日本全国の旅行先、宿泊施設、レストラン、アクティビティなどの情報を提供するウェブサイトです。

## 機能

- 旅行先の紹介（浜松、京都、沖縄、北海道など）
- カテゴリ別の情報（宿泊施設、飲食店、レジャー、温泉）
- エリア別の情報（北海道、東北、関東、中部、関西、中国、四国、九州・沖縄）
- ニュース・お知らせ機能

## 技術スタック

- **フロントエンド**: Next.js 14.0.0, TypeScript, Tailwind CSS 3.3.0
- **バックエンド**: Supabase (PostgreSQL)
- **画像ストレージ**: Supabase Storage
- **その他**: React Icons, Radix UI

## 開発環境のセットアップ

### 前提条件

- Node.js 18.0.0以上
- npm 9.0.0以上
- Supabaseアカウント

### インストール手順

1. リポジトリをクローン

```bash
git clone <リポジトリURL>
cd tabibito
```

2. 依存関係のインストール

```bash
npm install
```

3. 環境変数の設定

`.env.local`ファイルを作成し、以下の内容を追加します：

```
NEXT_PUBLIC_SUPABASE_URL=あなたのSupabase URLを入力してください
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのSupabase匿名キーを入力してください
```

4. Supabaseの設定

- Supabaseでプロジェクトを作成します
- SQLエディタを開き、`supabase/schema.sql`の内容を実行してテーブルを作成します
- ストレージバケット`tabibito-images`を作成し、公開アクセスを許可します

5. 画像のアップロード

以下のコマンドを実行して、画像をSupabaseのストレージにアップロードします：

```bash
# dotenvパッケージをインストール
npm install dotenv

# 画像アップロードスクリプトを実行
node scripts/upload-images.js
```

6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開いて、アプリケーションを確認できます。

## プロジェクト構造

```
tabibito/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # ホームページ
│   └── globals.css       # グローバルスタイル
├── components/           # Reactコンポーネント
│   ├── destinations/     # 旅行先関連コンポーネント
│   ├── home/             # ホームページ用コンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── news/             # ニュース関連コンポーネント
│   └── ui/               # 共通UIコンポーネント
├── lib/                  # ユーティリティ関数
│   ├── services.ts       # Supabaseサービス関数
│   ├── storage-service.ts # ストレージサービス関数
│   ├── supabase.ts       # Supabaseクライアント
│   └── utils.ts          # ユーティリティ関数
├── public/               # 静的ファイル
│   └── images/           # 画像ファイル
├── scripts/              # スクリプト
│   └── upload-images.js  # 画像アップロードスクリプト
├── supabase/             # Supabase関連ファイル
│   └── schema.sql        # データベーススキーマ
└── types/                # TypeScript型定義
    └── supabase.ts       # Supabaseの型定義
```

## デプロイ

このプロジェクトは、Vercelにデプロイすることを推奨します。

1. [Vercel](https://vercel.com)にアカウントを作成します
2. プロジェクトをインポートします
3. 環境変数を設定します
4. デプロイします

## 画像について

画像は以下の2つの方法で提供されます：

1. **ローカル開発時**: `public/images/`ディレクトリ内の画像ファイルを使用
2. **本番環境**: Supabaseのストレージに保存された画像を使用

画像をSupabaseのストレージにアップロードするには、`scripts/upload-images.js`スクリプトを使用します。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
# tabibito
