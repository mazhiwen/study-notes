
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

## 数组扁平化

<https://github.com/mqyqingfeng/Blog/issues/36>
