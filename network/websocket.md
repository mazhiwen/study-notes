# WebSocket

WS是浏览器中最灵活的一个传输机制，其简单API可以让我们在客户端和服务器之间以数据流的形式实现各种应用数据交互（包括JSON及自定义的二进制消息格式），而且两端都可以随时向另一端发送数据

<https://www.cnblogs.com/chyingp/p/websocket-deep-in.html>

<https://www.ruanyifeng.com/blog/2017/05/websocket.html>

使用http轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。

最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话

## WebSocket 协议

WebSocket 协议是一个独立完善的协议，可以在浏览器外实现。不过它的主要应用目标还是实现浏览器应用的双向通信。

HTML5开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议。它基于TCP传输协议，并复用HTTP的握手通道。

建立在 TCP 协议之上，服务器端的实现比较容易。

与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

数据格式比较轻量，性能开销小，通信高效。

可以发送文本，也可以发送二进制数据。

没有同源限制，客户端可以与任意服务器通信。

协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。如：ws://example.com:80/some/path

## 握手

WS握手是兼容基于HTTP的服务器软件和中间件的，以便单个端口可以用于与服务器交流的HTTP客户端和与服务器交流的WebSocket客户端

WebSocket客户端的握手是一个HTTP Upgrade请求(Http status code 101)：

## WebSocket API

```js
var ws = new WebSocket('wss://example.com/socket');

ws.onerror = function(error){

}
ws.onclose = function(error){

}
ws.onopen = function(){
  ws.send("connection established .hello server");
}
ws.onmessage = function(msg){
  if(msg.data instanceof Blob){
    processBlob(msg.data);
  } else {
    processText(msg.data);
  }
}
```
