# Phrase Sprint

ブラウザで遊べる英単語学習向けのタイピングゲームです。HTML / CSS / JavaScript だけで作っているので、そのまま GitHub Pages で公開できます。

## 特徴

- 日本語を見て英単語をタイプ
- レベル0-3でヒント量を変更
- 音声読み上げと効果音を個別にON/OFF
- 文字ごとの読み上げと単語完了時の読み上げ
- ミス記録、苦手単語ランキング、復習モード
- 単語画像の表示に対応

## ファイル構成

- `index.html`: 画面の土台
- `style.css`: レイアウトと見た目
- `game.js`: ゲーム本体
- `data/words.csv`: 単語データ
- `assets/illustrations/manifest.json`: 単語IDと画像ファイル名の対応表
- `assets/illustrations/shared-halloween.png`: テスト用共通画像

## ローカル起動

```bash
npm start
```

そのあとブラウザで `http://localhost:4173` を開いてください。

## 公開

このリポジトリは GitHub Pages でそのまま公開できます.
