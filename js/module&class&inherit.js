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


//******************************* es6模块实现
// 基于 函数 的 模块 并不是 一个 能被 稳定 识别 的 模式（ 编译器 无法 识别），
//  它们 的 API 语义 只有 在 运行时 才会 被 考虑 进来。 
//  因此 可以 在 运行时 修改 一个 模块 的 API（ 参考 前面 关于 公共 API 的 讨论）。 
// 相比之下， ES6 模块 API 更加 稳定（ API 不 会在 运行时 改变）。 
// 由于 编辑器 知道 这一点， 因此 可以 在（ 的 确 也 这样 做了） 编译 期 检查 对 导入 模块 的 API 成员 的 引用 是否 真实 存在。 
// 如果 API 引用 并不 存在， 编译器 会在 运行时 抛出 一个 或 多个“ 早期” 错误， 而 不会 像 往常 一样 在 运行 期 采用 动态 的 解决 方案。
//ES6的模块没有“行内”格式，必须被定义在独立的文件中（一个文件一个模块）。
//浏览器或引擎有一个默认的“模块加载器”（可以被重载，但这远超出了我们的讨论范围）可以在导入模块时异步地加载模块文件。
//实现:
// import export 语法 








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


