import { Destination } from "@/types/supabase";

interface DestinationDetailsProps {
  destination: Destination;
}

// 旅行先ごとの特化した情報を提供するコンポーネント
export function DestinationDetails({ destination }: DestinationDetailsProps) {
  // 旅行先のIDに基づいて、特化した情報を返す
  switch (destination.id) {
    case "1": // 浜松
      return <HamamatsuDetails />;
    case "2": // 京都
      return <KyotoDetails />;
    case "3": // 沖縄
      return <OkinawaDetails />;
    case "4": // 北海道
      return <HokkaidoDetails />;
    default:
      return <DefaultDetails />;
  }
}

// 浜松の特化した情報
function HamamatsuDetails() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-xl font-semibold">浜松の魅力</h3>
        <p className="text-gray-700">
          浜松は、静岡県西部に位置する工業都市であり、豊かな自然と歴史的な名所が共存する魅力的な都市です。浜名湖や天竜川などの自然環境、浜松城や犀ヶ崖資料館などの歴史的建造物、そして浜松餃子やうなぎなどの郷土料理が楽しめます。
        </p>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">おすすめの観光スポット</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <span className="font-medium">浜松城</span> - 徳川家康が17年間居城とした城。現在は歴史資料館となっており、展望台からは浜松市街を一望できます。
          </li>
          <li>
            <span className="font-medium">浜名湖</span> - 静岡県最大の湖。湖畔には温泉やレジャー施設が点在し、四季折々の景色を楽しめます。
          </li>
          <li>
            <span className="font-medium">浜松市楽器博物館</span> - 世界中の楽器を展示する博物館。浜松は楽器産業が盛んな都市として知られています。
          </li>
          <li>
            <span className="font-medium">浜松フラワーパーク</span> - 四季折々の花が楽しめる公園。特に春のチューリップと秋のコスモスが見事です。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">グルメ情報</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <span className="font-medium">浜松餃子</span> - 浜松の名物料理。キャベツをたっぷり使った餃子で、タレではなく酢醤油で食べるのが特徴です。
          </li>
          <li>
            <span className="font-medium">うなぎ</span> - 浜名湖周辺はうなぎの養殖が盛んで、新鮮なうなぎを味わえます。
          </li>
          <li>
            <span className="font-medium">遠州灘の海の幸</span> - 遠州灘で獲れる新鮮な魚介類を使った料理が楽しめます。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">アクセス情報</h3>
        <p className="text-gray-700">
          東京から新幹線で約1時間30分、大阪から約2時間でアクセス可能です。市内の移動には路面電車やバスが便利です。
        </p>
      </section>
    </div>
  );
}

// 京都の特化した情報
function KyotoDetails() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-xl font-semibold">京都の魅力</h3>
        <p className="text-gray-700">
          京都は、794年から1868年まで日本の首都であり、日本の伝統文化と歴史が色濃く残る都市です。2,000以上の寺社仏閣、伝統的な町家、美しい庭園など、日本の伝統美を堪能できる場所が数多く存在します。四季折々の美しい景色も京都の大きな魅力の一つです。
        </p>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">おすすめの観光スポット</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <span className="font-medium">清水寺</span> - 京都を代表する寺院。舞台造りの本堂からは京都市街を一望できます。春の桜と秋の紅葉が特に美しいです。
          </li>
          <li>
            <span className="font-medium">金閣寺（鹿苑寺）</span> - 金箔で覆われた三層の楼閣が池に映える美しい寺院。
          </li>
          <li>
            <span className="font-medium">伏見稲荷大社</span> - 千本鳥居で有名な神社。商売繁盛の神様として知られています。
          </li>
          <li>
            <span className="font-medium">嵐山</span> - 渡月橋や竹林の小径など、自然と歴史が調和した景勝地。
          </li>
          <li>
            <span className="font-medium">祇園</span> - 舞妓さんや芸妓さんが行き交う京都の伝統的な花街。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">グルメ情報</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <span className="font-medium">京懐石</span> - 季節の食材を使った伝統的な日本料理。
          </li>
          <li>
            <span className="font-medium">湯豆腐</span> - 京都の名物料理。豆腐を昆布だしで煮て、ポン酢やネギなどの薬味で食べます。
          </li>
          <li>
            <span className="font-medium">八つ橋</span> - 京都の代表的な和菓子。生八つ橋はさまざまな味があり、お土産に人気です。
          </li>
          <li>
            <span className="font-medium">抹茶スイーツ</span> - 抹茶を使ったパフェやケーキなど、京都ならではの抹茶スイーツが楽しめます。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">アクセス情報</h3>
        <p className="text-gray-700">
          東京から新幹線で約2時間15分、大阪から電車で約30分でアクセス可能です。市内の移動にはバスが便利ですが、観光シーズンは混雑するため、地下鉄や徒歩、レンタサイクルも検討するとよいでしょう。
        </p>
      </section>
    </div>
  );
}

// 沖縄の特化した情報
function OkinawaDetails() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-xl font-semibold">沖縄の魅力</h3>
        <p className="text-gray-700">
          沖縄は、日本最南端の県で、亜熱帯気候に属しています。エメラルドグリーンの海と白い砂浜、独自の文化や歴史、豊かな自然が魅力です。琉球王国の歴史を感じる史跡や、美しいビーチでのマリンアクティビティ、独特な沖縄料理など、本土とは異なる魅力があります。
        </p>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">おすすめの観光スポット</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <span className="font-medium">首里城</span> - 琉球王国の政治・文化の中心だった城。2019年に火災で焼失しましたが、復元作業が進められています。
          </li>
          <li>
            <span className="font-medium">美ら海水族館</span> - 世界最大級の水槽を持つ水族館。ジンベエザメやマンタなど、沖縄の海の生き物を間近で見ることができます。
          </li>
          <li>
            <span className="font-medium">古宇利島</span> - エメラルドグリーンの海に囲まれた小さな島。古宇利大橋からの景色は絶景です。
          </li>
          <li>
            <span className="font-medium">万座毛</span> - 象の鼻のような形をした断崖絶壁。青い海と空のコントラストが美しい景勝地です。
          </li>
          <li>
            <span className="font-medium">国際通り</span> - 那覇市の中心部にある約1.6kmの通り。沖縄の食や文化を体験できるスポットが集まっています。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">グルメ情報</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <span className="font-medium">沖縄そば</span> - 豚肉や三枚肉、かまぼこなどをトッピングした沖縄の郷土料理。
          </li>
          <li>
            <span className="font-medium">ゴーヤーチャンプルー</span> - ゴーヤー、豆腐、卵、豚肉などを炒めた沖縄の代表的な料理。
          </li>
          <li>
            <span className="font-medium">海ぶどう</span> - プチプチとした食感が特徴的な海藻。醤油や酢味噌で食べます。
          </li>
          <li>
            <span className="font-medium">サーターアンダギー</span> - 沖縄の伝統的なドーナツ。外はカリッと、中はしっとりとした食感です。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">アクセス情報</h3>
        <p className="text-gray-700">
          東京から飛行機で約2時間30分、大阪から約2時間でアクセス可能です。沖縄本島内の移動にはレンタカーやバスが便利ですが、那覇市内はモノレールも利用できます。離島へは船やフェリー、飛行機でアクセスします。
        </p>
      </section>
    </div>
  );
}

// 北海道の特化した情報
function HokkaidoDetails() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-xl font-semibold">北海道の魅力</h3>
        <p className="text-gray-700">
          北海道は、日本最北の島で、広大な自然と四季折々の美しい景観が魅力です。夏は涼しく過ごしやすく、冬は雪景色とウィンタースポーツが楽しめます。新鮮な海の幸や農産物を使った美味しい食べ物、温泉など、自然の恵みを満喫できる場所です。
        </p>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">おすすめの観光スポット</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <span className="font-medium">富良野・美瑛</span> - 丘陵地帯に広がる美しい畑の風景。夏にはラベンダー畑が一面に広がります。
          </li>
          <li>
            <span className="font-medium">知床半島</span> - 世界自然遺産に登録された原生林と豊かな生態系が残る地域。
          </li>
          <li>
            <span className="font-medium">洞爺湖</span> - カルデラ湖として知られる美しい湖。周辺には温泉地があります。
          </li>
          <li>
            <span className="font-medium">小樽運河</span> - レンガ造りの倉庫群が並ぶ運河。ノスタルジックな雰囲気が漂います。
          </li>
          <li>
            <span className="font-medium">札幌市時計台</span> - 札幌のシンボル的存在。明治時代に建てられた歴史的建造物です。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">グルメ情報</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <span className="font-medium">海鮮料理</span> - カニ、ウニ、イクラなど、新鮮な海の幸を使った料理が楽しめます。
          </li>
          <li>
            <span className="font-medium">ジンギスカン</span> - 羊肉を特殊な鍋で野菜と一緒に焼いて食べる北海道の郷土料理。
          </li>
          <li>
            <span className="font-medium">スープカレー</span> - 札幌発祥のスパイシーなスープにカレーの風味を加えた料理。
          </li>
          <li>
            <span className="font-medium">ソフトクリーム</span> - 北海道の新鮮な牛乳を使った濃厚なソフトクリーム。
          </li>
          <li>
            <span className="font-medium">ラーメン</span> - 札幌、旭川、函館など、各地域で特色のあるラーメンが楽しめます。
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">アクセス情報</h3>
        <p className="text-gray-700">
          東京から飛行機で約1時間30分、新幹線で約4時間でアクセス可能です。北海道内の移動は広大なため、レンタカーが便利ですが、主要都市間は鉄道やバスも利用できます。冬季は雪による交通障害に注意が必要です。
        </p>
      </section>
    </div>
  );
}

// デフォルトの情報（特定の旅行先に対応していない場合）
function DefaultDetails() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-xl font-semibold">この地域の魅力</h3>
        <p className="text-gray-700">
          日本には、四季折々の美しい自然、豊かな歴史と文化、多彩なグルメなど、様々な魅力があります。各地域には独自の特色があり、訪れる価値のある観光スポットが数多く存在します。
        </p>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">おすすめの過ごし方</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>地元の観光案内所で最新の情報を入手する</li>
          <li>地域の特産品や郷土料理を味わう</li>
          <li>季節に合わせたアクティビティを体験する</li>
          <li>地元の人との交流を楽しむ</li>
        </ul>
      </section>
    </div>
  );
}
