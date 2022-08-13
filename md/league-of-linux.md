# League of Linux Marco出張所

**いまのところ成功しておりません！！！**

## これはなに？
- League of Legends という ~異常~ ゲームはプレイヤーが ~おかしなほどに~ 多すぎるのでLinuxでプレイしたいという人も一定数いる
- そのためRedditを中心にLinuxプレイヤーコミュニティーがひっそりと存在し、公式からも認知されている
  - 認知されているだけでサポートはされていない
  - もちろんチートのためのプレイは環境に関係なく禁止されているが、Linuxにおいても通常プレイをする分には特にBANするルールがあるわけではないっぽい
  - とはいえ不安定でAFKを繰り返してしまうとかはWindowsであっても同じくBANされておかしくないので、『通常プレイできる環境を作れる』というのが大前提
- 環境依存も多々あるし基本的に英語ばかりなので、せっかくだし自分がやったことをまとめていくか〜という記事です
- 原稿は https://github.com/Marco3jp/documents/blob/master/md/league-of-linux.md に置かれています（過去の原稿はHistoryをたどってください）

## Linuxネイティブでのトライ
### 環境
#### ハードウェア
- PC
  - CPU: AMD Ryzen 5 PRO 4650G
  - GPU: Radeon Graphics (CPU Onboard Graphics)
- マルチモニタ
  - 4k
  - 2k 144hz

#### ソフトウェア
- Arch Linux
  - GUI: x + xfce
  - Driver: xf86-video-amdgpu
  - OpenGL: mesa + lib32-mesa
- Lutris

#### ほか
- LoLは日本サーバーでプレイしている

### 流れ
基本的には [League of LinuxのWiki](https://www.reddit.com/r/leagueoflinux/wiki/index/#wiki_1_-_.25B6.FE0F_how_to_install_league_of_legends) を参考にしている

1. [Wineの依存関係など](https://github.com/lutris/docs/blob/master/WineDependencies.md#archendeavourosmanjaroother-arch-derivatives)をインストール
2. [LutrisのLoLのページ](https://lutris.net/games/league-of-legends/)からインストールスクリプトを走らせる
  - **注意：ログインはしないこと**
  - インストーラが起動するのでダウンロードボタンを押してダウンロードする
  - その後ネイティブクライアントが起動して更にデータのダウンロードが行われる
  - ダウンロードが終わったあと、 **ログインぜずにクライアントを閉じる**
  - 閉じたのをフックしてスクリプトがまた走るっぽい
3. いい感じに調整を加える (https://www.reddit.com/r/leagueoflinux/wiki/index/#wiki_1c_-_post-install を参考にした)
4. 起動しない orz

### 試行錯誤
#### 起動しない様子
- ゲーム前のクライアントは起動する
- チャンプのピックもできる
- インゲームクライアントのロードが固まって落ちやすい
  - これは再現性が高めだけど絶対ではないかも
- インゲームクライアントのロードが終わると数フレームで操作できなくなる

#### 調べた感じ
- 日本サーバーや韓国サーバー（マルチバイトサーバー？）において同様の現象が発生するらしい
  - https://www.reddit.com/r/leagueoflinux/comments/wg3qe2/cannot_enter_game_on_japanese_server_but_normal/
  - https://www.reddit.com/r/leagueoflinux/comments/w9nz5s/comment/ii3ppc4/?utm_source=reddit&utm_medium=web2x&context=3
- 言語の問題？とのことではあるが、インゲームクライアントの言語をどうにか英語にしてみても変わらず
  - https://www.reddit.com/r/leagueoflinux/comments/rg4sz4/any_way_to_change_the_clientingame_language_using/


## 仮想環境でのトライ
### ソフトウェア
- ↑に書いた Arch Linux
- Virtualbox
  - Windows 10

### 流れ
- インストールも起動もできたけど、ゲームに入るところでクリティカルなエラーが起きたよ〜って落ちる
- VMの判定かなぁと思って https://github.com/hfiref0x/VBoxHardenedLoader とか参考にしようとしたけどうまくいかず塩漬け
