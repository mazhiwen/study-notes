# webRTC

[WebRTC 从实战到未来！- 1 前端如何实现一个最简单的音视频通话？🔥](https://juejin.cn/post/7165539003465531399#heading-9)

[WebRTC 从实战到未来！- 2 迎接风口，前端必学的技术🔥](<https://juejin.cn/post/7151932832041058340>)

[疫情当下，远程工作兴起！前端音视频通话？学！🔥](https://juejin.cn/post/7170767923005358094)

[MDN - WebRTC - API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)

[如何实现一个基于WebRTC的音视频通信系统](https://juejin.cn/post/7169557366587785229)

## 概念

WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

需要注意的是，WebRTC 只能在 HTTPS 协议或者 localhost 下使用，如果是 HTTP 协议，会报错。

## 场景

直播
游戏
视频会议/在线教育
屏幕共享/远程控制
等等等

## getUserMedia - 获取媒体流

我们主要通过navigator.mediaDevices.getUserMedia(constraints)这个 api 来获取媒体流，这个方法接收一个配置对象作为参数，配置对象中包含了媒体流的类型，以及媒体流的分辨率等信息。

```js
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  // 将媒体流设置到 video 标签上播放
  playLocalStream(stream)
}

// 播放本地视频流
function playLocalStream(stream: MediaStream) {
  const videoEl = document.getElementById('localVideo') as HTMLVideoElement
  videoEl.srcObject = stream
}

getLocalStream({
  audio: false,
  video: true,
})
```

## 拍照

我们通过获取已经在播放媒体流的 video 标签，然后将其绘制到 canvas 上，再通过 toDataURL 方法将 canvas 转换为 base64 图片。

```html
<video id="localVideo" autoplay playsinline muted></video>
<div v-for="(item,index) in imgList.length" :key="index" class="item">
  <img :src="item" alt="" />
</div>
```

```js
function takePhoto() {
  const videoEl = document.getElementById('localVideo') as HTMLVideoElement
  const canvas = document.createElement('canvas')
  canvas.width = videoEl.videoWidth
  canvas.height = videoEl.videoHeight
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
  imgList.value.push(canvas.toDataURL('image/png'))
  console.log('🚀🚀🚀 / imgList', imgList)

  // 添加滤镜
  const filterList = [
    'blur(5px)', // 模糊
    'brightness(0.5)', // 亮度
    'contrast(200%)', // 对比度
    'grayscale(100%)', // 灰度
    'hue-rotate(90deg)', // 色相旋转
    'invert(100%)', // 反色
    'opacity(90%)', // 透明度
    'saturate(200%)', // 饱和度
    'saturate(20%)', // 饱和度
    'sepia(100%)', // 褐色
    'drop-shadow(4px 4px 8px blue)', // 阴影
  ]

  for (let i = 0; i < filterList.length; i++) {
    ctx.filter = filterList[i]
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
    imgList.value.push(canvas.toDataURL('image/png'))
  }
}

```

## 切换不同摄像头

这里我们把获取到的设备列表信息打印看看，我们可以看到每个设备都有一个 deviceId，我们就是通过这个 id 来切换设备的。

## 屏幕共享获取媒体流

通过 getDisplayMedia 来获取屏幕共享的媒体流.

然后你就可以分享你的整个屏幕，如果你又多个屏幕的话，你可以选择其中一个进行分享。然后你也可以选择只分享你屏幕上的某个应用的窗口，不用担心你一边干嘛干嘛一边录制屏幕，它只会捕捉你选择的应用窗口的内容。非常 nice。

## 录制

这里我们使用 MediaRecorder 来进行录制，它是一个用于录制媒体流的 API，它可以将媒体流中的数据进行录制，然后将录制的数据保存成一个文件。

由于 MediaRecorder api 的对 mimeType 参数的支持是有限的。所以我们需要通过 MediaRecorder.isTypeSupported 来判断当前浏览器是否支持我们需要的 mimeType。

chrome 中 MediaRecorder 支持的 mimeType 如下：

```sh
"video/webm"
"video/webm;codecs=vp8"
"video/webm;codecs=vp9"
"video/webm;codecs=h264"
"video/x-matroska;codecs=avc1"
```

```js
// 录制媒体流
function startRecord() {
  const kbps = 1024
  const Mbps = kbps * kbps
  const options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'video/webm; codecs="vp8,opus"',
  }
  const mediaRecorder = new MediaRecorder(localStream, options)
  mediaRecorder.start()

  mediaRecorder.ondataavailable = (e) => {
    // 将录制的数据合并成一个 Blob 对象
    // const blob = new Blob([e.data], { type: e.data.type })

    // 🌸重点是这个地方，我们不要把获取到的 e.data.type设置成 blob 的 type，而是直接改成 mp4
    const blob = new Blob([e.data], { type: 'video/mp4' })
    downloadBlob(blob)
  }
  mediaRecorder.onstop = (e: Event) => {
    // 停止录制
  }
}

// 下载 Blob
function downloadBlob(blob: Blob) {
  // 将 Blob 对象转换成一个 URL 地址
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  // 设置 a 标签的 href 属性为刚刚生成的 URL 地址
  a.href = url
  // 设置 a 标签的 download 属性为文件名
  a.download = `${new Date().getTime()}.${blob.type.split('/')[1]}`
  // 模拟点击 a 标签
  a.click()
  // 释放 URL 地址
  URL.revokeObjectURL(url)
}
```

ffmpeg.js可以输出MP4

也可以录制gif

## 替换背景

```
背景图: 通过 canvas 将背景图画到画布上，然后通过 getImageData 方法拿到图像数据。

创建 canvas 标签 先将真实的视频每隔 40ms 一次 画到画布上。

画到画布后，我们也相应的要通过 getImageData 方法拿到真实视频的图像数据。

然后每一帧都要与设置好的背景色(一般绿色)进行比较，比较后的差值达到设定的阈值的像素，就要扣除（替换为之前拿到的背景图的像素。

然后再将处理后的图像数据画到虚拟视频的画布上，再通过captureStreamapi 将画布转换为视频流，最后将视频流赋值给虚拟视频的 srcObject 属性。
```

## 实时音视频通信

[从0搭建一个WebRTC，实现多房间多对多通话，并实现屏幕录制](https://juejin.cn/post/7129763930779418654)

## RTCPeerConnection

RTCPeerConnection 对象是WebRTC的核心，同时也是暴露给用户的统一接口，内部包含了网络处理模块、服务质量模块、音视频引擎模块等，可以把它理解为一个socket，能够快速稳定的实现端到端的数据传输。
创建 RTCPeerConnection 对象时，需要传入STUN/TURN服务器等相关信息。

```js
// 公网中使用
const pc = new RTCPeerConnection({
  iceServers: [
    // 目前我在用的，免费STUN 服务器
    {
      urls: 'stun:stun.voipbuster.com ',
    },
    // 谷歌的好像都失效了，不过你们可以试试
    {
      urls: 'stun:stun.l.google.com:19301',
      // urls: 'stun:stun.l.google.com:19302',
      // urls: 'stun:stun.l.google.com:19303',
      // ...
    },
    // TURN 服务器,这个对服务器压力太大了，目前没找到免费的，后续我在自己的服务器上弄一个
    {
      urls: 'turn:turn.xxxx.org',
      username: 'webrtc',
      credential: 'turnserver',
    },
    {
      urls: 'turn:turn.ap-southeast-1.aliyuncs.com:443?transport=tcp',
      username: 'test',
      credential: 'test',
    },
  ],
})
```

STUN：Session Traversal Utilities for NAT，用来帮助我们获取本地计算机的公网 IP 地址，以及端口号。

TURN：Traversal Using Relays around NAT，用来帮助我们穿越 NAT 网关，实现公网中的 WebRTC 连接

## SDP协议

SDP：Session Description Protocol，它是一种用于描述多媒体会话的协议，它可以帮助我们描述媒体流的信息，比如媒体流的类型，编码格式，分辨率等等。WebRTC 通过SDP来交换端与端之间的网络和媒体信息。

媒体协商就是在双端通信之前，了解双方具备哪些能力。其协商过程中交换的内容就是SDP协议定义的。

```sh
v=0 # SDP版本号
o=- 0 0 IN IP4 120.24.99.xx # 会话标识信息
s=- # 会话名称
t=0 0 # 会话的有效时间
a=group:BUNDLE audio video # 媒体流类型
a=msid-semantic: WMS * # 媒体流标识符
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126 # 音频媒体流
c=IN IP4 120.24.99.xx # 连接信息
a=rtcp:9 IN IP4 0.0.0.0 # RTCP 的 IP 地址
a=candidate:0 1 UDP 2122252543 120.24.99.xx 9 typ host # 候选 IP 地址
# ...等等等
```

通过信令模块，如socketio，交换SDP

## ICE

ICE：Interactive Connectivity Establishment，交互式连接建立协议，用于在两个主机之间建立连接，它可以在两个主机之间建立连接，即使它们之间的防火墙阻止了直接连接。(可以不借助一个公网 server 完成端到端（Peer to peer，P2P）的通信)。

当各端调用 setLocalDescription 后，WebRTC就开始建立网络连接，主要包括收集candidate、交换candidate和按优先级尝试连接，该过程被称为ICE（Interactive Connectivity Establishment，交互式连接建立）。其中每个 candidate 都包含IP地址、端口、传输协议、类型等信息。

根据 RFC5245 协议，WebRTC将 candidate分为了四个类型：host、srflx、prflx、relay，它们的优先级依次降低。
