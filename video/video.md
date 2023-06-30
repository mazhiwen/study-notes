# 视频播放

[69 篇文章带你系统性的学习音视频开发（收藏起来假期看）](https://juejin.cn/post/7236929075251445817)

[「1.4万字」玩转前端 Video 播放器 | 多图预警](https://juejin.cn/post/6850037275579121671)

[为什么视频网站的视频链接地址是blob？](https://juejin.cn/post/6844903880774385671)

[我们为什么使用DASH](https://www.bilibili.com/read/cv855111/)

[浏览器中的音视频知识总结v1.0(工作中需要和视频打交道必看！)](https://juejin.cn/post/7002288264413446157)

## 帧率(码率)（比特率）

视频，其实就是一系列连续播放的图片，如果1s钟播放24张图片，那么人眼看到的就不再是一张张独立的图片，而是动起来的画面。其中一张图片称为一帧，1s播放的图片数称为帧率。常见的帧率有24帧/s，30帧/s,32帧/s。

## 视频编码

经过编码之后，视频由一帧帧的图片，变成了一串串让人看不懂的二进制代码，因为编码的方式(算法)的不同，所以就有了编码格式的区分。常见的编码格式有

```
H.264,
H.265,
H.266,
MPEG-4,
VP8
```

等。

我们前端开发只需要记住一点，主流浏览器支持的视频编码格式是h264。

前端开发的需要记住，视频编码为h264，音频编码为aac的MP4文件在各大浏览器都能播放，因为h264编码格式虽然有版权，但是可以免费使用。

## 音频编码

常见的编码方式有：

```
WAV、
MP3
AAC
```

格式。

## 封装格式

我们把视频数据、音频数据打包到一起，然后再添加一些基本信息，例如分辨率、时长、标题等，构成一个文件，这个文件称为封装格式。常见的封装格式有

```
MP4,
FLV
M3U8
TS
MOV,
MPEG,
WEBM
```

等。

## 工具

操作音视频必备工具-FFMPEG

## 分辨率

屏幕是由一个个像素点组成的，我们常见的1080p，是指屏幕竖直方向有1080个像素，共有1920列，一共207万像素。2K，2560x1440，共369万像素。

## RTMP协议

RTMP(Real Time Messaging Protocol)实时消息传送协议是Adobe Systems公司为Flash播放器和服务器之间音频、视频和数据传输 开发的开放协议。是我们市面上绝大多数部分PC秀场使用的技术栈, 他有低延迟(2秒左后), 稳定性高, 技术完善, 高支持度, 编码兼容性高等特点.

## HTTP-FLV协议

FLV (Flash Video) 是 Adobe 公司推出的另一种视频格式，是一种在网络上传输的流媒体数据存储容器格式。HTTP-FLV 即将流媒体数据封装成 FLV 格式，然后通过 HTTP 协议传输给客户端。HTTP-FLV这种方式较RTMP协议好的就是它采用公共的HTTP80端口, 有效避免被防火墙拦截, 可以通过 HTTP 302 跳转灵活调度/负载均衡，支持使用 HTTPS 加密传输，但它也有缺点, 视频的内容会缓存到用户本地, 保密性不好. HTTP-FLV的整体流程和RTMP协议一致, 但在客户端播放有些差异, 在MSE出现以前市场上一般都是用flash播放器去播放, MSE出现以后以及推广HTML5播放器的原因, 市场上开始使用JS软解FLV的方式, 通过HTMLVideoElement去播放.

## HTTP-HLS协议

基于HTTP

HLS （HTTP Live Streaming）, 是由 Apple 公司实现的基于 HTTP 的媒体流传输协议。

HLS以ts为传输格式，m3u8为索引文件（文件中包含了所要用到的ts文件名称，时长等信息，可以用播放器播放，也可以用vscode之类的编辑器打开查看）

在移动端大部分浏览器都支持，也就是说你可以用video标签直接加载一个m3u8文件播放视频或者直播，但是在pc端，除了苹果的Safari，需要引入库来支持。

移动端支持良好, 现在已经成为移动端H5直播的主要技术

## HTTP-DASH协议

[DASH](./DASH.md)

## KCP协议

## flv.js

```
支持播放 H.264 + AAC / MP3 编码的 FLV 文件；
支持播放多段分段视频；
支持播放 HTTP FLV 低延迟实时流；
支持播放基于 WebSocket 传输的 FLV 实时流；
兼容 Chrome，FireFox，Safari 10，IE11 和 Edge；
极低的开销，支持浏览器的硬件加速。

MP3 音频编解码器无法在 IE11/Edge 上运行；
HTTP FLV 直播流不支持所有的浏览器。
```

flv.js 的工作原理是将 FLV 文件流转换为 ISO BMFF（Fragmented MP4）片段，然后通过 Media Source Extensions API 将 mp4 段喂给 HTML5 `<video>` 元素。

## MediaSource

MSE(Media Source Extensions API)

媒体源扩展 API（MSE）提供了实现无插件且基于 Web 的流媒体的功能。使用 MSE，媒体串流能够通过 JavaScript 创建，并且能通过使用 `<audio> 和 <video>` 元素进行播放。

## video.js

videojs-flash

video.js + flv.js

## 阿里库

<https://helpcdn.aliyun.com/document_detail/125570.html?spm=a2c4g.11186623.6.1170.1b995488xW7f5O>

## 自定义播放器

[从零实现一个自定义 HTML5 播放器](https://juejin.cn/post/6844903487910723592)

[自定义H5 video 播放器](https://juejin.cn/post/6844903976312242183)

## 音视频第三方

[我用ChatGPT做直播技术选型，卷死了同事](https://juejin.cn/post/7202265125541642299)

[主流的第三方直播SDK对比（腾讯云、即构、阿里云、声网、网易云信、网宿）](https://juejin.cn/post/7166424083054198792)

[移动直播技术知多少：基础原理解析 & 腾讯云直播接入](https://juejin.cn/post/6844904136324956174#heading-0)

声网

即构

腾讯云

阿里云

## 视频质量优化

编码优化：
