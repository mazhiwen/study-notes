# 解构

[JavaScript 解构赋值：简化代码、提高效率](https://juejin.cn/post/7310137789979295780?searchId=202401191753507C6216D14E19DD52E4E4)

## 解构对象属性别名

```js
const obj = { a: 0, b: 1, c: 2 };
const { a, b: d, c: e } = obj;
// a d e => 0 1 2
```

## 解构对象属性默认值

```js
const obj = { a: 0, b: 1, c: 2 };
const { a, b = 2, d = 3 } = obj;
// a b d => 0 1 3
```

## 数组

```js
// 基本用法
const [a, b] = [1, 2];
console.log(a); // 输出: 1
console.log(b); // 输出: 2

// 忽略某些元素
const [c, , d] = [3, 4, 5];
console.log(c); // 输出: 3
console.log(d); // 输出: 5

// 默认值 
const [e, f, g = 6] = [7, 8];
console.log(e); // 输出: 7
console.log(f); // 输出: 8
console.log(g); // 输出: 6

const [e, f, g = 6] = [7, 8，9];
console.log(e); // 输出: 7
console.log(f); // 输出: 8
console.log(g); // 输出: 9

```

## 对象

## 函数

用法一： 用于获取函数的多余参数。

```js
function fn(a, ...rest) {
  console.log(rest);
}
```
