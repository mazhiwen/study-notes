# HTTP

https://developer.mozilla.org/zh-CN/docs/Web/HTTP

HyperText Transfer Protocal,超文本传输协议


## HTTP0.9

### 最初的HTTP建议

- 几个宏观的设计目标：  
1. 支持文件传输，
2. 能够请求对超文本文档的索引搜索
3. 格式化协商机制
4. 能够把客户端引导至不同的服务器

- 简单的原型：  
客户端请求是一个ASCII字符串  
客户端请求由一个回车符（CRLF）结尾  
服务器响应是一个ASCII字符流  
服务器响应的是一种超文本标记语言（HTML）  
连接在文档传输完毕后断开  






## HTTP1.0

- 关键变化：

请求可以由于多行首部字段构成  
响应对象前面添加了一个响应状态行  
响应对象也有自己的由换行符分隔的首部字段  
响应对象不局限于超文本  
服务器和客户端之间的连接在每次请求之后都会关闭

> 事实上，HTTP中的 HTT（超文本传输）在协议出现后不久就用词不当了。在实践中，HTTP迅速发展为超媒体传输协议。


## HTTP1.1

> HTTP1.1改变了HTTP协议的语义，默认使用持久连接。除非明确告知（connection:close 首部），否则服务器会保持连接打开。  
移植到1.0上，通过Connection:Keep-Alive 首部启用。如果是1.1不需要这个头部。

> 厘清了之前版本中很多有歧义的地方，而且还加入了很多重要的性能优化：持久连接，分块编码传输，字节范围请求，增强的缓存机制，传输编码及请求管道。



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



