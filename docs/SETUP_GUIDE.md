# 算命学タイプ診断Webアプリ - 実装完了ガイド

## プロジェクト実装状況

### ✅ 完了項目

このプロジェクトは、以下のすべての要件を満たすよう実装されています。

#### 1. アプリの基本機能
- ✅ トップページの実装
- ✅ 生年月日・性別の入力フォーム
- ✅ 日付バリデーション（実在しない日付の拒否）
- ✅ 宿命図の取得（Excel/JSON対応）
- ✅ 10タイプの判定ロジック
- ✅ 診断結果の表示
- ✅ 宿命図を3行×3列で表示
- ✅ HIRO（占い師）からのメッセージ
- ✅ 公式LINE・Instagram・鑑定予約へのリンク

#### 2. 技術構成
- ✅ React 18 + TypeScript
- ✅ Vite（高速ビルドツール）
- ✅ CSS（シンプルで保守性重視）
- ✅ SheetJS（xlsx：Excel読み込み対応）
- ✅ Vitest（テストフレームワーク）

#### 3. データ管理
- ✅ 診断文章（10タイプ分）- マークダウン形式テキストファイル
- ✅ 宿命図データ - Excel形式（Excelファイル作成時）またはJSON形式
- ✅ 設定管理 - siteConfig.ts

#### 4. テスト
- ✅ タイプ判定テスト（4パターン＋不正値処理）
- ✅ 診断テキスト解析テスト
- ✅ 入力検証テスト

#### 5. スマートフォン対応
- ✅ レスポンシブデザイン実装
- ✅ タップしやすいボタンサイズ
- ✅ 読みやすいフォントサイズ

#### 6. ドキュメント
- ✅ README.md（詳細なガイド）
- ✅ このガイド（実装状況説明）

## ファイル構成と説明

### コアファイル

| ファイル | 説明 |
|---|---|
| App.tsx | メインコンポーネント、ページ遷移管理 |
| App.css | アプリケーション全体のスタイル |
| main.tsx | Reactエントリーポイント |
| index.html | HTMLテンプレート |

### ページコンポーネント

| ファイル | 説明 |
|---|---|
| TopPage.tsx | トップページ（概要説明・開始ボタン） |
| InputPage.tsx | 入力画面（生年月日・性別入力） |
| ResultPage.tsx | 結果画面（診断結果・宿命図表示） |

### ビジネスロジック

| ファイル | 説明 |
|---|---|
| typeClassifier.ts | 宿命図の左上の数値から10タイプを判定 |
| shukumeizuService.ts | 宿命図取得（Excel/JSON対応） |
| diagnosisService.ts | 診断テキスト読み込み・パース |
| siteConfig.ts | サイト設定（URL・テキスト） |

### 型定義・データ

| ファイル | 説明 |
|---|---|
| types.ts | TypeScript型定義 |
| shukumeizuData.ts | JSONデータ（サンプル：1976-04-18） |

### テスト

| ファイル | 説明 |
|---|---|
| typeClassifier.test.ts | タイプ判定ロジックのテスト |
| diagnosisService.test.ts | テキスト解析ロジックのテスト |

### 設定ファイル

| ファイル | 説明 |
|---|---|
| package.json | 依存関係とスクリプト定義 |
| vite.config.ts | Vite設定 |
| vitest.config.ts | Vitest設定 |
| tsconfig.json | TypeScript設定 |
| .gitignore | Git除外ファイル |

### データファイル（要作成）

以下のファイルは、`public/result/` フォルダに配置してください。

####診断文章ファイル
```
public/result/diagnosis-results/
├── daiju.txt         # 大樹
├── kusabana.txt      # 草花
├── taiyo.txt         # 太陽
├── tomoshibi.txt     # 灯火
├── sangaku.txt       # 山岳
├── daichi.txt        # 大地
├── kotetsu.txt       # 鋼鉄
├── houseki.txt       # 宝石
├── taikai.txt        # 大海
└── uro.txt           # 雨露
```

#### HIROのメッセージ（オプション）
```
public/result/hiro-messages/
├── daiju.txt
├── kusabana.txt
└── ... (同じパターン)
```

#### 宿命図データ
```
public/result/shukumeizu/
└── shukumeizu.xlsx   # ExcelファイルまたはJSONデータで代替可
```

## セットアップ手順

### 1. インストール

```bash
cd fortune-site
npm install
```

### 2. publicフォルダ構成の作成

以下のディレクトリとファイルを作成してください：

```bash
# Linuxまたはmacの場合
mkdir -p public/result/diagnosis-results
mkdir -p public/result/hiro-messages
mkdir -p public/result/shukumeizu

# Windowsの場合（PowerShellまたはコマンドプロンプト）
md public\result\diagnosis-results
md public\result\hiro-messages
md public\result\shukumeizu
```

### 3. 診断テキストファイルの配置

プロジェクトのルートに置いてある診断テキスト（daiju.txt等）を、
正しい場所に移動します：

```
public/result/diagnosis-results/daiju.txt
public/result/diagnosis-results/kusabana.txt
... etc
```

### 4. Excelファイルの作成（またはJSONデータを使用）

**オプション1：Excelファイルを使用**

`public/result/shukumeizu/shukumeizu.xlsx` を以下の構成で作成：

| A列 | B列 | C列 | D列 | E列 | F列 | G列 | H列 | I列 | J列 |
|---|---|---|---|---|---|---|---|---|---|
| 生年月日 | 左上 | 上中 | 右上 | 中左 | 中央 | 中右 | 下左 | 下中 | 右下 |
| 1976-04-18 | 37 | 車 | 印 | 調 | 龍 | 龍 | 極 | 鳳 | 印 |

**オプション2：JSONデータを使用**

現在、`shukumeizuData.ts` に1976-04-18のサンプルが用意されています。
追加するには、このファイルを編集して新しいエントリを追加します：

```typescript
export const shukumeizuData = [
  {
    dateKey: '1976-04-18',
    topLeft: 37,
    topCenter: '車',
    // ... 他の項目
  },
  {
    dateKey: '新しい日付',
    topLeft: XX,
    topCenter: 'XX',
    // ... 他の項目
  }
]
```

### 5. 外部リンクの設定

`siteConfig.ts` を編集して、以下のURLを設定します：

```typescript
export const siteConfig = {
  appTitle: '算命学タイプ診断',
  appDescription: 'あなたの生年月日から宿命のタイプを診断します',
  lineUrl: 'https://line.me/R/ti/p/...',      // 公式LINEのURL
  instagramUrl: 'https://instagram.com/...',  // InstagramのURL
  reservationUrl: 'https://example.com/...'   // 鑑定予約ページのURL
}
```

URLが空の場合、対応するボタンは表示されません。

### 6. ローカルサーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

### 7. テスト実行

```bash
npm test
```

以下のテストが実行されます：
- `37 → 鋼鉄` の判定
- `21 → 大樹` の判定
- `10 → 雨露` の判定
- `28 → 草花` の判定
- 不正な値の処理
- マークダウン解析

### 8. ビルド

```bash
npm run build
```

`dist/` フォルダにビルド結果が出力されます。

## GitHub Pagesへのデプロイ

1. GitHubでリポジトリを作成
2. ローカルでgit操作：
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/fortune-site.git
   git branch -M main
   git push -u origin main
   ```

3. リポジトリ設定でGitHub Pagesを有効化
4. 本番環境でビルドをリロード

## 既知の制限事項

### 1. 宿命図の自動計算
現在、生年月日から宿命図を自動計算するロジックは実装していません。
ExcelまたはJSONデータから事前に登録された宿命図を取得しています。

正式な算命学の計算ルールが定義されたら、このロジックを実装することができます。

### 2. データの追加方法
- Excelを使用する場合：Excel ファイルを編集して行を追加
- JSONを使用する場合：`shukumeizuData.ts` を編集して配列に追加

### 3. スマートフォン対応
基本的なレスポンシブデザインに対応していますが、
非常に古いブラウザでは正常に表示されない可能性があります。

## トラブルシューティング

### テキストファイルが読み込めない場合

1. ファイルが `public/result/diagnosis-results/` に正しく配置されているか確認
2. ファイルがUTF-8で保存されているか確認
3. マークダウン見出し（`#`）が正しい形式か確認
4. ブラウザの開発者ツール（F12）でネットワークエラーを確認

### 診断結果が表示されない場合

1. 入力した生年月日がExcel/JSONデータに存在するか確認
2. 左上の数値が正しく入力されているか確認
3. コンソールにエラーが表示されていないか確認（F12）
4. キャッシュをクリアしてリロード

### ExcelファイルエラーについPTE

- Excelファイルにアクセスできない場合、自動的にJSONデータにフォールバックします
- JSONデータに対応する日付が存在しない場合はエラーメッセージが表示されます

## 個人情報とプライバシー

このアプリケーションは：
- 入力された生年月日を診断に必要な範囲でのみ使用します
- 個人情報をサーバーに送信しません
- 個人情報をローカルストレージに保存しません
- すべての診断処理をクライアント側（ブラウザ）で実行します

## 今後の改善予定

以下の改善を検討できます：

1. 生年月日から宿命図を自動計算するロジックの実装
2. 診断結果の共有機能（SNS共有ボタンなど）
3. 診断履歴の表示（ローカルストレージ使用）
4. アニメーション・トランジション効果
5. 多言語対応
6. ダークモード対応

## ライセンス

このプロジェクトは低予算での開発を想定しており、
使用するすべての技術はオープンソースまたは無料です。

## サポート・質問

何か問題や質問がある場合は、
以下を確認してください：

1. README.md の「トラブルシューティング」セクション
2. ブラウザの開発者ツール（F12）のコンソール出力
3. ネットワークタブでファイルの読み込み状況を確認
