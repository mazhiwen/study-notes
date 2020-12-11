# 跨域

<https://segmentfault.com/a/1190000011145364>

<https://segmentfault.com/a/1190000011145364>  
<https://www.zhihu.com/topic/19612046/top-answers>

## 同源策略

协议+端口号+域名要相同

一个域下的 js 脚本在未经允许的情况下，不能够访问另一个域的内容。这里的同源的指的是两个域的协议、域名、端口号必须相同，否则则不属于同一个域。

1. Cookie、LocalStorage 和 IndexDB 无法读取  
2. DOM 和 Js对象无法获得  
3. AJAX 请求不能发送  

域和子域不同源，但可以设置domain达到同源

## 跨域请求：CORS

(Cross-Origin Resource Sharing) 跨域资源共享

<http://www.ruanyifeng.com/blog/2016/04/cors.html>

<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS>

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。

浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

### 简单请求

只要同时满足以下两大条件，就属于简单请求。

- method:

GET, HEAD, POST

- HTTP的头信息不超出以下几种字段:

Content-Type:application/x-www-form-urlencoded , multipart/form-data ,  text/plain

Accept

Accept-Language

Content-Language

Last-Event-ID

- 对于简单请求，浏览器自动加origin请求头

```javascript
//js
Origin: http://api.bob.com

//server
Access-Control-Allow-Origin: * //或者值http://api.bob.com
Access-Control-Allow-Methods:'GET'
Access-Control-Allow-Credentials: true // cookie
Access-Control-Expose-Headers: FooBar // 暴露的返回头
Content-Type: text/html; charset=utf-8
```

- 发送cookie

CORS请求默认不发送Cookie和HTTP认证信息

```js
//服务器配置:
Access-Control-Allow-Credentials: true
//js：
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

### 非简单请求

method：不是简单请求中的一种  
Content-Type：不是简单请求中的一种  

浏览器先发送option， Preflighted requests请求

服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

```javascript
//请求：js
OPTIONS
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type
Origin: http://localhost:8080

//响应：server
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Content-Type: text/html
```

## 跨域请求：JSONP

<https://segmentfault.com/a/1190000007665361#articleHeader1>

JSONP只支持GET请求

js 文件不受浏览器同源策略的影响，所以通过 Script 便签可以进行跨域的请求

- 前端

前端发送给后端一个方法名字。后端在数据包将返回数据包装为方法参数，与方法，一起返回。前端拿到返回结果后，会执行该函数。

```javascript

function jsonp(url, jsonpCallback, success) {
  let script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.type = "text/javascript";
  window[jsonpCallback] = function(data) {
    success && success(data);
  };
  document.body.appendChild(script);
}
jsonp(
  "http://xxx",
  "callback",
  function(value) {
    console.log(value);
  }
);
```

- 后端

解析请求的js资源ulr，并做处理返回。返回带着前端需要回调的函数名

```javascript
//返回content
onBack({"status": true, "user": "admin"})
```

- 缺点

它支持 GET 请求而不支持 POST 等其它类行的 HTTP 请求。  
它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面或 iframe 之间进行数据通信的问题

## 跨域请求：代理

```sh
server{
    # 监听9099端口
    listen 9099;
    # 域名是localhost
    server_name localhost;
    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9871
    location ^~ /api {
        proxy_pass http://localhost:9871;
    }
}
```

反向代理  
通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。

```sh
#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

## document.domain

实现主域名下的不同子域名的跨域操作，我们可以使用设置 document.domain

只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。

只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域

## Websocket

WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。

原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。

## postMessage

a.） 页面和其打开的新窗口的数据传递
b.） 多窗口之间消息传递
c.） 页面与嵌套的iframe消息传递
d.） 上面三个场景的跨域数据传递

## location.hash + iframe

## window.name + iframe
