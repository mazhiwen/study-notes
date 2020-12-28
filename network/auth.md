# 前端鉴权

鉴权主要分为四种：

- HTTP Basic Authentication (HTTP基本认证)
- session-cookie
- Token 验证(包括JWT,SSO)
- OAuth(开放授权)

我们普通网站常用的认证就是session-cookie的方式，用户向服务端发生请求，服务端会创建session并保存相关身份信息，并向客户端下发一个sessionId,大家如果用心的话，会发现跟JAVA交互的时候，浏览器会有一个JSESSION_ID，跟PHP交互的时候，会有一个PHPSESSION_ID;后面的每次请求，客户端都会自动带上这个cookie跟服务端通信。

实际上大家要明白每一种方式的作用；SSO主要用来做单点登录；OAuth主要用来做第三方网站授权；JWT就是一种便于扩展的跨域认证解决方案，通常会考察这个。

### JWT(JSON Web Token)

<http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html>

相比于session-cookie， 服务器就不保存任何 session 数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。

JWT 的三个部分依次：Header（头部）+ Payload（负载）+ Signature（签名）

Header 和 Payload 串型化的算法是 Base64URL。这个算法跟 Base64 算法基本类似，但有一些小的不同。

JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息Authorization字段里面。

### SSO （Single Sign On ）

单点登录

<https://juejin.im/post/5a002b536fb9a045132a1727>

### OAuth 2.0

<http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html>
