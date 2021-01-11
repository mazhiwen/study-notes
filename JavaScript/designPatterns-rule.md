# 设计模式原则

## 单一职责

**单一职业原则（SRP）**

修改代码总是一件危险的事情，特别是当两个职责耦合在一起的时候，一个职责发生变化可能会影响到其他职责的实现，造成意想不到的破坏，这种耦合性得到的是低内聚和脆弱的设计。

SRP的原则体现为： 一个对象（方法）只做一件事情。

- 设计模式中的SRP原则

代理模式:

把添加img标签的功能和预加载图片的职责分开放到两个对象中，这两个对象各自都只有一个被修改的动机。在它们各自发生改变的时候，也不会影响另外的对象。

迭代器模式:

```js
// 把迭代 和 操作dom 分开
var each = function(obj,callback){

}
var appendDiv = function(data){
  each(data,function(i,n){
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
  })
}
appendDiv([1,2,3,4,5,6]);
appendDiv({
  a:1,
  b:2,
  c:3
});
```

- 何时应该分离职责

> 一方面，如果随着需求的变化，有两个职责总是同时变化，那就不必分离他们。比如在ajax请求的时候，创建xhr对象和发送xhr请求几乎总是在一起的，那么创建xhr对象的职责和发送xhr请求的职责就没有必要分开。
> 另一方面，职责的变化轴线仅当他们确定会发生变化时才具有意义，即使两个职责已经被耦合在一起，但它们还没有发生改变的征兆，那么也许没有必要主动分离它们，在代码需要重构的时候再进行分离也不迟。

- 违反SRP原则

在方便性与稳定性之间要有一些取舍

- SRP原则的优缺点

优点：降低了单个类或者对象的复杂度，按照职责把对象分解成更小的粒度，这有助于代码的复用，也有利于进行单元测试。当一个职责需要变更的时候，不会影响到其他的职责。

缺点：会增加编写代码的复杂度。当我们按照职责把对象分解成更小的粒度之后，实际上也增大了这些对象之间相互联系的难度。

## 开闭原则

开发-封闭原则(OCP)**

定义如下：软件实体（类，模块，函数）等应该是可以扩展的，但是不可修改。

- window.onload 扩展

例如之前window.onload 的扩展，使用Function.prototype.after扩展方法。

通过动态函数的方式，我们完全不用理会从前window.onload函数的内部实现，无论它的实现优雅或是丑陋。只要它从前是个稳定运行的函数，那么以后也不会因为我们的新增需求而产生错误。

- 开放和封闭

上个window.onload函数，扩展时，可用两种方式，一种是修改原有代码，一种是增加一段新的代码。

思想：当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，但是不允许改动程序的源代码。

- 用对象的多态性消除条件分支

当看到过多的if else,就应该考虑，能否利用对象的多态性来重构它们。

- 找出变化的地方

最明显的规律是： 把系统中稳定不变的部分和容易变化的部分离开来。在系统的演变过程中，我们只需要替换那些容易变化的部分，如果这部分是封装好的，那么替换起来相对容易。而变化部分之外就是稳定的部分。

其他方式帮助我们编写遵守开放-封闭原则的代码

放置挂钩

放置挂钩也是分离变化的一种方式。我们在程序有可能发生变化的地方放置一个挂钩，挂钩的返回结果决定了程序的下一步走向。这样一来，原本的代码执行路径上就出现了一个分叉路口，程序未来的执行方向被预埋下多种可能性。

使用回调函数

回调函数是一种特殊的挂钩。我们可以把一部分易于变化的逻辑封装在回调函数里，然后把回调函数当作参数传入一个稳定和封闭的函数中。当回调函数被执行的时候，程序就可以因为回调函数的内部逻辑不同，而产生不同的结果。

- 设计模式中体现的开放-封闭原则

开放-封闭原则是编写一个好程序的目标，其他设计原则都是达到这个目标的过程。不管是具体的各种设计模式，还是更抽象的面向对象设计原则，比如单一职责原则，最少知识原则，依赖倒置原则等，都是为了让程序遵守开放-封闭原则而出现

.......

- 相对性

实际上，让程序保持完全封闭是不容易做到的。

至少，我们可以做到一下两点：

挑选出最容易发生变化的地方，然后构造抽象来封闭这些变化。

在不可避免发生修改的时候，尽量修改那些相对容易修改的地方。拿一个开源库来说，修改它提供的配置文件，总比修改它的源代码来得简单。

## 最少知识原则(LKP)**

- 减少对象之间的联系

最少知识原则要求我们在设计程序时，应当尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的相互联系。常见的做法是引入一个第三者对象，来承担这些对象之间的通信作用。如果一些对象需要向另一些对象发起请求，可以通过第三者对象来转发这些请求。

- 设计模式中的最少知识原则

中介者模式：博彩公司，

- 封装在最少知识原则中的体现

封装变量

## 接口和面向对象编程**

## 代码重构**

- 提炼函数

如果一个函数过长，不得不加上若干注释才能让这个函数显得易读一些，那这些函数就很有必要进行重构。

如果在函数中有一段代码可以被独立出来，那我们最好把这些代码放进另外一个独立的函数中。这是一种常见的优化。优点：

避免出现超大函数

独立出来的函数有助于代码复用

独立出来的函数更容易被覆写

独立出来的函数如果拥有一个良好的命名，它本身就起到了注释的作用

- 合并重复的条件判断

函数体内有一些条件分支语句，并且条件分支语句内都散布了重复的代码。那这段代码可以在条件分支语句外执行。

```js
if(){
  //..
  jump()
}else{
  //..
  jump()
}

// 优化
if(){
  //..
}else{
  //..
}
jump()
```

- 把条件分支语句提炼成函数

把条件分支语句的条件 提炼为函数，更易读

```js
if(data.getMonth() >= 6 && data.getMonth() <= 9){
  // ...
}
// 优化为
var isSummer = function(){
  return data.getMonth() >= 6 && data.getMonth() <= 9;
}
if(isSummer()){
  //...
}

```

- 合理使用循环

如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以完成同样的功能，还可以使代码量更少

```js
var createXHR = function(){
  var xhr;
  try(
    xhr = new ActiveXObject('MSXML2.XMLHttp.6.0');
  )catch(e){
    try(
      xhr = new ActiveXObject('MSXML2.XMLHttp.3.0');
    )catch(e){
      xhr = new ActiveXObject('MSXML2.XMLHttp');
    }
  }
  return xhr;
}
var xhr = createXHR();

// 优化后

var createXHR = function(){
  var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
  for( var i=0,version;version = versions[i++];){
    try(
      return new ActiveXObject(version);
    )catch(e){
    }
  }
}
```

- 提前让函数退出代替嵌套条件分支

避免嵌套的if else ；常见的做法是进行反转if表达式

```js
var del = function(obj){
  var ret;
  if( !obj.isReadOnly ){
    if( obj.isFolder ){
      ret = deleteFolder( obj );
    }else if(obj.isFile){
      ret = deleteFile(obj);
    }
  }
  return ret;
}

// 优化

var del = function(obj){
  if(obj.isReadOnly){
    return;
  }
  if(obj.isFolder){
    return  deleteFolder( obj );
  }
  if(obj.isFile){
    return  deleteFile( obj );
  }
}
```

- 传递对象参数代替过长的参数列表

把过长的参数放到一个obj内

```js
fun(a,b,c)
// 优化
fun({
  a,
  b,
  c
})
```

- 尽量减少参数数量

尽量减少函数接收参数数量

- 少用三目运算符

如果条件分支简单的情况，可以用三目运算符;如果条件分支复杂就不必要三目运算，直接if else更易读

```js
var global = typeof window !== "undefined" ? window:this;
```

- 合理使用链式调用

类似jquery的链式调用方法，即让方法调用结果后，返回对象自身。

```js
var User = function(){
  this.id = null;
  this.name = null;
}

User.prototype.setId = function(id){
  this.id = id;
  return this;
}

User.prototype.setName = function(name){
  this.name = name;
  return this;
}
console.log(new User().setId(1314).setName('sven'));

```

如果链式不稳定，会造成调试困难，调试必须拆开，加断点。如果链式很容易发生变化，倒置调试和维护困难，建议使用普通调用的形式。

```js
var user = new User();
user.setId('');
user.setName('');

```

- 分解大型类

原本的一个精灵动物类

```js
var Spirit = function( name ){
  this.name = name;
}
Spirit.prototype.attack = function( type ){
  if( type === 'waveBoxing' ){
    console.log( this.name + ':使用波动拳' );
  }else if( type === 'whirKick' ){
    console.log( this.name + ':使用旋风腿' );
  }
}
var spirit = new Spirit('RYU');
spirit.attack('waveBoxing');
spirit.attack('whirKick');

```

优化后:

attack这个类太大，实际上它完全有必要作为一个单独的类存在。面向对象设计鼓励将行为分布在合理数量的更小对象中

```js
//攻击类
var Attack = function( spirit ){
  this.spirit = spirit;
}
Attack.prototype.start = function(type){
  return this.list[type].call(this);
}
Attack.prototype.list={
  waveBoxing: function(){
    console.log( this.spirit.name+'使用拳');
  },
  whirKick: function(){
    console.log( this.spirit.name+'使用腿');
  }
}
// spirit类
var Spirit = function( name ){
  this.name = name;
  this.attackObj = new Attack( this );
}
Spirit.prototype.attack = function(type){
  this.attackObj.start(type);
}

var spirit = new Spirit('RYU');
spirit.attack('waveBoxing');
spirit.attack('whirKick');
```

- 用return退出多重循环

在函数体内有一个两重循环语句，我们需要在内层循环中判断，当到达某个临界条件时退出外层的循环。

常见的做法是引入外层控制变量标记 或者 设置循环条件的标记

```js
var func = function(){
  var flag = false;
  for( var i = 0;i<10;i++){
    for(var j =0;j<10;j++>){
      if(i*j>30){
        flag = true;
        break;
      }
    }
    if(flag === true){
      break;
    }
  }
}
```

更简单的做法是在需要中止循环的时候退出整个方法, 用return，并且当此时在循环之后还有一些将被执行的代码时，如果提前return，代码就不会被执行. 此时，可以把循环后的代码放到return后面，也可以把他们提炼为一个单独的函数

```js
var print = function( i ){
  console.log(i);
}
var func = function(){
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      if(i*j>30){
        return print(i);
      }
    }
  }
}
func();
```
