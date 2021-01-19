# 列表

[元素,元素,...,元素]

```javascript
// 一组有序的数据 ,描述前后位置(front,end)
function List() {
  this. listSize = 0;
  this. pos = 0;
  this. dataStore = []; //初始化 一个 空 数组 来 保存 列表 元素
  this. clear = clear;
  this. find = find;
  this. toString = toString;
  this. insert = insert;
  this. append = append;
  this. remove = remove;
  this. front = front;
  this. end = end;
  this. prev = prev;
  this. next = next;
  this. length = length;
  this. currPos = currPos;
  this. moveTo = moveTo;
  this. getElement = getElement;
  this. contains = contains;
}
// 添加
function append( element) {
  this. dataStore[ this. listSize++] = element;
}
// 查找索引
function find( element) {
  for (var i = 0; i < this. dataStore. length; ++ i) {
    if (this. dataStore[ i] == element) {
      return i;
    }
  }
  return -1;
}
//删除
function remove( element) {
  var foundAt = this. find( element);
  if (foundAt > -1) {
    this. dataStore. splice( foundAt, 1);
    --this. listSize;
    return true;
  }
  return false;
}
//长度
function length() {
  return this. listSize;
}
//展示
function toString() {
  return this. dataStore;
}
// 插入
function insert( element, after) {
  var insertPos = this. find( after);
  if (insertPos > -1) {
    this. dataStore. splice( insertPos+ 1, 0, element);
    ++ this. listSize;
    return true;
  }
  return false;
}
// 清空
function clear() {
  delete this. dataStore;
  this. dataStore. length = 0;
  this. listSize = this. pos = 0;
}
// 判断是否有元素
function contains( element) {
  for (var i = 0; i < this. dataStore. length; ++ i) {
    if (this. dataStore[ i] == element) {
      return true;
    }
  }
  return false;
}
// 移动
function front() {
  this. pos = 0;
}
function end() {
  this. pos = this. listSize- 1;
}
function prev() {
  if (this. pos > 0) {
    --this. pos;
  }
}
function next() {
  if (this. pos < this. listSize- 1) {
    ++ this. pos;
  }
}
function currPos() {
  return this. pos;
}
function moveTo( position) {
  this. pos = position;
}
function getElement() {
  return this. dataStore[ this. pos];
}
// 遍历
for( names. front(); names. currPos() < names. length(); names. next()) {
  print( names. getElement());
}
```
