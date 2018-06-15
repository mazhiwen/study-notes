// var obj={
//     a:1,
//     b:2
// }
// with (obj){
//     b=3;
// }
// console.log(obj);

//////////////////组合继承  (原型链 和 借用构造函数共同构成)
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



///////////////////寄生组合式继承
function inheritPrototype( subType, superType){ 
    var prototype = object( superType. prototype); //创建 对象 
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


