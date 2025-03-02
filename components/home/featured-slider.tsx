"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface FeaturedItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
}

interface FeaturedSliderProps {
  items: FeaturedItem[];
}

export function FeaturedSlider({ items }: FeaturedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 自動スライド
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  // 前のスライドへ
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // 次のスライドへ
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // 特定のスライドへ
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* スライダー */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
              style={{ position: "absolute" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold md:text-3xl">{item.title}</h2>
              <p className="mt-2 text-sm md:text-base">{item.subtitle}</p>
              <Link href={item.link} className="mt-4 inline-block">
                <Button variant="default" size="sm">
                  詳細を見る
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ナビゲーションボタン */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={prevSlide}
        aria-label="前のスライド"
      >
        <FaChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={nextSlide}
        aria-label="次のスライド"
      >
        <FaChevronRight className="h-5 w-5" />
      </Button>

      {/* インジケーター */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`スライド ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
