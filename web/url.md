# URL

<https://url.spec.whatwg.org/#url-writing>

## 绝对地址 相对地址

`/` 开头是以host为绝对地址

 `非/` 开头 相对地址

## URL.createObjectURL()

objectURL = URL.createObjectURL(object);

object: 用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象。​

返回： 一个DOMString，包含了一个对象URL，该URL可用于指定源 object的内容。

用处示例:

### image 显示图片

```js
var img = document.createElement("img");
img.src = window.URL.createObjectURL(file);
img.onload = function() {
  window.URL.revokeObjectURL(this.src);
}
li.appendChild(img);
```

### a标签 下载

```js
// ab 为二进制
const tmpDown = new Blob([ab], { type: '' });
const a = document.createElement('a');
// 利用URL.createObjectURL()方法为a元素生成blob URL
a.href = URL.createObjectURL(tmpDown)  // 创建对象超链接
a.download = 'demo.xlsx';
a.click();
```
