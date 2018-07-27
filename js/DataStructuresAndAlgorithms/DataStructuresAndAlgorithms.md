<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

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




##  链表 

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





##  排序 
### 1. 冒泡  
相邻比较，交换顺序
每进行一趟排序都会找出一个较大值  
- 如果数据正序，只需要走一趟即可完成排序。所需的比较次数C和记录移动次数M均达到最小值，   
即：Cmin=n-1;Mmin=0;  
所以，冒泡排序最好的时间复杂度为O(n)。  
- 如果数据是反序的，则需要进行n-1趟排序。每趟排序要进行n-i次比较(1≤i≤n-1)，  
且每次比较都必须移动记录三次来达到交换记录位置。在这种情况下，比较和移动次数均达到最大值：    
$$Cmax=\frac{n(n-1)}{2}=O(n^2)$$    
$$Mmax=\frac{3n(n-1)}{2}=O(n^2)$$ 
冒泡排序的最坏时间复杂度为：\\(O(n^2)\\) 。  



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















