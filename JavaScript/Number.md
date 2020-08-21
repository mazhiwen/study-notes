# number

## number.toString([radix])

返回指定 Number 对象的字符串表示形式。

radix 指定要用于数字到字符串的转换的基数(从2到36)。如果未指定 radix 参数，则默认值为 10。

## Number.parseInt(string[, radix])

```js
Number.parseInt === parseInt; // true
```

Number.parseInt() 方法依据指定基数 [ 参数 radix 的值]，把字符串 [ 参数 string 的值] 解析成整数。

参数string：要解析的值。 如果此参数不是字符串，则使用ToString抽象操作将其转换为字符串。忽略此参数中的前导空格。

参数radix：一个介于2到36之间的整数，代表字符串的基数(数学数字系统中的基)。小心-这并不是默认为10。
