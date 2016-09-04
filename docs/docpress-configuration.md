# docpress Configuration

docpressのサンプルはキレイな色使いがされていますが、デフォルトでは白黒のみです。  
docpressの作者よりcssが提供されているので、それを参照するようにしてあげると同じ色使いになります。

docpressの設定はdocpress.jsonに書きます。

##### `docpress.json`
<!-- {.file-heading} -->

```json
{
  "css": [
    "http://ricostacruz.com/docpress-rsc/style.css",
    "docs/assets/custom.css"
  ],
  "markdown": {
    "typographer": true,
    "plugins": {
      "decorate": {},
      "emoji": {}
    }
  },
  "plugins": {
    "docpress-core": {},
    "docpress-base": {}
  }
}
```

すこしの手間でキレイにHTML化して見栄えの良いサイトになるので、よさ気ですゼ:sunglasses:

## plugins
docpressはmarkdownの装飾やコンポーネントの追加に、markdown-itを冠したパッケージを導入できるみたいです。

[markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)を導入してみました。

:smile:

> Classic markup: :wink:  :cry:  :laughing:  :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)
