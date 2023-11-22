---
cushionMessage: "このページにはnsfwコンテンツがありそうでありません。無駄かもしれませんがこのまま閲覧しますか？"
cushionYes: "OK, Go the adventure"
cushionNo: "Return Yahoo!JP Kids"
cushionNoHref: "https://kids.yahoo.co.jp/"
---
# nsfw article sample

## エッチなのはダメ！死刑！！
実は社会的にはエッチなのってダメなんですよね。
でも記事は書きたい……そんなMarcoの魂の叫びを聴いてMarco3jpは動きました。
完全に実装を書き換え、そしてやってきた[Front Matter](https://mdxjs.com/guides/frontmatter/)さん。

## そしてその設計
isNSFWという感じでフラグを建てるのもありかなぁと思ったんですがやめました。
クッションウォール的なものって結構色々ありそうだなあと思って、ちょっと内容が尖った話とか、ネタバレ注意とか、そういった目的にも使えるかなぁと。
『nsfwであるか否か』というのはタグなりで情報を付加するべきもので、クッションウォールのメッセージとは切り離されたほうが柔軟かもなという感じです。
