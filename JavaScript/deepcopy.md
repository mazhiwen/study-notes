# 深浅拷贝

[如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141#heading-9)

## 深拷贝

### 基本版

 递归赋值 ??????错误需修正

```javascript
// 实现1
//判断是否是可迭代对象
function isIteration(obj){
  let objType = Object.prototype.toString.call(obj);
  return objType=='[object Object]'||objType=='[object Array]'
}
function deepCopy(obj, map = new Map()) {
  
  if (!isIteration(obj)) {
    throw new Error('error arguments');
  }
  const targetObj = Array.isArray(obj) ? [] : {};
  if (map.get(obj)) {
    return map.get(obj);
  }
  map.set(obj, targetObj);
  for (let key in obj) {
    //只对对象自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (isIteration(obj[key])) {
        targetObj[key] = deepCopy(obj[key],map);
      } else {
        targetObj[key] = obj[key];
      }
    }
  }
  return targetObj;
}
```

### 完整版

## 浅拷贝

1.resObject = Object.assign(target,origina,originb,...)
