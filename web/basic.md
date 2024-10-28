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
