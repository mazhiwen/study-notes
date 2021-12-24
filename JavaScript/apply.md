# js相关题集

智力题 ：<https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/%E7%AE%97%E6%B3%95/%E7%AE%97%E6%B3%95.md>

## ['1', '2', '3'].map(parseInt)

返回 [1, NaN, NaN]

## 请根据面对对象编程的思想，设计一个类型 Cash 用于表达人民币，使得

```js
class Cash {
}
const cash1 = new Cash(105);
const cash2 = new Cash(66);
const cash3 = cash1.add(cash2);
const cash4 = Cash.add(cash1, cash2);
const cash5 = new Cash(cash1 + cash2);
console.log(`${cash3}`, `${cash4}`, `${cash5}`);
```

```js
class Cash {
  constructor(money) {
   this.money = money;
  }
  static add(){ // Cash类直接可调用的方法
    let c = new Cash();
    [...arguments].forEach( // arguments转义为可数组Array
      function(item){
        this.money=(this.money||0)+(item.money||0);
      }.bind(c) // bind后返回改变this的函数
    );
    return c;
  }
  add(){ // 实例方法
    return Cash.add(this,...arguments);
  }
  valueOf() { // 实现实例可以运算，并取值
   return this.money;
  }
  toString() {
   return this.money.toString().replace(/(.)(..)$/,"$1元$2").replace(/(.)(.)$/,"$1角$2")+"分";
  }
}
```

## 假设你有8个球，其中一个略微重一些，但是找出这个球的惟一方法是将两个球放在天平上对比。最少要称多少次才能找出这个较重的球

最少两次可以称出。

首先将 8 个球分为 3 组，其中两组为 3 个球，一组为 2 个球。

第一次将两组三个的球进行比较，如果两边相等，则说明重的球在最后一组里。第二次将最后一组的球进行比较即可。如
果两边不等，则说明重的球在较重的一边，第二次只需从这一组中随机取两球出来比较即可判断。

## 用3升，5升杯子怎么量出4升水？

（1）将 5 升杯子装满水，然后倒入 3 升杯子中，之后 5 升杯子还剩 2 升水。

（2）将 3 升杯子的水倒出，然后将 5 升杯子中的 2 升水倒入 3 升杯子中。

（3）将 5 升杯子装满水，然后向 3 升杯子中倒水，直到 3 升杯子装满为止，此时 5 升杯子中就还剩 4 升水。

## 数组扁平化、去重、排序

<https://github.com/mqyqingfeng/Blog/issues/36>

```js
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
// 扁平化
let flatArr = arr.flat(Infinity)
// 去重
let disArr = Array.from(new Set(flatArr))
// 排序
let result = disArr.sort(function(a, b) {
    return a-b
})
console.log(result)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

## 数组交集

<https://github.com/sisterAn/JavaScript-Algorithms/issues/6>

filter 过滤 ;

Set 去重;

```js
const intersection = function(nums1, nums2) {
    return [...new Set(nums1.filter((item)=>nums2.includes(item)))]
};
```

## 在数组中，找和等于target的两个数

给定一个整数数组 nums 和一个目标值 target ，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

方案：

存储值, 每次迭代在存储列表查找 target与当前值的差值

```js
const twoSum = function(nums, target) {
    let map = new Map()
    for(let i = 0; i< nums.length; i++) {
        let k = target-nums[i]
        if(map.has(k)) {
            return [map.get(k), i]
        }
        map.set(nums[i], i)
    }
    return [];
};
```

## 合并两个有序数组

<https://github.com/sisterAn/JavaScript-Algorithms/issues/3>

```js
const merge = function(nums1, m, nums2, n) {
    let len1 = m - 1,
        len2 = n - 1,
        len = m + n - 1
    while(len2 >= 0) {
        if(len1 < 0) {
            nums1[len--] = nums2[len2--]
            continue
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--]: nums2[len2--]
    }
};
```

## LRU 缓存机制

运用你所掌握的数据结构，设计和实现一个 LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和写入数据 put 。

获取数据 get(key) - 如果密钥 ( key ) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1 。

写入数据 put(key, value) - 如果密钥不存在，则写入数据。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据，从而为新数据留出空间。

利用 Map 既能保存键值对，并且能够记住键的原始插入顺序

```js
var LRUCache = function(capacity) {
    this.cache = new Map()
    this.capacity = capacity
}

LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) {
        // 存在即更新
        let temp = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, temp)
        return temp
    }
    return -1
}

LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        // 存在即更新（删除后加入）
        this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
        // 不存在即加入
        // 缓存超过最大值，则移除最近没有使用的
        this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
}
```

## 多个数组的交集

```js
const intersection = function(...args) {
    if (args.length === 0) {
    return []
  }
  if (args.length === 1) {
    return args[0]
  }
  return [...new Set(args.reduce((result, arg) => {
    return result.filter(item => arg.includes(item))
  }))]
};
```

## 翻转字符串里的单词

<https://leetcode-cn.com/problems/reverse-words-in-a-string/solution/tu-jie-leetcodefan-zhuan-zi-fu-chuan-li-de-dan-ci-/>

无空格字符构成一个单词。

输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

输入: "a good   example"

输出: "example good a"

```js
var reverseWords = function(s) {
    return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ')
};
```

```js
var reverseWords = function(s) {
    let left = 0
    let right = s.length - 1
    let queue = []
    let word = ''
    while (s.charAt(left) === ' ') left ++
    while (s.charAt(right) === ' ') right --
    while (left <= right) {
        let char = s.charAt(left)
        if (char === ' ' && word) {
            queue.unshift(word)
            word = ''
        } else if (char !== ' '){
            word += char
        }
        left++
    }
    queue.unshift(word)
    return queue.join(' ')
};
```

## 最长公共前缀

<https://github.com/sisterAn/JavaScript-Algorithms/issues/19>

解法一：逐个比较

解法二：先找最长，最短字符串，再找这两个字符串的最长公共前缀

解法三：分治策略，归并思想

```js
var longestCommonPrefix = function(strs) {
    if (strs === null || strs.length === 0) return "";
    return lCPrefixRec(strs)
};

// 若分裂后的两个数组长度不为 1，则继续分裂
// 直到分裂后的数组长度都为 1，
// 然后比较获取最长公共前缀
function lCPrefixRec(arr) {
  let length = arr.length
  if(length === 1) {
    return arr[0]
  }
  let mid = Math.floor(length / 2),
      left = arr.slice(0, mid),
      right = arr.slice(mid, length)
  return lCPrefixTwo(lCPrefixRec(left), lCPrefixRec(right))
}

// 求 str1 与 str2 的最长公共前缀
function lCPrefixTwo(str1, str2) {
    let j = 0
    for(; j < str1.length && j < str2.length; j++) {
        if(str1.charAt(j) !== str2.charAt(j)) {
            break
        }
    }
    return str1.substring(0, j)
}
```

解法四：Trie 树（字典树）

## 字符串相加

<https://github.com/sisterAn/JavaScript-Algorithms/issues/32>

给定两个字符串形式的非负整数 num1 和 num2 ，计算它们的和。

例如：

"111" + ”2222“ = ”2333“

注意：

```
num1 和 num2 的长度都小于 5100
num1 和 num2 都只包含数字 0-9
num1 和 num2 都不包含任何前导零
你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式
```

实现思路：

```

从低位开始相加:

从 num1 ，num2 的尾部开始计算，模拟人工加法，保存到 tmp 中；

计算 tmp 的个位数，并添加到 result 的头部，这里的 result 是 string 类型，不是 number 类型；

计算进位，改成 tmp，进行下次循环

索引溢出处理：循环结束，根据 tmp 判断是否有进位，并在 result 头部添加进位 1

返回 result
```

```js
var addStrings = function(num1, num2) {
  let a = num1.length, b = num2.length, result = '', tmp = 0
  while(a || b) {
    a ? tmp += +num1[--a] : ''
    b ? tmp +=  +num2[--b] : ''
    
    result = tmp % 10 + result
    if(tmp > 9) tmp = 1
    else tmp = 0
  }
  if (tmp) result = 1 + result
  return result
};
```

## 无重复字符的最长子串

<https://github.com/sisterAn/JavaScript-Algorithms/issues/21>

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

用map实现，时间复杂度O(n)

```js
var lengthOfLongestSubstring = function(s) {
    let map = new Map(), max = 0
    for(let i = 0, j = 0; j < s.length; j++) {
        if(map.has(s[j])) {
            i = Math.max(map.get(s[j]) + 1, i)
        }
        max = Math.max(max, j - i + 1)
        map.set(s[j], j)
    }
    return max
};
```

## (a === 1 && a === 2 && a === 3) 返回true

== 用Object.valueOf

=== 用defineProperty(window,a,{
  get
})

<https://juejin.cn/post/6844903725442531341>

## 如何实现一个 new

```js
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
```
