import { supabase } from './supabase';

// ストレージのバケット名
const BUCKET_NAME = 'tabibito-images';

/**
 * 画像をSupabaseストレージにアップロードする
 * @param file アップロードするファイル
 * @param path 保存先のパス（例: 'destinations/hamamatsu.png'）
 * @returns アップロードされた画像のURLまたはエラー
 */
export const uploadImage = async (file: File, path: string) => {
  try {
    // バケットが存在するか確認し、存在しない場合は作成
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true, // 公開バケットとして作成
      });
    }

    // 画像をアップロード
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        upsert: true, // 同じパスに既にファイルが存在する場合は上書き
      });

    if (error) {
      throw error;
    }

    // 公開URLを取得
    const { data: publicUrl } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

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
export const getImageUrl = (path: string) => {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
  
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
      .list(directory);

    if (error) {
      throw error;
    }

    return data.map(item => ({
      name: item.name,
      path: `${directory}/${item.name}`,
      url: getImageUrl(`${directory}/${item.name}`),
    }));
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
export const deleteImage = async (path: string) => {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('画像の削除に失敗しました:', error);
    throw error;
  }
};
