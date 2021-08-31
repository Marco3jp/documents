# Frozen X

初回リリース: 2021-09-01
https://github.com/Marco3jp/documents/tree/master/md/tech/frozen-x.md に本体があるはずなので、履歴等はそちらから確認できる。

## はじめに

これは私が遭遇した怪奇現象と、その解決に至るまでの道のりを示したものである。
ただし確実に直ったことを証明したわけではないので、執筆後に再発した場合はまた長い道のりを歩む予定である。

## 怪奇現象の概要

- ランダムなタイミングで操作ができなくなる
  - 本当にランダムなのかは不明ではあるけど、体感だとランダム
- 特徴
  - マウスカーソルのみ動く
  - 描画は更新されている（動画などは流れ続ける）
  - 音声も流れる
  - TTYの移動が可能である
- 発生時によってはXorgがCPUを一つ100%で食い尽くしていた

## 環境

### ハードウェア

- MB Z87-PRO(V EDITION)
- CPU Intel i5-4670
- GPU NVIDIA 1050 ti
- マウス Logicool G703 / Logicool G403（以前）
- キーボード Logicool G105
- モニター構成 43UN700-B(DP to DP), 24GN650-B(HDMI to HDMI)
- 他SATA 未マウントを含むHDD数枚、未マウントSSD
- 他USB
  - 二台のデスクトップ機でデバイス切り替えを容易にするため
    - https://www.amazon.co.jp/gp/product/B072R16Z6S
  - MBのLANがLinux側で扱えたり扱えなかったり謎なのでUSBでつなげて動かしている
    - https://www.amazon.co.jp/gp/product/B013G4C8RE
  - デジタルオーディオ出力をUSB経由させてデバイス切り替えに乗せるため
    - https://www.amazon.co.jp/gp/product/B07NCSNHPG

### ソフトウェア

半年以上まれに遭遇していたのでバージョンあんまり関係ないとは思う

- ArchLinux
- Linux Kernel: 5.13.10-arch1-1
- xorg-server: 1.20.13-2
- xf86-input-libinput: 1.1.0-1
- libinput: 1.18.1-1

## エラーログ

```
[350768.163] (EE) event4  - Logitech G703 LS: client bug: event processing lagging behind by 12ms, your system is too slow
[350789.534] (EE) event4  - Logitech G703 LS: client bug: event processing lagging behind by 27ms, your system is too slow
[350808.110] (EE) client bug: timer event4 debounce: scheduled expiry is in the past (-2ms), your system is too slow
[350808.110] (EE) client bug: timer event4 debounce short: scheduled expiry is in the past (-15ms), your system is too slow
[350818.251] (EE) event4  - Logitech G703 LS: client bug: event processing lagging behind by 12ms, your system is too slow
[350818.334] (EE) event4  - Logitech G703 LS: client bug: event processing lagging behind by 12ms, your system is too slow
[350818.334] (EE) event4  - Logitech G703 LS: WARNING: log rate limit exceeded (5 msgs per 60min). Discarding future messages.
[351151.536] (EE) client bug: timer event4 debounce: scheduled expiry is in the past (-4ms), your system is too slow
[351151.536] (EE) client bug: timer event4 debounce short: scheduled expiry is in the past (-17ms), your system is too slow
[351152.933] (EE) client bug: timer event4 debounce short: scheduled expiry is in the past (-4ms), your system is too slow
[351205.092] (EE) client bug: timer event4 debounce: scheduled expiry is in the past (-0ms), your system is too slow
[351205.092] (EE) client bug: timer event4 debounce short: scheduled expiry is in the past (-13ms), your system is too slow
[351261.099] (EE) client bug: timer event4 debounce: scheduled expiry is in the past (-14ms), your system is too slow
[351261.099] (EE) client bug: timer event4 debounce short: scheduled expiry is in the past (-27ms), your system is too slow
[351428.929] (EE) client bug: timer event4 debounce: scheduled expiry is in the past (-10ms), your system is too slow
[351428.929] (EE) client bug: timer event4 debounce short: scheduled expiry is in the past (-23ms), your system is too slow
[351431.072] (EE) client bug: timer event4 debounce short: scheduled expiry is in the past (-6ms), your system is too slow
[351432.076] (EE) client bug: timer event4 debounce short: scheduled expiry is in the past (-3ms), your system is too slow
```

## 対応

このエラーから対応したことについてのまとめ。エラーには『scheduled expiry is in the past』と『event processing lagging』の2つがある。

### scheduled expiry is in the past

こっちは以下のRedditスレッドがかなり参考になりそう
https://www.reddit.com/r/archlinux/comments/i6mhrl/xorg_using_100_of_1_cpu_core_and_mouse/

チャタリング防止かわからんけどマウス側の機能？でタイマーが信頼できなくなることがあるようで、そこをどう扱うかという話。
libinputのドキュメントにちゃんと設定の書き方とかがあったので、以下のリンクを読みつつ、最終的に下記のようなファイルを作った。

https://wayland.freedesktop.org/libinput/doc/latest/device-quirks.html

`/etc/libinput/local-overrides.quirks`

```ini
[Logitech G703 LS]
MatchName=Logitech G703 LS
ModelBouncingKeys=1
```

### event processing lagging

上記対応後も以下のように出続ける

```
[   124.525] (EE) event5  - Logitech G703 LS: client bug: event processing lagging behind by 13ms, your system is too slow
[   130.094] (EE) event5  - Logitech G703 LS: client bug: event processing lagging behind by 32ms, your system is too slow
[   130.761] (EE) event5  - Logitech G703 LS: client bug: event processing lagging behind by 36ms, your system is too slow
[   180.844] (EE) event5  - Logitech G703 LS: client bug: event processing lagging behind by 11ms, your system is too slow
[   301.856] (II) event5  - Logitech G703 LS: SYN_DROPPED event - some input events have been lost.
```

この状態で使い続けているが上記対応をしたあとは一度も症状が出ておらず、特に問題になっていないのが現状。
他にも以前はなかった現象も起きているので一応下記にまとめておく。

## 対応後に起こっている現象

※以前まで起きていたかは不明なので、対応との関係性は断言できない

### マウスがたまに動かなくなる

理由は不明だが、マウスがたまに動かなくなることがある。
以前のランダムとは異なって、大体が放置した後に操作できなくなることが多い印象。

### マウスを有線接続に変えると接続後の1秒くらいしか操作できない

こちらも理由が不明だが、マウスを無線接続から有線接続切り替えると操作できなくなる。
以下にログは置いておくが、無線で使えば対応できるのでそうしていて根本解決はしていない。（が、解決できるに越したことはない）

#### ログ

無線接続時

```
[704092.501] (II) config/udev: Adding input device Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO (/dev/input/mouse0)
[704092.501] (II) No input driver specified, ignoring this device.
[704092.501] (II) This device may have been added with another device file.
[704092.545] (II) config/udev: Adding input device Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO (/dev/input/event23)
[704092.545] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: Applying InputClass "libinput keyboard catchall"
[704092.545] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: Applying InputClass "system-keyboard"
[704092.545] (II) Using input driver 'libinput' for 'Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO'
[704092.545] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: always reports core events
[704092.545] (**) Option "Device" "/dev/input/event23"
[704092.545] (**) Option "_source" "server/udev"
[704092.546] (II) event23 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: is tagged by udev as: Keyboard
[704092.547] (II) event23 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: device is a keyboard
[704092.547] (II) event23 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: device removed
[704092.564] (II) libinput: Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: needs a virtual subdevice
[704092.564] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.1/0003:046D:C090.0027/input/input54/event23"
[704092.564] (II) XINPUT: Adding extended input device "Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO" (type: MOUSE, id 12)
[704092.565] (**) Option "AccelerationScheme" "none"
[704092.565] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: (accel) selected scheme none/0
[704092.565] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: (accel) acceleration factor: 2.000
[704092.565] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: (accel) acceleration threshold: 4
[704092.566] (II) event23 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: is tagged by udev as: Keyboard
[704092.566] (II) event23 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: device is a keyboard
[704092.567] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: Applying InputClass "libinput keyboard catchall"
[704092.567] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: Applying InputClass "system-keyboard"
[704092.567] (II) Using input driver 'libinput' for 'Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO'
[704092.567] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: always reports core events
[704092.567] (**) Option "Device" "/dev/input/event23"
[704092.567] (**) Option "_source" "_driver/libinput"
[704092.567] (II) libinput: Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: is a virtual subdevice
[704092.567] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.1/0003:046D:C090.0027/input/input54/event23"
[704092.567] (II) XINPUT: Adding extended input device "Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO" (type: KEYBOARD, id 14)
[704092.567] (**) Option "xkb_model" "jp106"
[704092.567] (**) Option "xkb_layout" "jp"
[704092.591] (II) config/udev: Adding input device Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO (/dev/input/event22)
[704092.591] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: Applying InputClass "libinput pointer catchall"
[704092.591] (II) Using input driver 'libinput' for 'Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO'
[704092.591] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: always reports core events
[704092.591] (**) Option "Device" "/dev/input/event22"
[704092.591] (**) Option "_source" "server/udev"
[704092.648] (II) event22 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: is tagged by udev as: Mouse
[704092.649] (II) event22 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: device is a pointer
[704092.649] (II) event22 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: device removed
[704092.681] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.0/0003:046D:C090.0026/input/input53/event22"
[704092.681] (II) XINPUT: Adding extended input device "Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO" (type: MOUSE, id 15)
[704092.681] (**) Option "AccelerationScheme" "none"
[704092.682] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: (accel) selected scheme none/0
[704092.682] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: (accel) acceleration factor: 2.000
[704092.682] (**) Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: (accel) acceleration threshold: 4
[704092.738] (II) event22 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: is tagged by udev as: Mouse
[704092.739] (II) event22 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: device is a pointer
[704092.768] (II) event22 - Logitech G703 LIGHTSPEED Wireless Gaming Mouse w/ HERO: device removed
```

無線接続すると以下

```
[704205.713] (II) config/udev: Adding input device Logitech G703 LS (/dev/input/mouse0)
[704205.713] (**) Logitech G703 LS: Applying InputClass "system-keyboard"
[704205.713] (II) No input driver specified, ignoring this device.
[704205.713] (II) This device may have been added with another device file.
[704205.738] (II) config/udev: Adding input device Logitech G703 LS (/dev/input/event22)
[704205.738] (**) Logitech G703 LS: Applying InputClass "libinput pointer catchall"
[704205.738] (**) Logitech G703 LS: Applying InputClass "libinput keyboard catchall"
[704205.738] (**) Logitech G703 LS: Applying InputClass "system-keyboard"
[704205.738] (II) Using input driver 'libinput' for 'Logitech G703 LS'
[704205.738] (**) Logitech G703 LS: always reports core events
[704205.738] (**) Option "Device" "/dev/input/event22"
[704205.738] (**) Option "_source" "server/udev"
[704205.739] (II) event22 - Logitech G703 LS: is tagged by udev as: Keyboard Mouse
[704205.739] (II) event22 - Logitech G703 LS: device is a pointer
[704205.739] (II) event22 - Logitech G703 LS: device is a keyboard
[704205.739] (II) event22 - Logitech G703 LS: device removed
[704205.754] (II) libinput: Logitech G703 LS: needs a virtual subdevice
[704205.754] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.2/0003:046D:C539.002F/0003:046D:4086.0030/input/input56/event22"
[704205.754] (II) XINPUT: Adding extended input device "Logitech G703 LS" (type: MOUSE, id 12)
[704205.755] (**) Option "AccelerationScheme" "none"
[704205.755] (**) Logitech G703 LS: (accel) selected scheme none/0
[704205.755] (**) Logitech G703 LS: (accel) acceleration factor: 2.000
[704205.755] (**) Logitech G703 LS: (accel) acceleration threshold: 4
[704205.756] (II) event22 - Logitech G703 LS: is tagged by udev as: Keyboard Mouse
[704205.756] (II) event22 - Logitech G703 LS: device is a pointer
[704205.756] (II) event22 - Logitech G703 LS: device is a keyboard
[704205.757] (**) Logitech G703 LS: Applying InputClass "libinput pointer catchall"
[704205.757] (**) Logitech G703 LS: Applying InputClass "libinput keyboard catchall"
[704205.757] (**) Logitech G703 LS: Applying InputClass "system-keyboard"
[704205.757] (II) Using input driver 'libinput' for 'Logitech G703 LS'
[704205.757] (**) Logitech G703 LS: always reports core events
[704205.757] (**) Option "Device" "/dev/input/event22"
[704205.757] (**) Option "_source" "_driver/libinput"
[704205.757] (II) libinput: Logitech G703 LS: is a virtual subdevice
[704205.757] (**) Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.2/0003:046D:C539.002F/0003:046D:4086.0030/input/input56/event22"
[704205.757] (II) XINPUT: Adding extended input device "Logitech G703 LS" (type: KEYBOARD, id 14)
[704205.757] (**) Option "xkb_model" "jp106"
[704205.757] (**) Option "xkb_layout" "jp"
```

差分で見ると以下（デバイス名、イベント名、行頭などを調整しているので、Rawじゃないとだめというなら各自で↑のやつ使ってください）

```diff
config/udev: Adding input device DEVICE_NAME (/dev/input/mouse0)
-DEVICE_NAME: Applying InputClass "system-keyboard"
No input driver specified, ignoring this device.
This device may have been added with another device file.
-config/udev: Adding input device DEVICE_NAME (/dev/input/EVENT_A)
-DEVICE_NAME: Applying InputClass "libinput pointer catchall"
+config/udev: Adding input device DEVICE_NAME (/dev/input/EVENT_B)
DEVICE_NAME: Applying InputClass "libinput keyboard catchall"
DEVICE_NAME: Applying InputClass "system-keyboard"
Using input driver 'libinput' for 'DEVICE_NAME'
DEVICE_NAME: always reports core events
-Option "Device" "/dev/input/EVENT_A"
+Option "Device" "/dev/input/EVENT_B"
Option "_source" "server/udev"
-EVENT_A - DEVICE_NAME: is tagged by udev as: Keyboard Mouse
-EVENT_A - DEVICE_NAME: device is a pointer
-EVENT_A - DEVICE_NAME: device is a keyboard
-EVENT_A - DEVICE_NAME: device removed
+EVENT_B - DEVICE_NAME: is tagged by udev as: Keyboard
+EVENT_B - DEVICE_NAME: device is a keyboard
+EVENT_B - DEVICE_NAME: device removed
libinput: DEVICE_NAME: needs a virtual subdevice
-Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.2/0003:046D:C539.002F/0003:046D:4086.0030/input/input56/EVENT_A"
+Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.1/0003:046D:C090.0027/input/input54/EVENT_B"
XINPUT: Adding extended input device "DEVICE_NAME" (type: MOUSE, id 12)
Option "AccelerationScheme" "none"
DEVICE_NAME: (accel) selected scheme none/0
DEVICE_NAME: (accel) acceleration factor: 2.000
DEVICE_NAME: (accel) acceleration threshold: 4
-EVENT_A - DEVICE_NAME: is tagged by udev as: Keyboard Mouse
-EVENT_A - DEVICE_NAME: device is a pointer
-EVENT_A - DEVICE_NAME: device is a keyboard
-DEVICE_NAME: Applying InputClass "libinput pointer catchall"
+EVENT_B - DEVICE_NAME: is tagged by udev as: Keyboard
+EVENT_B - DEVICE_NAME: device is a keyboard
DEVICE_NAME: Applying InputClass "libinput keyboard catchall"
DEVICE_NAME: Applying InputClass "system-keyboard"
Using input driver 'libinput' for 'DEVICE_NAME'
DEVICE_NAME: always reports core events
-Option "Device" "/dev/input/EVENT_A"
+Option "Device" "/dev/input/EVENT_B"
Option "_source" "_driver/libinput"
libinput: DEVICE_NAME: is a virtual subdevice
-Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.2/0003:046D:C539.002F/0003:046D:4086.0030/input/input56/EVENT_A"
+Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.1/0003:046D:C090.0027/input/input54/EVENT_B"
XINPUT: Adding extended input device "DEVICE_NAME" (type: KEYBOARD, id 14)
Option "xkb_model" "jp106"
Option "xkb_layout" "jp"
+config/udev: Adding input device DEVICE_NAME (/dev/input/EVENT_A)
+DEVICE_NAME: Applying InputClass "libinput pointer catchall"
+Using input driver 'libinput' for 'DEVICE_NAME'
+DEVICE_NAME: always reports core events
+Option "Device" "/dev/input/EVENT_A"
+Option "_source" "server/udev"
+EVENT_A - DEVICE_NAME: is tagged by udev as: Mouse
+EVENT_A - DEVICE_NAME: device is a pointer
+EVENT_A - DEVICE_NAME: device removed
+Option "config_info" "udev:/sys/devices/pci0000:00/0000:00:14.0/usb3/3-2/3-2.1/3-2.1:1.0/0003:046D:C090.0026/input/input53/EVENT_A"
+XINPUT: Adding extended input device "DEVICE_NAME" (type: MOUSE, id 15)
+Option "AccelerationScheme" "none"
+DEVICE_NAME: (accel) selected scheme none/0
+DEVICE_NAME: (accel) acceleration factor: 2.000
+DEVICE_NAME: (accel) acceleration threshold: 4
+EVENT_A - DEVICE_NAME: is tagged by udev as: Mouse
+EVENT_A - DEVICE_NAME: device is a pointer
+EVENT_A - DEVICE_NAME: device removed
```
