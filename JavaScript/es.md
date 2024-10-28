# es规范api

## es2015[es6]

<http://es6.ruanyifeng.com/>

<https://wangdoc.com/es6/>

### 默认参数

```js
function fibonacci(current = 0, next = 1) {
}
```

### let const

[见相关文档](./let.md)

### module

### Promise

### generator

### set

[Set文档](./set.md)

### map

[Map文档](./map.md)


### symbol

[symbol文档](./symbol.md)

### 尾调用

尾调用指的是函数的最后一步调用另一个函数。我们代码执行是基于执行栈的，所以当我们在一个函数里调用另一个函数时，我们会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这个时候我们可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

## class

新的 数据类型class 区别与javaclass定义，class在js类似数据类型，可以在function 内定义


```js
class Parent extends React.Component{
    // new的时候执行的函数
    constructor(x,y){
        super(); // React.Component.call(this) 参数给父类
        //this. 指向实例
    }

    num = 200 // 等价于this.num = 200 是实例私有属性

    getNum = ()= >{
        this //  是实例
    }

    static // 私有属性

    sum() {
        // 类似于 sum = function (){} 
        // 是Parent的公共方法 在parent.prototype
    }
    

}
Parent.prototype.y = 2300; //  Parent公共属性
```
## es2016[es7]

### Array.prototype.includes

### Exponentiation Operator(求幂运算)

```js
3 ** 2  //9
// 效果同
Math.pow(3, 2) //9

```

## es2017[es8]


### Object.values/Object.entries
