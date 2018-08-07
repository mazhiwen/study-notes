
##  数组去重 
```javascript
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current)=>{
    if(init.length===0 || init[init.length-1]!==current){
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]
```

##  计算数组中每个元素出现的次数 
```javascript
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

## 数据结构与算法 选择

![数据结构](./760432-20161005131748739-688884364.png)




##  列表 
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

## 链表

### 1. 单向链表

链表是由一组节点组成的集合。每个节点都使用一个对象的引用指向它的后继。  
指向另一个节点的引用叫做链。  
尾元素指向null  
Head->节点->节点->null  

```javascript
//Node 表示节点
function Node( element) {
  this. element = element;
  this. next = null;
}

//LinkedList   表示链表 及 操作方法
function LList() {
  this. head = new Node(" head");
  this. find = find;
  this. insert = insert;
  this. findPrevious= findPrevious;
  this. remove = remove;
  this. display = display;
}

//查找节点
function find( item) { 
  var currNode = this. head; 
  while (currNode. element != item) { 
    currNode = currNode. next; 
  } 
  return currNode; 
}
//插入
function insert( newElement, item) { 
  var newNode = new Node( newElement); 
  var current = this. find( item); 
  newNode. next = current. next; 
  current. next = newNode; 
}
//遍历展示
function display() { 
  var currNode = this. head; 
  while (!(currNode. next == null)) { 
    print( currNode. next. element); 
    currNode = currNode. next; 
  } 
}
//找出上一个节点
function findPrevious( item) { 
  var currNode = this. head; 
  while (!(currNode. next == null) && (currNode. next. element != item)) { 
    currNode = currNode. next; 
  } 
  return currNode; 
}
//移除节点
function remove( item) { 
  var prevNode = this. findPrevious( item); 
  if (!(prevNode. next == null)) { 
    prevNode. next = prevNode. next. next; 
  }
}
```
### 2. 双向链表
null<-Head-><-节点-><-节点->null
```javascript
function Node( element) { 
  this. element = element; 
  this. next = null; 
  this. previous = null; 
}
//表示双向链表
function LList() { 
  this. head = new Node(" head"); 
  this. find = find; //同单向链表
  this. insert = insert; 
  this. display = display; //同单向链表
  this. remove = remove;
  this. findLast = findLast; 
  this. dispReverse = dispReverse; 
}
function insert( newElement, item) { 
  var newNode = new Node( newElement); 
  var current = this. find( item); 
  newNode. next = current. next; 
  newNode. previous = current; 
  current. next = newNode; 
}
function remove( item) { 
  var currNode = this. find( item); 
  if (!(currNode. next == null)) { 
    currNode. previous. next = currNode. next; 
    currNode. next. previous = currNode. previous; 
    currNode. next = null; 
    currNode. previous = null; 
  } 
}
//查找最后一个节点
function findLast() { 
  var currNode = this. head; 
  while (!(currNode. next == null)) { 
    currNode = currNode. next; 
  } 
  return currNode; 
}
//反序遍历显示链表
function dispReverse() { 
  var currNode = this. head; 
  currNode = this. findLast(); 
  while (!(currNode. previous == null)) { 
    print( currNode. element); 
    currNode = currNode. previous; 
  } 
}
```
### 3. 循环链表
类似单向链表  
在创建循环链表时，Head.next指向Head  
Head->节点->节点->Head
```javascript
//修改单向链表 为 循环链表
function LList() { 
  this. head = new Node(" head"); 
  this. head. next = this. head; //双向 初始化
  this. find = find; 
  this. insert = insert; 
  this. display = display; 
  this. findPrevious = findPrevious; 
  this. remove = remove; 
}
function display() { 
  var currNode = this. head; 
  while (!(currNode. next == null) && !(currNode. next. element == "head")) { 
    print( currNode. next. element); 
    currNode = currNode. next; 
  } 
}

```

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

## 散列

### 1. 散列表,散列函数

插入，取用，删除快  
查找慢  
使用散列表存储数据时，通过一个散列函数将键映射为一个数字，这个数字的范围是0到散列表的长度。  
理想情况下，散列函数会将每个键值映射为一个唯一的数组索引。  
然而，键的数量是无限的，数组的长度是有限的（理论上，在JavaScript中是这样），一个更现实的目标是让散列函数尽量将键均匀地映射到数组中。  
即使使用一个高效的散列函数，仍然存在将两个键映射成同一个值的可能，这种现象称为碰撞（collision），当碰撞发生时，我们需要有方案去解决。  
散列表数组长度需要确定，最好是质数

```javascript
//散列表
function HashTable() { 
  this. table = new Array( 137); 
  this. simpleHash = simpleHash; 
  this. showDistro = showDistro;
  this. put = put; 
  this. get = get; 
}
//插入数据
function put( data) { 
  var pos = this. simpleHash( data); 
  this. table[ pos] = data; 
} 
//散列函数 简单实现
//key的ASCII码的值的和除以数组长度，取余
function simpleHash( data) {  
  var total = 0; 
  for (var i = 0; i < data. length; ++ i) { 
    total += data. charCodeAt( i); 
  } 
  return total % this. table. length; 
} 
//显示数据
function showDistro() { 
  var n = 0; 
  for (var i = 0; i < this. table. length; ++ i) { 
    if (this. table[ i] != undefined) { 
      print( i + ": " + this. table[ i]); 
    } 
  } 
}
```

散列函数的选择依赖于键值的数据类型。

* 如果键是整型，最简单的散列函数就是以数组的长度对键取余。在一些情况下，比如数组的长度是10，而键值都是10的倍数时，就不推荐使用这种方式了。这也是数组的长度为什么要是质数的原因之一，就像我们在上个构造函数中，设定数组长度为137一样。如果键是随机的整数，则散列函数应该更均匀地分布这些键。这种散列方式称为除留余数法。
* 在很多应用中，键是字符串类型。事实证明，选择针对字符串类型的散列函数是很难的，选择时必须加倍小心。

```javascript
//霍纳算法 的散列函数 ，更好的散列函数
//可替换以上simpleHash
function betterHash( string) { 
  const H = 37; 
  var total = 0; 
  for (var i = 0; i < string. length; ++ i) { 
    total += H * total + string. charCodeAt( i); 
  } 
  total = total % this. table. length; 
  if (total < 0) { 
    total += this. table. length- 1; 
  } 
  return parseInt( total); 
}
```

```javascript
//修改为存储键值对
//修改put 存值 改为 存储键值对
function put( key, data) { 
  var pos = this. betterHash( key); 
  this. table[ pos] = data; 
}
function get( key) { 
  return this. table[ this. betterHash( key)]; 
}
```

### 2. 碰撞处理

当 散 列 函数 对于 多个 输入 产生 同样 的 输出 时， 就 产生了 碰撞。

* 开链法  

散列表的底层数组中，每个数组元素（数据单元）又是一个新的数据结构（如数组），就可以存储多个键。  
即二维数组

```javascript

//将原散列表底层数组 改为 二维数组
function buildChains() { 
  for (var i = 0; i < this. table. length; ++ i) { 
    this. table[ i] = new Array(); 
  } 
}
//只保存value 的put
function put(){

}
function showDistro() { 
  var n = 0; 
  for (var i = 0; i < this. table. length; ++ i) { 
    if (this. table[ i][ 0] != undefined) { 
      print( i + ": " + this. table[ i]); 
    } 
  } 
}

//保存键值 二维数组内连续两个单元第一个保存key，第二个保存value
function put( key, data) { 
  var pos = this. betterHash( key); 
  var index = 0; 
  if (this. table[ pos][ index] == undefined) { 
    this. table[ pos][ index] = key; 
    this. table[ pos][ index+ 1] = data; 
  } else { 
    while (this. table[ pos][ index] != undefined) { 
      ++ index; 
    } 
    this. table[ pos][ index] = key; 
    this. table[ pos][ index+ 1] = data; 
  } 
}
function get( key) { 
  var index = 0; 
  var hash = this. betterHash( key); 
  if (this. table[ pos][ index] = key) { 
    return this. table[ pos][ index+ 1]; 
    index+= 2;
  } 
  else { 
    while (this. table[ pos][ index] != key) { 
      index += 2; 
    } 
    return this. table[ pos][ index+ 1]; 
  } 
  return undefined; 
}
```

* 线性探测法

依次检查散列表的下一个位置是否为空，如果空，插入，如果不空，继续查找下一个  
常用选择：数组大小是数据个数的1.5倍，用开链法；数组大小是数据个数的两倍以及以上，用线性探测  

```javascript
//原table数组存key values数组存value
this. values = [];
function put( key, data) { 
  var pos = this. betterHash( key); 
  if (this. table[ pos] == undefined) { 
    this. table[ pos] = key; 
    this. values[ pos] = data; 
  } else { 
    while (this. table[ pos] != undefined) { 
      pos++; 
    } 
    this. table[ pos] = key; 
    this. values[ pos] = data; 
  } 
}
function get( key) { 
  var hash = -1; 
  hash = this. betterHash( key); 
  if (hash > -1) { 
    for (var i = hash; this. table[ hash] != undefined; i++) { 
      if (this. table[ hash] == key) { 
        return this. values[ hash]; 
      } 
    } 
  } 
  return undefined; 
}
```

## 集合

特点：成员无序，不能有相同成员

## 二叉树

树 ：  
非线性数据结构,存储层级关系数据，有序列表。  
由边连接的节点组成  
一棵树最上面的节点称为根节点，如果一个节点下面连接多个节点，那么该节点称为父节点，它下面的节点称为子节点。一个节点可以有0个、1个或多个子节点。没有任何子节点的节点称为叶子节点。  
二叉树：二叉树是一种特殊的树，它的子节点个数不超过两个(左节点，右节点)。二叉树具有一些特殊的计算性质，使得在它们之上的一些操作异常高效。  
路径：从一个节点到另一个节点的这一组边称为路径。  
遍历：以某种特定顺序访问树中所有的节点称为树的遍历。  
深度：树可以分为几个层次，根节点是第0层，它的子节点是第1层，子节点的子节点是第2层，以此类推。树中任何一层的节点可以都看做是子树的根，该子树包含根节点的子节点，子节点的子节点等。我们定义树的层数就是树的深度。  

### 1. 二叉查找树(BST)

二 叉 查找 树 是一 种 特殊 的 二 叉 树， 相对 较 小的 值 保 存在 左 节点 中， 较 大的 值 保存 在右 节点 中。这一 特性 使得 查找 的 效率 很高， 对于 数值 型 和 非 数值 型 的 数据， 比如 单词 和 字符串， 都是 如此。

```javascript
//节点
function Node( data, left, right) {
  this. data = data;
  this. left = left;
  this. right = right;
  this. show = show;
}
function show() {
  return this. data;
}
//二叉树
function BST() {
  //初始根节点为null
  this. root = null;
  this. insert = insert;
  this. inOrder = inOrder;
}
//插入节点
function insert( data) {
  var n = new Node( data, null, null);
  //如果是第一个节点
  if (this. root == null) {
    this. root = n;
  } else {
    //当前节点设置为根节点  
    var current = this. root;
    var parent;
    while (true) {
      parent = current;
      //如果插入值 < 当前节点
      if (data < current. data) {
        //当前节点设置为当前节点左节点
        current = current. left;
        //如果当前节点左节点为空 进行赋值操作
        if (current == null) {
          parent. left = n;
          break;
        }
        //左节点不为空 ,continue循环
      } else {
        //如果插入值 > 当前节点
        current = current. right;
        //如果当前节点右节点为空 进行赋值操作
        if (current == null) {
           parent. right = n;
           break;
        }
        //右节点不为空 ,continue循环
      }
    }
  }
}
//实践
var bst=new BST();
bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);
//      23    
//  16        45
//3   22   37     99
```

### 2. 遍历二叉查找树

中序，先序，后序

```javascript
//中序：左中右的顺序
//输出:3 16 22 23 37 45 99
function inOrder( node) {
  if (!(node == null)) {
    inOrder( node. left);
    console.log( node. show() + " ");
    inOrder( node. right);
  }
}

//先序：输出:23 16 3 22 45 37 99
function preOrder( node) {
  if (!(node == null)) {
    console.log( node. show() + " ");
    preOrder( node. left);
    preOrder( node. right);
  }
}

//后序: 输出3 22 16 37 99 45 23
function postOrder( node) {
  if (!(node == null)) {
    postOrder( node. left);
    postOrder( node. right);
    putstr( node. show() + " ");
  }
}
```

### 3. 查找二叉查找树

查找给定值，最大值，最小值

```javascript
//最小值:遍历左子树的最后一个节点
function getMin() {
  var current = this. root;
  while (!(current. left == null)) {
    current = current. left;
  }
  return current. data;
}
//最大值：遍历右子树的最后一个节点
function getMax() {
  var current = this. root;
  while (!(current. right == null)) {
    current = current. right;
  }
  return current. data;
}
//给定值
function find( data) {
  var current = this. root;
  while (current != null) { 
    if (current. data == data) { 
      return current;
    } else if (data < current. data) {
      current = current. left;
    } else {
      current = current. right;
    }
  } 
  return null;
}
```

### 3. 删除二叉查找树节点

```javascript
function remove( data) { 
  root = removeNode( this. root, data);
}
function removeNode( node, data) {
  if (node == null) { 
    return null;
  }
  if (data == node. data) {
    //没有 子 节点 的 节点
    if (node. left == null && node. right == null) { return null; }
    //没有 左 子 节点 的 节点
    if (node. left == null) { return node. right; }
    //没有 右 子 节点 的 节点
    if (node. right == null) { return node. left; }
    //有两个子节点的节点
    //正确的做法有两种：要么查找待删除节点左子树上的最大值，要么查找其右子树上的最小值。这里我们选择后一种方式。
    var tempNode = getSmallest( node. right);
    node. data = tempNode. data;
    node. right = removeNode( node. right, tempNode. data);
    return node; 
  } else if (data < node. data) { 
    node. left = removeNode( node. left, data);
    return node; 
  } else { 
    node. right = removeNode( node. right, data);
    return node;
  }
}
```

### 4. 节点计次

```javascript
function Node( data, left, right) {
  this. data = data;
  this. count = 1;
  this. left = left;
  this. right = right;
  this. show = show;
}
//计次函数
function update( data) {
  var grade = this. find( data);
  grade. count++;
  return grade;
}
```

## 图

由边的集合和顶点的集合组成  
***边***:由顶点对(v1,v2)定义  
***权重***:顶点也有权重，称为成本  
***有向图***:顶点对是有序的;顶点无序为无序图  
***路径***:一系列的顶点构成路径. 路径的 ***长度*** 用 路径 中 第一个 顶点 到 最后 一个 顶点 之间 边 的 数量 表示。  
***环***:由 指向 自身 的 顶点 组成 的 路径 称为 环， 环 的 长度 为 0。  
***圈***: 是 至少 有 一条 边 的 路径， 且 路径 的 第一个 顶点 和 最后 一个 顶点 相同。 无论是 有向 图 还是 无向 图， 只要 是 没有 重复 边 或 重复 顶点 的 圈， 就是 一个 ***简单圈***。 除了 第一个 和 最后 一个 顶点 以外， 路径 的 其他 顶点 有 重复 的 圈 称为 ***平凡圈***。  
***强连通***：如果 两个 顶点 之间 有 路径， 那么 这 两个 顶点 就是 强 连通 的， 反之亦然。 如果 有向 图 的 所有 的 顶点 都是 强 连通 的， 那么 这个 有向 图 也是 强 连通 的。

### 1. 图类

```javascript
//顶点
function Vertex( label) {
  this. label = label;
}
//边：邻接表，邻接矩阵
//图类
function Graph( v) {
  //顶点数
  this. vertices = v;
  //边的数量
  this. edges = 0;
  //相邻顶点 邻接表
  this. adj = [];
  for (var i = 0; I < this. vertices; ++ i) {
    this. adj[ i] = [];
    this. adj[ i]. push("");
  }
  this. addEdge = addEdge;
  this. toString = toString;
}
//添加边
function addEdge( v, w) {
  this. ajd[ v]. push( w);
  this. adj[ w]. push( v);
  this. edges++;
}
//展示所有顶点 和 相邻顶点列表
function showGraph() {
  for (var i = 0; i < this. vertices; ++ i) {
    putstr( i + "->");
    for (var j = 0; j < this. vertices; ++ j) {
      if (this. adj[ i][ j] != undefined)
      putstr( this. adj[ i][ j] + ' ');
    }
    print();
  }
}
```

### 2. 搜索

* 深度优先搜索:  
  深度 优先 搜索 包括 从 一条 路径 的 起始 顶点 开始 追溯， 直到 到达 最后 一个 顶点， 然后 回溯， 继续 追溯 下一 条 路径， 直到 到达 最后 的 顶点， 如此 往复， 直到 没有 路径 为止。 这不 是在 搜索 特定 的 路径， 而是 通过 搜索 来 查看 在 图中 有 哪些 路径 可以 选择。

```javascript
//以上图类添加 点是否访问过的标记数组
this. marked = [];
for (var i = 0; i < this. vertices; ++ i ) {
  this. marked[ i] = false;
}
//搜索算法
function dfs( v) {
  this. marked[ v] = true;
  //用于 输出 的 if 语句 在这里 不是 必须的
  if (this. adj[ v] != undefined)
  print(" Visited vertex: " + v);
  for each( var w in this. adj[ v]) {
    if (!this. marked[ w]) {
      this. dfs( w);
    }
  }
}
```

* 广度优先搜索:  
  广度 优先 搜索 从 第一个 顶点 开始， 尝试 访问 尽可能 靠近 它的 顶点。 本质上， 这种 搜索 在 图上 是 逐 层 移动 的， 首先 检查 最靠近 第一个 顶点 的 层， 再 逐渐 向下 移动 到 离 起始 顶点 最 远的 层。

```javascript
//s=0
function bfs( s) {
  var queue = [];
  this. marked[ s] = true;
  queue. push( s); //添 加到 队 尾
  while (queue. length > 0) {
    var v = queue. shift(); //从 队 首 移 除
    if (v == undefined) {
      print(" Visisted vertex: " + v);
    }
    for each( var w in this. adj[ v]) {
      if (!this. marked[ w]) {
        // this. edgeTo[ w] = v;
        this. marked[ w] = true;
        queue. push( w);
      }
    }
  }
}
```

### 3. 查找最短路径

```javascript
//Graph类添加 edgeTo:从一个顶点到下一个顶点的所有边
this.edgeTo=[];
//广度优先搜索bfs 放开edgeTo操作
//pathTo 与指定顶点有共同边的所有顶点
function pathTo( v) {
  var source = 0;
  if (!this. hasPathTo( v)) {
    return undefined;
  }
  var path = [];
  for (var i = v; i != source; i = this. edgeTo[ i]) {
    path. push( i);
  }
  path. push( source);
  return path;
}
function hashPathTo( v) {
  return this. marked[ v];
}
```

### 4. 拓扑排序

```javascript
//Graph类添加
this. vertexList = [];
//拓扑排序函数
function topSort() {
  var stack = [];//排序存储栈
  var visited = [];//是否访问过标记
  //遍历所有顶点 都标记为未访问
  for (var i = 0; i < this. vertices; i++) {
    visited[ i] = false;
  }
  //遍历所有顶点
  for (var i = 0; i < this. vertices; i++) {
    if (visited[ i] == false) {//如果顶点未访问过
      this. topSortHelper( i, visited, stack);//(深度优先)排序访问顶点
    }
  }
  //遍历 并输出排序存储栈
  for (var i = 0; i < stack. length; i++) {
    if (stack[ i] != undefined && stack[ i] != false) {
      print( this. vertexList[ stack[ i]]);
    }
  }
}
//排序访问函数(深度优先)
function topSortHelper( v, visited, stack) {
  visited[ v] = true;//设置v已访问
  for each( var w in this. adj[ v]) { //遍历v的邻接点 w
    if (!visited[ w]) {//如果w未访问
      //排序访问w 第二层第一个参数为false
      this. topSortHelper( visited[ w], visited, stack);
    }
  }
  //排序存储栈 push v
  stack. push( v);
}

```

## 排序算法

### 1. 冒泡排序

相邻比较，交换顺序
每进行一趟排序都会找出一个较大值

* 如果数据正序，只需要走一趟即可完成排序。所需的比较次数C和记录移动次数M均达到最小值，  
  即：Cmin=n-1;Mmin=0;  
  所以，冒泡排序最好的时间复杂度为O(n)。  

* 如果数据是反序的，则需要进行n-1趟排序。每趟排序要进行n-i次比较(1≤i≤n-1)，  
  且每次比较都必须移动记录三次来达到交换记录位置。在这种情况下，比较和移动次数均达到最大值：  

![s](./11533632197.png)

第1次循环：比较n个数据  
第2次循环：比较n-1个数据  
第3次循环：比较n-2个数据  
...  
第i次循环：比较n-i+1个数据  
...  
第n-1次循环：比较2个数据

```javascript
function bubbleSort() {  
  var numElements = this. dataStore. length; // 数据总长度
  for ( var outer = numElements; outer >= 2; --outer) { //numElements 至 2 ，总numElements-1次
    for ( var inner = 0; inner <= outer - 1; ++ inner ) {  
      if (this. dataStore[ inner] > this. dataStore[ inner + 1]) {  
        swap( this. dataStore, inner, inner + 1);  
      }  
    }  
  }  
}
function swap( arr, index1, index2) {  
  var temp = arr[ index1];  
  arr[ index1] = arr[ index2];  
  arr[ index2] = temp;  
}
```

### 2. 选择排序

从第一个元素开始，每次与其他元素比较  
选择 排序 从 数组 的 开头 开始， 将 第一个 元素 和 其他 元素 进行 比较。 检查 完 所有 元素 后， 最小 的 元素 会被 放到 数组 的 第一个 位置， 然后 算法 会 从 第二个 位置 继续。 这个 过程 一直 进行， 当 进行 到 数组 的 倒数 第二个 位置 时， 所有 的 数据 便 完成 了 排序。

```javascript
function selectionSort() {
  var min, temp;
  for (var outer = 0; outer <= this. dataStore. length - 2; ++ outer) {
    min = outer;
    for (var inner = outer + 1; inner <= this. dataStore. length - 1; ++ iner) {
      if (this. dataStore[ inner] < this. dataStore[ min]) {
        min = inner;
      }
      swap( this. dataStore, outer, min);
    }
  }
}
```

### 3. 插入排序

```javascript

function insertionSort() {
  var temp, inner;
  //从1 到 最后一个 遍历数据
  for (var outer = 1; outer <= this. dataStore. length - 1; ++ outer) {
    temp = this. dataStore[ outer];//temp 初始化为outer的值
    inner = outer;//inner 初始化为outer索引
    //当 inner-1的值>=temp值 时 inner--
    while (inner > 0 && (this. dataStore[ inner - 1] >= temp)) {
      this. dataStore[ inner] = this. dataStore[ inner - 1];//inner-1 后移为inner值
      --inner;
    }
    this. dataStore[ inner] = temp;
  }
}
```












