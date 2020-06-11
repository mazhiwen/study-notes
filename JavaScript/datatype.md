# 数据类型

ECMAScript不支持任何创建自定义类型的机制

而所有值都将是6中基本数据类型 加上 Object 一起的 7 种数据类型之一。

***

## 一：基本类型

有6种

存放在栈(stack)内存

有：

### 1.null类型 (只有null值)

null值表示一个空对象指针，所以typeof会返回Object

```js
null == undefined // true ,undefined派生自null
```

### 2.undefined类型 (只有undefined值)

包含undefined值的变量与尚未定义的变量是不一样的：

```js
var mes;
mes //undefined
age //没有声明，报错
```

对未初始化和未声明的变量执行typeof都返回undefined

### 3.boolean (只有true false值)

可以对任何数据类型的值调用Boolean()函数，而且总会返回一个Boolean值

返回true或者false取决于要转换值的数据类型以及其值

规则：

```
数据类型     转换为true的值           转换为false的值

Boolean      true                    false
String      任何非空字符串              ""(空字符串)
Numbber   任何非0数字值（包括无穷大）    0和NaN
Object      任何对象
undefined                          undefined
```

流控制语句（如if语句）自动执行相应的Boolean转换

### 4.string

表示由零或多个16位Unicode字符组成的字符序列，即字符串

区别于String内置对象，是字面量，不同的类型

```js
var text = 'th \b i \u03a3.';
```

- length

text.length 获得字符长度

- 转换为字符串

有两种方式：

toString()方法：返回相应值的字符串表现。默认情况下对数值输出10进制表现形式。可以传入参数输出对应的进制格式形式。

String() 转型函数: 不同于toString()，null 和 undefined 也可以执行String()

### 5.number

用来表示整数和浮点数值

- 科学计数法（e表示法）：

数值等于e前面的数值乘以10的指数次幂。如下:

也可以小的数值3e-7

```js
var floatNum = 3.213e7 //等于32130000
```

- 范围

浮点数值的最高精度是17位小数。

但是在进行算数计算时，浮点计算精度远远不如整数，如下:

```js
0.1 + 0.3  // = 0.300000000004;
```

```
最小值：Number.MIN_VALUE = 5e-324
最大值：Number.MAX_VALUE = 1.79....e+308
```

计算如果超出范围，这个数值会自动转换成特殊的Infinity值。

isFinite()函数用来判断参数值是否在最值范围内

- NaN

NaN (Not a Number):用来表示一个本来要返回数值的操作数未返回数值的情况（这样就不会抛出错误）

任何涉及NaN的操作都会返回NaN

任何值与NaN都不等

```js
NaN == NaN // false
```

isNaN() 函数：接收任何类型的参数，返回这个参数是否 不是数值。在接收到参数后，会尝试将这个值转为数值。不能转换为数值的值会返回true。

```js
isNaN(NaN) // true
isNaN(10) // false
isNaN("10") // false
isNaN("blue") // true
isNaN(true) // false  可以转换为1
```

- 数值转换

3个函数可以把非数值转换为数值：Number() parseInt() parseFloat()

Number()可以用于任何数据类型

具体规则：见书上把

```js
Number('hello') //NaN
Number("") //0
Number('000011') //11
Number(true) //1
```

parseInt() parseFloat()专门把字符串转换成数值

```js
parseInt('1234blue') // 1234
parseInt('') // NaN
parseInt('0xA') // 10 16进制
parseInt(22.5) // 22
parseInt('070') // 56 8进制
parseInt('70') // 70 10进制
parseInt('0xf') // 15 16进制
```

parseInt() 第二个参数是转换时，使用的基数，即多少进制

```js
parseInt('0xAF',16)
```

parseFloat() 只解析十进制值

### 6.Symbol

## 二：引用类型

存放在堆(heap)内存：

10个引用类型

### 基本引用类型

**1. Object**

js中的对象其实就是一组数据和功能的集合。

对象可以通过new操作符后跟要创建的对象类型的名称来创建。

在js中，Object类型是所有它的实例的基础。Object所具有的任何属性和方法也同样存在与更具体的对象中。

Object的每个实例都具有以下属性和方法：

- Constructor: 保存着用于创建当前对象的函数。
- hasOwnProperty(proertyName)
- isPrototypeOf(object) ： 传入的对象是否是另一个对象的原型。
- propertyIsEnumerable(proertyName)
- toLocalString()
- toString()
- valueOf()

**2. Function**

**3. Array**

**4. Date**

**5. RegExp**

### 特殊引用类型（又叫包装类型）

每当读取一个基本类型的值的时候，后台就会创建一个对应的包装类型的对象：

```js
// Boolean Number String 都适用于以下
var s1 = 'abc';
var s2 = s1.substring(2);

//当第二行访问s1的时候，开始等价执行以下代码:

var s1 = new String('abc');
var s2 = s1.substring(2);
s1 = null;
```

**6. Boolean**

Boolean类型与布尔值对应的引用类型

创建Boolean对象：调用Boolean构造函数并传入true或false值

```js
var booleanObject = new Boolean(true);
```

Boolean类型的实例重写了valueOf()方法，返回基本类型值true或者false

重写了toString()方法，返回字符串'true'或'false'

布尔表达式中的所有对象都会被转换为true,如下:

```js
var falseObject = new Boolean(false);
falseObject && true // true

var falseValue = false;
falseValue && true // false
```

基本类型与引用类型的布尔值还有两个区别，如下：

```js
typeof falseObject // object
typeof falseValue // boolean

falseObject instanceof Boolean // true
falseValue instanceof Boolean // false
```

**7. Number**

与数字值对应的引用类型

创建Number对象，在调用Number构造函数时，向其中传递相应的数值：

```js
var numberObject = new Number(10);
```

Number类型也重写了valueOf(),toString(),toLocaleString()方法

重写的valueOf()返回表示的基本类型的数值

另外两个返回字符串形式的数值

toString(2) 传递表示基数的参数，返回几进制数值的字符串形式

toFixed() 按照制定的小数位返回数值的字符串形式

toExponential()

toPrecision()等其他方法需要补充到Number文档

同样和Boolean对象类似，基本类型数值与引用类型数值测试时，返回值不同，如下：

```js
var numberObject = new Number(2);
var numberValue = 2;

typeof numberObject // object
typeof numberValue // number

numberObject instanceof Number // true
numberValue instanceof Number // false
```

Number对象是Number类型的实例，而基本类型的数值则不是

**8. String**

String类型是字符串类型的包装类型

用String构造函数来创建String类型

```js
var stringObject = new String('hlll');
```

String类型的每个实例都有一个length属性，表示字符串中包含多少个字符

提供了很多方法,需要从书中补充 [String类型文档](../String.md)

### 单体内置对象

**9. Global对象**

**10. Math对象**

### 引用类型与包装类型的区别

主要区别是对象的生存周期。

使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。

而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。

### Object构造函数对包装类型的处理

根据传入值的类型返回相应基本包装类型的实例

```js
var obj = new Object('aa');
console.log(obj instanceof String);// true
```

### new包装类型的构造函数与同名的转型函数不同

```js
var value = '25';
var number = Number(value); //转型函数
alert(typeof number); // 'number',保存的是基本类型的值25

var obj = new Number(value); //构造函数
alert(typeof obj); // 'object',保存的是Number的实例
```
