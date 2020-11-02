# Ajax

<https://juejin.im/post/58c883ecb123db005311861a?utm_source=gold_browser_extension>

2005 年 2 月，AJAX 这个词第一次正式提出，它是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

它是一种异步通信的方法，通过直接由 js 脚本向服务器发起 http 通信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法。

## AJAX步骤

1.创建 XMLHttpRequest 对象，也就是创建一个异步调用对象

2.创建一个新的 HTTP 请求，并指定该 HTTP 请求的方法、URL 及验证信息 xhr.open

3.设置响应 HTTP 请求状态变化的函数 xhr.onreadystatechange

4.发送 HTTP 请求 xhr.send

5.获取异步调用返回的数据

6.使用 JavaScript 和 DOM 实现局部刷新

## XMLHttpRequest

msdn关于XMLHttpRequest描述：  
<https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest>

```javascript
function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "yourFile.txt", true);
oReq.send();
```

## 二进制数据

<https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data>

* 接受

设置responseType

* 发送

send类型:File,ArrayBuffer, Blob

## 表单提交

1. 使用 POST 方法，并设置 enctype 属性为 application/x-www-form-urlencoded (默认)
2. 使用 POST 方法，并设置 enctype 属性为 text/plain
3. 使用 POST 方法，并设置 enctype 属性为 multipart/form-data
  FormData 对象
4. 使用 GET 方法（这种情况下 enctype 属性会被忽略）

## responseType

改变一个从服务器上返回的响应的数据类型 ,可选值:
空字符串 (默认)  
"arraybuffer"  
"blob"  
"document"  
"json"  
"text"  

## Ajax解决浏览器缓存

1.在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

2.在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

3.在 URL 后面加上一个随机数： "fresh=" + Math.random();。

4.在 URL 后面加上时间戳："nowtime=" + new Date().getTime();
