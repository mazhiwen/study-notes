# javascript基础知识点

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

## 作用域

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用  
（事实上在嵌套的作用域中也可以使用）。  
这种设计方案是非常有用的，能充分利用JavaScript变量可以根据需要改变值类型的“动态”特性。  
在任 意 代码 片段 外部 添加 包装 函数， 可以 将 内部 的 变量 和 函数 定义“ 隐藏” 起来，  
外部 作用域 无法 访问 包装 函数 内部 的 任何 内容。  
函数 声明 和 函数 表达式 之间 最重要的 区别 是 它们 的 名称 标识符 将会 绑 定 在何处。  

```javascript
(function foo(){ // <-- 添加 这 一行  //不行。 foo 变量 名 被 隐藏 在 自身 中， 不会 非必要 地 污染 外部 作用域。
  var a = 3; 
  console. log( a ); // 3
})(); // <-- 以及 这 一行
```

函数作用域（var） 没有给for if 等划分块级作用域  
块级作用域 with，try/catch，let  

## in

如果指定的属性在指定的对象或其原型链中，则in 运算符返回true。

## 数据类型 7种

Boolean  
Null  
Undefined  
Number  
String  
Symbol  
Object(new生成的,如：Array,Date,Function,RegExp等)

## 类型检测

```javascript
//常规检测
var arr=[1,'a'];
Array.isArray(arr);
arr instanceof Array;
//安全检测
Object. prototype. toString. call( arr ) == "[object Object]";
Object. prototype. toString. call( arr ) == "[object Array]";
Object. prototype. toString. call( arr ) == "[object Function]";
Object. prototype. toString. call( arr ) == "[object RegExp]";
window. JSON && Object. prototype. toString. call( JSON) == "[object JSON]";
```

## typeof

```javascript
//Numbers
typeof 37 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
// Strings
typeof "" === 'string';
typeof "bla" === 'string';
// Booleans
typeof true === 'boolean';
// Symbols
typeof Symbol() === 'symbol';
// Undefined
typeof undefined === 'undefined';
// Objects
typeof {a:1} === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
// 函数
typeof function(){} === 'function';
```

## instanceof

// 检测原型 

## 深拷贝 浅拷贝

```javascript
//深拷贝
//1.JSON.stringify() JSON.parse()
//2.递归赋值??????????????????????????????错误需修正
//判断是否是可迭代对象
function isIteration(obj){
  let objType = Object.prototype.toString.call(obj);
  return objType=='[object Object]'||objType=='[object Array]'
}
function deepCopy(obj) {
  
  if (!isIteration(obj)) {
    throw new Error('error arguments');
  }
  // const targetObj = obj.constructor === Array ? [] : {};
  const targetObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    //只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (isIteration(obj[key])) {
        targetObj[key] = deepCopy(obj[key]);
      } else {
        targetObj[key] = obj[key];
      }
    }
  }
  
  
  return targetObj;
}
```

## 内存泄漏

指由于疏忽或错误造成程序未能释放已经不再使用的内存的情况。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，失去了对该段内存的控制，因而造成了内存的浪费。  

检测:内存持续增多，存在内存泄漏；内存平稳，不存在内存泄漏

(https://segmentfault.com/a/1190000008901861)








## event

input  焦点keyup

body监听 keyup? 回车？