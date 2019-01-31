/**************** String.slice ****************/
// 提取一个字符串的一部分，并返回一新的字符串。
// str.slice(beginSlice[, endSlice])
// beginSlice
// 从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 sourceLength + beginSlice 看待，这里的sourceLength 是字符串的长度 (例如， 如果beginSlice 是 -3 则看作是: sourceLength - 3)
// endSlice
// 可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice会一直提取到字符串末尾。如果该参数为负数，则被看作是 sourceLength + endSlice，这里的 sourceLength 就是字符串的长度(例如，如果 endSlice 是 -3，则是, sourceLength - 3)。
var str1 = 'The morning is upon us.';
var str2 = str1.slice(4, -2);
console.log(str2); // OUTPUT: morning is upon u


/**************** String.replace ****************/
// str.replace(regexp|substr, newSubStr|function)




/**************** trim ****************/
// trim() 方法并不影响原字符串本身，它返回的是一个新的字符串
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'