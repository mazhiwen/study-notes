//*********************************** 基本模块
function CoolModule() { 
    var something = "cool"; 
    var another = [1, 2, 3]; 
    function doSomething() { 
        console. log( something ); 
    } 
    function doAnother() { 
        console. log( another. join( " ! " ) ); 
    } 
    return { 
        doSomething: doSomething, 
        doAnother: doAnother 
    }; 
} 
var foo = CoolModule(); 
foo. doSomething(); // cool 
foo. doAnother(); // 1 ! 2 ! 3


//*********************************** 基本单例模块
//转换为IIFE
var foo = (function CoolModule() { 
    var something = "cool"; 
    var another = [1, 2, 3]; 
    function doSomething() { 
        console. log( something ); 
    } 
    function doAnother() { 
        console. log( another. join( " ! " ) ); 
    } 
    return { 
        doSomething: doSomething, 
        doAnother: doAnother 
    }; 
})();
foo. doSomething(); // cool 
foo. doAnother(); // 1 ! 2 ! 3



//*********************************** 模块管理器/定义/管理
var MyModules = (function Manager() { 
    var modules = {}; 
    function define( name, deps, impl) { 
        for (var i= 0; i< deps. length; i++) { 
            deps[ i] = modules[ deps[ i]]; 
        } 
        modules[ name] = impl. apply( impl, deps ); 
    } 
    function get( name) { 
        return modules[ name]; 
    } 
    return { 
        define: define, 
        get: get 
    }; 
})();
//实际应用
MyModules. define( "bar", [], function() { 
    function hello( who) { 
        return "Let me introduce: " + who; 
    } 
    return { hello: hello }; 
}); 
MyModules. define( "foo", ["bar"], function( bar) { 
    var hungry = "hippo"; 
    function awesome() { 
        console. log( bar. hello( hungry ).toUpperCase() ); 
    } 
    return { awesome: awesome }; 
} ); 
var bar = MyModules. get( "bar" ); 
var foo = MyModules. get( "foo" ); 
console. log( bar. hello( "hippo" ) ); // < i> Let me introduce: hippo</ i> 
foo. awesome(); // LET ME INTRODUCE: HIPPO








//*******************************组合继承  (原型链 和 借用构造函数共同构成)
function SuperType( name){ 
    this. name = name; 
    this. colors = ["red", "blue", "green"]; 

} 
SuperType. prototype. sayName = function(){
    alert( this. name); 
    
}; 
function SubType( name, age){
    //继承 属性 
    SuperType. call( this, name); //第二次 调用 SuperType()
    this. age = age; 
} 
    //继承 方法 
SubType. prototype = new SuperType(); //第一次 调用 SuperType()

SubType. prototype. sayAge = function(){ 
    alert( this. age);
};
 
 
var instance1 = new SubType(" Nicholas", 29);
 instance1. colors. push(" black"); 
 alert( instance1. colors); //"red, blue, green, black" 
 instance1. sayName(); //"Nicholas"; 
 instance1. sayAge(); //29 
 
var instance2 = new SubType(" Greg", 27); 
alert( instance2. colors); //"red, blue, green" 
instance2. sayName(); //"Greg"; 
instance2. sayAge(); //27



//*******************************寄生组合式继承
function object( o){ 
    function F(){} 
    F. prototype = o; 
    return new F(); 
}
function inheritPrototype( subType, superType){ 
    var prototype = object( superType. prototype); //创建 对象 
    // 或者 var prototype = Object.create( superType. prototype); 
    prototype. constructor = subType; //增强 对象 
    subType. prototype = prototype; //指定 对象 
}

function SuperType( name){ 
    this. name = name; 
    this. colors = ["red", "blue", "green"]; 
} 
SuperType. prototype. sayName = function(){ 
    alert( this. name); 
}; 
function SubType( name, age){ 
    SuperType. call( this, name); 
    this. age = age; 
}
inheritPrototype( SubType, SuperType); 
SubType. prototype. sayAge = function(){
  alert( this. age); 
};


