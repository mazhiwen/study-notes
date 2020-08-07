# webapi

***

## parseInt

parseInt(string, radix)

将一个字符串 string 转换为 radix 进制的整数，

radix 为介于2-36之间的数。

接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。

无法解析，返回NaN

```js
parseInt('123', 5) // 将'123'看作5进制数，返回十进制数38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
```
