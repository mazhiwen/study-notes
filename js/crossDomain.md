# 

## 同源策略

协议+端口号+域名要相同

1. Cookie、LocalStorage 和 IndexDB 无法读取  
2. DOM 和 Js对象无法获得  
3. AJAX 请求不能发送  

## 方法

### CORS

(Cross-Origin Resource Sharing)  
跨域浏览器加origin请求头

* 简单请求

method:GET, HEAD, POST  
Content-Type:application/x-www-form-urlencoded , multipart/form-data ,  text/plain

```javascript
//js
Origin:''
//server
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods:'GET'
```

* 非简单请求

method：不是简单请求中的一种  
Content-Type：不是简单请求中的一种  
浏览器先发送option， Preflighted requests请求

```javascript
//js
OPTIONS 
Access-Control-Request-Method: POST 
Access-Control-Request-Headers: content-type 
Origin: http://localhost:8080 

//server
Access-Control-Allow-Origin: http://localhost:8080 
Access-Control-Allow-Headers: Content-Type 
Access-Control-Allow-Methods: GET, POST, PUT, DELETE 
Content-Type: text/html
```

cookie

```javascript
//启用cookie
xhr.withCredentials = true;
//server
Access-Control-Allow-Credentials: true
```
### JSONP
GET  
js 文件不受浏览器同源策略的影响，所以通过 Script 便签可以进行跨域的请求
#### 前端
前端发送给后端一个方法名字。后端在数据包将返回数据包装为方法参数，与方法，一起返回。前端拿到返回结果后，会执行该函数。
```javascript

var script = document.createElement('script');
script.type = 'text/javascript';

// 传参并指定回调执行函数为onBack
script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
document.head.appendChild(script);

// 回调执行函数
function onBack(res) {
    alert(JSON.stringify(res));
}
```

#### 后端

```javascript
//返回content
onBack({"status": true, "user": "admin"})
```

#### 缺点

它支持 GET 请求而不支持 POST 等其它类行的 HTTP 请求。  
它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面或 iframe 之间进行数据通信的问题

### 代理

```sh
server{
    # 监听9099端口
    listen 9099;
    # 域名是localhost
    server_name localhost;
    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9871 
    location ^~ /api {
        proxy_pass http://localhost:9871;
    }
}
```

反向代理  
通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。

```sh
#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

### iframe form   待定????

没有返回值
创建form，提交到后端地址 ， 添加到创建的iframe ，submit form 

```javascript
const requestPost = ({url, data}) => {
  // 首先创建一个用来发送数据的iframe.
  const iframe = document.createElement('iframe')
  iframe.name = 'iframePost'
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  // 注册iframe的load事件处理程序,如果你需要在响应返回时执行一些操作的话.
  iframe.addEventListener('load', function () {
    console.log('post success')
  })

  const form = document.createElement('form')
  form.action = url
  // 在指定的iframe中执行form
  form.target = iframe.name
  form.method = 'post'

  const node = document.createElement('input')
  for (let name in data) {
    node.name = name
    node.value = data[name].toString()
    form.appendChild(node.cloneNode())
  }

  // 表单元素需要添加到主文档中.
  form.style.display = 'none'
  document.body.appendChild(form)
  form.submit()

  // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
  document.body.removeChild(form)
}
// 使用方式
requestPost({
  url: 'http://localhost:9871/api/iframePost',
  data: {
    msg: 'helloIframePost'
  }
})
```

## 相关

https://segmentfault.com/a/1190000011145364  
https://www.zhihu.com/topic/19612046/top-answers