import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* ロゴと説明 */}
          <div className="mb-8 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              旅人
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              旅人は、日本全国の魅力的な旅行先、宿泊施設、レストラン、アクティビティなどの情報を提供する旅行情報サイトです。あなたの素敵な旅のお手伝いをします。
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* リンク1 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">旅を探す</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/areas" className="text-gray-600 hover:text-primary">
                  エリアから探す
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-gray-600 hover:text-primary">
                  旅行プランから探す
                </Link>
              </li>
              <li>
                <Link href="/tourism" className="text-gray-600 hover:text-primary">
                  観光情報
                </Link>
              </li>
              <li>
                <Link href="/onsen" className="text-gray-600 hover:text-primary">
                  温泉ガイド
                </Link>
              </li>
              <li>
                <Link href="/solo" className="text-gray-600 hover:text-primary">
                  一人旅
                </Link>
              </li>
            </ul>
          </div>

          {/* リンク2 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">施設を探す</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/accommodations" className="text-gray-600 hover:text-primary">
                  旅館・ホテル
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-gray-600 hover:text-primary">
                  飲食店
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-600 hover:text-primary">
                  レジャー
                </Link>
              </li>
            </ul>
          </div>

          {/* リンク3 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">旅人について</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  サイトについて
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} 旅人 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
