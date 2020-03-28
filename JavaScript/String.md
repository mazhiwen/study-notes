# String 的方法

***

### str.slice

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

### str.split

不会改变原字符

split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

### str.substring

不会改变原字符

substring(start, stop) 方法用于提取字符串中介于两个指定下标之间的字符。

### str.trim

trim() 方法并不影响原字符串本身，它返回的是一个新的字符串

```js
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'
```

### str.replace

// str.replace(regexp|substr, newSubStr|function)

### str.search(regexp)

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

### str.match

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
