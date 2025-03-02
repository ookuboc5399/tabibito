import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold text-primary">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">ページが見つかりません</h2>
      <p className="mb-8 max-w-md text-gray-600">
        お探しのページは存在しないか、移動または削除された可能性があります。
      </p>
      <Link href="/">
        <Button>トップページに戻る</Button>
      </Link>
    </div>
  );
}
