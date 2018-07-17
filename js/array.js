/**************** slice ****************/
//slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。
//且原始数组不会被修改。
arr.slice();// [0, end]
arr.slice(begin);// [begin, end]
arr.slice(begin, end);// [begin, end)

//slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。
//你只需将该方法绑定到这个对象上。 
//一个函数中的 arguments 就是一个类数组对象的例子。
function list() {
  return Array.prototype.slice.call(arguments);
  //[].slice.call(arguments)也可以
}
var list1 = list(1, 2, 3); // [1, 2, 3]




/**************** concat ****************/
