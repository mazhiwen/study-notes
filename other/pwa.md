# PWA


渐进式web应用

可从web浏览器安装，类似应用


## 环境


浏览器链接Android虚拟机


## 优势

渐进式：基于浏览器

流畅：基于servicework再离线，网络差下访问

可安装：添加到桌面，不用下载app

原生体验：像app一样，没有浏览器侧边栏

黏性：可以推送离线通知，用户回流


## web app manifest


web app manifest： 应用程序清单

可以让网站像应用一样可安装到主屏幕。可以有图标，名称，启动界面，隐藏边栏UI等

manifest.JSON文件存放一些信息：名称作者等等



index.html 引入 manifest.json。需要https协议

<link rel="manifest" href="manifest.json"/>


```json
{
    name:
    short_name:
    start_url:
    icons: [{},{},...]// size src type
    background_color: // 启动页背景色
    display: // app显示方式  
        // fullscreen: 全屏显示 无状态
        // standalone：推荐配置 ，有状态栏 
        // minimal-ui：显示url地址

    
}
```



## web worker

H5API，主要做离线缓存

是独立的worker线程

不能操作DOM和BOM

通过postMessage通信web线程


## service worker

详情看serviceworker文档

是独立的worker线程

对比webworker，webworker计算结果是临时的，不能被持久保存。service worker一旦install，会永远保存。

可编程拦截代理请求和返回，缓存文件

离线内容，开发者可控

异步代码，内部基本是promise实现



## fetch API

fetch API区别与XMLhttpreqest，fetch可以在serviceworker中使用



## cache storage API

cache storage接口表示cache对象存储，配合serviceworker来实现资源缓存

caches API类似数据库的操作

结合serveworker fetch等做资源缓存 离线获取等

```js
// 开启一个cache
const cache = caches.open('cache_1')
// 存储资源
await cache.addAll([
    '/index.html'
    //...
])

```


## notification



