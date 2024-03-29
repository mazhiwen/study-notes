# CSRF （Cross-site request forgery）

[前端安全系列之二：如何防止CSRF攻击？](https://juejin.cn/post/6844903689702866952#heading-14)

<https://juejin.im/post/5bc009996fb9a05d0a055192>

CSRF（Cross-site request forgery）**跨站请求伪造**：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

CSRF 攻击的本质是利用了 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。

## 一个典型的CSRF攻击有着如下的流程

受害者登录a.com，并保留了登录凭证（Cookie）。  
攻击者引诱受害者访问了b.com。  
b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会…  
a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。  
a.com以受害者的名义执行了act=xx。  
攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。  

## CSRF的特点

- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。  
- 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。  
- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。  
- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

## 防御方法

### 同源检测 Referer

Referer：对于需要防范 CSRF 的请求，我们可以通过验证 Referer 来判断该请求是否为第三方网站发起的。

```
设置Referrer Policy的方法有三种：

在CSP设置
页面头部增加meta标签
a标签增加referrerpolicy属性
```

### Samesite Cookie

Samesite Cookie： 可以对 Cookie 设置 SameSite 属性。该属性设置 Cookie 不随着跨站请求发送，该属性可以很大程度减少 CSRF 的攻击，但是该属性目前并不是所有浏览器都兼容。

### CSRF Token

提交时要求附加本域才能获取的信息

CSRF Token ：服务器下发一个随机 Token（算法不能复杂），每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。

双重Cookie验证

### 双重cookie验证

### 分布式校验

### Get 请求不对数据进行修改
