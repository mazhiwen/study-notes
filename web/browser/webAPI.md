GUI渲染线程
javascript引擎线程
浏览器事件触发线程
HTTP请求线程

## http

### 1.1

### 2.0

### https

## **SessionStorage, LocalStorage, Cookie**

参考：<https://harttle.land/2014/10/01/http.html#header-5>

## URL

URL() 构造函数返回一个新创建的 URL 对象，表示由一组参数定义的 URL。

```js
url = new URL(url, [base])

```

属性

### origin

### host

### pathname

URL接口的pathname属性是一个USVString，包含一个初始 '/' 和URL的路径(如果没有路径，则为空字符串)

```js
var url = new URL('https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname');

var result = url.pathname; // Returns:"/en-US/docs/Web/API/URL/pathname"
```

## Location对象

同URL对象

## window

### **window.postMessage**

```js
/*
 * A窗口的域名是<http://example.com:8080>，以下是A窗口的script标签下的代码：
 */

var popup = window.open(...popup details...);

// 如果弹出框没有被阻止且加载完成

// 这行语句没有发送信息出去，即使假设当前页面没有改变location（因为targetOrigin设置不对）
popup.postMessage("The user is 'bob' and the password is 'secret'",
                  "https://secure.example.net");

// 假设当前页面没有改变location，这条语句会成功添加message到发送队列中去（targetOrigin设置对了）
popup.postMessage("hello there!", "http://example.org");

function receiveMessage(event)
{
  // 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
  if (event.origin !== "http://example.org")
    return;

  // event.source 是我们通过window.open打开的弹出页面 popup
  // event.data 是 popup发送给当前页面的消息 "hi there yourself!  the secret response is: rheeeeet!"
}
window.addEventListener("message", receiveMessage, false);

```

```js
// 父页面发送
window.onload = () => {
  document.getElementById('iframe').contentWindow.postMessage(
    {
      type:2
    },
    'http://localhost:8081',
  );
};
//子页面发送
window.parent.postMessage()
// 监听
window.addEventListener('message',(event)=>{
  if(event.origin !== new URL('url').origin)
        return;
  console.log(event);
});

```

## RandomSource

代表密码学安全随机数的来源

```js
// 获取
Window.crypto.getRandomValues()
//使用密码学可靠的随机值填充传递过来的 ArrayBufferView。
```
