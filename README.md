# electron
<!--{h1:.massive-header.-with-tagline}-->
> twitter client 

自作 Twitterクライアント for Electron!!


## Table of Contents
* [Wath is it](#what-is-it)
* [Build](#build)
* [Document](#document)
* [Inpressions](#inpressions)

## What is it
[WEB+DB PRESS Vol.94](http://gihyo.jp/magazine/wdpress/archive/2016/vol94)の **"作って学ぶElectron Webの技術でデスクトップアプリ！"** を実践したプロジェクト。

ソースコードはgihyo.jpの記事サポートページに公開されています。  
コメントが書かれてないので、記事を読まないと初心者には理解できないと思います。

このプロジェクトもほぼ同じコードとなっていますが、自分なりのコメントを追加しています。

#### 作って学ぶElectron Webの技術でデスクトップアプリ！:copyright:

> Electronを利用すると，JavaScript，HTML，CSSなどWebの技術を利用してデスクトップアプリを作成できます。
> GitHubが開発していて，Atomエディタに使われているほか，Visual Studio Codeなどにも利用されています。
> 本特集では，実際にElectronを使ってアプリを開発しているエンジニアにより，Electronの基礎知識からはじめ，実際にサンプルアプリを作成して主要なAPIの使い方，デバッグ／テスト手法，そしてアプリを配布するための手順まで解説します。


## Build
[Node.js](https://nodejs.org/en/)と、デスクトップ・アプリケーションを作成できるNode.jsフレームワーク[Electron](http://electron.atom.io/)を使って作成します。

Electronは、JavaScriptとHTMLで実装します。
HTMLコンポーネントを作成する[React](https://facebook.github.io/react/)フレームワークも使います。

### Dependencies
* "babel-plugin-transform-react-jsx": "^6.8.0",
* "babel-register": "^6.14.0",
* "photon": "git+https://github.com/connors/photon.git",
* "react": "^15.3.1",
* "react-dom": "^15.3.1",
* "twit": "^2.2.4"

パッケージのversionに"^"が入っている場合は、最新にアップデートされるらしいです。  
実際に開発して公開などする場合は、固定のバージョンを指定するようにしたほうが良さそうです。

### Build command

npmで依存パッケージをDLできます。
docpressも依存に追加しているのでDLされます。

```sh
npm i
```

#### 実行コマンド
package.jsonに記述していますが、npmのscripts設定からelectronを起動しています。
```sh
npm run start
```

## Document
ついでに[docpress](http://docpress.github.io/index.html)というMarkdownで書くwebsite generatorが紹介されていたので、ドキュメントに使ってみました。

docpress configuration
[Continue →](docs/docpress-configuration.md)
<!--{p:.pull-box}-->

## Impressions
ちょうど個人的にElectronを勉強してたところでした。  
この記事は、Node.jsとそのパッケージ管理ソフト[npm](https://www.npmjs.com/)も、React.jsも実践できるのでいい教材です。  
  
Electronはそう難しくなく、むしろReactの挙動を理解するまでが大変。  
  
以上:sunglasses: :sunglasses: :sunglasses: