# webRTC

[WebRTC 从实战到未来！迎接风口，前端必学的技术🔥](<https://juejin.cn/post/7151932832041058340>)

[MDN - WebRTC - API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)

## 概念

WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

需要注意的是，WebRTC 只能在 HTTPS 协议或者 localhost 下使用，如果是 HTTP 协议，会报错。

## 场景

直播
游戏
视频会议/在线教育
屏幕共享/远程控制
等等等

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
