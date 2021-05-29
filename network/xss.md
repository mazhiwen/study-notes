# XSS (Cross Site Scripting)

<https://juejin.im/post/5bad9140e51d450e935c6d64>

<https://segmentfault.com/a/1190000013440764>

<https://juejin.im/post/6844903685122703367>

<https://blog.csdn.net/qq_35393693/article/details/86597707>

XSS攻击全名（Cross-Site-Script）跨站脚本攻击，为了跟CSS（Cascading-Style-Sheet）区分开来，所以缩写是XSS。

XSS 攻击指的是跨站脚本攻击，是一种**代码注入攻击**。

XSS 的本质是因为网站没有对恶意代码进行过滤，与正常的代码混合在一起了，浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。

主要是依靠一切可能的手段，将浏览器中可以执行的脚本(javascript)植入到页面代码中，从而获取用户cookie甚至账号密码等敏感数据使用户造成的一定的损失。

通常利用的是目标网站的发帖、发布产品等需要用户输入的地方，将脚本混淆到html输入中，上传到服务器，再诱导别的用户打开此页面，执行脚本的一个过程。

## XSS分类-存储型

XSS存在数据库

存储型XSS：存储型 XSS，持久化，代码是存储在服务器中的，如在个人信息或发表文章等地方，插入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，用户访问该页面的时候触发代码执行。这种 XSS 比较危险，容易造成蠕虫，盗窃 cookie

## XSS分类-反射型

存在url

反射型XSS：非持久化，需要欺骗用户自己去点击链接才能触发 XSS代码（服务器中没有这样的页面和内容），一般容易出现在搜索页面

## XSS分类-DOM型

浏览器取出和执行

DOM型XSS：不经过后端，DOM-XSS漏洞是基于文档对象模型(Document Objeet Model,DOM)的一种漏洞，DOM-XSS是通过url传入参数去控制触发的，其实也属于反射型XSS。

## 注入XSS的载体

### script标签

在script标签 执行内联的XSS JavaScript脚本

在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。

### 标签属性

如: href，src，background

在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签

### 标签属性值

如： `javascript:`

`<img  src="javascript:alert("XSS");">`

在标签的 href、src 等属性中，包含 javascript: 等可执行代码。

在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码（新版本浏览器已经可以防范）

### onload、onerror、onclick等

在 onload、onerror、onclick 等事件中，注入不受控制代码。

### style + expression

```html
<div style="width: expression(alert('XSS'));">
```

在 style 属性和标签中，包含类似 expression(...) 的 CSS 表达式代码（新版本浏览器已经可以防范）。

总之，如果开发者没有将用户输入的文本进行合适的过滤，就贸然插入到 HTML 中，这很容易造成注入漏洞。攻击者可以利用漏洞，构造出恶意的代码指令，进而利用恶意代码危害数据安全。

## XSS防御

XSS防御的总体思路是：对用户的输入(和URL参数)进行过滤，对输出进行html编码。也就是对用户提交的所有内容进行过滤，对url中的参数进行过滤，过滤掉会导致脚本执行的相关内容；然后对动态输出到页面的内容进行html编码，使脚本无法在浏览器中执行。

### 对输入的内容进行过滤或转义

一般建议在服务端做

对用户输入的内容进行过滤或转义，如： URL的每一个参数，URL本身，表单，搜索框

过滤字符，如：“<”、“>”、“(”、“）”、“;”

可以分为黑名单过滤和白名单过滤。黑名单过滤虽然可以拦截大部分的XSS攻击，但是还是存在被绕过的风险。白名单过滤虽然可以基本杜绝XSS攻击，但是真实环境中一般是不能进行如此严格的白名单过滤的。

前端 ，后端都可以对请求数据做标签过滤和检查。

### 对输出进行html编码

就是通过函数，将用户的输入的数据进行html编码，使其不能作为脚本运行。

如：encodeURI

### cookie

避免直接在cookie 中泄露用户隐私，例如email、密码等等

服务端可设置cookie为httponly，前端无法读取，只有服务端可读取

### 检查http refer

### 将单步流程改为多步，在多步流程中引入效验码

### CSP

见 cyber-attack.md
