# 算命学タイプ診断Webアプリ

生年月日から、算命学の10種類のタイプを判定し、詳しい診断結果と宿命図を表示するWebアプリです。

## 概要

- **技術スタック**: React 18 + TypeScript + Vite
- **スタイリング**: CSS（占いサイト風・シンプル設計）
- **データ管理**: JSON/Excel形式
- **テスト**: Vitest
- **デプロイ**: GitHub Pagesなどの静的ホスティング

## 10種類のタイプ

| 1桁目 | タイプ名 |
|---|---|
| 1 | 大樹 |
| 2 | 草花 |
| 3 | 太陽 |
| 4 | 灯火 |
| 5 | 山岳 |
| 6 | 大地 |
| 7 | 鋼鉄 |
| 8 | 宝石 |
| 9 | 大海 |
| 0 | 雨露 |

## 開発環境の準備

### 必要な環境

- Node.js 16以上
- npm

### インストール

```bash
# フォルダに移動
cd fortune-site

# 依存関係のインストール
npm install
```

## ローカル起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

生年月日は「yyyymmdd」形式（例：19900415）で入力してください。

## ビルド

```bash
npm run build
```

`dist/` フォルダが生成され、静的ファイルが配置されます。

## テスト実行

```bash
npm test
```

## テスト内容

- **typeClassifier.test.ts**: タイプ判定ロジックのテスト
  - 37 → 鋼鉄
  - 21 → 大樹
  - 10 → 雨露
  - 28 → 草花
  - 不正な値の処理

- **diagnosisService.test.ts**: 診断テキスト解析のテスト
  - マークダウン形式の見出し解析
  - 未設定項目の非表示処理
  - 複数行本文の処理

## データ管理

### 宿命図データ

#### 保存場所
```
public/result/shukumeizu/shukumeizu.xlsx
```

#### データ構造（Excelの列）

| 列 | 内容 | 例 |
|---|---|---|
| A | Excelシリアル値 | 28051 |
| B | 左上の数値 | 37 |
| C | 上段中央 | 車 |
| D | 右上 | 印 |
| E | 中段左 | 調 |
| F | 中段中央 | 龍 |
| G | 中段右 | 龍 |
| H | 下段左 | 極 |
| I | 下段中央 | 鳳 |
| J | 右下 | 印 |

**Excelシリアル値について**
- 1900年1月1日 = 1
- 1976年4月18日 = 28051
- 2026年12月31日 = 46387

例：生年月日「1976年4月18日」を検索する場合、A列でシリアル値「28051」を検索します。

#### データの追加方法

1. `public/result/shukumeizu/shukumeizu.xlsx` をExcelで開く
2. 生年月日をExcelシリアル値に変換する
   - 参考：オンラインツール「Excel日付シリアル値計算機」や、別途Excelで `=DATE(1976,4,18)-DATE(1900,1,1)+1` で計算
3. 新しい行にシリアル値と対応する宿命図の数値・文字を入力
4. ファイルを保存
5. サイトをリロード（キャッシュ削除が必要な場合がある）

#### JSONデータ（フォールバック）

Excelが読み込めない場合は、`shukumeizuData.ts` に定義されたJSONデータを使用します。

```typescript
export const shukumeizuData = [
  {
    serialNumber: 28051,
    topLeft: 37,
    topCenter: '車',
    // ... その他の項目
  }
]
```

JSONデータを追加する場合は、このファイルを編集してください。
**serialNumber には Excelシリアル値を使用してください。**


### 診断文章

#### 保存場所
```
public/result/diagnosis-results/
```

#### ファイル一覧

各タイプごとのテキストファイル：
- daiju.txt（大樹）
- kusabana.txt（草花）
- taiyo.txt（太陽）
- tomoshibi.txt（灯火）
- sangaku.txt（山岳）
- daichi.txt（大地）
- kotetsu.txt（鋼鉄）
- houseki.txt（宝石）
- taikai.txt（大海）
- uro.txt（雨露）

#### 記述形式

マークダウン形式で記述します。`#`で始まる行が見出しになります。
各ファイルには以下のセクションを含める必要があります（セクションが空の場合は非表示になります）：

```markdown
# 基本性格
ここに基本性格の文章を記載します。

# 才能
ここに才能の文章を記載します。

# 適職
ここに適職の文章を記載します。

# 恋愛・結婚
ここに恋愛・結婚の文章を記載します。

# お金
ここにお金の文章を記載します。

# 家族・子育て
ここに家族・子育ての文章を記載します。

# 運気
ここに運気の文章を記載します。

# HIRO（占い師）から一言
ここにHIROからのメッセージを記載します。
```

**重要：「HIRO（占い師）から一言」セクションについて**
- 診断テキストファイルの最後に「# HIRO（占い師）から一言」のセクションを追加してください
- このセクションの内容が結果画面に特別に表示されます
- HTMLタグ（`<p>`等）は自動的に追加されるため、プレーンテキストで記述してください

#### 編集方法

1. `public/result/diagnosis-results/` のテキストファイルをエディタで開く
2. マークダウン形式で内容を編集
3. 「# HIRO（占い師）から一言」セクションを追加（結果画面に特別に表示されます）
4. ファイルを保存
5. サイトをリロード

### HIROからのメッセージ

現在、HIROからのメッセージは診断テキストファイル内の「# HIRO（占い師）から一言」セクションとして実装されています。

診断テキストの最後に以下のように記述してください：

```markdown
# HIRO（占い師）から一言
このタイプの方へのメッセージを記載します。
複数行でも構いません。
段落ごとに改行してください。
```

### 外部リンク（LINE・Instagram・鑑定予約）

#### 設定ファイル
```
src/siteConfig.ts
```

#### 設定方法

`siteConfig.ts` を編集して、URLを設定します。

```typescript
export const siteConfig = {
  appTitle: '算命学タイプ診断',
  appDescription: 'あなたの生年月日から宿命のタイプを診断します',
  lineUrl: 'https://line.me/R/ti/p/...',          // 公式LINEのURL
  instagramUrl: 'https://instagram.com/...',      // InstagramのURL
  reservationUrl: 'https://example.com/booking'   // 鑑定予約のURL
}
```

URLが空文字の場合、対応するボタンは非表示になります。

## ファイル構成

```
fortune-site/
├── public/                           # 公開ファイル
│   └── result/
│       ├── shukumeizu/
│       │   └── shukumeizu.xlsx       # 宿命図データ（Excel）
│       └── diagnosis-results/        # 診断文章（HIROメッセージ含む）
│           ├── daiju.txt
│           ├── kusabana.txt
│           ├── taiyo.txt
│           ├── tomoshibi.txt
│           ├── sangaku.txt
│           ├── daichi.txt
│           ├── kotetsu.txt
│           ├── houseki.txt
│           ├── taikai.txt
│           └── uro.txt
│
├── src/
│   ├── App.tsx                       # メインアプリケーション
│   ├── styles.css                    # スタイル（占いサイト風）
│   ├── main.tsx                      # エントリーポイント
│   ├── types/
│   │   └── index.ts                  # 型定義
│   ├── config/
│   │   └── siteConfig.ts             # サイト設定
│   ├── services/
│   │   ├── typeClassifier.ts         # タイプ判定関数
│   │   ├── shukumeizuService.ts      # 宿命図取得サービス
│   │   ├── shukumeizuData.ts         # JSONデータ（フォールバック）
│   │   └── diagnosisService.ts       # 診断テキスト読み込みサービス
│   ├── components/
│   │   ├── TopPage.tsx               # トップページコンポーネント
│   │   ├── InputPage.tsx             # 入力ページコンポーネント
│   │   └── ResultPage.tsx            # 結果ページコンポーネント
│   └── tests/
│       ├── typeClassifier.test.ts    # タイプ判定テスト
│       └── diagnosisService.test.ts  # 診断サービステスト
│
├── index.html                        # HTMLテンプレート
├── package.json                      # 依存関係と実行スクリプト
├── tsconfig.json                     # TypeScript設定
├── vite.config.ts                    # Vite設定
├── .gitignore                        # Git除外設定
└── README.md                         # このファイル
```

## デプロイ方法

### GitHub Pagesへのデプロイ

1. GitHubでリポジトリを作成
2. ローカルでコミット・プッシュ
3. リポジトリの設定で、GitHub Pagesを `dist/` フォルダから配信するよう設定
4. `npm run build` でビルド
5. 自動デプロイ設定（GitHub Actionsなど）を構成

### その他の静的ホスティング

Netlify、Vercel、Cloudflare Pagesなども利用できます。ビルド後の `dist/` フォルダを配信してください。

## 既知の制限と未確定仕様

### 宿命図の算出ロジック

現時点では、生年月日から宿命図を自動計算するロジックは実装していません。
代わりに、ExcelまたはJSONデータから事前に登録された宿命図を取得しています。

正式な算命学の計算ルールがすべて定義されていないため、
今後、計算ロジックが確定した段階で、Excelデータを別途計算処理に置き換えることができます。

### スマートフォン対応

基本的なレスポンシブデザインに対応していますが、
古いブラウザや特殊な端末では表示が崩れる可能性があります。

## トラブルシューティング

### テキストファイルが読み込めない

- ファイルのパスが正しいか確認してください
- ファイルはUTF-8で保存してください
- マークダウン見出し（`#`）の形式が正しいか確認してください

### Excelファイルが読み込めない

- JSONデータが自動的にフォールバックされます
- 対応する日付がJSONデータに存在するか確認してください
- Excelを使用する場合は、`shukumeizuData.ts` のデータと同じ構造を保つ必要があります

### 診断結果が表示されない

- ブラウザの開発者ツール（F12）でコンソールエラーを確認してください
- 入力した生年月日がデータベースに存在するか確認してください
- キャッシュをクリアしてサイトを再読み込みしてください

## ライセンス

このプロジェクトは低予算での開発を想定しています。
使用技術はすべてオープンソースまたは無料です。

## 個人情報について

このアプリは入力された生年月日を診断に必要な範囲でのみ使用します。
個人情報の保存やサーバーへの送信は行いません。
すべての診断処理はクライアント側（ブラウザ）で実行されます。
