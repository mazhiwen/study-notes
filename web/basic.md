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
