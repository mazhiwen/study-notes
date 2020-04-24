# TCP/IP协议族 和 HTTP

<https://juejin.im/post/598ba1d06fb9a03c4d6464ab>

本文档性能文档，也有对tcp/http的介绍 [性能文档](../performance.md#TCP)

## 一。 TCP/IP

**通常使用的网络是在TCP/IP协议族的基础上运作的，而HTTP属于它内部的一个子集。**

**TCP/IP是互联网相关的各类协议族的总称:**

IP,PPPoE,DNS,UDP,FTP,SNMP,HTTP,FDDI,ICMP,IEEE 802.3,

**TCP/IP协议族按层次分别分为以下4层：**

- 应用层：应用层决定了向用户提供应用服务时通信的活动。TCP/IP协议族内预存了各类通用的应用服务。比如：FTP DNS HTTP

- 传输层：传输层对上层应用层，提供处于网络链接中的两台计算机之间的数据传输。有两个性质不同的协议TCP和UDP

- 网络层：网络层用来处理网络上流动的数据包，数据包是网络传输的最小数据单位。该层规定了通过怎样的路径到达对方计算机，并把数据包传送给对方。

- 数据链路层: 用来处理链接网络的硬件部分。包括控制操作系统，硬件的设备驱动，NIC，及光纤等物理可见部分。硬件上的范畴均在链路层的作用范围之内。

**利用TCP/IP协议族进行网络通信时，会通过分层顺序与对方进行通信。发送端从应用层往下走，接收端从链路层往上走。**

IP协议的作用是把各种数据包传送给对方。

ARP是一种用以解析地址的协议，根据通信方的IP地址就可以反查对应的MAC地址。

确保数据能到达目标，TCP协议采用了三次握手策略。

DNS（Domain Name System）服务是和HTTP协议一样位于应用层的协议，它提供域名到IP地址之间的解析服务。

URL是URI的子集

### TCP三次握手

第一次握手：客户端发送syn包(syn=j)到服务器，并进入SYN_SEND状态，等待服务器确认；
第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；
第三次握手：客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。
握手过程中传送的包里不包含数据，三次握手完毕后，客户端与服务器才正式开始传送数据。理想状态下，TCP连接一旦建立，在通信双方中的任何一方主动关闭连接之前，TCP 连接都将被一直保持下去。断开连接时服务器和客户端均可以主动发起断开TCP连接的请求，断开过程需要经过“四次握手”（过程就不细写了，就是服务器和客户端交互，最终确定断开）

## 二。 HTTP

<https://developer.mozilla.org/zh-CN/docs/Web/HTTP>

HyperText Transfer Protocal,超文本传输协议

HTTP是不保存状态的协议。每当有新的请求发生时，就会有对应的新响应产生。

HTTP1.1有了cookie，就可以管理状态了。

### 支持的方法

GET：获取资源

POST：获取实体主体

PUT：传输文件

HEAD：获得报文首部

DELETE：删除文件

OPTIONS：询问支持的方法

TRACE：追踪路径

### 持久连接节省通信量

HTTP协议的初始版本中，每进行一次HTTP通信就要断开一次TCP连接。

解决TCP连接问题，HTTP/1.1想出了持久连接（HTTP keep-alive）。

持久连接的特点：只要任意一端没有明确提出断开连接，则保持TCP连接状态。

持久连接旨在建立1次TCP连接后进行多次请求和响应的交互。减少了TCP连接的重复建立和断开所造成的额外开销，减轻了服务器端的荷载。

在HTTP1.1中，所有连接默认都是持久连接。

### 管线化

管线化技术，不用等待响应亦可直接发送下一个请求。
同事并行发送多个请求，不需要一个接一个等待响应。

### cookie

Cookie会根据从服务端发送的响应报文内的一个叫做Set-Cookie的首部信息字段，通知客户端保存Cookie。
下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入cookie值后发送出去。

### HTTP0.9

**最初的HTTP建议**

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

### HTTP1.0

- 关键变化：

请求可以由于多行首部字段构成  
响应对象前面添加了一个响应状态行  
响应对象也有自己的由换行符分隔的首部字段  
响应对象不局限于超文本  
服务器和客户端之间的连接在每次请求之后都会关闭

> 事实上，HTTP中的 HTT（超文本传输）在协议出现后不久就用词不当了。在实践中，HTTP迅速发展为超媒体传输协议。

### HTTP1.1

> HTTP1.1改变了HTTP协议的语义，默认使用持久连接。除非明确告知（connection:close 首部），否则服务器会保持连接打开。  
移植到1.0上，通过Connection:Keep-Alive 首部启用。如果是1.1不需要这个头部。
> 厘清了之前版本中很多有歧义的地方，而且还加入了很多重要的性能优化：持久连接，分块编码传输，字节范围请求，增强的缓存机制，传输编码及请求管道。

### HTTP2.0

> 改进传输性能,实现低延迟和高吞吐量。
> 现有的网站和应用，无需做任何更改都可以在HTTP2.0上跑起来

### 状态码

- 1xx（信息）

接收的请求正在处理

- 2xx（成功）

请求正常处理完毕

200: 从客户端发来的请求在服务器端被正常处理了

204: 已成功处理，返回报文不含实体。一般只需要客户端向服务端发送信息，而对客户端不需要发送新信息

206: 只请求部分资源

- 3xx（重定向）

需要进行附加操作以完成请求

301: Moved Permanently。资源已经被永久分配新的URI，以后应使用新URI。

302: Found。临时性重定向。资源已经被分配新的URI，希望用户本次使用新URI访问。

303: See Other。请求资源存在另一个URI，应使用GET定向获取请求的资源。

304: Not Modified。服务器资源未改变，直接使用客户端未过期的缓存。

- 4xx（客户端错误）

这类的状态码代表了客户端看起来可能发生了错误，妨碍了服务器的处理。 除非响应的是一个HEAD请求，否则服务器就应该返回一个解释当前错误状况的实体。

400: Bad Request。请求报文中存在语法错误。

401: Unauthorized。需要认证

403: Forbidden。访问资源被服务器拒绝。访问权限问题。

404: Not Found。无法找到请求资源。

- 5xx（服务器错误）

这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理。 并且响应消息体中应当给出理由，除非是HEAD请求

500: Internal Server Error。服务器执行请求时发生错误。

503: Service Unavailable。服务器停机中，无法处理请求。

### header

**请求**

- withCredentials

withCredentials设置为true，可以向服务器发送cookies

**响应**

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

## 三。 HTTPS
