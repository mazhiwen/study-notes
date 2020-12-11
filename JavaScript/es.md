# es规范api

## es2015[es6]

<http://es6.ruanyifeng.com/>

### 默认参数

```js
function fibonacci(current = 0, next = 1) {
}
```

### let const

```
1.声明的变量只在声明时的代码块内有效
2.不存在声明提升
3.存在暂时性死区，如果在变量声明前使用，会报错
4.不允许重复声明，重复声明会报错
```

### 解构

用法一： 用于获取函数的多余参数。

```js
function fn(a, ...rest) {
  console.log(rest);
}
```

### module

### Promise

### generator

一种异步编程解决方案

调用 Generator 函数后，返回指向内部状态的指针对象，遍历器对象（Iterator Object）

Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }

```

### set

[Set文档](./set.md)

### map

[Map文档](./map.md)

### class

新的 数据类型class 区别与javaclass定义，class在js类似数据类型，可以在function 内定义

### symbol

[symbol文档](./symbol.md)

### 尾调用

尾调用指的是函数的最后一步调用另一个函数。我们代码执行是基于执行栈的，所以当我们在一个函数里调用另一个函数时，我们会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这个时候我们可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

## es2016[es7]

### Array.prototype.includes

### Exponentiation Operator(求幂运算)

```js
3 ** 2  //9
// 效果同
Math.pow(3, 2) //9

```

## es2017[es8]

### async/await

### Object.values/Object.entries
