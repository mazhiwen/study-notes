## 字典

键-值对形式 ， key value对

```javascript
//基础用 Array，非Object
//javascript 一切皆对象
function Dictionary() {
  this. add = add;
  this. datastore = new Array();
  this. find = find;
  this. remove = remove;
  this. showAll = showAll;
  this. count = count;
  this. clear = clear;  
}
function add( key, value) {
  this. datastore[ key] = value;
}
//根据key查找value
function find( key) {
  return this. datastore[ key];
}
function remove( key) {
  delete this. datastore[ key];
}
//遍历展示
function showAll() {
  //sort 对显示结果排序
  for( var key of Object. keys( this. datastore).sort()) {
    console.log( key + " -> " + this. datastore[ key]);
  }
}
//获取个数 长度，length不可用
function count() {
  var n = 0;
  for( var key of Object. keys( this. datastore)) {
    ++ n;
  }
  return n;
}
function clear() {
  for( var key of Object. keys( this. datastore)) {
    delete this. datastore[ key];
  }
}
```
