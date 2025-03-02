# Supabase RLSポリシーの設定方法

Supabaseでは、Row Level Security（RLS）ポリシーを使用して、データベースやストレージへのアクセス制御を行います。このドキュメントでは、Supabaseのストレージバケットに対するRLSポリシーの設定方法を説明します。

## RLSポリシーとは

Row Level Security（RLS）は、データベースやストレージのレコードに対するアクセス制御を行うための機能です。RLSポリシーを使用することで、以下のようなアクセス制御が可能になります：

- 匿名ユーザーに対して、読み取り（SELECT）のみを許可する
- 認証済みユーザーに対して、読み取り（SELECT）と挿入（INSERT）を許可する
- 特定のユーザーに対して、更新（UPDATE）と削除（DELETE）を許可する

## Supabaseダッシュボードを使用したRLSポリシーの設定

### 1. Supabaseダッシュボードにログイン

[Supabaseダッシュボード](https://app.supabase.io/)にログインします。

### 2. プロジェクトを選択

RLSポリシーを設定したいプロジェクトを選択します。

### 3. ストレージバケットのRLSポリシーを設定

#### 3.1. ストレージページに移動

左側のメニューから「Storage」を選択します。

#### 3.2. バケットを選択

「Buckets」タブで、RLSポリシーを設定したいバケット（例：`tabibito-images`）を選択します。

#### 3.3. ポリシータブに移動

バケットの詳細ページで、「Policies」タブを選択します。

#### 3.4. 新しいポリシーを作成

「New Policy」ボタンをクリックして、新しいポリシーを作成します。

#### 3.5. ポリシータイプを選択

以下のポリシータイプから選択します：

- **SELECT（読み取り）**: ファイルの読み取りを許可するポリシー
- **INSERT（挿入）**: ファイルのアップロードを許可するポリシー
- **UPDATE（更新）**: ファイルの更新を許可するポリシー
- **DELETE（削除）**: ファイルの削除を許可するポリシー

#### 3.6. ポリシーの詳細を設定

各ポリシータイプに対して、以下の設定を行います：

##### SELECT（読み取り）ポリシー

1. 「Policy name」に `allow_public_select` などの名前を入力
2. 「Allow access to」で `Everyone (public)` を選択
3. 「Using the following expression」に `true` を入力（すべてのファイルへのアクセスを許可）
4. 「Save」ボタンをクリック

##### INSERT（挿入）ポリシー

1. 「Policy name」に `allow_public_insert` などの名前を入力
2. 「Allow access to」で `Everyone (public)` を選択
3. 「Using the following expression」に `true` を入力（すべてのファイルのアップロードを許可）
4. 「Save」ボタンをクリック

##### UPDATE（更新）ポリシー

1. 「Policy name」に `allow_public_update` などの名前を入力
2. 「Allow access to」で `Everyone (public)` を選択
3. 「Using the following expression」に `true` を入力（すべてのファイルの更新を許可）
4. 「Save」ボタンをクリック

### 4. ポリシーの確認

ポリシーが正しく設定されたことを確認します。「Policies」タブに、作成したポリシーが表示されているはずです。

## SQLを使用したRLSポリシーの設定

Supabaseのダッシュボードを使用せずに、SQLを使用してRLSポリシーを設定することもできます。以下は、SQLを使用してRLSポリシーを設定する例です：

```sql
-- バケットに対するSELECTポリシーを設定
CREATE POLICY "Allow public SELECT" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'tabibito-images');

-- バケットに対するINSERTポリシーを設定
CREATE POLICY "Allow public INSERT" ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'tabibito-images');

-- バケットに対するUPDATEポリシーを設定
CREATE POLICY "Allow public UPDATE" ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'tabibito-images')
  WITH CHECK (bucket_id = 'tabibito-images');
```

このSQLは、Supabaseのダッシュボードの「SQL Editor」で実行できます。

## 注意事項

- RLSポリシーは、セキュリティ上の理由から、デフォルトでは制限的に設定されています。必要なアクセス権限のみを許可するようにしてください。
- 本番環境では、より厳格なRLSポリシーを設定することをお勧めします。例えば、認証済みユーザーのみにアクセスを許可するなど。
- RLSポリシーの設定は、Supabaseのプロジェクト設定によって異なる場合があります。詳細は、[Supabaseのドキュメント](https://supabase.io/docs/guides/storage#access-control)を参照してください。
