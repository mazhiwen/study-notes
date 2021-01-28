# 计算属性

<https://github.com/ljianshu/Blog/issues/68>

<https://juejin.im/entry/6844903910654607373>

<https://juejin.cn/post/6844903678533451783>

<https://juejin.cn/post/6844903678533451783>

官网： 对于任何复杂逻辑，你都应当使用计算属性。

## get和set

计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性。默认只有get，如果需要set，要自己添加。另外set设置属性，并不是直接修改计算属性，而是修改它的依赖。

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      //this.fullName = newValue 这种写法会报错
      var names = newValue.split(' ')
      this.firstName = names[0]//对它的依赖进行赋值
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

## 默认写法

默认是个函数

```js
data:{ //普通属性
  msg:'浪里行舟',
},
computed:{ //计算属性
  msg2:function(???this???){ //该函数必须有返回值，用来获取属性，称为get函数
    return '浪里行舟';
  },
  reverseMsg:function(){
  //可以包含逻辑处理操作，同时reverseMsg依赖于msg,一旦msg发生变化，reverseMsg也会跟着变化
    return this.msg.split(' ').reverse().join(' ');
 }
}
```

## computed vs method

computed 是可以缓存的，methods 不能缓存: 只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行

计算属性也可以通过闭包来实现传参

```js
:data="closure(item, itemName, blablaParams)"

computed: {
 closure () {
   return function (a, b, c) {
        /** do something */
        return data
    }
 }
}
```
