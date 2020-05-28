# 排序算法

## 1. 冒泡排序

相邻比较，交换顺序
每进行一趟outer排序都会找出一个较大值，并放在outer末尾

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

## 2. 选择排序

从第一个元素开始，每次与其他元素比较  
选择排序从数组的开头开始，将第一个元素和其他元素(后面的)进行比较。检查完所有元素后，最小的元素会被放到数组的第一个位置，然后算法会从第二个位置继续。这个过程一直进行，当进行到数组的倒数第二个位置时，所有的数据便完成了排序。

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

## 3. 插入排序

外层遍历数据，内层将当前值与前面的值遍历比大小，当前值小，则前移。移到比前面值大，则停止.

```javascript
function insertionSort() {
  var temp, inner;
  //从1 到 最后一个 遍历数据
  for (var outer = 1; outer <= this. dataStore. length - 1; ++ outer) {
    temp = this. dataStore[ outer];//temp 初始化为outer的值
    inner = outer;//inner 初始化为outer索引
    //当 inner-1的值>=temp值 时 inner--
    while (inner > 0 && (this. dataStore[ inner - 1] >= temp)) {
      this. dataStore[ inner] = this. dataStore[ inner - 1];//inner-1的值 后移为inner位置
      --inner;
    }
    //inner 值为temp
    this. dataStore[ inner] = temp;
  }
}
```

***总结基本排序算法速度:  
插入排序>选择排序>冒泡排序***  

## 4. 希尔排序

类似插入排序，但首先比较最远的元素，而不是相邻元素

外循环控制***间隔序列***的移动。也就是说，算法在第一次处理数据集时，会检查所有间隔为5的元素。下一次遍历会检查所有间隔为3的元素。最后一次则会对间隔为1的元素，也就是相邻元素执行标准插入排序。在开始做最后一次处理时，大部分元素都将在正确的位置，算法就不必对很多元素进行交换。这就是希尔排序比插入排序更高效的地方。

```javascript
//硬编码间隔序列
//设置间隔序列
this. gaps = [5, 3, 1];
//希尔排序
function shellsort() {
  //间隔序列循环
  for (var g = 0; g < this. gaps. length; ++ g) {
    //i初始化为gap，到数据末端循环
    for (var i = this. gaps[ g]; i < this. dataStore. length; ++ i) {
      //temp为i的值
      var temp = this. dataStore[ i];
      //对i前面的所有gap间隔的值比较
      //j初始化i;j>=gap且j-gap的值>temp;j=j-gap
      for (var j = i; j >= this. gaps[ g] && this. dataStore[ j- this. gaps[ g]] > temp; j -= this. gaps[ g]) {
        //大小值替换
        this. dataStore[ j] = this. dataStore[ j - this. gaps[ g]];
      }
      this. dataStore[ j] = temp;
    }
  }
}
//动态计算间隔序列
function shellsort1() {
  var N = this. dataStore. length;
  var h = 1;
  while (h < N/ 3) {
    h = 3 * h + 1;
  }
  while (h >= 1) {
    for (var i = h; i < N; i++) {
      for (var j = i; j >= h && this. dataStore[ j] < this. dataStore[ j- h]; j -= h) {
        swap( this. dataStore, j, j- h);
      }
    }
    h = (h- 1)/ 3;
  }
}

```

## 5. 归并排序

* 自底向上的归并排序 : 这个算法首先将数据集分解为一组只有一个元素的数组。然后通过创建一组左右子数组将它们慢慢合并起来，每次合并都保存一部分排好序的数据，直到最后剩下的这个数组所有的数据都已完美排序。

```javascript
function mergeSort( arr) {
  if (arr. length < 2) {
    return;
  }
  var step = 1;//控制子序列的大小
  var left, right;
  while (step < arr. length) {
    left = 0;
    right = step;
    while (right + step <= arr. length) {
      mergeArrays( arr, left, left+ step, right, right+ step);
      left = right + step; right = left + step;
    }
    if (right < arr. length) {
      mergeArrays( arr, left, left+ step, right, arr. length);
    }
    step *= 2;
  }
}
function mergeArrays( arr, startLeft, stopLeft, startRight, stopRight) {
  var rightArr = new Array( stopRight - startRight + 1);
  var leftArr = new Array( stopLeft - startLeft + 1);
  k = startRight;
  for (var i = 0; i < (rightArr. length- 1); ++ i) {
    rightArr[ i] = arr[ k]; ++ k;
  }
  k = startLeft;
  for (var i = 0; i < (leftArr. length- 1); ++ i) {
    leftArr[ i] = arr[ k]; ++ k;
  }
  rightArr[ rightArr. length- 1] = Infinity; // 哨兵 值
  leftArr[ leftArr. length- 1] = Infinity; // 哨兵 值
  var m = 0;
  var n = 0;
  for (var k = startLeft; k < stopRight; ++ k) {
    if (leftArr[ m] <= rightArr[ n]) {
      arr[ k] = leftArr[ m];
      m++;
    } else {
      arr[ k] = rightArr[ n];
      n++;
    }
  }
  print(" left array - ", leftArr);
  print(" right array - ", rightArr);
}


```

## 6. 快速排序

这个 算法 首先 要在 列表 中选 择一 个 元素 作为 基准 值（ pivot）。 数据 排序 围绕 基准 值 进行， 将 列表 中小 于 基准 值 的 元素 移到 数组 的 底部， 将 大于 基准 值 的 元素 移到 数组 的 顶部。  
处理大型数据集合时性能快  
**算法步骤:**

1. 选择 一个 基准 元素， 将 列表 分隔 成 两个 子 序列；
2. 对列 表 重新 排序， 将 所有 小于 基准 值 的 元素 放在 基准 值 的 前面， 所有 大于 基准 值 的 元素 放在 基准 值 的 后面；  
3. 分别 对 较小 元素 的 子 序列 和 较大 元素 的 子 序列 重复 步骤 1 和 2。  

**伪代码逻辑**

```
QUICKSORT(A,p,r)
  if p<r
    q = PARTITION(A,p,r)
    QUICKSORT(A,p,q-1)
    QUICKSORT(A,q+1,r)

PARTITION(A,p,r)
  x = A[r]
  i = p-1
  for j = p to r-1
    if A[j]<=x
      i = i + 1
      exchange A[i] with A[j]
  exchange A[i] with A[j]
  return i+1
```

**js实现**

```js
const quickSort = (array) => {
  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
      return;
    };
    let i = left;
    let j = right;
    const baseVal = arr[j]; // 取无序数组最后一个数为基准值
    while (i < j) {//把所有比基准值 小的数放在左边 大的数放在右边
      while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
        i++;
      }
      arr[j] = arr[i]; // 将较大的值放在右边 如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
      while (i < j && arr[j] >= baseVal) { //找到一个比基准值小的数交换
        j--;
      }
      arr[i] = arr[j]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
    }
    arr[j] = baseVal; // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    sort(arr, left, j-1); // 将左边的无序数组重复上面的操作
    sort(arr, j+1, right); // 将右边的无序数组重复上面的操作
  }
  const newArr = array.concat(); // 为了保证这个函数是纯函数拷贝一次数组
  sort(newArr);
  return newArr;
}

/////////// 测试
let arrs = [];
let i = 1000000;
while( i >= 0){
  arrs[i] = Math.ceil(Math.random() * 1000000);
  i--;
}
const start = new Date().getTime();
console.log('开始时间:'+start);
qSort(arrs);
console.log('花费时间:'+new Date().getTime() - start);
```

**时间复杂度**

<https://www.cnblogs.com/fengty90/p/3768827.html>
