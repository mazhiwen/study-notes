# TCP/IP协议族 和 HTTP

<https://juejin.im/post/598ba1d06fb9a03c4d6464ab>

本文档性能文档，也有对tcp/http的介绍 [性能文档](../performance.md#TCP)

***

## 一。 TCP/IP

- 通常使用的网络是在TCP/IP协议族的基础上运作的，而HTTP属于它内部的一个子集。

- TCP/IP是互联网相关的各类协议族的总称:

IP,PPPoE,DNS,UDP,FTP,SNMP,HTTP,FDDI,ICMP,IEEE 802.3,

- TCP/IP协议族按层次分别分为以下4层：

1. 应用层：应用层决定了向用户提供应用服务时通信的活动。TCP/IP协议族内预存了各类通用的应用服务。比如：[FTP DNS HTTP SMTP POP3 SSH]

1. 传输层：传输层对上层应用层，提供处于网络链接中的两台计算机之间的数据传输。有两个性质不同的协议 [TCP UDP]

1. 网络层：网络层用来处理网络上流动的数据包，数据包是网络传输的最小数据单位。该层规定了通过怎样的路径到达对方计算机，并把数据包传送给对方。[IP ICMP ARP RARP]

1. 数据链路层: 用来处理链接网络的硬件部分。包括控制操作系统，硬件的设备驱动，NIC，及光纤等物理可见部分。硬件上的范畴均在链路层的作用范围之内。

- 利用TCP/IP协议族进行网络通信时，会通过分层顺序与对方进行通信。发送端从应用层往下走，接收端从链路层往上走。

- IP协议

的作用是把各种数据包传送给对方。

- ARP

是一种用以解析地址的协议，根据通信方的IP地址就可以反查对应的MAC地址。

- DNS（Domain Name System）

DNS服务是和HTTP协议一样位于应用层的协议，它提供域名到IP地址之间的解析服务。

- URL是URI的子集

**TCP三次握手**

- 确保数据能到达目标，TCP协议采用了三次握手策略 :

syn ：（序号），SYNchronize

ack ：（确认号），acknowledgement number

1. 第一次握手：客户端发送syn包(syn=j)到服务器，并进入SYN_SEND状态，等待服务器确认；

2. 第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；

3. 第三次握手：客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。

握手过程中传送的包里不包含数据，三次握手完毕后，客户端与服务器才正式开始传送数据。理想状态下，TCP连接一旦建立，在通信双方中的任何一方主动关闭连接之前，TCP 连接都将被一直保持下去。断开连接时服务器和客户端均可以主动发起断开TCP连接的请求，断开过程需要经过“四次握手”（过程就不细写了，就是服务器和客户端交互，最终确定断开）

- 为什么要三次握手:

防止已失效的连接请求又传送到服务器端，因而产生错误

防止其中一方停止发送后，另一方持续等待。

## 二。 HTTP

<https://developer.mozilla.org/zh-CN/docs/Web/HTTP>

HyperText Transfer Protocal,超文本传输协议

HTTP是不保存状态的协议。每当有新的请求发生时，就会有对应的新响应产生。

HTTP1.1有了cookie，就可以管理状态了。

**支持的方法**

GET：获取资源

POST：获取实体主体

PUT：传输文件

HEAD：获得报文首部

DELETE：删除文件

OPTIONS：询问支持的方法

TRACE：追踪路径

**持久连接节省通信量**

HTTP协议的初始版本中，每进行一次HTTP通信就要断开一次TCP连接。

解决TCP连接问题，HTTP/1.1想出了持久连接（HTTP keep-alive）。

持久连接的特点：只要任意一端没有明确提出断开连接，则保持TCP连接状态。

持久连接旨在建立1次TCP连接后进行多次请求和响应的交互。减少了TCP连接的重复建立和断开所造成的额外开销，减轻了服务器端的荷载。

在HTTP1.1中，所有连接默认都是持久连接。

**管线化**

管线化技术，不用等待响应亦可直接发送下一个请求。
同事并行发送多个请求，不需要一个接一个等待响应。

**cookie**

Cookie会根据从服务端发送的响应报文内的一个叫做Set-Cookie的首部信息字段，通知客户端保存Cookie。
下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入cookie值后发送出去。

**HTTP0.9**

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

**HTTP1.0**

- 关键变化：

请求可以由于多行首部字段构成  
响应对象前面添加了一个响应状态行  
响应对象也有自己的由换行符分隔的首部字段  
响应对象不局限于超文本  
服务器和客户端之间的连接在每次请求之后都会关闭

> 事实上，HTTP中的 HTT（超文本传输）在协议出现后不久就用词不当了。在实践中，HTTP迅速发展为超媒体传输协议。

**HTTP1.1**

> HTTP1.1改变了HTTP协议的语义，默认使用持久连接。除非明确告知（connection:close 首部），否则服务器会保持连接打开。  
移植到1.0上，通过Connection:Keep-Alive 首部启用。如果是1.1不需要这个头部。
> 厘清了之前版本中很多有歧义的地方，而且还加入了很多重要的性能优化：持久连接，分块编码传输，字节范围请求，增强的缓存机制，传输编码及请求管道。

**HTTP2.0**

> 改进传输性能,实现低延迟和高吞吐量。
> 现有的网站和应用，无需做任何更改都可以在HTTP2.0上跑起来

**状态码**

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

**header**

- 请求

> withCredentials

withCredentials设置为true，可以向服务器发送cookies

- 响应

1. Access-Control-Allow-Origin

2. Access-Control-Expose-Headers

在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

```sh
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

3. Access-Control-Max-Age

Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久，请参考本文在前面提到的preflight例子。

```sh
Access-Control-Max-Age: <delta-seconds>
```

4. Access-Control-Allow-Methods

Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

5. Access-Control-Allow-Headers

Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

## 三。 HTTPS

<http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html>

<http://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html>

**概念**

- 窃听收听解析数据包：抓包（Packet Capture）或嗅探器（Sniffer）工具

- 将通信加密：通过SSL（Secure Socket Layer，安全套接层）或TLS（Transport Layer Security 安全传输层协议）加密HTTP通信内容。

- SSL组合HTTP被称为HTTPS

- HTTP的缺点:

  通信使用明文（不加密），内容可能会被窃听。

  不验证通信方的身份，因此有可能遭遇伪装。

  无法证明报文的完整性，所以有可能已遭篡改。

- HTTP不论是谁发送来的请求都会返回响应，因此不确认通信方，会存在以下隐患:

  1. 无法确定请求发送至目标的web服务器是否是按真实意图返回响应的那台服务器。有可能是已伪装的web服务器。

  1. 无法确定响应返回到的客户端是否是按真实意图接收响应的那个客户端。有可能是已伪装的客户端。

  1. 无法确定对方是否具备访问权限。

  1. 无法确定请求来自何方，出自何手

  1. 即时是无意义的请求也会照单全收，无法阻止海量请求下的Dos攻击（Denial of Service，拒绝服务攻击）

- 请求和响应在传输途中，遭攻击者拦截并篡改内容的攻击称为中间人攻击（Man-in-the-Middle attack，MITM）

- HTTPS = HTTP + 加密 + 认证 + 完整性保护

- HTTPS不是一种新协议，只是HTTP通信接口部分用SSL和TSL协议代替

- 通常HTTP直接和TCP通信，当使用SSL时，变成先和SSL通信，SSL再和TCP通信。

**HTTPS的通信步骤**

<http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html>

- 版本1

第一步，爱丽丝给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。

第二步，鲍勃确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。

第三步，爱丽丝确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给鲍勃。

第四步，鲍勃使用自己的私钥，获取爱丽丝发来的随机数（即Premaster secret）。

第五步，爱丽丝和鲍勃根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

- 版本2

1. 第一次：

步骤1：客户端通过发送ClientHello报文开始SSL通信。报文中包含客户端支持的SSL的指定版本、加密组件（CipherSuite）列表（所使用的加密算法及密钥长度等）。

2. 第二次：

步骤2：服务器可进行SSL通信时，会以ServerHello报文作为应答。和客户端一样，在报文中包含SSL版本以及加密组件。服务器的加密组件内容是从接收到的客户端加密组件内筛选出来的。

步骤3：之后服务器发送Certificate报文。报文中包含公开密钥证书。

步骤4：最后服务器发送ServerHelloDone报文通知客户端，最初阶段的SSL握手协商部分结束。

2. 第三次：

步骤5：SSL第一次握手结束之后，客户端以ClientKeyExchange报文作为回应。报文中包含通信加密中使用的一种被称为Premastersecret的随机密码串。该报文已用步骤3中的公开密钥进行加密。

步骤6：接着客户端继续发送ChangeCipherSpec报文。该报文会提示服务器，在此报文之后的通信会采用Premastersecret密钥加密。

步骤7：客户端发送Finished报文。该报文包含连接至今全部报文的整体校验值。这次握手协商是否能够成功，要以服务器是否能够正确解密该报文作为判定标准。

3. 第四次：

步骤8：服务器同样发送ChangeCipherSpec报文。

步骤9：服务器同样发送Finished报文。

4. 第五次：

步骤10：服务器和客户端的Finished报文交换完毕之后，SSL连接就算建立完成。当然，通信会受到SSL的保护。从此处开始进行应用层协议的通信，即发送HTTP请求。

5. 第六次：

步骤11：应用层协议通信，即发送HTTP响应。

6. 第七次：

步骤12：最后由客户端断开连接。断开连接时，发送close_notify报文。上图做了一些省略，这步之后再发送TCPFIN报文来关闭与TCP的通信。

**公开密钥加密（Public-key cryptography）**

SSL采用公开密钥加密的加密处理方式。

- 大概逻辑

A有公钥和私钥。

B使用A的公钥进行加密，加密后的密文发送给A。

A使用私钥对密文进行解密。

- CA

数字证书认证机构（CA，Certificate Authority）颁发公钥证书

**HTTPS慢**

- HTTPS要比HTTP慢2-100倍

SSL的慢分两种：

1. 一种是通信慢：除去和TCP连接，发送HTTP请求，响应以外。还必须进行SSL通信，因此整体通信量会增加。

1. 一种是大量消耗CPU，内存资源：SSL必须加密解密处理。

## 知识点

**POST和GET的区别，列举一下**

> ????此条有问题，应该是url传参和data传参区别：

大小方面:GET传输一般2M，POST没有大小限制

安全方面:GET通过url明文传输，POST通过body传输，本身都不安全，因为HTTP就是明文传输。

浏览器记录:GET请求浏览器会记录，POST不会

浏览器后退:GET无害，POST会再次提交

浏览器收藏:GET可以收藏，POST不可以

浏览器缓存:GET可以缓存，POST不会

编码方式:GET通过url编码，POST支持多种编码

TCP数据包:GET产生一个数据包，POST产生2个数据包

使用方式(习惯上讲):GET主要拉取数据，POST主要提交保存数据
