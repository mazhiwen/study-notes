# 排序算法

排序相关的 <https://www.cnblogs.com/chengxiao/p/6103002.html>

## 1. 冒泡排序

<https://www.cnblogs.com/chengxiao/p/6103002.html>

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

根据上面这种冒泡实现，若原数组本身就是有序的（这是最好情况），仅需n-1次比较就可完成；若是倒序，比较次数为 n-1+n-2+...+1=n(n-1)/2，交换次数和比较次数等值。所以，其时间复杂度依然为O(n2）。综合来看，冒泡排序性能还还是稍差于选择排序的。

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

简单选择排序通过上面优化之后，无论数组原始排列如何，比较次数是不变的；对于交换操作，在最好情况下也就是数组完全有序的时候，无需任何交换移动，在最差情况下，也就是数组倒序的时候，交换次数为n-1次。综合下来，时间复杂度为O(n2)。复杂度类似与冒泡排序。

## 3. 插入排序

直接插入排序基本思想是每一步将一个待排序的记录，插入到前面已经排好序的有序序列中去，直到插完所有元素为止。

相比于冒泡和选择这两种的全量比较，插入排序会在每次比较后，利用已获得的顺序大小，进行下一次比较排序，减少某些最优情况下的排序次数（原数据顺序）。

相比以上一二种排序，优化思路是对于某些情况的原已有规则（顺序）的数据，利用原数据已有规则，减少这种情况下的比较次数，而非全量比较。且满足其他情况下的数据比较，从而得到结果

比如，从待排序列表A抽取第一个元素a开始，放到另外一个列表作为已经排好序的列表B。再抽取待排序列表第二个元素a2，a2与B中元素比较，插入对应顺序位置。依次类推

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
    // 在当前已排序序列中比较，如果索引元素比需要排序的元素大，就依次往前移动索引
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

插入排序（Insertion Sort）的一个重要的特点是，如果原始数据的大部分元素已经排序，那么插入排序的速度很快（因为需要移动的元素很少）。从这个事实我们可以想到，如果原始数据只有很少元素，那么排序的速度也很快。－－希尔排序就是基于这两点对插入排序作出了改进。

总结基本排序算法速度:  插入排序 > 选择排序 > 冒泡排序

## 4. 希尔排序

<https://blog.csdn.net/qq_39207948/article/details/80006224>

<https://blog.csdn.net/u013630349/article/details/48250109>

是插入排序的改进，但不是挨个比较大小，而是分组比较

核心是 ，相对于插入排序，加入了增量控制gap，对插入排序最差情况（原数据倒序情况比较多）进行优化。优化思路是，将最差情况转换最优情况（顺序插入排序规则）。

对整列数据，把整列数据按照一定间隔拆分，把一定间隔的数据分为一组，一列数据最终会分为多组类似的数据，再分别对这样的每组数据进行插入排序

写法上：代码实现中，并不是分组进行比较，而是按照同一gap时，按顺序对gap的值进行比较。即从第gap个元素开始，逐个跨组处理

后续减小间隔，直到为1，重复上述操作

比如 第一轮，增量为gap = length/2 = 5, 分组为[a1,a6],[a2,a7],[a3,a8],[a4,a9],[a5,a10]。 第二轮，增量减少,gap = 5/2 = 2, 分组为[a1,a3,a5,a7,a9], [a2,a4,a6,a8,a10]

这种增量选择我们可以用一个序列来表示，{n/2,(n/2)/2...1}，称为增量序列

每组进行插入排序后，整个数据大致有序

最后设置增量为1时，则整个数组被分为一组，此时，整个数组已经接近有序了，插入排序效率高

外循环控制间隔序列的移动。也就是说，算法在第一次处理数据集时，会检查所有间隔为5的元素。下一次遍历会检查所有间隔为3的元素。最后一次则会对间隔为1的元素，也就是相邻元素执行标准插入排序。在开始做最后一次处理时，大部分元素都将在正确的位置，算法就不必对很多元素进行交换。这就是希尔排序比插入排序更高效的地方。

总的来说时间复杂度是小于 O(n^2)

希尔排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^s) ，空间复杂度为 O(1) ，不是稳定排序。

希尔排序中对于增量序列的选择十分重要，直接影响到希尔排序的性能。上面选择的增量序列{n/2,(n/2)/2...1}(希尔增量)，其最坏时间复杂度依然为O(n2)，一些经过优化的增量序列如Hibbard经过复杂证明可使得最坏时间复杂度为O(n3/2)

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
      for (
        var j = i;
        j >= this. gaps[ g]
        && this. dataStore[ j- this. gaps[ g]] > temp; 
        j -= this. gaps[ g]
      ) {
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

简单插入排序很循规蹈矩，不管数组分布是怎么样的，依然一步一步的对元素进行比较，移动，插入，比如[5,4,3,2,1,0]这种倒序序列，数组末端的0要回到首位置很是费劲，比较和移动元素均需n-1次。

而希尔排序在数组中采用跳跃式分组的策略，通过某个增量将数组元素划分为若干组，然后分组进行插入排序，随后逐步缩小增量，继续按组进行插入排序操作，直至增量为1。

希尔排序通过这种策略使得整个数组在初始阶段达到从宏观上看基本有序，小的基本在前，大的基本在后。然后缩小增量，到增量为1时，其实多数情况下只需微调即可，不会涉及过多的数据移动。

## 5. 归并排序

<https://www.cnblogs.com/chengxiao/p/6194356.html>

<https://juejin.im/post/6844903640327536648>

<https://juejin.im/post/6844904145342693390>

利用 归并 的思想。所谓归并，是指将两个有序数列合并为一个有序数列。

采用经典的 分治 策略（分治法将问题分(divide)成一些小的问题然后递归求解

就是对数组进行不断的分割，分割到只剩一个元素，然后，再两两合并起来

可以看到这种结构很像一棵完全二叉树，分阶段可以理解为就是递归拆分子序列的过程，递归深度为log2n。

这个算法首先将数据集分解为一组只有一个元素的数组。然后通过创建一组左右子数组将它们慢慢合并起来，每次合并都保存一部分排好序的数据，直到最后剩下的这个数组所有的数据都已完美排序。

把全量数据的排序问题 按照 完全二叉树 拆分为 单个，极少量数据的排序问题。再利用单个数据排序结果组合为全量数据的排序结果。

思想是分治思想，即是分而治之。将复杂问题分解成两个或者多个规模相同或类似的子问题，然后继续细化，当子问题足够简单，能够被求解，那么复杂的问题也就能够被求解出来。

类似的分治策略的实现思路都是：把全量数据问题，拆解为先解决少量数据问题，再依据少量数据问题的结果按照逻辑整合为全量数据的结果。比如 解决问题A1-n， 拆解为 解决问题a1，a2。。。an。因为a1等小问题的解决效率更高。再执行整合操作，将子问题结果按照一定规则整合为问题A的结果。相比于直接对A1-n进行暴力求解，效率更高。

如下，实现逻辑基本由 merge合并 merge_sort对序列进行排序 组成

```
# 递推公式
merge_sort(a...b) = merge(merge_sort(a...k), merge_sort(k+1, b))

# 终止条件
a >= b，不再继续分解
```

```js
function binarySplit(array){
  return binaryMerge(binarySplit(leftArray),binarySplit(rightArray))
}

function binaryMerge(leftArray,rightArray){
  // 处理 leftArray 合并 rightArray
  return 
}
```

此处的 mergeSort 是通用的可以用来二分拆解数组的方法。

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

复杂度分析：

能利用完全二叉树特性的排序一般性能都不会太差

需要将待排序序列中的所有记录扫描一遍，所以有O(n)。再根据完全二叉树，每个记录都需要 log2n次，也就是二叉树递归深度，所以时间复杂度为n*logn;

## 6. 快速排序

<https://segmentfault.com/a/1190000004410119#articleHeader2>

<https://blog.csdn.net/weshjiness/article/details/8660583>

<https://harttle.land/2015/09/27/quick-sort.html>

### 算法步骤

这个算法首先 要在列表中选择一个元素作为 基准值（ pivot）。 数据排序围绕 基准值 进行， 将列表中小于基准值的元素移到数组的底部，将大于基准值的元素移到数组的顶部。  

它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列

处理大型数据集合时性能快  

步骤：

1. 选择 一个 基准 元素， 将 列表 分隔 成 两个 子 序列；
2. 对列 表 重新 排序， 将 所有 小于 基准 值 的 元素 放在 基准 值 的 前面， 所有 大于 基准 值 的 元素 放在 基准 值 的 后面；  
3. 分别 对 较小 元素 的 子 序列 和 较大 元素 的 子 序列 重复 步骤 1 和 2。  

伪代码：

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

js实现：

```js
function quickSort(array, start, end) {
  let length = array.length;
  // 如果不是数组或者数组长度小于等于1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1 || start >= end) return;
  let index = partition(array, start, end); // 将数组划分为两部分，并返回右部分的第一个元素的索引值
  quickSort(array, start, index - 1); // 递归排序左半部分
  quickSort(array, index + 1, end); // 递归排序右半部分
}


function partition(array, start, end) {
  let pivot = array[start]; // 取第一个值为枢纽值，获取枢纽值的大小
  // 当 start 等于 end 指针时结束循环
  while (start < end) {
    // 当 end 指针指向的值大等于枢纽值时，end 指针向前移动
    while (array[end] >= pivot && start < end) {
      end--;
    }
    // 将比枢纽值小的值交换到 start 位置
    array[start] = array[end];
    // 移动 start 值，当 start 指针指向的值小于枢纽值时，start 指针向后移动
    while (array[start] < pivot && start < end) {
      start++;
    }
    // 将比枢纽值大的值交换到 end 位置，进入下一次循环
    array[end] = array[start];
  }
  // 将枢纽值交换到中间点
  array[start] = pivot;
  // 返回中间索引值
  return start;
}
```

### 复杂度

最坏情况：待排序为正序或逆序，这样每次分割后的子序列一个之比上一次序列少一个元素，一个为空。如 1 2 3 4 5 pivotkey=1;分割后一个序列为 2 3 4 5 一个为空，最终O(n^2)。最坏情况 为T(n)+T(n-1)+...+T1。而最优情况，为二分处理，执行深度为lgn,复杂度n*lgn;

平均情况下快速排序的时间复杂度是Θ(𝑛lg𝑛)，最坏情况是𝑛2，但通过随机算法可以避免最坏情况。由于递归调用，快排的空间复杂度是Θ(lg𝑛)。

最好情况：每一次分割都能平分，很均匀 O(nlogn)

快排因为用到了递归操作，所以在简单排序中空间复杂度性能不如直接插入排序，

快速排序是一种交换类的排序，它同样是分治法的经典体现。在一趟排序中将待排序的序列分割成两组，其中一部分记录的关键字均小于另一部分。然后分别对这两组继续进行排序，以使整个序列有序。在分割的过程中，枢纽值的选择至关重要，本文采取了三位取中法，可以很大程度上避免分组"一边倒"的情况。快速排序平均时间复杂度也为O(nlogn)级。

<https://www.cnblogs.com/fengty90/p/3768827.html>

合理取基准值pivotkey：

该值的取值对该算法有相当影响，若pivotkey取到了最大或最小，都会增加算法复杂度，影响性能。

随机选取，在待排序列中随机选取，以降低取到最大或最小值的概率。

三数取中，在待排序列的左端，中间，右端去三个值选取中位数，节省随机数产生的时间开销，以降低取到最大或最小值的概率。三数取中时，比较的同时应将三个元素按中间，小，大的顺序重新排好位置。

### 优化点

1. 在数列小于16的时候直接对数列进行插入排序

## 排序相关问题

快速排序在完全无序的情况下效果最好，时间复杂度为O(nlogn)，在有序情况下效果最差，时间复杂度为O(n^2)。

数组元素基本有序的情况下，插入排序效果最好，因为这样只需要比较大小，不需要移动，时间复杂度趋近于O(n)。
