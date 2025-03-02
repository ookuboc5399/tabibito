import { supabase } from './supabase';
import { Destination, News, Accommodation, Restaurant, Activity } from '@/types/supabase';
import { getImageUrl } from './storage-service';

// バケット名
const BUCKET_NAME = 'tabibito-images';

// 旅行先の取得
export async function getDestinations() {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('旅行先の取得に失敗しました:', error);
    throw error;
  }

  // 画像URLをSupabaseストレージのURLに変換
  return data.map((destination: Destination) => ({
    ...destination,
    image_url: destination.image_url.startsWith('/images/')
      ? getImageUrl(destination.image_url.replace('/images/', ''))
      : destination.image_url,
  }));
}

// 特定の旅行先の取得
export async function getDestination(id: string) {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`ID: ${id} の旅行先の取得に失敗しました:`, error);
    throw error;
  }

  // 画像URLをSupabaseストレージのURLに変換
  return {
    ...data,
    image_url: data.image_url.startsWith('/images/')
      ? getImageUrl(data.image_url.replace('/images/', ''))
      : data.image_url,
  };
}

// ニュースの取得
export async function getNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('ニュースの取得に失敗しました:', error);
    throw error;
  }

  // 画像URLをSupabaseストレージのURLに変換
  return data.map((news: News) => ({
    ...news,
    image_url: news.image_url.startsWith('/images/')
      ? getImageUrl(news.image_url.replace('/images/', ''))
      : news.image_url,
  }));
}

// 特定のニュースの取得
export async function getNewsItem(id: string) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`ID: ${id} のニュースの取得に失敗しました:`, error);
    throw error;
  }

  // 画像URLをSupabaseストレージのURLに変換
  return {
    ...data,
    image_url: data.image_url.startsWith('/images/')
      ? getImageUrl(data.image_url.replace('/images/', ''))
      : data.image_url,
  };
}

// 宿泊施設の取得
export async function getAccommodations() {
  const { data, error } = await supabase
    .from('accommodations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('宿泊施設の取得に失敗しました:', error);
    throw error;
  }

  // 画像URLをSupabaseストレージのURLに変換
  return data.map((accommodation: Accommodation) => ({
    ...accommodation,
    image_url: accommodation.image_url.startsWith('/images/')
      ? getImageUrl(accommodation.image_url.replace('/images/', ''))
      : accommodation.image_url,
  }));
}

// 飲食店の取得
export async function getRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('飲食店の取得に失敗しました:', error);
    throw error;
  }

  // 画像URLをSupabaseストレージのURLに変換
  return data.map((restaurant: Restaurant) => ({
    ...restaurant,
    image_url: restaurant.image_url.startsWith('/images/')
      ? getImageUrl(restaurant.image_url.replace('/images/', ''))
      : restaurant.image_url,
  }));
}

// アクティビティの取得
export async function getActivities() {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('アクティビティの取得に失敗しました:', error);
    throw error;
  }

  // 画像URLをSupabaseストレージのURLに変換
  return data.map((activity: Activity) => ({
    ...activity,
    image_url: activity.image_url.startsWith('/images/')
      ? getImageUrl(activity.image_url.replace('/images/', ''))
      : activity.image_url,
  }));
}

// 特集スライダー用のデータを取得
export async function getFeaturedItems() {
  const { data, error } = await supabase
    .from('featured_items')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('特集アイテムの取得に失敗しました:', error);
    throw error;
  }

  // 画像URLをSupabaseストレージのURLに変換
  return data.map((item) => ({
    ...item,
    imageUrl: item.imageUrl.startsWith('/images/')
      ? getImageUrl(item.imageUrl.replace('/images/', ''))
      : item.imageUrl,
  }));
}
