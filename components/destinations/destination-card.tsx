import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/types/supabase";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={destination.image_url}
            alt={destination.name}
            fill
            className="object-cover"
            style={{ position: "absolute" }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h3 className="text-lg font-semibold">{destination.name}</h3>
            <p className="text-sm">{destination.prefecture}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="line-clamp-2 text-sm text-gray-600">{destination.description}</p>
        </CardContent>
        <CardFooter className="border-t p-4 text-sm text-gray-500">
          詳細を見る
        </CardFooter>
      </Card>
    </Link>
  );
}
