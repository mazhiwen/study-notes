/**************** 防篡改 Extensions ****************/
var person = { name: "Nicholas" }; 
Object. preventExtensions( person); 
person. age = 29; 
alert( person. age); //undefined
//检测是否可扩展
Object.isExtensible(person);



/**************** 密封 seal****************/
Object.seal(person);
//密封对象，不可扩展 ,满足isExtensible
person. age = 29;//无效
//已有成员的[[Configurable]]为false,即不可删除属性
delete person.name;//无效
//属性值可修改
//检测是否seal
Object.isSealed(person);



/**************** 冻结 freeze****************/
Object.freeze(person);
//满足isExtensible 和 isSealed
//数据属性的[[Writable]]为false ,不可设置值
person.name='aaa';//无效
//检测
Object.isFrozen(person);




/**************** Object****************/
//数据属性，访问器属性


/**************** hasOwnPropty****************/
// 检测是否自身有某属性 返回boolean
