function isIteration(obj){
  let objType = Object.prototype.toString.call(obj);
  return objType=='[object Object]'||objType=='[object Array]'
}

//////////////////  用while实现一个通用的forEach
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

/////////////////   主函数
function deepCopy(obj, map = new WeakMap()) {
  
  if (!isIteration(obj)) {
    throw new Error('error arguments');
  }
  const targetObj = Array.isArray(obj) ? [] : {};
  // weakmap 存储已经新建立内存 拷贝的obj，防止循环嵌套引用，造成内存溢出
  if (map.get(obj)) {
    return map.get(obj);
  }
  map.set(obj, targetObj);
  console.log(map);
  // while循环替代for in循环，提高性能
  forEach(obj, (value,key) => {
    //只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (isIteration(value)) {
        targetObj[key] = deepCopy(value,map);
      } else {
        targetObj[key] = value;
      }
    }
  })  
    
  return targetObj;
}

var c = {
  'd1':'d1',
  d: 'd',
  'd2': {
    e: 'e'
  }
}

var a = {
  c,
}


deepCopy({
  a: 1,
  b: a,
  c
})