/**************** 匿名函数 ***************
//function后面没有定义名称
//匿名函数调用
//调用一,必须要实现赋值
var fn=function(x,y){
  return x+y;
}(2,3);
//调用二
(function(x,y){
  return x+y;
})(2,3);
//自执行函数
//方法一，外层括号，可换成 +, - ,~ ,true 等
(
  function () { 
    
  } ()
);
//方法二
(
  function () { 
    
  }
)();
*/



/**************** 作用域安全的构造函数 ***************
//不用new，直接调用构造函数时会改变this为window，以下修正
function Polygon( sides){ 
  if (this instanceof Polygon) { 
    this. sides = sides; 
    this. getArea = function(){ return 0; }; 
  } 
  else { 
    return new Polygon( sides); 
  } 
} 
//通过 call 方式继承，会被破坏，因为会new ，子类失去父类私有属性
//以下 call + prototype继承可修正
function Rectangle( width, height){ 
  Polygon. call( this, 2); 
  this. width = width; 
  this. height = height; 
  this. getArea = function(){ 
    return this. width * this. height; 
  }; 
} 
Rectangle. prototype = new Polygon(); 
var rect = new Rectangle( 5, 10);
*/



/**************** 惰性载入 ***************
//惰性 载入 表示 函数 执行 的 分支 仅 会 发生 一次。
//方法一：重写
function createXHR(){ 
  if (typeof XMLHttpRequest != "undefined"){ 
    //重写
    createXHR = function(){ 
      return new XMLHttpRequest(); 
    };
  }else {
    createXHR = function(){
    }
  }  
}
//方法二：函数载入时就指定为正确的函数
//创建匿名 自执行的函数
var createXHR = (function(){ 
  if (typeof XMLHttpRequest != "undefined"){ 
    //返回正确函数
    return function(){ 
      return new XMLHttpRequest(); 
    }; 
  }else{
    return function(){ 
    }; 
  }
})();
*/



/**************** 函数绑定 ***************
//this指向丢失
var handler = { 
  message: "Event handled", 
  handleClick: function( event){ 
    alert( this. message); 
  } 
}; 
var btn = document. getElementById(" my- btn"); 
EventUtil. addHandler( btn, "click", handler. handleClick);
//闭包解决
EventUtil. addHandler( btn, "click", function( event){ 
  handler. handleClick( event); 
});
//bind函数
function bind( fn, context){
  //创建闭包 
  return function(){ 
    return fn. apply( context, arguments); 
  }; 
}
//bind解决
EventUtil. addHandler( btn, "click", bind( handler. handleClick, handler));
//es5 提供原生bind方法
EventUtil. addHandler( btn, "click", handler. handleClick.bind(handler));
*/




/**************** call apply***************
//Function.prototype.call
fun.call(thisArg, arg1, arg2, argn);
//call方法的作用和 apply() 方法类似，
// 只有一个区别，就是call()方法接受的是若干个参数的列表，
// 而apply()方法接受的是一个包含多个参数的数组。
//Function.prototype.apply
fun.apply(thisArg, [argsArray])
*/




/**************** 函数柯里化 ****************/
//下一个函数的参数是上一个函数的结果
//且函数体内运行逻辑相同
//一个函数 多个参数
//内部函数 和 外部函数的 组合
function add( num1, num2){ 
  return num1 + num2; 
}
add(2,3); 
function curriedAdd(num2){
  return add (5,num2);
  //return add (add(2,3),num2);
}
curriedAdd(3);
//柯里化
function curry( fn){ 
  var args = Array. prototype. slice. call( arguments, 1); //外函数arguments
  //返回柯里化
  return function(){ 
    var innerArgs = Array. prototype. slice. call( arguments);//内函数arguments 
    var finalArgs = args. concat( innerArgs); 
    return fn. apply( null, finalArgs); 
  }; 
}
//应用以上

var curriedAdd = curry( add, 5); //参数为5的add柯里化
curriedAdd( 3); //8



