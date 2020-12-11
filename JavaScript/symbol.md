
# Symbol

<https://juejin.im/post/5a0e65c1f265da430702d6b9>

独一无二的值

## Symbol()

Symbol 函数前不能使用 new 命令，否则会报错。

Symbol可以接收一个参数，这个参数用来des，主要用于程序调试时的跟踪，当然你也可以不传入参数，同样的我们可以通过typeof来判断是否为Symbol类型。

Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
const s = Symbol('aa');
const s1 = Symbol();

console.log(typeof s);  // "symbol"
```

即使是传入相同的参数，生成的 symbol 值也是不相等的，因为 Symbol 本来就是独一无二的意思

## Symbol.for

Symbol.for 方法可以检测上下文中是否已经存在使用该方法且相同参数创建的 symbol 值，如果存在则返回已经存在的值，如果不存在则新建。

```js
const s1 = Symbol.for('foo');
const s2 = Symbol.for('foo');

console.log(s1 === s2); // true
```

## Symbol.keyFor

Symbol.keyFor 方法返回一个使用 Symbol.for 方法创建的 symbol 值的 key

```js
const foo = Symbol.for("foo");
const key = Symbol.keyFor(foo);

console.log(key) // "foo"
```

## Object.getOwnPropertySymbols

Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。

## 用处

### 可以作为值

### 可以作为对象属性

```js
const name = Symbol('name');
const obj = {
    [name]: 'ClickPaas',
}
```
