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



##  列表 
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


 

##  排序 
### 冒泡  
相邻比较，交换顺序
每进行一趟排序都会找出一个较大值
1. 如果数据正序，只需要走一趟即可完成排序。所需的比较次数C和记录移动次数M均达到最小值，   
即：Cmin=n-1;Mmin=0;  
所以，冒泡排序最好的时间复杂度为O(n)。
2. 如果数据是反序的，则需要进行n-1趟排序。每趟排序要进行n-i次比较(1≤i≤n-1)，  
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


```
















