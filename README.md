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

5. Supabaseストレージのセットアップ

Supabaseダッシュボードで以下の設定を行います：

- Storage > Buckets に移動し、`tabibito-images`バケットが存在することを確認します
- Policies タブに移動し、以下のRLSポリシーを設定します：
  - SELECT（読み取り）: 匿名ユーザーに許可
  - INSERT（挿入）: 匿名ユーザーに許可
  - UPDATE（更新）: 匿名ユーザーに許可

または、アップロードスクリプトを実行して自動的に設定することもできます：

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

## 画像管理の仕組み

### ディレクトリ構造

画像は`public/images/`ディレクトリに以下のような構造で保存されています：

```
public/images/
├── categories/     # カテゴリアイコン
├── destinations/   # 旅行先の画像
├── news/           # ニュース記事の画像
└── slider/         # トップページのスライダー画像
```

### Supabaseストレージへのアップロード

画像をSupabaseのストレージにアップロードする際、ディレクトリ構造を保持するために、ファイル名にディレクトリ名を含める形式を採用しています：

- 元のパス: `slider/hamamatsu.png`
- ストレージ内のパス: `slider_hamamatsu.png`

これにより、異なるディレクトリにある同名の画像ファイルを区別できます。

### パスマッピング

元のパスとストレージ内のパスのマッピングは、`supabase/path-mapping.json`ファイルに保存されます。このファイルは、`scripts/upload-images.js`スクリプトを実行すると自動的に生成されます。

### 画像URL取得の流れ

1. アプリケーションでは元のパス（`/images/slider/hamamatsu.png`）を使用
2. `getImageUrl`関数がパスマッピングを参照して正しいURLを返却
3. Supabaseストレージが設定されていない場合は、ローカルの画像パスを使用

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
│   ├── schema.sql        # データベーススキーマ
│   └── path-mapping.json # 画像パスマッピング（自動生成）
└── types/                # TypeScript型定義
    └── supabase.ts       # Supabaseの型定義
```

## デプロイ

このプロジェクトは、Vercelにデプロイすることを推奨します。

1. [Vercel](https://vercel.com)にアカウントを作成します
2. プロジェクトをインポートします
3. 環境変数を設定します
4. デプロイします

## トラブルシューティング

### 画像アップロードエラー

「new row violates row-level security policy」エラーが発生した場合：

1. Supabaseダッシュボードにログインします
2. Storage > Policies に移動します
3. `tabibito-images`バケットに対して、INSERT, SELECT, UPDATEのポリシーを設定します

### 画像が表示されない

1. `.env.local`ファイルのSupabase認証情報が正しいか確認します
2. `scripts/upload-images.js`スクリプトを実行して画像をアップロードします
3. Supabaseダッシュボードで`tabibito-images`バケットに画像がアップロードされているか確認します

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
