-- UUID拡張機能の有効化（存在しない場合）
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 旅行先テーブル
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  prefecture TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 宿泊施設テーブル
CREATE TABLE IF NOT EXISTS accommodations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('hotel', 'ryokan', 'minshuku', 'other')),
  description TEXT NOT NULL,
  price_range TEXT NOT NULL,
  image_url TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- レストランテーブル
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  cuisine_type TEXT NOT NULL,
  description TEXT NOT NULL,
  price_range TEXT NOT NULL,
  image_url TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- アクティビティテーブル
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 旅行プランテーブル
CREATE TABLE IF NOT EXISTS travel_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 温泉テーブル
CREATE TABLE IF NOT EXISTS hot_springs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  benefits TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ニュース・お知らせテーブル
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 特集スライダー用のテーブル
CREATE TABLE IF NOT EXISTS featured_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  link TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- サンプルデータの挿入（既存のデータがない場合のみ）
INSERT INTO destinations (name, prefecture, description, image_url)
SELECT 
  '浜松', '静岡県', '浜松城や浜名湖など、歴史と自然が楽しめる街。うなぎや餃子などのグルメも魅力です。', '/images/destinations/hamamatsu.png'
WHERE NOT EXISTS (SELECT 1 FROM destinations WHERE name = '浜松');

INSERT INTO destinations (name, prefecture, description, image_url)
SELECT 
  '京都', '京都府', '金閣寺や清水寺など、歴史的な建造物が多く残る古都。四季折々の美しい景色が楽しめます。', '/images/destinations/kyoto.png'
WHERE NOT EXISTS (SELECT 1 FROM destinations WHERE name = '京都');

INSERT INTO destinations (name, prefecture, description, image_url)
SELECT 
  '沖縄', '沖縄県', '美しいビーチと透明度の高い海が魅力。独自の文化や歴史も楽しめる南国リゾート。', '/images/destinations/okinawa.png'
WHERE NOT EXISTS (SELECT 1 FROM destinations WHERE name = '沖縄');

INSERT INTO destinations (name, prefecture, description, image_url)
SELECT 
  '北海道', '北海道', '広大な自然と美味しい食べ物が魅力。夏は涼しく、冬はウィンタースポーツが楽しめます。', '/images/destinations/hokkaido.png'
WHERE NOT EXISTS (SELECT 1 FROM destinations WHERE name = '北海道');

INSERT INTO news (title, content, image_url, published_at)
SELECT 
  '松本穂香さんが表紙・巻頭に登場する『月刊旅人2025年3月号』が公開', 
  '女優・松本穂香さんが表紙と巻頭グラビアを飾る最新号が発売されました。', 
  '/images/news/magazine.png', 
  '2025-02-25'
WHERE NOT EXISTS (SELECT 1 FROM news WHERE title LIKE '%松本穂香%');

INSERT INTO news (title, content, image_url, published_at)
SELECT 
  '『旅人FOCAL浜松特集』が公開！', 
  '静岡県浜松市の魅力を余すことなく紹介する特集が公開されました。', 
  '/images/news/hamamatsu-feature.png', 
  '2025-02-10'
WHERE NOT EXISTS (SELECT 1 FROM news WHERE title LIKE '%浜松特集%');

INSERT INTO featured_items (title, subtitle, imageUrl, link, display_order)
SELECT 
  '浜松ぶらり旅', 
  '出世の街で歴史と文化を感じる旅', 
  '/images/slider/hamamatsu.png', 
  '/destinations/1', 
  1
WHERE NOT EXISTS (SELECT 1 FROM featured_items WHERE title = '浜松ぶらり旅');

INSERT INTO featured_items (title, subtitle, imageUrl, link, display_order)
SELECT 
  '京都の古都散策', 
  '千年の歴史が息づく街並みを巡る', 
  '/images/slider/kyoto.png', 
  '/destinations/2', 
  2
WHERE NOT EXISTS (SELECT 1 FROM featured_items WHERE title = '京都の古都散策');

INSERT INTO featured_items (title, subtitle, imageUrl, link, display_order)
SELECT 
  '沖縄の海を満喫', 
  'エメラルドグリーンの海と白い砂浜', 
  '/images/slider/okinawa.png', 
  '/destinations/3', 
  3
WHERE NOT EXISTS (SELECT 1 FROM featured_items WHERE title = '沖縄の海を満喫');
