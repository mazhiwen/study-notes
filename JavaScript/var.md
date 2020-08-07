# 变量

## 变量

js的变量是松散类型的，就是说可以用来保存任何类型的数据。

**赋值**

var message。这样未经过初始化的变量，会保存一个特殊的值undefined

定义变量的同时，可以设置变量的值：var message = '22';

初始化值操作，并不会把他标记为固定类型，比如以上不会标记为字符串类型。

**var定义局部变量**

使用var操作符定义的变量将称为定义该变量的作用域中的局部变量。

这个变量在函数退出后就会销毁

```js
function test(){
  var message = '2';
}
test();
alert(message); // 错误!
```

**一条语句定义多个变量**

```js
var message = '2',
  flund = false,
  age = 2;
```

## 变量提升

//声明（变量，函数等）提升， 赋值不提升

```javascript
var a=2;
//js编译阶段，先找到所有声明. var a;
//再进行执行阶段 a=2;

//函数优先变量提升 ,如 function foo(){}
foo(); // 1 var foo;
function foo() { console. log( 1 ); }
foo = function() { console. log( 2 ); };
//解析为:
function foo() { console. log( 1 ); }
foo(); // 1
foo = function() { console. log( 2 ); };
```
