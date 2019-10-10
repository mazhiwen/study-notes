# HTTP

https://developer.mozilla.org/zh-CN/docs/Web/HTTP

## HTTP1.0




## HTTP1.1

HTTP1.1改变了HTTP协议的语义，默认使用持久连接。除非明确告知（connection:close 首部），否则服务器会保持连接打开。


## HTTP2.0

改进传输性能

## web性能要点


### 时间

时间 ：     感觉

0-100ms：  很快

100-300ms：有一点点慢

300-1000ms：机器在工作呢

>1000ms:先干点别的吧

>10000ms:不能用了

### 请求构成

每个http请求都由很多独立的阶段构成：

DNS解析，TCP链接握手，TLS协商（必要时）发送http请求，下载内容

### 资源瀑布图

### 延迟是性能瓶颈

> 如果延迟对大多数有线链接是限制性能的因素，那可想而知，它对无线客户端将是更重要的性能瓶颈。事实上，无线延迟明显更高，因此网络优化是提升移动web应用性能的关键。

> 增加带宽没有那么重要






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



