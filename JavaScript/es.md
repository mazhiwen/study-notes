# es规范api

## es2015 es6

<http://es6.ruanyifeng.com/>

- 默认参数

```js
function fibonacci(current = 0, next = 1) {
}
```

- module

- Promise

- generator

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

- set

- map

- class

新的 数据类型class 区别与javaclass定义，class在js类似数据类型，可以在function 内定义

- symbol

## es2016 es7

- 1. Array.prototype.includes

- 2. Exponentiation Operator(求幂运算)

```js
3 ** 2  //9
// 效果同
Math.pow(3, 2) //9

```

## es2017 es8

- 1. async/await

- 2. Object.values/Object.entries
