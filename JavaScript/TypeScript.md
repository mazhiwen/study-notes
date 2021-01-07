# TypeScript

## 泛型

因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。

```js
function identity<T>(arg: T): T {
    return arg;
}
```
