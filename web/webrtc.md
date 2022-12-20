# webRTC

[WebRTC 从实战到未来！迎接风口，前端必学的技术🔥](<https://juejin.cn/post/7151932832041058340>)

[MDN - WebRTC - API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)

## 概念

WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

需要注意的是，WebRTC 只能在 HTTPS 协议或者 localhost 下使用，如果是 HTTP 协议，会报错。

## 获取媒体流

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
