# Spofityの良いアーティスト紐づけの話

Spotifyのアーティスト管理は王手のレーベルでもあまりうまくありません。
同一のアーティストなのにアーティストページが複数とか、複数人キャラソンから一人のキャラに飛べないとか。
逆にごく一部のコンテンツは非常に丁寧な管理がなされており、導線がスムーズに提供されています。
大したことではないけどまとめてみます。

なおSpofityの内部仕様、レーベル等の内部事情、各アーティストのランキングコントロール（意図的にランキングから外すためのアサイン管理）は知らないので考慮できません。
ただ回遊しづらくてやだなっていういち消費者の気持ちで書いている記事です。

## ユニークなアーティストを作る
- 内部処理がわからないけど、なぜかアーティスト名が同じなのにマージされないケースがある
- 特にイベントの全体楽曲で起こる

### 例

内田真礼さんのメインで使われているアーティストと、コンピ系からリンクされているアーティストが分離している。

<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/4hJl41jTq14yNuc1f3bLe6?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/0aGw90fHQYdtjbpbYB7o5t?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

## キャラクターを分けて書く

### ユニット名がないパターン
- ユニット名がついているわけでもないのに、ひとかたまりのアーティストになっている
- 最近の作品ではほとんどない。サブスク時代ではないものが多いので仕方ないか〜ってなる。

#### 例

<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/32jmUPib1d2M5ctebwTrm1?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

### ユニットがあるパターン
- アイドルコンテンツをはじめとしてユニット名がつけられているとき、括弧書きでキャラクター・CVを記載することが多い
- 個別楽曲に飛べないし、逆に個別楽曲からユニット曲に飛べない

#### 例
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/7ooKPgqUtwO7sOvSuVcYGQ?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/7mY8ccVk7uZgIHmuFCWbw0?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

## コンテンツへの導線を作る
- キャラクター < グループ < コンテンツ というようにコンテンツ単位での回遊がしたいケースもある
- ただコンテンツをアーティストにする例はかなり少なく、たいていは有志プレイリストに頼る形になっている

## ここまでのTipsを満たしている例

電音部(コンテンツ) + 真新宿GR学園(グループ) + 各キャラクター
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/6RCkiaduqPEmXf2MA4bUP6?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

### 部分的に満たしている例

ヴェリタス(グループ) + 各キャラクター
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4hVCukx30GD84bWgDVKTY7?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

初星学園（コンテンツ） + キャラクター
ただソロ曲はともかく[グループ曲](https://open.spotify.com/intl-ja/track/5XsPjGw1ADBcVU0i7mwNb1?si=7b031de815db41d6)はキャラクターを参照していない。
またユニット曲は知る限りまだない？ので、そのときにどうなるかは不明。コンテンツ内の回遊がしやすいのは嬉しい。
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3LUeCKg1Z11Z5kYzM2LPdj?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
