/**************** Array.slice ****************/
//slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。
//且原始数组不会被修改。
array.slice();// [0, end]
array.slice(begin);// [begin, end]
array.slice(begin, end);// [begin, end)

//slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。
//你只需将该方法绑定到这个对象上。 
//一个函数中的 arguments 就是一个类数组对象的例子。
function list() {
  return Array.prototype.slice.call(arguments);
  //[].slice.call(arguments)也可以
}
var list1 = list(1, 2, 3); // [1, 2, 3]




/**************** Array.concat ****************/




/**************** Array.sort ****************/
// 默认unicode顺序
// compareFunction 规则:
// compareFunction(a, b) < 0 , a在b前 ; >0 ,相反
// 原数组已经被排序后的数组代替,并作为返回
array.sort(function compareFunction(a, b) {
  return a - b;
});


/**************** 迭代 ****************/
// 见iteration.js