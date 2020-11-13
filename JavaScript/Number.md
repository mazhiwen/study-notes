# number类型 与 Number

## number类型

### 科学计数法（e表示法）

数值等于e前面的数值乘以10的指数次幂。如下:

也可以小的数值3e-7

```js
var floatNum = 3.213e7 //等于32130000
```

### 范围

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

### NaN

NaN (Not a Number):用来表示一个本来要返回数值的操作数未返回数值的情况（这样就不会抛出错误）。NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”

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

### 将字符串转化为数字

<https://blog.csdn.net/m0_38099607/article/details/72638678>

3个函数可以把非数值转换为数值：Number() parseInt() parseFloat()

parseInt() parseFloat()专门把字符串转换成数值

parseFloat() 只解析十进制值

## Number

### Number构造函数

Number()可以用于任何数据类型

具体规则：见书上把

```js
Number('hello') //NaN
Number("") //0
Number('000011') //11
Number(true) //1

```

与数字值对应的引用类型

### Number对象

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

### number.toString([radix])

返回指定 Number 对象的字符串表示形式。

radix 指定要用于数字到字符串的转换的基数(从2到36)。如果未指定 radix 参数，则默认值为 10。

### numObj.toFixed()

toFixed() 方法使用定点表示法来格式化一个数值。

numObj.toFixed(digits)

digits ： 小数点后数字的个数；介于 0 到 20 （包括）之间，实现环境可能支持更大范围。如果忽略该参数，则默认为 0。

### Number.parseInt(string[, radix])

```js
Number.parseInt === parseInt; // true
```

Number.parseInt() 方法依据指定基数 [ 参数 radix 的值]，把字符串 [ 参数 string 的值] 解析成整数。

把string当作radix基数的数，转换为10进制整数

参数string：要解析的值。 如果此参数不是字符串，则使用ToString抽象操作将其转换为字符串。忽略此参数中的前导空格。

参数radix：一个介于2到36之间的整数，代表字符串的基数(数学数字系统中的基)。小心-这并不是默认为10。

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

### numObj.toPrecision()

方法以指定的精度返回该数值对象的字符串表示。

numObj.toPrecision(precision)

precision:可选。一个用来指定有效数个数的整数。
