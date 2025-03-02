import Image from "next/image";
import Link from "next/link";
import { News } from "@/types/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.id}`}>
      <Card className="flex h-full overflow-hidden transition-all hover:shadow-md">
        {news.image_url && (
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              className="object-cover"
              style={{ position: "absolute" }}
            />
          </div>
        )}
        <CardContent className="flex flex-col justify-between p-4">
          <div>
            <h3 className="line-clamp-2 font-medium">{news.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {news.content}
            </p>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {formatDate(news.published_at)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
