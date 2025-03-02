# Vercelへのデプロイ方法

このドキュメントでは、「旅人（Tabibito）」プロジェクトをVercelにデプロイする方法を説明します。

## 前提条件

- GitHubアカウント
- Vercelアカウント
- Supabaseプロジェクト（設定済み）

## デプロイ手順

### 1. GitHubリポジトリの準備

1. GitHubにリポジトリを作成します。
2. ローカルのプロジェクトをGitHubリポジトリにプッシュします。

```bash
# リポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# コミット
git commit -m "Initial commit"

# リモートリポジトリを追加
git remote add origin https://github.com/yourusername/tabibito.git

# プッシュ
git push -u origin main
```

### 2. Vercelでプロジェクトをインポート

1. [Vercel](https://vercel.com/)にログインします。
2. 「New Project」ボタンをクリックします。
3. GitHubリポジトリをインポートします。
4. 「Import」ボタンをクリックします。

### 3. 環境変数の設定

1. プロジェクトの設定ページで、「Environment Variables」セクションに移動します。
2. 以下の環境変数を追加します：

```
NEXT_PUBLIC_SUPABASE_URL=あなたのSupabase URLを入力してください
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのSupabase匿名キーを入力してください
```

3. 「Save」ボタンをクリックします。

### 4. デプロイ設定の確認

1. 「Build & Development Settings」セクションで、以下の設定を確認します：
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

2. 「Save」ボタンをクリックします。

### 5. デプロイの実行

1. 「Deploy」ボタンをクリックします。
2. デプロイが完了するまで待ちます。
3. デプロイが完了すると、プロジェクトのURLが表示されます。

## デプロイ後の確認

### 1. 画像の表示確認

1. デプロイされたサイトにアクセスします。
2. 画像が正しく表示されているか確認します。
3. 画像が表示されない場合は、以下を確認してください：
   - Supabaseのストレージバケットが公開されているか
   - RLSポリシーが正しく設定されているか
   - `next.config.js`ファイルにSupabaseのドメインが追加されているか

### 2. キャッシュのクリア

画像が表示されない場合は、ブラウザのキャッシュをクリアしてみてください：

1. ブラウザの開発者ツールを開きます（F12キーまたは右クリック→「検証」）。
2. 「Network」タブを選択します。
3. 「Disable cache」オプションをチェックします。
4. ページをリロードします（F5キー）。

または、Vercelのデプロイキャッシュをクリアする方法：

1. Vercelダッシュボードでプロジェクトを選択します。
2. 「Settings」タブを選択します。
3. 「General」セクションで、「Build & Development Settings」を開きます。
4. 「Clear Cache and Redeploy」ボタンをクリックします。

## トラブルシューティング

### 画像が表示されない場合

1. **Next.jsの画像最適化設定を確認**

`next.config.js`ファイルで、Supabaseのドメインが`images.domains`と`images.remotePatterns`に追加されているか確認します：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "yoursupabsedomain.supabase.co"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

2. **Supabaseのストレージバケットを確認**

Supabaseダッシュボードで、ストレージバケットが公開されているか確認します：

- Storage > Buckets に移動
- `tabibito-images`バケットが「Public」になっているか確認

3. **RLSポリシーを確認**

Supabaseダッシュボードで、RLSポリシーが正しく設定されているか確認します：

- Storage > Policies に移動
- `tabibito-images`バケットに対して、SELECT, INSERT, UPDATEのポリシーが設定されているか確認

4. **ブラウザの開発者ツールでエラーを確認**

ブラウザの開発者ツールを開き、「Console」タブでエラーメッセージを確認します。

### デプロイエラーが発生した場合

1. Vercelのデプロイログを確認します。
2. エラーメッセージに基づいて問題を修正します。
3. 修正後、再度デプロイします。

## 自動デプロイの設定

GitHubリポジトリに変更をプッシュすると、Vercelが自動的にデプロイを実行するように設定できます：

1. Vercelダッシュボードでプロジェクトを選択します。
2. 「Settings」タブを選択します。
3. 「Git」セクションで、「Connected Git Repository」を確認します。
4. 「Production Branch」が正しいブランチ（通常は「main」または「master」）に設定されているか確認します。

これで、GitHubリポジトリに変更をプッシュするたびに、Vercelが自動的にデプロイを実行します。
