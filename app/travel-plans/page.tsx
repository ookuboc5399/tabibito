import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TravelPlansPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダーセクション */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4">
            ← トップページに戻る
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">旅行プラン</h1>
        <p className="text-lg text-gray-600">
          様々な旅行プランをご紹介します。あなたにぴったりの旅行プランを見つけてください。
        </p>
      </div>

      {/* コンテンツセクション */}
      <div className="rounded-lg border p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold text-center">準備中</h2>
        <p className="mb-6 text-center text-gray-700">
          旅行プランページは現在準備中です。<br />
          近日公開予定ですので、しばらくお待ちください。
        </p>
        <div className="flex justify-center">
          <Link href="/">
            <Button>トップページに戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
