# 旅人（Tabibito）ウェブサイト用画像要件

## トップページのスライダー画像
- サイズ: 1200x800px
- 形式: JPG または PNG
- 必要枚数: 3枚
- 内容:
  1. 浜松の風景（浜松城や浜名湖など）
  2. 京都の風景（金閣寺や清水寺など）
  3. 沖縄の海岸風景（エメラルドグリーンの海と白い砂浜）

## 旅行先カード用画像
- サイズ: 600x400px
- 形式: JPG または PNG
- 必要枚数: 4枚
- 内容:
  1. 浜松の風景
  2. 京都の風景
  3. 沖縄の風景
  4. 北海道の風景

## カテゴリアイコン用画像
- サイズ: 100x100px
- 形式: JPG または PNG
- 必要枚数: 4枚
- 内容:
  1. 旅館・ホテルを表す画像（建物や部屋の内装など）
  2. 飲食店を表す画像（料理や店内の様子など）
  3. レジャーを表す画像（アクティビティやアトラクションなど）
  4. 温泉を表す画像（温泉の湯船や露天風呂など）

## ニュース記事用画像
- サイズ: 300x200px
- 形式: JPG または PNG
- 必要枚数: 2枚
- 内容:
  1. 雑誌の表紙イメージ（「月刊旅人」のイメージ）
  2. 浜松の風景（「旅人FOCAL浜松特集」用）

## 画像の配置場所
これらの画像は以下のディレクトリに配置してください：
```
tabibito/public/images/
```

以下のようなディレクトリ構造を作成することをお勧めします：
```
tabibito/public/images/
  ├── slider/
  │   ├── hamamatsu.jpg
  │   ├── kyoto.jpg
  │   └── okinawa.jpg
  ├── destinations/
  │   ├── hamamatsu.jpg
  │   ├── kyoto.jpg
  │   ├── okinawa.jpg
  │   └── hokkaido.jpg
  ├── categories/
  │   ├── hotel.jpg
  │   ├── restaurant.jpg
  │   ├── leisure.jpg
  │   └── onsen.jpg
  └── news/
      ├── magazine.jpg
      └── hamamatsu-feature.jpg
```

## 画像の使用方法
画像を準備したら、コード内の画像パスを以下のように更新してください：

例：
```jsx
// 変更前
<Image
  src="https://source.unsplash.com/random/1200x800/?hamamatsu,japan"
  alt="浜松ぶらり旅"
  fill
  className="object-cover"
/>

// 変更後
<Image
  src="/images/slider/hamamatsu.jpg"
  alt="浜松ぶらり旅"
  fill
  className="object-cover"
/>
