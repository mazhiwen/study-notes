# HTTPS

<http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html>

<http://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html>

## 概念

- 窃听收听解析数据包：抓包（Packet Capture）或嗅探器（Sniffer）工具

- HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

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

## HTTPS的通信步骤

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

## 公开密钥加密（Public-key cryptography）PageVisibility

SSL采用公开密钥加密的加密处理方式。

- 大概逻辑

A有公钥和私钥。

B使用A的公钥进行加密，加密后的密文发送给A。

A使用私钥对密文进行解密。

- CA

数字证书认证机构（CA，Certificate Authority）颁发公钥证书

## HTTPS慢

- HTTPS要比HTTP慢2-100倍

SSL的慢分两种：

1. 一种是通信慢：除去和TCP连接，发送HTTP请求，响应以外。还必须进行SSL通信，因此整体通信量会增加。

1. 一种是大量消耗CPU，内存资源：SSL必须加密解密处理。
