# http

https://developer.mozilla.org/zh-CN/docs/Web/HTTP

## 常规header

Content-Type


## 请求header

### withCredentials

withCredentials设置为true，可以向服务器发送cookies

## 响应header

### Access-Control-Allow-Origin

### Access-Control-Expose-Headers

在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

```sh
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

### Access-Control-Max-Age

Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久，请参考本文在前面提到的preflight例子。

```sh
Access-Control-Max-Age: <delta-seconds>
```

### Access-Control-Allow-Methods

Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

### Access-Control-Allow-Headers

Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。



