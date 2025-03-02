import Link from "next/link";
import { getDestinations } from "@/lib/services";
import { DestinationCard } from "@/components/destinations/destination-card";
import { Button } from "@/components/ui/button";

// 仮の旅行先データ（Supabaseが設定されていない場合のフォールバック）
const fallbackDestinations = [
  {
    id: "1",
    name: "浜松",
    prefecture: "静岡県",
    description: "浜松城や浜名湖など、歴史と自然が楽しめる街。うなぎや餃子などのグルメも魅力です。",
    image_url: "/images/destinations/hamamatsu.png",
    created_at: "2025-01-01",
  },
  {
    id: "2",
    name: "京都",
    prefecture: "京都府",
    description: "金閣寺や清水寺など、歴史的な建造物が多く残る古都。四季折々の美しい景色が楽しめます。",
    image_url: "/images/destinations/kyoto.png",
    created_at: "2025-01-02",
  },
  {
    id: "3",
    name: "沖縄",
    prefecture: "沖縄県",
    description: "美しいビーチと透明度の高い海が魅力。独自の文化や歴史も楽しめる南国リゾート。",
    image_url: "/images/destinations/okinawa.png",
    created_at: "2025-01-03",
  },
  {
    id: "4",
    name: "北海道",
    prefecture: "北海道",
    description: "広大な自然と美味しい食べ物が魅力。夏は涼しく、冬はウィンタースポーツが楽しめます。",
    image_url: "/images/destinations/hokkaido.png",
    created_at: "2025-01-04",
  },
  {
    id: "5",
    name: "東京",
    prefecture: "東京都",
    description: "日本の首都であり、最先端の文化と伝統が共存する都市。観光スポットやグルメが豊富です。",
    image_url: "/images/destinations/tokyo.png",
    created_at: "2025-01-05",
  },
  {
    id: "6",
    name: "奈良",
    prefecture: "奈良県",
    description: "日本最古の歴史を持つ都市の一つ。古都奈良の文化財は世界遺産に登録されています。",
    image_url: "/images/destinations/nara.png",
    created_at: "2025-01-06",
  },
  {
    id: "7",
    name: "広島",
    prefecture: "広島県",
    description: "平和記念公園や厳島神社など、歴史的な観光スポットが多い都市。広島風お好み焼きも人気です。",
    image_url: "/images/destinations/hiroshima.png",
    created_at: "2025-01-07",
  },
  {
    id: "8",
    name: "金沢",
    prefecture: "石川県",
    description: "兼六園や金沢城など、歴史的な観光スポットが多い都市。伝統工芸や加賀料理も魅力です。",
    image_url: "/images/destinations/kanazawa.png",
    created_at: "2025-01-08",
  },
];

export default async function DestinationsPage() {
  // Supabaseからデータを取得（エラーが発生した場合はフォールバックデータを使用）
  let destinations = fallbackDestinations;

  try {
    // 旅行先データを取得
    const fetchedDestinations = await getDestinations();
    if (fetchedDestinations && fetchedDestinations.length > 0) {
      destinations = fetchedDestinations;
    }
  } catch (error) {
    console.error('旅行先データの取得に失敗しました:', error);
  }

  // 地域ごとにグループ化
  const regionMap: Record<string, string[]> = {
    "北海道・東北": ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    "関東": ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
    "中部": ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"],
    "関西": ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
    "中国・四国": ["鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県"],
    "九州・沖縄": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
  };

  // 旅行先を地域ごとに分類
  const destinationsByRegion = Object.entries(regionMap).reduce((acc, [region, prefectures]) => {
    acc[region] = destinations.filter(d => prefectures.includes(d.prefecture));
    return acc;
  }, {} as Record<string, typeof destinations>);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダーセクション */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4">
            ← トップページに戻る
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">旅行先一覧</h1>
        <p className="text-lg text-gray-600">日本全国の魅力的な旅行先をご紹介します</p>
      </div>

      {/* 地域ごとの旅行先セクション */}
      {Object.entries(destinationsByRegion).map(([region, regionDestinations]) => (
        regionDestinations.length > 0 && (
          <section key={region} className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">{region}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {regionDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </section>
        )
      ))}

      {/* すべての旅行先セクション */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">すべての旅行先</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </div>
  );
}
