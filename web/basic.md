GUI渲染线程
javascript引擎线程
浏览器事件触发线程
HTTP请求线程

# 一些知识

## 大文件上传

[面试官：你如何实现大文件上传](https://juejin.cn/post/7177045936298786872)

分片上传

- 创建切片

```js
// 创建切片
function createChunk(file, size = 2 * 1024 * 1024) {//两个形参：file是大文件，size是切片的大小
    const chunkList = []
    let cur = 0
    while (cur < file.size) {
        chunkList.push({
                file: file.slice(cur, cur + size)//使用slice()进行切片
        })
        cur += size
    }
    return chunkList
}
```

创建一个空的切片列表数组chunkList，将大文件按照每个切片2MB进行切片操作，因为File 接口没有定义任何方法，但是它从 Blob 接口继承了以下方法：
Blob.slice([start[, end[, contentType]]])，这里使用的是Blob接口的Blob.slice()方法，那么每个切片都应该在2MB大小左右，如上文件的大小是8359021，那么可得到4个切片，分别是`[0，2MB]、[2MB，4MB]、[4MB,6MB]、[6MB,8MB]`。调用createChunk函数，会返回一个切片列表数组，实际上，有几个切片就相当于有几个请求。

- 上传切片

```js
//数据处理
async function uploadFile(list) {
    const requestList = list.map(({file,fileName,index,chunkName}) => {
        const formData = new FormData() // 创建表单类型数据
        formData.append('file', file)//该文件
        formData.append('fileName', fileName)//文件名
        formData.append('chunkName', chunkName)//切片名
        return {formData,index}
    })
        .map(({formData,index}) =>axiosRequest({
            method: 'post',
            url: 'http://localhost:3000/upload',//请求接口，要与后端一一一对应
            data: formData
        })
            .then(res => {
                console.log(res);
                //显示每个切片上传进度
                let p = document.createElement('p')
                p.innerHTML = `${list[index].chunkName}--${res.data.message}`
                document.getElementById('progress').appendChild(p)
            })
        )
        await Promise.all(requestList)//保证所有的切片都已经传输完毕
}
​
//请求函数
function axiosRequest({method = "post",url,data}) {
    return new Promise((resolve, reject) => {
        const config = {//设置请求头
            headers: 'Content-Type:application/x-www-form-urlencoded',
        }
        //默认是post请求，可更改
        axios[method](url,data,config).then((res) => {
            resolve(res)
        })
    })
}
​
// 文件上传
upload.addEventListener('click', () => {
    const uploadList = chunkList.map(({file}, index) => ({
        file,
        size: file.size,
        percent: 0,
        chunkName: `${files.name}-${index}`,
        fileName: files.name,
        index
    }))
    //发请求，调用函数
    uploadFile(uploadList)
​
})
```

- 后端接收切片

- 合并切片

前端通知后端，切片上传完毕。后端合并。

## 跨页签通信

[跨标签页通信](https://juejin.cn/post/7260415501170868284?searchId=202307281636107BCD678C2438D1C47D62#heading-3)

- BroadCast Channel

- Service Worker

- LocalStorage window.onstorage 监听

- Shared Worker 定时器轮询（ setInterval ）

- IndexedDB 定时器轮询（ setInterval ）

- cookie 定时器轮询（ setInterval ）

- window.open、window.postMessage

- Websocket

## 打印相关

Print.js

[记一次原生实现浏览器打印功能](https://juejin.cn/post/7231015741453402149)

相关api：

```js
window.print()
```

```html
<link href="XXX.css" media="print" rel="stylesheet" />

<style media="print"> 
    @page {
        // 可以设置打印的css样式
        margin: 0;
    }
</style>

@media print { 
    // 内容同上style
}
```

## 全屏API

Fullscreen API

- 方法

Document 中的方法：

Document.exitFullscreen()
用于请求从全屏模式切换到窗口模式，会返回一个 Promise，会在全屏模式完全关闭的时候被置为 resolved 状态。

Element 中的方法：

Element.requestFullscreen()

- 事件

Document 上的事件处理程序

```
1.Document.onfullscreenchange

fullscreenchange 事件的处理程序，当进入全屏或退出全屏时，事件将被发送到Document上。此处理程序仅在整个文档全屏模式更改时有效。

2.Document.onfullscreenerror
fullscreenerror 事件的处理程序，当进入全屏或退出全屏出错时，事件将被发送到 Document 上，仅对整个文档的全屏模式更改出错时候有效。

Element 上的事件处理程序
3.Element.onfullscreenchange
当全屏事件发生时，该事件会被发送到该元素，表明该元素进入或退出全屏模式

4.Element.onfullscreenerror
fullscreenerror 事件的处理程序，当指定的 Element 改变全屏模式时候出现错误，该事件将被发送到指定的 Element 上。
```



## 内存泄漏

### 概念

内存泄漏（Memory Leak）是指程序中己动态分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统崩溃等严重后果。

指由于疏忽或错误造成程序未能释放已经不再使用的内存的情况。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，失去了对该段内存的控制，因而造成了内存的浪费。  

### 造成内存泄漏的操作

1. 意外的全局变量
2. 被遗忘的计时器或回调函数
3. 脱离 DOM 的引用。我们获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。
4. 闭包
5. 循环引用

## 垃圾回收

JavaScript代码运行时，需要分配内存空间来储存变量和值。当变量不在参与运行时，就需要系统收回被占用的内存空间，这就是垃圾回收。



### 回收机制：

-   Javascript 具有自动垃圾回收机制，会定期对那些不再使用的变量、对象所占用的内存进行释放，原理就是找到不再使用的变量，然后释放掉其占用的内存。

-   JavaScript中存在两种变量：局部变量和全局变量。全局变量的生命周期会持续到页面卸载；而局部变量声明在函数中，它的生命周期从函数执行开始，直到函数执行结束，在这个过程中，局部变量会在堆或栈中存储它们的值，当函数执行结束后，这些局部变量不再被使用，它们所占有的空间就会被释放。

-   不过，当局部变量被外部函数使用时，其中一种情况就是闭包，在函数执行结束后，函数外部的变量依然指向函数内部的局部变量，此时局部变量依然在被使用，所以不会回收。




### 减少垃圾回收

虽然浏览器可以进行垃圾自动回收，但是当代码比较复杂时，垃圾回收所带来的代价比较大，所以应该尽量减少垃圾回收。

-   **对数组进行优化：** 在清空一个数组时，最简单的方法就是给其赋值为[ ]，但是与此同时会创建一个新的空对象，可以将数组的长度设置为0，以此来达到清空数组的目的。

-   **对**`object`**进行优化：** 对象尽量复用，对于不再使用的对象，就将其设置为null，尽快被回收。

-   **对函数进行优化：** 在循环中的函数表达式，如果可以复用，尽量放在函数的外面。



## js中的堆和栈



在js引擎中对变量的存储主要有两种位置，堆内存和栈内存。

和java中对内存的处理类似，栈内存主要用于存储各种基本类型的变量，包括Boolean、Number、String、Undefined、Null，**以及对象变量的指针，这时候栈内存给人的感觉就像一个线性排列的空间，每个小单元大小基本相等。

而堆内存主要负责像对象Object这种变量类型的存储，如下图

在计算机领域中，堆栈是两种数据结构，它们只能在一端(称为栈顶(top))对数据项进行插入和删除。

堆：队列优先,先进先出；由操作系统自动分配释放 ，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。  

栈：先进后出；动态分配的空间 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回收，分配方式倒是类似于链 表。

## 内存优化

就全局变量而言，JavaScript不能确定它在后面不能够被用到，所以它会从声明之后就一直存在于内存中，直至手动释放或者关闭页面/浏览器，这就导致了某些不必要的内存消耗。我们可以进行以下的优化。

闭包是最容易产生内存问题的，

```js
(function(){
    // 你的代码
})();
```

1、优化内存的一个最好的衡量方式就是只保留程序运行时需要的数据，对于已经使用的或者不需要的数据，应该将其值设为 null，这上面说过，叫“解除引用”。需要注意的是，解除一个值的引用不代表垃圾回收器会立即将这段内存回收，这样做的目的是让垃圾回收器在下一个回收周期到来时知道这段内存需要回收。

在内存泄漏部分，我们讨论了无意的全局变量会带来无法回收的内存垃圾。但有些时候，我们会有意识地声明一些全局变量，这个时候需要注意，如果声明的变量占用大量的内存，那么在使用完后将变量声明为 null。

2、减少内存垃圾的另一个方法就是避免创建对象。new Object() 是一个比较明显的创建对象的方式，另外 const arr = [];、const obj = {};也会创建新的对象。另外下面这种写法在每次调用函数时都会创建一个新的对象：



## 浏览器端的存储技术

浏览器常见的存储技术有 cookie、localStorage 和 sessionStorage。

还有两种存储技术用于大规模数据存储，webSQL（已被废除）和 indexDB。

IE 支持 userData 存储数据，但是基本很少使用到，除非有很强的浏览器兼容需求

## cookies，sessionStorage 和 localStorage 的区别

SessionStorage， LocalStorage， Cookie 这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。区别在于前两者属于 HTML5 WebStorage，创建它们的目的便于客户端存储数据。而 cookie 是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）。cookie 数据始终在同源（协议、主机、端口相同）的 http 请求中携带（即使不需要），会在浏览器和服务器间来回传递。

cookie 其实最开始是服务器端用于记录用户状态的一种方式，由服务器设置，在客户端存储，然后每次发起同源请求时，发送给服务器端。cookie 最多能存储 4 k 数据，它的生存时间由 expires 属性指定，并且 cookie 只能被同源的页面访问共享。

sessionStorage 是 html5 提供的一种浏览器本地存储的方法，它借鉴了服务器端 session 的概念，代表的是一次会话中所保存的数据。它一般能够存储 5M 或者更大的数据，它在当前窗口关闭后就失效了，并且 sessionStorage 只能被同一个窗口的同源页面所访问共享。

localStorage 也是 html5 提供的一种浏览器本地存储的方法，它一般也能够存储 5M 或者更大的数据。它和 sessionStorage不同的是，除非手动删除它，否则它不会失效，并且 localStorage 也只能被同源页面所访问共享。

上面几种方式都是存储少量数据的时候的存储方式，当我们需要在本地存储大量数据的时候，我们可以使用浏览器的 indexDB 这是浏览器提供的一种本地的数据库存储机制。它不是关系型数据库，它内部采用对象仓库的形式存储数据，它更接近 NoSQL 数据库。

### 存储大小

cookie 数据大小不能超过4 k 。
sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

### 有期时间

localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
sessionStorage  数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会
                  保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。
cookie          设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。
  
### 作用域

sessionStorage  只在同源的同窗口（或标签页）中共享数据，也就是只在当前会话中共享。
localStorage    在所有同源窗口中都是共享的。
cookie          在所有同源窗口中都是共享的。

## 监听localStorage

<https://www.jianshu.com/p/519a1b42d659>

<https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API>

无论何时，Storage 对象发生变化时（即创建/更新/删除数据项时，重复设置相同的键值不会触发该事件，Storage.clear() 方法至多触发一次该事件），StorageEvent 事件会触发。在同一个页面内发生的改变不会起作用——在相同域名下的其他页面（如一个新标签或 iframe）发生的改变才会起作用。在其他域名下的页面不能访问相同的 Storage 对象。

```js
window.addEventListener('storage', function(e) {  
  document.querySelector('.my-key').textContent = e.key;
  document.querySelector('.my-old').textContent = e.oldValue;
  document.querySelector('.my-new').textContent = e.newValue;
  document.querySelector('.my-url').textContent = e.url;
  document.querySelector('.my-storage').textContent = e.storageArea;
});
```

## indexDB

- 键值对储存。

IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。

- 异步

IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。

- 支持事务。

IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

- 同源限制

IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。

- 储存空间大

IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。

- 支持二进制储存。

IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。



## 页面可见性

Page Visibility API

开发者需要知道，用户正在离开页面 , 常用的方法是监听下面三个事件:pagehide ,beforeunload,unload

Page Visibility API。不管手机或桌面电脑，所有情况下，这个 API 都会监听到页面的可见性发生变化。

这个新的 API 的意义在于，通过监听网页的可见性，可以预判网页的卸载，还可以用来节省资源，减缓电能的消耗。比如，一旦用户不看网页，下面这些网页行为都是可以暂停的:对服务器的轮询,网页动画,正在播放的音频或视频

## document.visibilityState

这个 API 主要在document对象上，新增了一个document.visibilityState属性。该属性返回一个字符串，表示页面当前的可见性状态，共有三个可能的值。

1. hidden：页面彻底不可见。

浏览器最小化。

浏览器没有最小化，但是当前页面切换成了背景页。

浏览器将要卸载（unload）页面。

操作系统触发锁屏屏幕。

2. visible：页面至少一部分可见。

3. prerender：页面即将或正在渲染，处于不可见状态。

## visibilitychange 事件

只要document.visibilityState属性发生变化，就会触发visibilitychange事件。因此，可以通过监听这个事件（通过document.addEventListener()方法或document.onvisibilitychange属性），跟踪页面可见性的变化。

```js
document.addEventListener('visibilitychange', function () {
  // 用户离开了当前页面
  if (document.visibilityState === 'hidden') {
    document.title = '页面不可见';
  }

  // 用户打开或回到页面
  if (document.visibilityState === 'visible') {
    document.title = '页面可见';
  }
});
```

## 关闭页面

浏览器有两个事件可以用来监听页面关闭，beforeunload和unload

beforeunload: 是在文档和资源将要关闭的时候调用的， 这时候文档还是可见的，并且在这个关闭的事件还是可以取消的。比如下面这种写法就会让用户导致在刷新或者关闭页面时候，有个弹窗提醒用户是否关闭。

```js
window.addEventListener("beforeunload", function (event) {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});
```

## IntersectionObserver API

[IntersectionObserver API 使用教程 - 阮一峰](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

```js
var io = new IntersectionObserver(callback, option);

// 开始观察
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();

```

上面代码中，IntersectionObserver是浏览器原生提供的构造函数，接受两个参数：
callback是可见性变化时的回调函数，
option是配置对象（该参数可选）。
