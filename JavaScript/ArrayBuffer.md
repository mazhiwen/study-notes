# ArrayBuffer TypedArray DataView

<https://juejin.cn/post/6844903889364336654>

## 应用

<https://juejin.cn/post/6844904029349216264>

将数据以 ArrayBuffer格式，即二进制数据传递，可以提升效率。相比较于Object传递时，进行数据拷贝。

见encode decode

```js
let data = [11,22,33];
const str = JSON.stringify(data);
const buf = new ArrayBuffer(str.length * 2);
const bufView = new Uint16Array(buf);
bufView.set(str.split("").map((_, i) => str.charCodeAt(i)));
return bufView;
```

## ArrayBuffer

是用于处理二进制数据的类。

为什么存在：javaScript与显卡通信的时候，大量的实时的数据交互，用文本格式需要进行格式转化，二进制则省去转化时间。

ArrayBuffer对象代表原始的二进制数据

ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图进行操作。

ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存

Node中的Buffer类是以更优化和更适合Nodejs的方式实现了Uint8Array API，意思就是Buffer类其实是TypedArray(Uint8Array)的nodejs实现。

## TypedArray

视图用来读写简单类型的二进制数据（ArrayBuffer），

视图的作用：以指定格式解读二进制数据

TypedArray一共包含九种类型，每一种都是一个构造函数。（DataView视图支持除Uint8ClampedArray以外的八种）

视图的构造函数接受三个参数，第一个ArrayBuffer对象，第二个视图开始的字节号（默认0），第三个视图结束的字节号（默认直到本段内存区域结束）

TypedArray只是视图，本身不存储数据，数据都存储在底层的ArrayBuffer中，要获取底层对象必须使用buffer属性

## DataView

视图用来读写复杂类型的二进制数据(ArrayBuffer)。

如果一段数据包含多种类型的数据，除了使用复合视图的方式读取之外，还可以使用DataView视图读取。
