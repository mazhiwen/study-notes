# 页面可见性

Page Visibility API

<https://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html>

开发者需要知道，用户正在离开页面 , 常用的方法是监听下面三个事件:pagehide ,beforeunload,unload

Page Visibility API。不管手机或桌面电脑，所有情况下，这个 API 都会监听到页面的可见性发生变化。

这个新的 API 的意义在于，通过监听网页的可见性，可以预判网页的卸载，还可以用来节省资源，减缓电能的消耗。比如，一旦用户不看网页，下面这些网页行为都是可以暂停的:对服务器的轮询,网页动画,正在播放的音频或视频

## document.visibilityState

这个 API 主要在document对象上，新增了一个document.visibilityState属性。该属性返回一个字符串，表示页面当前的可见性状态，共有三个可能的值。

1. hidden：页面彻底不可见。

浏览器最小化。

浏览器没有最小化，但是当前页面切换成了背景页。

浏览器将要卸载（unload）页面。

操作系统触发锁屏屏幕。

2. visible：页面至少一部分可见。

3. prerender：页面即将或正在渲染，处于不可见状态。

## visibilitychange 事件

只要document.visibilityState属性发生变化，就会触发visibilitychange事件。因此，可以通过监听这个事件（通过document.addEventListener()方法或document.onvisibilitychange属性），跟踪页面可见性的变化。

```js
document.addEventListener('visibilitychange', function () {
  // 用户离开了当前页面
  if (document.visibilityState === 'hidden') {
    document.title = '页面不可见';
  }

  // 用户打开或回到页面
  if (document.visibilityState === 'visible') {
    document.title = '页面可见';
  }
});
```

## 关闭页面

浏览器有两个事件可以用来监听页面关闭，beforeunload和unload

beforeunload: 是在文档和资源将要关闭的时候调用的， 这时候文档还是可见的，并且在这个关闭的事件还是可以取消的。比如下面这种写法就会让用户导致在刷新或者关闭页面时候，有个弹窗提醒用户是否关闭。

```js
window.addEventListener("beforeunload", function (event) {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});
```
