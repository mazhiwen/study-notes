# 视频播放

[「1.4万字」玩转前端 Video 播放器 | 多图预警](https://juejin.cn/post/6850037275579121671)

## HLS

## DASH

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

flv.js 的工作原理是将 FLV 文件流转换为 ISO BMFF（Fragmented MP4）片段，然后通过 Media Source Extensions API 将 mp4 段喂给 HTML5 `<video>` 元素。flv.js 的设计架构图如下图所示：

## MSE(Media Source Extensions API)

媒体源扩展 API（MSE）提供了实现无插件且基于 Web 的流媒体的功能。使用 MSE，媒体串流能够通过 JavaScript 创建，并且能通过使用 `<audio> 和 <video>` 元素进行播放。

## video.js

videojs-flash

video.js + flv.js

## 阿里库

<https://helpcdn.aliyun.com/document_detail/125570.html?spm=a2c4g.11186623.6.1170.1b995488xW7f5O>

## 自定义播放器

[从零实现一个自定义 HTML5 播放器](https://juejin.cn/post/6844903487910723592)

[自定义H5 video 播放器](https://juejin.cn/post/6844903976312242183)
