
# cookie

[预测最近面试会考 Cookie 的 SameSite 属性](https://juejin.cn/post/6844904095711494151)

[把cookie聊清楚（片尾附内推）](https://juejin.cn/post/6844903501869350925)

<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies>

<https://segmentfault.com/a/1190000004556040>

## 概念

作为一段一般不超过 4KB 的小型文本数据，它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成，这些涉及的属性我们会在后面会介绍。

当网页要发http请求时，浏览器会先检查是否有相应的cookie，有则自动添加在request header中的cookie字段中

第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会将cookie放入到响应请求中，在浏览器第二次发请求的时候，会把cookie带过去，服务端会辨别用户身份，当然服务器也可以修改cookie内容

## expires

expires其实是cookie失效日期，expires必须是 GMT 格式的时间（可以通过 new Date().toGMTString()或者 new Date().toUTCString() 来获得）。

对于失效的cookie浏览器会清空。

如果没有设置该选项，则默认有效期为session，即会话cookie。这种cookie在浏览器关闭后就没有了。

## domain path

domain是域名，path是路径，两者加起来就构成了 URL，domain和path一起来限制 cookie 能被哪些 URL 访问。

所以domain和path2个选项共同决定了cookie何时被浏览器自动添加到请求头部中发送出去。如果没有设置这两个选项，则会使用默认值。

domain的默认值为设置该cookie的网页所在的域名，path默认值为设置该cookie的网页所在的目录。

## secure

secure选项用来设置cookie只在确保安全的请求中才会发送。当请求是HTTPS或者其他安全协议时，包含 secure 选项的 cookie 才能被发送至服务器。

默认情况下，cookie不会带secure选项(即为空)。所以默认情况下，不管是HTTPS协议还是HTTP协议的请求，cookie 都会被发送至服务端。

## httpOnly

```sh
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

这个选项用来设置cookie是否能通过 js 去访问

默认情况下，cookie不会带httpOnly选项(即为空)，所以默认情况下，客户端是可以通过js代码去访问（包括读取、修改、删除等）这个cookie的

在客户端是不能通过js代码去设置一个httpOnly类型的cookie的，这种类型的cookie只能通过服务端来设置。

## SameSite

SameSite 属性可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。

### 属性值

SameSite 可以有下面三种值：

Strict 仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。
Lax 允许部分第三方请求携带 Cookie
None 无论是否跨站都会发送 Cookie

之前默认是 None 的，Chrome80 后默认是 Lax。

## 设置cookie

cookie既可以由服务端来设置，也可以由客户端来设置

1. 服务端

服务端都会返回response。而response header中有一项叫set-cookie，是服务端专门用来设置cookie的

一个set-Cookie字段只能设置一个cookie，当你要想设置多个 cookie，需要添加同样多的set-Cookie字段。

```sh
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2018 07:28:00 GMT;//可以指定一个特定的过期时间（Expires）或有效期（Max-Age）
```

服务端可以设置cookie 的所有选项

2. 客户端可以设置cookie

客户端可以设置cookie的下列选项：expires、domain、path、secure（有条件：只有在https协议的网页中，客户端设置secure类型的 cookie 才能成功），但无法设置HttpOnly选项

## 编辑cookie

要想修改一个cookie，只需要重新赋值就行，旧的值会被新的值覆盖。但要注意一点，在设置新cookie时，path/domain这几个选项一定要旧cookie 保持一样。否则不会修改旧值，而是添加了一个新的 cookie。

删除一个cookie 也挺简单，也是重新赋值，只要将这个新cookie的expires 选项设置为一个过去的时间点就行了。但同样要注意，path/domain/这几个选项一定要旧cookie 保持一样。

## 跨域和跨站

[如何区分两个地址是同站（Same site）还是跨站（Cross site）？](https://juejin.cn/post/6844904098148384776)

同站： `名称（taobao）+公共后缀（.com）` 一致就是同站， 否则就是跨站

公共后缀:  完整的公共后缀列表 - <https://publicsuffix.org/list/public_suffix_list.dat>

举几个例子，www.taobao.com 和 www.baidu.com 是跨站，www.a.taobao.com 和 www.b.taobao.com 是同站，a.github.io 和 b.github.io 是跨站(注意是跨站)。
