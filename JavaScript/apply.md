
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
