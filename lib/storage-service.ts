import { supabase } from './supabase';
import fs from 'fs';
import path from 'path';

// ストレージのバケット名
const BUCKET_NAME = 'tabibito-images';

// パスマッピングの型定義
interface PathMapping {
  originalPath: string;
  storagePath: string;
  publicUrl: string;
}

// パスマッピングの読み込み
let pathMapping: PathMapping[] = [];
try {
  // サーバーサイドでのみ実行
  if (typeof window === 'undefined') {
    const mappingPath = path.join(process.cwd(), 'supabase/path-mapping.json');
    if (fs.existsSync(mappingPath)) {
      pathMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    }
  }
} catch (error) {
  console.error('パスマッピングの読み込みに失敗しました:', error);
}

/**
 * 画像をSupabaseストレージにアップロードする
 * @param file アップロードするファイル
 * @param path 保存先のパス（例: 'destinations/hamamatsu.png'）
 * @returns アップロードされた画像のURLまたはエラー
 */
export const uploadImage = async (file: File, imagePath: string) => {
  try {
    // バケットが存在するか確認し、存在しない場合は作成
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true, // 公開バケットとして作成
      });
    }

    // ディレクトリ構造を保持するために、ファイル名にディレクトリ名を含める
    // 例: slider/hamamatsu.png -> slider_hamamatsu.png
    const pathParts = imagePath.split('/');
    const fileName = pathParts.pop() || ''; // ファイル名を取得
    const dirName = pathParts.join('_'); // ディレクトリ名をアンダースコアで結合
    
    // 最終的なストレージパス
    const storagePath = dirName ? `${dirName}_${fileName}` : fileName;

    // 画像をアップロード
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, file, {
        upsert: true, // 同じパスに既にファイルが存在する場合は上書き
      });

    if (error) {
      throw error;
    }

    // 公開URLを取得
    const { data: publicUrl } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    // パスマッピングに追加
    pathMapping.push({
      originalPath: imagePath,
      storagePath,
      publicUrl: publicUrl.publicUrl
    });

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('画像のアップロードに失敗しました:', error);
    throw error;
  }
};

/**
 * 指定されたパスの画像の公開URLを取得する
 * @param path 画像のパス（例: 'destinations/hamamatsu.png'）
 * @returns 画像の公開URL
 */
export const getImageUrl = (imagePath: string) => {
  // パスマッピングから検索
  const mapping = pathMapping.find(item => item.originalPath === imagePath);
  if (mapping) {
    return mapping.publicUrl;
  }

  // パスマッピングにない場合は、パスを変換して取得
  const pathParts = imagePath.split('/');
  const fileName = pathParts.pop() || ''; // ファイル名を取得
  const dirName = pathParts.join('_'); // ディレクトリ名をアンダースコアで結合
  
  // 最終的なストレージパス
  const storagePath = dirName ? `${dirName}_${fileName}` : fileName;
  
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath);
  
  return data.publicUrl;
};

/**
 * 指定されたディレクトリ内の画像一覧を取得する
 * @param directory ディレクトリパス（例: 'destinations'）
 * @returns 画像のパス一覧
 */
export const listImages = async (directory: string) => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list();

    if (error) {
      throw error;
    }

    // ディレクトリに一致する画像をフィルタリング
    const filteredData = data.filter(item => 
      item.name.startsWith(`${directory}_`) || 
      item.name.startsWith(`${directory}/`)
    );

    return filteredData.map(item => {
      // パスマッピングから元のパスを検索
      const mapping = pathMapping.find(m => m.storagePath === item.name);
      const originalPath = mapping ? mapping.originalPath : item.name;
      
      return {
        name: item.name,
        path: originalPath,
        url: getImageUrl(originalPath),
      };
    });
  } catch (error) {
    console.error('画像一覧の取得に失敗しました:', error);
    throw error;
  }
};

/**
 * 指定されたパスの画像を削除する
 * @param path 画像のパス（例: 'destinations/hamamatsu.png'）
 * @returns 削除結果
 */
export const deleteImage = async (imagePath: string) => {
  try {
    // パスマッピングから検索
    const mapping = pathMapping.find(item => item.originalPath === imagePath);
    const storagePath = mapping ? mapping.storagePath : imagePath;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([storagePath]);

    if (error) {
      throw error;
    }

    // パスマッピングから削除
    if (mapping) {
      pathMapping = pathMapping.filter(item => item.originalPath !== imagePath);
    }

    return { success: true };
  } catch (error) {
    console.error('画像の削除に失敗しました:', error);
    throw error;
  }
};
