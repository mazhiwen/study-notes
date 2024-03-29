# HTTP

<https://developer.mozilla.org/zh-CN/docs/Web/HTTP>

HyperText Transfer Protocal,超文本传输协议

HTTP 是一个无状态的协议，HTTP 服务器不会保存关于客户的任何信息。

每当有新的请求发生时，就会有对应的新响应产生。

HTTP1.1有了cookie，就可以管理状态了。

## HTTP0.9

最初的HTTP建议:

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

请求可以由于多行首部字段构成

响应对象前面添加了一个响应状态行  

响应对象也有自己的由换行符分隔的首部字段

响应对象不局限于超文本

服务器和客户端之间的连接在每次请求之后都会关闭

事实上，HTTP中的 HTT（超文本传输）在协议出现后不久就用词不当了。在实践中，HTTP迅速发展为超媒体传输协议。

## HTTP1.1

HTTP1.1改变了HTTP协议的语义，默认使用持久连接。除非明确告知（connection:close 首部），否则服务器会保持连接打开。移植到1.0上，通过Connection:Keep-Alive 首部启用。如果是1.1不需要这个头部。

还加入了很多重要的性能优化：持久连接，分块编码传输，字节范围请求，增强的缓存机制，传输编码及请求管道。

在同一个 TCP 连接里面，数据请求的通信次序 是固定的。服务器只有处理完一个请求的响应后，才会进行下一个请求的处理，如果前面请求的响应特别慢的话，就会造成许 多请求排队等待的情况，这种情况被称为“队头堵塞”

## http1.1 vs http1.0

（1）连接方面的区别，http1.1 默认使用持久连接，而 http1.0 默认使用非持久连接。http1.1 通过使用持久连接来使多个 http 请求复用同一个 TCP 连接，以此来避免使用非持久连接时每次需要建立连接的时延。

（2）资源请求方面的区别，在 http1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，http1.1 则在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。

（3）缓存方面的区别，在 http1.0 中主要使用 header 里的 If-Modified-Since,Expires 来做为缓存判断的标准，http1.1 则引入了更多的缓存控制策略例如 Etag、If-Unmodified-Since、If-Match、If-None-Match 等更多可供选择的缓存头来控制缓存策略。

（4）http1.1 中还新增了 host 字段，用来指定服务器的域名。http1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个IP地址。因此有了 host 字段，就可以将请求发往同一台服务器上的不同网站。

（5）http1.1 相对于 http1.0 还新增了很多方法，如 PUT、HEAD、OPTIONS 等。

## 支持的方法

GET：获取资源

POST：获取实体主体

PUT：传输文件

HEAD：获得报文首部

DELETE：删除文件

OPTIONS：询问支持的方法

TRACE：追踪路径

## 持久连接

HTTP协议的初始版本中，每进行一次HTTP通信就要断开一次TCP连接。采用持续连接的好处是可以避免每次建立 TCP 连接三次握手时所花费的时间

解决TCP连接问题，HTTP/1.1想出了持久连接（HTTP keep-alive）: `Connection: keep-alive`

持久连接的特点：只要任意一端没有明确提出断开连接，则保持TCP连接状态。

持续连接下，TCP 连接默认不关闭，可以被多个请求复用。持久连接旨在建立1次TCP连接后进行多次请求和响应的交互。

在HTTP1.1中，所有连接默认都是持久连接。

目前对于同一个域，大多数浏览器支持 同时建立 6 个持久连接（6个tcp）。

## 管线化

管线化技术，不用等待响应亦可直接发送下一个请求。
同事并行发送多个请求，不需要一个接一个等待响应。

## cookie

Cookie会根据从服务端发送的响应报文内的一个叫做Set-Cookie的首部信息字段，通知客户端保存Cookie。
下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入cookie值后发送出去。

## 状态码

### 1xx（信息）

接收的请求正在处理

### 2xx（成功）

请求正常处理完毕

200: 从客户端发来的请求在服务器端被正常处理了

204: 已成功处理，返回报文不含实体。一般只需要客户端向服务端发送信息，而对客户端不需要发送新信息

206: 只请求部分资源

### 3xx（重定向）

需要进行附加操作以完成请求

301: Moved Permanently。资源已经被永久分配新的URI，以后应使用新URI。

302: Found。临时性重定向。资源已经被分配新的URI，希望用户本次使用新URI访问。

303: See Other。请求资源存在另一个URI，应使用GET定向获取请求的资源。

304: Not Modified。服务器资源未改变，直接使用客户端未过期的缓存。

### 4xx（客户端错误）

这类的状态码代表了客户端看起来可能发生了错误，妨碍了服务器的处理。 除非响应的是一个HEAD请求，否则服务器就应该返回一个解释当前错误状况的实体。

400: Bad Request。请求报文中存在语法错误。

401: Unauthorized。需要认证

403: Forbidden。访问资源被服务器拒绝。访问权限问题。

404: Not Found。无法找到请求资源。

### 5xx（服务器错误）

这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理。 并且响应消息体中应当给出理由，除非是HEAD请求

500: Internal Server Error。服务器执行请求时发生错误。

503: Service Unavailable。服务器停机中，无法处理请求。

## header首部

### 请求

withCredentials设置为true，可以向服务器发送cookies

Accept 可接收媒体资源的类型、

Accept-Charset 可接收的字符集、

Host 请求的主机名

### 响应

- Access-Control-Allow-Origin

- Access-Control-Expose-Headers

在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

```sh
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

- Access-Control-Max-Age

Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久，请参考本文在前面提到的preflight例子。

```sh
Access-Control-Max-Age: <delta-seconds>
```

- Access-Control-Allow-Methods

Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

- Access-Control-Allow-Headers

Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

- ETag

资源的匹配信息，

- Location

客户端重定向的 URI。

### 通用首部

Cache-Control 控制缓存策略、Connection 管理持久连接。

### 实体首部

Content-Length 实体主体的大小、Expires 实体主体的过期时间、Last-Modified 资源的最后修 改时间。

## 请求报文

请求行包含三个字段：方法字段、URL 字段和 HTTP 版本字段。

## 响应报文

状态行包含了三个字段：协议版本字段、状态码和相应的状态信息。

## HTTP1.1优化

**《高性能网站建设指南》说的一些优化**

- 减少DNS查询，每次域名解析都需要一次网络往返，增加请求的延迟，在查询期间会阻塞请求。

- 减少HTTP请求

- 使用CDN

- 添加Expires首部并配置ETag标签：相关资源应该缓存，避免重复。Expires首部可于指定缓存时间，在这个时间内可以直接直接从缓存取得资源，完全避免HTTP请求。

- Gzip资源，Gzip可以减少60%-80%的文件大小。

- 避免HTTP重定向，HTTP重定向极其耗时，特别是把客户端定向到一个完全不同的域名的情况下，还会导致额外的DNS查询，TCP连接延迟，等等。

**HTTP管道**

HTTP管道可以让我们把FIFO（先进先出）队列从客户端（请求队列）迁移到服务器（响应队列）；  

主要是消除了发送请求和响应的等待时间，这种并行处理请求的能力对提升性能的帮助非常之大

事实上，网络延迟越高，请求越多，节省的时间越多。越是大型应用，网络优化的影响越大。

服务器可以并行处理请求。但HTTP1.X只能严格串行地返回响应。HTTP1.X不允许一个连接上的多个响应数据交错到达（多路返回），因而一个响应必须完全返回后，下一个响应才会开始传输。

队首阻塞：第一个请求耗时更长，但同时服务器已经处理完第二个或者后续请求。此时，在HTTP1.1中，所有后续的请求都将被阻塞，等待它完成。

实际上，HTTP管道通常作为浏览器的高级配置，大多数会禁用它。比较难通过HTTP管道提升性能。

**使用多个TCP连接**

现实中，大多数浏览器，包括桌面和移动浏览器，都支持每个主机打开6个连接。此时：

1.客户端并行分派最多6个请求  
2.服务器并行处理最多6个请求  
3.第一次往返可以发送的累计分组数量（TCP cwnd）增长为原来的6倍。

**域名区分**

主机名称不一样了，就可以突破浏览器的连接限制，实现更高的并行能力。域名分区使用得越多，并行能力就越强。

把多个域名解析到同一个IP地址是很常见的做法。所有分区都通过CNAME DNS记录指向同一个服务器，而浏览器连接限制针对的是主机名，不是IP地址。另外每个分区也可以指向一个CDN或其他可以访问到的服务器。

**度量与控制协议开销**

RFC2616(HTTP1.1)没有对HTTP首部的大小规定任何限制。然后，实际中，很多服务器和代理都会将其限制在8KB或16KB之内。

所有HTTP首部都以纯文本形式发送（不会经过任何压缩），这就会给每个请求附加较高的额外负荷。

Cookie在很多应用中都是常见的性能瓶颈。

**连接与拼合**

把多个Javascript或CSS文件组合为一个文件；把多个图片组合为一个更大的复合的图片

浏览器是以递增方式处理HTML的，而对于Javascript和CSS的解析及执行，则要等到整个文件下载完毕。Javascript和CSS处理器都不允许递增式执行。

CSS文件越大，浏览器在构建CSSOM前经历的阻塞时间就越长，从而推迟首次绘制页面的时间。类似地，Javascript文件越大，对执行速度的影响同样越大；小文件倒是能实现“递增式”执行。

谷歌团队证明30-50KB（压缩后）是每个Javascript文件大小的合适范围。

**嵌入资源**

把资源嵌入文档，减少请求。

Javascript和css通过适当的script和style块可以直接放在页面中。图片甚至音频和PDF文件，都可以通过数据URI（data:[mediatype][:base64],data）的方式嵌入到页面。

IE最大允许32KB数据URI

常见只考虑嵌入1-2KB以下的资源；只使用一次，不需要缓存的资源；
