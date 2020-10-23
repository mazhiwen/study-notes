<https://juejin.im/post/5b1ffff96fb9a01e345ba704>
<https://segmentfault.com/a/1190000007535316>
<http://www.ruanyifeng.com/blog/2015/05/async.html>

async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。相较于 Generator，async 函数的改进在于下面四点：

- 内置执行器。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，调用方式跟普通函数的调用一样
- 更好的语义。async 和 await 相较于 * 和 yield 更加语义化
- 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await 命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）

```js
/**************** async/await ****************/
//babel 转换  node8支持
//await挂起当前函数，将后续语句加入到 event loop 循环中
// await 表示紧跟在后面的表达式需要等待结果。
async function asyncCall() {
  const v1 = await asyncFunc();
  const v2 = await asyncFunc(v1);
  const v3 = await asyncFunc(v2);
  return v3;
}
asyncCall();
```

**async**

- 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用

- async 表示函数里有异步操作

- async 表明当前函数是异步函数，不会阻塞线程导致后续代码停止运行

- 在async里，必须要将结果return回来，不然的话不管是执行reject还是resolved的值都为undefined

返回如下结果会使async函数判定失败:

- reject内部含有直接使用并且未声明的变量或者函数。
- 内部抛出一个错误throw new Error或者返回reject状态return Promise.reject('执行失败')
- 函数方法执行出错（🌰：Object使用push()）等等...

```js
async function e() {
    throw new Error('has Error');
}
e().then(success => console.log('成功', success))
   .catch(error => console.log('失败', error));
```

**await**

await意思是async wait(异步等待)。这个关键字只能在使用async定义的函数里面使用。
