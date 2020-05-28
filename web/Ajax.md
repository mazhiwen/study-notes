# Ajax

<https://juejin.im/post/58c883ecb123db005311861a?utm_source=gold_browser_extension>

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

### 二进制数据

<https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data>

* 接受

设置responseType

* 发送

send类型:File,ArrayBuffer, Blob

### 表单提交

1. 使用 POST 方法，并设置 enctype 属性为 application/x-www-form-urlencoded (默认)
2. 使用 POST 方法，并设置 enctype 属性为 text/plain
3. 使用 POST 方法，并设置 enctype 属性为 multipart/form-data
  FormData 对象
4. 使用 GET 方法（这种情况下 enctype 属性会被忽略）

### responseType

改变一个从服务器上返回的响应的数据类型 ,可选值:
空字符串 (默认)  
"arraybuffer"  
"blob"  
"document"  
"json"  
"text"  
