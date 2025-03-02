// このスクリプトは、public/imagesディレクトリ内の画像をSupabaseのストレージにアップロードします
// 使用方法: node scripts/upload-images.js

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabaseの設定
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ストレージのバケット名
const BUCKET_NAME = 'tabibito-images';

// 画像ディレクトリのパス
const IMAGES_DIR = path.join(__dirname, '../public/images');

// バケットの作成または確認
async function ensureBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log(`バケット '${BUCKET_NAME}' を作成します...`);
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true, // 公開バケットとして作成
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
      });
      
      console.log(`バケット '${BUCKET_NAME}' を作成しました`);
    } else {
      console.log(`バケット '${BUCKET_NAME}' は既に存在します`);
    }
    
    // RLSポリシーの設定に関する注意事項を表示
    console.log('');
    console.log('重要: RLSポリシーの設定が必要です');
    console.log('詳細な設定方法は docs/supabase-rls-setup.md を参照してください');
    console.log('');
    console.log('簡単な手順:');
    console.log('1. Supabaseダッシュボードにログイン');
    console.log('2. Storage > Policies に移動');
    console.log(`3. ${BUCKET_NAME}バケットに対して、以下のポリシーを設定:`);
    console.log('   - SELECT（読み取り）: 匿名ユーザーに許可');
    console.log('   - INSERT（挿入）: 匿名ユーザーに許可');
    console.log('   - UPDATE（更新）: 匿名ユーザーに許可');
    console.log('');
    
  } catch (error) {
    console.error('バケットの確認/作成に失敗しました:', error);
    console.log('代替方法: Supabaseダッシュボードで手動でバケットを作成し、RLSポリシーを設定してください。');
    throw error;
  }
}

// ファイルをアップロード
async function uploadFile(filePath, storagePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    
    // ディレクトリ構造を保持するために、ファイル名にディレクトリ名を含める
    // 例: slider/hamamatsu.png -> slider_hamamatsu.png
    const pathParts = storagePath.split('/');
    const fileName = pathParts.pop(); // ファイル名を取得
    const dirName = pathParts.join('_'); // ディレクトリ名をアンダースコアで結合
    
    // 最終的なストレージパス
    const finalStoragePath = dirName ? `${dirName}_${fileName}` : fileName;
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(finalStoragePath, fileContent, {
        upsert: true,
        contentType: getContentType(filePath),
      });

    if (error) {
      // RLSポリシーエラーの場合は、特別なメッセージを表示
      if (error.message && error.message.includes('row-level security policy')) {
        console.error(`アップロード失敗: ${storagePath} - RLSポリシーエラー`);
        console.error('Supabaseダッシュボードで適切なRLSポリシーを設定してください。');
        console.error('詳細な設定方法は docs/supabase-rls-setup.md を参照してください');
        return null;
      }
      throw error;
    }

    const { data: publicUrl } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    console.log(`アップロード成功: ${storagePath} -> ${publicUrl.publicUrl}`);
    
    // 元のパスと変換後のパスのマッピングを返す
    return {
      originalPath: storagePath,
      storagePath: finalStoragePath,
      publicUrl: publicUrl.publicUrl
    };
  } catch (error) {
    console.error(`アップロード失敗: ${storagePath}`, error);
    return null;
  }
}

// ファイルの拡張子からContent-Typeを取得
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
}

// ディレクトリ内のすべてのファイルを再帰的に処理
async function processDirectory(dirPath, basePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const results = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // サブディレクトリを再帰的に処理
      const subResults = await processDirectory(fullPath, path.join(basePath, entry.name));
      results.push(...subResults);
    } else {
      // ファイルをアップロード
      const storagePath = path.join(basePath, entry.name).replace(/\\/g, '/');
      const result = await uploadFile(fullPath, storagePath);
      if (result) {
        results.push(result);
      }
    }
  }
  
  return results;
}

// パスマッピングをJSONファイルに保存
function savePathMapping(mapping) {
  const mappingPath = path.join(__dirname, '../supabase/path-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log(`パスマッピングを保存しました: ${mappingPath}`);
}

// メイン処理
async function main() {
  try {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabaseの認証情報が設定されていません。.env.localファイルを確認してください。');
    }

    console.log('Supabaseストレージへの画像アップロードを開始します...');
    
    // バケットの確認/作成
    await ensureBucket();
    
    // 画像ディレクトリの処理
    const results = await processDirectory(IMAGES_DIR);
    
    // 成功したアップロードのみをマッピングに保存
    const successfulResults = results.filter(result => result !== null);
    
    if (successfulResults.length > 0) {
      // パスマッピングを保存
      savePathMapping(successfulResults);
      console.log(`${successfulResults.length}個の画像をアップロードしました`);
    } else {
      console.log('アップロードに成功した画像がありません');
      console.log('RLSポリシーが正しく設定されているか確認してください');
      console.log('詳細な設定方法は docs/supabase-rls-setup.md を参照してください');
    }
    
    console.log('');
    console.log('重要: アップロードに失敗した場合は、以下の手順を試してください:');
    console.log('1. Supabaseダッシュボードにログイン');
    console.log('2. Storage > Policies に移動');
    console.log(`3. ${BUCKET_NAME}バケットに対して、以下のポリシーを設定:`);
    console.log('   - SELECT（読み取り）: 匿名ユーザーに許可');
    console.log('   - INSERT（挿入）: 匿名ユーザーに許可');
    console.log('   - UPDATE（更新）: 匿名ユーザーに許可');
    console.log('4. スクリプトを再実行: node scripts/upload-images.js');
    console.log('');
    console.log('詳細な設定方法は docs/supabase-rls-setup.md を参照してください');
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
}

main();
