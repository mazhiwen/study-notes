# js相关题集

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

## 用3升，5升杯子怎么量出4升水？

（1）将 5 升杯子装满水，然后倒入 3 升杯子中，之后 5 升杯子还剩 2 升水。

（2）将 3 升杯子的水倒出，然后将 5 升杯子中的 2 升水倒入 3 升杯子中。

（3）将 5 升杯子装满水，然后向 3 升杯子中倒水，直到 3 升杯子装满为止，此时 5 升杯子中就还剩 4 升水。

## 数组扁平化、去重、排序

<https://github.com/mqyqingfeng/Blog/issues/36>

```js
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
// 扁平化
let flatArr = arr.flat(4)
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
