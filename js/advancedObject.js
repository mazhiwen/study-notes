/**************** 防篡改 Extensions ****************/
var person = { name: "Nicholas" }; 
Object. preventExtensions( person); 
person. age = 29; 
alert( person. age); //undefined
//检测是否可扩展
Object.isExtensible(person);



/**************** 密封 seal****************/
Object.seal(person);
//密封对象，不可扩展
//已有成员的[[Configurable]]为false,即不可删除属性
//属性值可修改






/**************** Object****************/
//数据属性，访问器属性




