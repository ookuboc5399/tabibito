import Link from "next/link";
import { FaSearch, FaUser } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              <span className="text-3xl">旅人</span>
              <span className="ml-2 text-sm text-gray-500">あなたの旅がはじまる場所</span>
            </Link>
          </div>

          {/* 検索・マイページ・メニュー */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="検索">
              <FaSearch className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="マイページ">
              <FaUser className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="メニュー" className="md:hidden">
              <HiMenu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* カテゴリナビゲーション */}
        <nav className="mt-4 hidden md:block">
          <ul className="flex space-x-6 text-sm">
            <li>
              <Link href="/areas" className="hover:text-primary">
                エリアから探す
              </Link>
            </li>
            <li>
              <Link href="/plans" className="hover:text-primary">
                旅行プランから探す
              </Link>
            </li>
            <li>
              <Link href="/tourism" className="hover:text-primary">
                観光情報
              </Link>
            </li>
            <li>
              <Link href="/onsen" className="hover:text-primary">
                温泉ガイド
              </Link>
            </li>
            <li>
              <Link href="/accommodations" className="hover:text-primary">
                旅館・ホテルを探す
              </Link>
            </li>
            <li>
              <Link href="/restaurants" className="hover:text-primary">
                飲食店を探す
              </Link>
            </li>
            <li>
              <Link href="/activities" className="hover:text-primary">
                レジャーを探す
              </Link>
            </li>
            <li>
              <Link href="/solo" className="hover:text-primary">
                一人旅
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
