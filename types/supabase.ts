// Supabaseのデータ型定義

// 旅行先の情報
export interface Destination {
  id: string;
  name: string;
  prefecture: string;
  description: string;
  image_url: string;
  created_at: string;
}

// 宿泊施設の情報
export interface Accommodation {
  id: string;
  name: string;
  destination_id: string;
  type: 'hotel' | 'ryokan' | 'minshuku' | 'other';
  description: string;
  price_range: string;
  image_url: string;
  address: string;
  phone: string;
  website: string;
  created_at: string;
}

// レストラン情報
export interface Restaurant {
  id: string;
  name: string;
  destination_id: string;
  cuisine_type: string;
  description: string;
  price_range: string;
  image_url: string;
  address: string;
  phone: string;
  website: string;
  created_at: string;
}

// アクティビティ情報
export interface Activity {
  id: string;
  name: string;
  destination_id: string;
  type: string;
  description: string;
  price: number;
  image_url: string;
  address: string;
  phone: string;
  website: string;
  created_at: string;
}

// 旅行プラン情報
export interface TravelPlan {
  id: string;
  title: string;
  destination_id: string;
  description: string;
  duration: number;
  image_url: string;
  created_at: string;
}

// 温泉情報
export interface HotSpring {
  id: string;
  name: string;
  destination_id: string;
  description: string;
  benefits: string;
  price: number;
  image_url: string;
  address: string;
  phone: string;
  website: string;
  created_at: string;
}

// ニュース・お知らせ情報
export interface News {
  id: string;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
  created_at: string;
}
