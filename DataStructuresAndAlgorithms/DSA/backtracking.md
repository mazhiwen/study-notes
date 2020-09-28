# 回溯算法

使用回溯法进行求解，回溯是一种通过穷举所有可能情况来找到所有解的算法。如果一个候选解最后被发现并不是可行解，回溯算法会舍弃它，并在前面的一些步骤做出一些修改，并重新尝试找到可行解。究其本质，其实就是枚举。

## 例子：电话号码字母组合

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射（与电话按键相同）。注意 1 不对应任何字母。

```js
const letterCombinations = function (digits) {
    if (!digits) {
        return [];
    }
    const len = digits.length;
    const map = new Map();
    map.set('2', 'abc');
    map.set('3', 'def');
    map.set('4', 'ghi');
    map.set('5', 'jkl');
    map.set('6', 'mno');
    map.set('7', 'pqrs');
    map.set('8', 'tuv');
    map.set('9', 'wxyz');
    const result = [];

    function generate(i, str) {
        if (i == len) {
            result.push(str);
            return;
        }
        const tmp = map.get(digits[i]);
        for (let r = 0; r < tmp.length; r++) {
            generate(i + 1, str + tmp[r]);
        }
    }
    generate(0, '');
    return result;
};

letterCombinations([2,3]);
// 输入 [2,3]
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```
