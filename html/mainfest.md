# 离线缓存

<https://yanhaijing.com/html/2014/12/28/html5-manifest/>

HTML5的离线储存

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

离线的情况下，浏览器就直接使用离线存储的资源。

原理：HTML5 的离线存储是基于一个新建的 .appcache 文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

## 使用

html新增了一个manifest属性，可以用来指定当前页面的manifest文件。

创建一个和html同名的manifest文件，比如页面为index.html，那么可以建一个index.manifest的文件，然后给index.html的html标签添加如下属性即可：

```html
<html lang="en" manifest="index.manifest">
```

## manifest文件

```
CACHE MANIFEST
#version 1.3

CACHE:
    test.css

NETWORK:
 *

```

## 注意

浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。

如果manifest文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。

引用manifest的html必须与manifest文件同源，在同一个域下。

FALLBACK中的资源必须和manifest文件同源。

当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。

站点中的其他页面即使没有设置manifest属性，请求的资源如果在缓存中也从缓存中访问。

当manifest文件发生改变时，资源请求本身也会触发更新。
