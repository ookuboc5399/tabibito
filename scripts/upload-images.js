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
        public: true,
      });
      console.log(`バケット '${BUCKET_NAME}' を作成しました`);
    } else {
      console.log(`バケット '${BUCKET_NAME}' は既に存在します`);
    }
  } catch (error) {
    console.error('バケットの確認/作成に失敗しました:', error);
    throw error;
  }
}

// ファイルをアップロード
async function uploadFile(filePath, storagePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileContent, {
        upsert: true,
        contentType: getContentType(filePath),
      });

    if (error) {
      throw error;
    }

    const { data: publicUrl } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    console.log(`アップロード成功: ${storagePath} -> ${publicUrl.publicUrl}`);
    return publicUrl.publicUrl;
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
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // サブディレクトリを再帰的に処理
      await processDirectory(fullPath, path.join(basePath, entry.name));
    } else {
      // ファイルをアップロード
      const storagePath = path.join(basePath, entry.name).replace(/\\/g, '/');
      await uploadFile(fullPath, storagePath);
    }
  }
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
    await processDirectory(IMAGES_DIR);
    
    console.log('すべての画像のアップロードが完了しました');
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
}

main();
