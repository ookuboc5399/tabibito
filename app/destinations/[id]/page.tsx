import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestination } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { DestinationDetails } from "@/components/destinations/destination-details";

interface DestinationPageProps {
  params: {
    id: string;
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  // 旅行先の詳細を取得
  let destination;
  try {
    destination = await getDestination(params.id);
  } catch (error) {
    console.error(`旅行先の取得に失敗しました: ${error}`);
    notFound();
  }

  if (!destination) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダーセクション */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4">
            ← トップページに戻る
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{destination.name}</h1>
        <p className="text-lg text-gray-600">{destination.prefecture}</p>
      </div>

      {/* メインコンテンツ */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* 画像セクション */}
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <Image
            src={destination.image_url}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
        </div>

      {/* 詳細情報セクション */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">概要</h2>
        <p className="mb-6 text-gray-700">{destination.description}</p>

        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">基本情報</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 font-medium">エリア:</span>
              <span>{destination.prefecture}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-medium">おすすめの季節:</span>
              <span>春・秋</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-medium">滞在日数の目安:</span>
              <span>2〜3日</span>
            </li>
          </ul>
        </div>

        {/* 旅行先ごとの特化した情報 */}
        <DestinationDetails destination={destination} />
        </div>
      </div>

      {/* 関連情報セクション */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold">この地域で楽しめること</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 宿泊施設 */}
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">宿泊施設</h3>
            <p className="mb-4 text-gray-700">
              伝統的な旅館から近代的なホテルまで、様々なタイプの宿泊施設があります。
            </p>
            <Link href={`/accommodations?destination=${destination.id}`}>
              <Button variant="outline" size="sm">
                宿泊施設を探す
              </Button>
            </Link>
          </div>

          {/* 飲食店 */}
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">飲食店</h3>
            <p className="mb-4 text-gray-700">
              地元の食材を使った郷土料理や、季節の味覚を楽しめるレストランが多数あります。
            </p>
            <Link href={`/restaurants?destination=${destination.id}`}>
              <Button variant="outline" size="sm">
                飲食店を探す
              </Button>
            </Link>
          </div>

          {/* アクティビティ */}
          <div className="rounded-lg border p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">アクティビティ</h3>
            <p className="mb-4 text-gray-700">
              自然体験や文化体験など、様々なアクティビティを楽しむことができます。
            </p>
            <Link href={`/activities?destination=${destination.id}`}>
              <Button variant="outline" size="sm">
                アクティビティを探す
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 旅行プランセクション */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold">おすすめの旅行プラン</h2>
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">2泊3日モデルコース</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">1日目</h4>
              <p className="text-gray-700">
                午前: 主要観光スポットを訪れる<br />
                午後: 地元の名物料理を楽しむ<br />
                夜: 温泉旅館でゆっくり過ごす
              </p>
            </div>
            <div>
              <h4 className="font-medium">2日目</h4>
              <p className="text-gray-700">
                午前: 自然散策やアクティビティを体験<br />
                午後: 地元の工芸品作り体験<br />
                夜: 地元の居酒屋で夕食
              </p>
            </div>
            <div>
              <h4 className="font-medium">3日目</h4>
              <p className="text-gray-700">
                午前: 朝市や地元のマーケットでお土産探し<br />
                午後: 最後の観光スポットを訪れて帰路につく
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href={`/travel-plans?destination=${destination.id}`}>
              <Button variant="outline" size="sm">
                他の旅行プランを見る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
