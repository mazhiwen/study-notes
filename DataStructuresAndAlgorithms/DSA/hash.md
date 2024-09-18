# 哈希(散列)

<https://github.com/sisterAn/JavaScript-Algorithms/issues/49>

一般哈希表都是用来快速判断一个元素是否出现集合里。

要枚举的话时间复杂度是O(n)，但如果使用哈希表的话， 只需要O(1)就可以做到。

## 常见的三种哈希结构

数组 ，set （集合） ， map(映射)




## 散列函数

散列函数，顾名思义，它是一个函数。如果把它定义成 hash(key) ，其中 key 表示元素的键值，则 hash(key) 的值表示经过散列函数计算得到的散列值。

通过散列函数计算返回该记录在散列表的存储位置，并按此位置存放

散列函数: 键 -> 散列值

散列值： 数据存放的位置

Address = Hash(Record.key)

## 散列表

散列表（Hash table，也叫哈希表），是根据键（Key）而直接访问在内存存储位置的数据结构。也就是说，它通过计算一个关于键值的函数，将所需查询的数据映射到表中一个位置来访问记录，这加快了查找速度。这个映射函数称做散列函数，存放记录的数组称做散列表。

哈希表本质是数组

散列（哈希）表存放散列值

插入，取用，删除快  查找慢  

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

## 碰撞处理

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
