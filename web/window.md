# webapi

***

## parseInt

parseInt(string, radix)

将一个字符串 string 转换为 radix 进制的整数，

radix 为介于2-36之间的数。

接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。

无法解析，返回NaN

```js
parseInt('123', 5) // 将'123'看作5进制数，返回十进制数38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
```

## window.postMessage

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
