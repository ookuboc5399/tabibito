import Link from "next/link";
import Image from "next/image";
import { FeaturedSlider } from "@/components/home/featured-slider";
import { DestinationCard } from "@/components/destinations/destination-card";
import { NewsCard } from "@/components/news/news-card";
import { Button } from "@/components/ui/button";

// 画像パスを更新したデータ
const featuredItems = [
  {
    id: "1",
    title: "浜松ぶらり旅",
    subtitle: "出世の街で歴史と文化を感じる旅",
    imageUrl: "/images/slider/hamamatsu.jpg", // 更新されたパス
    link: "/destinations/1",
  },
  {
    id: "2",
    title: "京都の古都散策",
    subtitle: "千年の歴史が息づく街並みを巡る",
    imageUrl: "/images/slider/kyoto.jpg", // 更新されたパス
    link: "/destinations/2",
  },
  {
    id: "3",
    title: "沖縄の海を満喫",
    subtitle: "エメラルドグリーンの海と白い砂浜",
    imageUrl: "/images/slider/okinawa.jpg", // 更新されたパス
    link: "/destinations/3",
  },
];

// 更新された旅行先データ
const popularDestinations = [
  {
    id: "1",
    name: "浜松",
    prefecture: "静岡県",
    description: "浜松城や浜名湖など、歴史と自然が楽しめる街。うなぎや餃子などのグルメも魅力です。",
    image_url: "/images/destinations/hamamatsu.jpg", // 更新されたパス
    created_at: "2025-01-01",
  },
  {
    id: "2",
    name: "京都",
    prefecture: "京都府",
    description: "金閣寺や清水寺など、歴史的な建造物が多く残る古都。四季折々の美しい景色が楽しめます。",
    image_url: "/images/destinations/kyoto.jpg", // 更新されたパス
    created_at: "2025-01-02",
  },
  {
    id: "3",
    name: "沖縄",
    prefecture: "沖縄県",
    description: "美しいビーチと透明度の高い海が魅力。独自の文化や歴史も楽しめる南国リゾート。",
    image_url: "/images/destinations/okinawa.jpg", // 更新されたパス
    created_at: "2025-01-03",
  },
  {
    id: "4",
    name: "北海道",
    prefecture: "北海道",
    description: "広大な自然と美味しい食べ物が魅力。夏は涼しく、冬はウィンタースポーツが楽しめます。",
    image_url: "/images/destinations/hokkaido.jpg", // 更新されたパス
    created_at: "2025-01-04",
  },
];

// 更新されたニュースデータ
const latestNews = [
  {
    id: "1",
    title: "松本穂香さんが表紙・巻頭に登場する『月刊旅人2025年3月号』が公開",
    content: "女優・松本穂香さんが表紙と巻頭グラビアを飾る最新号が発売されました。",
    image_url: "/images/news/magazine.jpg", // 更新されたパス
    published_at: "2025-02-25",
    created_at: "2025-02-25",
  },
  {
    id: "2",
    title: "『旅人FOCAL浜松特集』が公開！",
    content: "静岡県浜松市の魅力を余すことなく紹介する特集が公開されました。",
    image_url: "/images/news/hamamatsu-feature.jpg", // 更新されたパス
    published_at: "2025-02-10",
    created_at: "2025-02-10",
  },
];

export default function Home() {
  return (
    <div className="pb-16">
      {/* スライダーセクション */}
      <section className="mb-12">
        <FeaturedSlider items={featuredItems} />
      </section>

      {/* 人気の旅行先セクション */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">人気の旅行先</h2>
          <Link href="/destinations">
            <Button variant="outline" size="sm">
              すべて見る
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* カテゴリセクション */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">カテゴリから探す</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link href="/accommodations" className="group">
              <div className="overflow-hidden rounded-lg bg-white p-4 text-center shadow transition-all hover:shadow-md">
                <div className="relative mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 p-4">
                  <Image
                    src="/images/categories/hotel.jpg" // 更新されたパス
                    alt="旅館・ホテル"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium group-hover:text-primary">旅館・ホテル</h3>
              </div>
            </Link>
            <Link href="/restaurants" className="group">
              <div className="overflow-hidden rounded-lg bg-white p-4 text-center shadow transition-all hover:shadow-md">
                <div className="relative mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 p-4">
                  <Image
                    src="/images/categories/restaurant.jpg" // 更新されたパス
                    alt="飲食店"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium group-hover:text-primary">飲食店</h3>
              </div>
            </Link>
            <Link href="/activities" className="group">
              <div className="overflow-hidden rounded-lg bg-white p-4 text-center shadow transition-all hover:shadow-md">
                <div className="relative mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 p-4">
                  <Image
                    src="/images/categories/leisure.jpg" // 更新されたパス
                    alt="レジャー"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium group-hover:text-primary">レジャー</h3>
              </div>
            </Link>
            <Link href="/onsen" className="group">
              <div className="overflow-hidden rounded-lg bg-white p-4 text-center shadow transition-all hover:shadow-md">
                <div className="relative mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 p-4">
                  <Image
                    src="/images/categories/onsen.jpg" // 更新されたパス
                    alt="温泉"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium group-hover:text-primary">温泉</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* お知らせセクション */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">お知らせ</h2>
          <Link href="/news">
            <Button variant="outline" size="sm">
              すべて見る
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {latestNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      {/* エリアから探すセクション */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">エリアから探す</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {["北海道", "東北", "関東", "中部", "関西", "中国", "四国", "九州・沖縄"].map(
              (region) => (
                <Link key={region} href={`/areas/${region}`} className="group">
                  <div className="overflow-hidden rounded-lg bg-white p-4 text-center shadow transition-all hover:shadow-md">
                    <h3 className="font-medium group-hover:text-primary">{region}</h3>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
