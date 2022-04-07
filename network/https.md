# HTTPS

<http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html>

<http://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html>

[一次安全可靠的通信——HTTPS原理](https://developers.weixin.qq.com/community/develop/article/doc/000046a5fdc7802a15f7508b556413)

## HTTP的缺点

通信使用明文（不加密），内容可能会被窃听。

不验证通信方的身份，因此有可能遭遇伪装。

无法证明报文的完整性，所以有可能已遭篡改。

```
HTTP不论是谁发送来的请求都会返回响应，因此不确认通信方，会存在以下隐患:

无法确定请求发送至目标的web服务器是否是按真实意图返回响应的那台服务器。有可能是已伪装的web服务器。

无法确定响应返回到的客户端是否是按真实意图接收响应的那个客户端。有可能是已伪装的客户端。

无法确定对方是否具备访问权限。

无法确定请求来自何方，出自何手

即时是无意义的请求也会照单全收，无法阻止海量请求下的Dos攻击（Denial of Service，拒绝服务攻击）
```

## HTTPS概念

HTTPS 指的是超文本传输安全协议，HTTPS 是基于 HTTP 协议的，不过它会使用 TLS/SSL 来对数据加密。使用 TLS/ SSL 协议，所有的信息都是加密的，第三方没有办法窃听。并且它提供了一种校验机制，信息一旦被篡改，通信的双方会立 刻发现。它还配备了身份证书，防止身份被冒充的情况出现。

我们记住两个主要目的就行：1.对数据加密 2.验证网站服务器身份

HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

将通信加密：通过SSL（Secure Socket Layer，安全套接层）或TLS（Transport Layer Security 安全传输层协议）加密HTTP通信内容。

SSL组合HTTP被称为HTTPS

请求和响应在传输途中，遭攻击者拦截并篡改内容的攻击称为中间人攻击（Man-in-the-Middle attack，MITM）

HTTPS = HTTP + 通信加密 + 身份认证 + 通信完整性保护

HTTPS不是一种新协议，只是HTTP通信接口部分用SSL和TSL协议代替

通常HTTP直接和TCP通信，当使用SSL时，变成先和SSL通信，SSL再和TCP通信。

## HTTPS的通信步骤

<http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html>

第一步，客户端向服务器发起请求，请求中包含使用的协议版本号、生成的一个随机数、以及客户端支持的加密方法。

第二步，服务器端接收到请求后，确认双方使用的加密方法、并给出服务器的证书、以及一个服务器生成的随机数。

第三步，客户端确认服务器证书有效后，生成一个新的随机数，并使用数字证书中的公钥，加密这个随机数，然后发给服 务器。并且还会提供一个前面所有内容的 hash 的值，用来供服务器检验。

第四步，服务器使用自己的私钥，来解密客户端发送过来的随机数。并提供前面所有内容的 hash 值来供客户端检验。

第五步，客户端和服务器端根据约定的加密方法使用前面的三个随机数，生成对话秘钥，以后的对话过程都使用这个秘钥 来加密信息。

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
