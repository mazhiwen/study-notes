# Proxy Reflect

Proxy被用来自定义一些基础层面的操作(例如属性查找, 赋值, 枚举, 函数调用等)

[[译] JavaScript Proxy -- 一些真实的用例](https://juejin.cn/post/6844904103882162184)

## Proxy构造函数

```js
const p = new Proxy(target, handler)
```

handler 对象支持 13 种捕获器，这里只列举以下 5 种常用的捕获器：

```
handler.get()：属性读取操作的捕获器。
handler.set()：属性设置操作的捕获器。
handler.deleteProperty()：delete 操作符的捕获器。
handler.ownKeys()：Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕获器。
handler.has()：in 操作符的捕获器。
```

```js
// handler
{
  get: function(target, property, receiver) {
    // receiver
  }
  set: function (target, prop, value) {}
}
```

## Proxy例子

```js
//movie is a target
const movie = {
 name: "Pulp Fiction",
 director: "Quentin Tarantino"
};

//this is a handler
const handler = {
 //get is a trap
 get: (target, prop) => {
  if (prop === 'director') {
   return 'God'
  }
  return target[prop]
 },

 set: function (target, prop, value) {
  if (prop === 'actor') {
   target[prop] = 'John Travolta'
  } else {
   target[prop] = value
  }
 }
};

const movieProxy = new Proxy(movie, handler);

console.log(movieProxy.director); //God

movieProxy.actor = "Tim Roth";
movieProxy.actress = "Uma Thurman";

console.log(movieProxy.actor); //John Travolta
console.log(movieProxy.actress); //Uma Thurman

```

## Proxy应用: 验证

赋值，验证，

## Reflect

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 proxy handlers 的方法相同。Reflect 不是一个函数对象，因此它是不可构造的。

```js
const man = {
  name: "阿宝哥",
  city: "Xiamen",
};

console.log(Reflect.set(man, "sex", 1)); // true
console.log(Reflect.has(man, "name")); // true
console.log(Reflect.has(man, "age")); // false
console.log(Reflect.ownKeys(man)); // [ 'name', 'city', 'sex' ]
```
