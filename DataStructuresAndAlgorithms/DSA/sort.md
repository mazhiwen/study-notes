# 排序算法

## 1. 冒泡排序

相邻比较，交换顺序

比较相邻的元素。如果第一个比第二个大，就交换他们两个。对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。

每进行一趟outer排序都会找出一个较大值或者最小值，并放在outer末尾

继续排除掉后面已经排好的最大元素，进行重复上面步骤相邻元素比较

如果数据正序，只需要走一趟即可完成排序。所需的比较次数C和记录移动次数M均达到最小值，即：Cmin=n-1;Mmin=0;  所以，冒泡排序最好的时间复杂度为O(n)。  

如果数据是反序的，则需要进行n-1趟排序。每趟排序要进行n-i次比较(1≤i≤n-1)，且每次比较都必须移动记录三次来达到交换记录位置。在这种情况下，比较和移动次数均达到最大值：  

```
第1次循环：比较n个数据  
第2次循环：比较n-1个数据  
第3次循环：比较n-2个数据  
...  
第i次循环：比较n-i+1个数据  
...  
第n-1次循环：比较2个数据
```

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

首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

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

直接插入排序基本思想是每一步将一个待排序的记录，插入到前面已经排好序的有序序列中去，直到插完所有元素为止。

外层遍历数据，内层将当前值与前面的值遍历比大小，当前值小，则前移。移到比前面值大，则停止.

内while循环，从后面，也就是从大到小，与待插入的元素比大小。比较元素小时，待插入元素直接放末尾，后续不需要遍历了。比较元素大时，继续向前遍历，直到比较元素大，插入当前位置。

伪代码：

```js
INSERTION-SORT(A)
for j=2 to A.length:
    key=A[j]
    //将A[j]插入已排序序列A[1..j-1]
    i=j-1
    while i>0 and A[i]>key
        A[i+1]= A[i]
        i=i-1
    A[i+1]=key
```

实现代码：

```javascript
function insertSort(array) {
  let length = array.length;
  // 如果不是数组或者数组长度小于等于1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1) return;
  // 循环从 1 开始，0 位置为默认的已排序的序列
  for (let i = 1; i < length; i++) {
    let temp = array[i]; // 保存当前需要排序的元素
    let j = i;
    // 在当前已排序序列中比较，如果比需要排序的元素大，就依次往后移动位置
    while (j -1 >= 0 && array[j - 1] > temp) {
      array[j] = array[j - 1];
      j--;  
    }
    // 将找到的位置插入元素
    array[j] = temp;
  }
  return array;
}
```

插入排序在小规模数据，或者基本有序时，十分高效

当排序序列为已排序序列时，为最好的时间复杂度 O(n)。插入排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。

插入排序适用于已经有部分数据已经排好，并且排好的部分越大越好。一般在输入规模大于1000的场合下不建议使用插入排序

总结基本排序算法速度:  插入排序 > 选择排序 > 冒泡排序

## 4. 希尔排序

<https://blog.csdn.net/qq_39207948/article/details/80006224>

是插入排序的改进，但不是挨个比较大小，而是分组比较

对整列数据，把整列数据按照一定间隔拆分，把一定间隔的数据分为一组，一列数据最终会分为多组类似的数据，再分别对这样的每组数据进行插入排序

实际实现中，并不是分组进行比较，而是按照同一gap时，按顺序对gap的值进行比较

后续减小间隔，直到为1，重复上述操作

每组进行插入排序后，整个数据大致有序

最后设置增量为1时，则整个数组被分为一组，此时，整个数组已经接近有序了，插入排序效率高

外循环控制间隔序列的移动。也就是说，算法在第一次处理数据集时，会检查所有间隔为5的元素。下一次遍历会检查所有间隔为3的元素。最后一次则会对间隔为1的元素，也就是相邻元素执行标准插入排序。在开始做最后一次处理时，大部分元素都将在正确的位置，算法就不必对很多元素进行交换。这就是希尔排序比插入排序更高效的地方。

总的来说时间复杂度是小于 O(n^2)

希尔排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^s) ，空间复杂度为 O(1) ，不是稳定排序。

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

另一种写法：

```js
function hillSort(array) {
  let length = array.length;
  // 如果不是数组或者数组长度小于等于1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1) return;
  // 第一层确定增量的大小，每次增量的大小减半
  for (let gap = parseInt(length >> 1); gap >= 1; gap = parseInt(gap >> 1)) {
    // 对每个分组使用插入排序，相当于将插入排序的1换成了 n
    for (let i = gap; i < length; i++) {
      let temp = array[i];
      let j = i;
      while (j - gap >= 0 && array[j - gap] > temp) {
        array[j] = array[j - gap];
        j -= gap;
      }
      array[j] = temp;
    }
  }
  return array;
}
```

## 5. 归并排序

<https://www.cnblogs.com/chengxiao/p/6194356.html>

采用经典的分治（divide-and-conquer）策略（分治法将问题分(divide)成一些小的问题然后递归求解

本质上是将两个顺序序列合并成一个顺序序列

可以看到这种结构很像一棵完全二叉树，分阶段可以理解为就是递归拆分子序列的过程，递归深度为log2n。

这个算法首先将数据集分解为一组只有一个元素的数组。然后通过创建一组左右子数组将它们慢慢合并起来，每次合并都保存一部分排好序的数据，直到最后剩下的这个数组所有的数据都已完美排序。

```javascript
function mergeSort(array) {

  let length = array.length;

  // 如果不是数组或者数组长度小于等于0，直接返回，不需要排序
  if (!Array.isArray(array) || length === 0) return;

  if (length === 1) {
    return array;
  }
  
  let mid = parseInt(length >> 1), // 找到中间索引值
    left = array.slice(0, mid), // 截取左半部分
    right = array.slice(mid, length); // 截取右半部分
  return merge(mergeSort(left), mergeSort(right)); // 递归分解后，进行排序合并
}


function merge(leftArray, rightArray) {
  let result = [],
    leftLength = leftArray.length,
    rightLength = rightArray.length,
    il = 0,
    ir = 0;
  // 左右两个数组的元素依次比较，将较小的元素加入结果数组中，直到其中一个数组的元素全部加入完则停止
  while (il < leftLength && ir < rightLength) {
    if (leftArray[il] < rightArray[ir]) {
      result.push(leftArray[il++]);
    } else {
      result.push(rightArray[ir++]);
    }
  }
  // 如果是左边数组还有剩余，则把剩余的元素全部加入到结果数组中。
  while (il < leftLength) {
    result.push(leftArray[il++]);
  }
  // 如果是右边数组还有剩余，则把剩余的元素全部加入到结果数组中。
  while (ir < rightLength) {
    result.push(rightArray[ir++]);
  }
  return result;
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
