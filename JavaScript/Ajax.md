# Ajax

<https://juejin.im/post/58c883ecb123db005311861a?utm_source=gold_browser_extension>

2005 年 2 月，AJAX 这个词第一次正式提出，它是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

它是一种异步通信的方法，通过直接由 js 脚本向服务器发起 http 通信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法。


## 格式分类

1. 字符串

JSON字符串 application/json
urlencoded格式字符串 application/x-www-urlencoded
普通字符串 text/plain

2. FormData对象 
文件上传

3. buffer 或者进制格式


......

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

XHR是浏览器层面的API

XHR之前，网页要获取状态更新，必须刷新一次。XHR之后，实现异步实现，是网页交互应用的根本技术

XHR并不是针对XML开发的

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


## XHR下载数据

> XHR可以传输文本数据，二进制数据
> 浏览器自动编码，解码很多原生数据类型:  
ArrayBuffer: 固定长度的二进制数据缓冲区  
Blob：二进制大对象或者不可变数据  
Document：解析后得到的HTML或XML文档  
JSONJSON：表示简单数据结构的Javascript对象  
Text：简单的文本字符串
> Blob是HTML5的file API

## XHR上传数据

> XHR send()方法可以接受DOMString，Document，FormData，Blob，File 以及ArrayBuffer对象

```js
//简单文本上传到服务器
var xhr = new XMLHttpRequest();
xhr.open('POST','./upload');
xhr.onload = function(){
  ...
}
xhr.send('text string');

//FormData API动态创建表单数据，上传multipart/form-data对象
var formData = new FormData();
formData.append('id',2);
formData.append('str','dwqewqeq');

var xhr = new XMLHttpRequest();
xhr.open('POST','./upload');
xhr.onload = function(){}
xhr.send(formData);

//上传8字节整型的有类型数组
var xhr = new XMLHttpRequest();
xhr.open('POST','./upload');
xhr.onload = function(){};
var uInt8Array = new Uint8Array([1,2,3]);
xhr.send(uInt8Array.buffer);



//上传二进制Blob或用户提交的文件
var blob = ...;
const BYTE_PER_CHUNK = 1024*1024;
const SIZE = blob.size;

var start = 0;
var end = BYTE_PER_CHUNK;

while(start < SIZE) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST','/upload');
  xhr.onload = function(){}
  xhr.setRequestHeader('Content-Range',start+'-'+end+'/'+SIZE);
  xhr.send(blob.splice(start,end));
  start = end;
  end = start + BYTE_PER_CHUNK;
}


```

## 上传下载进度

> 要估算传输完成的数据量，服务器必须在响应中提供内容长度（Content-Length）首部，对于分块数据，由于响应的总长度未知，因此就无法估计进度了。
> XHR默认没有超时限制

```js
var xhr = new XMLHttpRequest();
xhr.open('GET','./resource');
xhr.timeout = 5000;

xhr.addEventListener('load',function(){
});
xhr.addEventListener('error',function(){
});
var onProgressHandler = function(event){
  if(event.lengthComputable){
    var progress = (event.loaded / event.total) * 100;
  }
}
//上传注册进度
xhr.upload.addEventListener('progress',onProgressHandler);
//下载注册进度
xhr.addEventListener('progress',onProgressHandler);
xhr.send();
```

## 实时通知 交付

- 轮询

```js
setInterval("xhrFn,60000");
```

定时发送XHR

- 长轮询

```js
function checkUpdates(url){
  var xhr = new XMLHttpRequest();
  xhr.open('GET',url);
  xhr.onload = function(){
    ...
    checkUpdates('/update');
  }
  xhr.send();
}
checkUpdates(('/update');
```

## XHR场景

局限性：  
从未考虑流式数据处理，支持有限  
没有好的方式实时交付更新
