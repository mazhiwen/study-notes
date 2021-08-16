# String 与 string类型

## string类型

表示由零或多个16位Unicode字符组成的字符序列，即字符串

区别于String内置对象，是字面量，不同的类型

```js
var text = 'th \b i \u03a3.';
```

### length

text.length 获得字符长度

### 转换为字符串

有两种方式：

toString()方法：返回相应值的字符串表现。默认情况下对数值输出10进制表现形式。可以传入参数输出对应的进制格式形式。

String() 转型函数: 不同于toString()，null 和 undefined 也可以执行String()

## String

String类型是字符串类型的包装类型

用String构造函数来创建String类型

```js
var stringObject = new String('hlll');
```

String类型的每个实例都有一个length属性，表示字符串中包含多少个字符

提供了很多方法,需要从书中补充

## slice

提取一个字符串的一部分，并返回一新的字符串。

不会改变原字符串

```js
str.slice(beginSlice[, endSlice])
beginSlice
// 从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 sourceLength + beginSlice 看待，这里的sourceLength 是字符串的长度 (例如， 如果beginSlice 是 -3 则看作是: sourceLength - 3)
endSlice
// 可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice会一直提取到字符串末尾。如果该参数为负数，则被看作是 sourceLength + endSlice，这里的 sourceLength 就是字符串的长度(例如，如果 endSlice 是 -3，则是, sourceLength - 3)。
var str1 = 'The morning is upon us.';
var str2 = str1.slice(4, -2);
console.log(str2); // OUTPUT: morning is upon u
```

## split

不会改变原字符

split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

## substring

不会改变原字符

substring(start, stop) 方法用于提取字符串中介于两个指定下标之间的字符。

## trim

trim() 方法并不影响原字符串本身，它返回的是一个新的字符串

```js
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'
```

## str.replace

str.replace(regexp|substr, newSubStr|function)

### newSubStr参数

$$ 插入一个 "$"。
$& 插入匹配的子串。
$` 插入当前匹配的子串左边的内容。
$' 插入当前匹配的子串右边的内容。
$n
假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始

```js
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
// Smith, John
console.log(newstr);
```

### function参数

```js
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```

## search(regexp | str)

str.search()

如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。

类似正则的test

```js
var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re)); // returns 4, which is the index of the first capital letter "J"
console.log(str.search(re2)); // returns -1 cannot find '.' dot punctuation
```

## match

方法检索返回一个字符串匹配正则表达式的的结果。

类似正则的match

返回:

如果使用g标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。 在这种情况下，返回的项目将具有如下所述的其他属性。

```js
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);

console.log(found);

// logs [ 'see Chapter 3.4.5.1',
//        'Chapter 3.4.5.1',
//        '.1',
//        index: 22,
//        input: 'For more information, see Chapter 3.4.5.1' ]

// 'see Chapter 3.4.5.1' 是整个匹配。
// 'Chapter 3.4.5.1' 被'(chapter \d+(\.\d)*)'捕获。
// '.1' 是被'(\.\d)'捕获的最后一个值。
// 'index' 属性(22) 是整个匹配从零开始的索引。
// 'input' 属性是被解析的原始字符串。
```

```js

'多少啊23ds'.match(/(\d+)/g);
// [23]
'多少啊23ds'.match(/(\D+)/g);
// [多少啊，ds]
```

```js
var str = '123sdfsdf456sdffs789'
var numArr = str.match(/\d+/g)

console.log(numArr)  // => ["123", "456", "789"]

// 也可以把拼接起来
console.log(+numArr.join('')) // => 123456789

```

## str.charAt()

charAt(index) 方法从一个字符串中返回指定的字符。

## str.padEnd()

padEnd()  方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

## str.padStart()

padStart() 方法用另一个字符串填充当前字符串(如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充。
