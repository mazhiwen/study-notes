/**************** 匿名函数 ****************/
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
    /* code */ 
  } ()
);
//方法二
(
  function () { 
    /* code */ 
  }
)();




/**************** 作用域安全的构造函数 ****************/
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




/**************** 惰性载入 ****************/
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




/**************** 函数绑定 ****************/

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






