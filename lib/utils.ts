import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwindのクラス名を結合するためのユーティリティ関数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 日付をフォーマットするためのユーティリティ関数
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}年${month}月${day}日`;
}

// 価格をフォーマットするためのユーティリティ関数
export function formatPrice(price: number): string {
  return price.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
}
