<https://juejin.im/post/6844903646451204109>

# 栈

栈是一种遵循后进先出（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端就叫栈底。

在栈里，新元素都靠近栈顶，旧元素都接近栈底。

## 栈的实现

```js
// Stack类
function Stack () {
  this.items = [];

  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.isEmpty = isEmpty;
  this.clear = clear;
  this.size = size;
  this.print = print;
}
```

## push(element)

添加一个（或几个）新元素到栈顶

## pop()

移除栈顶的元素，同时返回被移除的元素

## peek()

返回栈顶的元素，不对栈做任何修改

## isEmpty()

如果栈里没有任何元素就返回true，否则返回false

## clear()

移除栈里的所有元素

## size()

返回栈里的元素个数
