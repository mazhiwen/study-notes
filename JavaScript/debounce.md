# 防抖和节流

## 防抖

触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

每次触发事件时都取消之前的延时调用方法

```js
function debounce(fn) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments);
    }, 500);
  };
}
function sayHi() {
  console.log('防抖成功');
}

var inp = document.getElementById('inp');
inp.addEventListener('input', debounce(sayHi)); // 防抖
```

## 节流

高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

每次触发事件时都判断当前是否有等待执行的延时函数

**写法一**

```js
function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, 500);
  };
}
function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi));
```

**写法二**

函数有可能被非常频繁地调用，而造成大的性能问题。比如：  
window.onresize  
mousemove  
上传进度

函数节流的原理:  比如onresize，监听浏览器大小变化，console输出变化，1秒钟进行了10次。实际我们只需要2次或者3次。我们就可以按照时间段来忽略一些，比如确保500ms内打印一次，可以借助setTimeout来完成  

```js
// 把需要节流的目标执行函数，转换为节流函数
// 返回一个闭包形成的 带有私有状态的function
var throttle = function (fn,interval){
  var _self = fn,
    timer,
    firstTime = true;
  return function(){
    var args=arguments,
      _me=this;
    if(firstTime){
      _self.apply(_me,args);
      return firstTime=false;
    }
    if(timer){
      return false;
    }
    timer = setTimeout(function(){
      clearTimeout(timer);
      timer=null;
      _self.apply(_me,args);
    },interval||500);

  }
}
window.onresize = throttle(function(){
  console.log(1);
},500);
```
