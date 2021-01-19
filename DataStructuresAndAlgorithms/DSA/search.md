# 查找算法

## 1. 顺序查找

也叫线性查找,适用于元素随机排列的列表  

* 算法步骤

从 列表 的 第一个 元素 开始 循环， 然后 逐个 与 要 查找 的 数据 进行 比较。 如果 匹配 到了， 则 结束 查找。 如果 到了 列表 的 结尾 也没 有 匹配 到， 那么 这个 数据 就不 存在 于 这个 列表 中。

```javascript
function seqSearch( arr, data) {
  for (var i = 0; i < arr. length; ++ i) {
    if (arr[ i] == data) {
      return true;
      //return i 返回位置
    }
  }
  return false;
  //return -1;
}
```

* 查找最小值最大值

最小值:  

1. 将 数组 第一个 元素 赋值 给 一个 变量， 把这 个 变量 作为 最小值。
2. 开始 遍历 数组， 从 第二个 元素 开始 依次 同 当前 最小值 进行 比较。
3. 如果 当前 元素 数值 小于 当前 最小值， 则 将 当前 元素 设为 新的 最小值。
4. 移动 到下 一个 元素， 并且 重复 步骤 3。
5. 当 程序 结束 时， 这个 变量 中 存储 的 就是 最小值。

```javascript
function findMin( arr) {
  var min = arr[ 0];
  for (var i = 1; i < arr. length; ++ i) {
    if (arr[ i] < min) {
      min = arr[ i];
    }
  }
  return min;
}
```

最大值:  
与最小值类似

```javascript
function findMax( arr) {
  var max = arr[ 0];
  for (var i = 1; i < arr. length; ++ i) {
    if (arr[ i] > max) {
      max = arr[ i];
    }
  }
  return max;
}
```

* 自组织数据

通过 将 频繁 查 找到 的 元素 置于 数据 集 的 起始 位置 来 最小化 查找 次数。

```javascript
function seqSearch( arr, data) {
  for (var i = 0; i < arr. length; ++ i) {
    if (arr[ i] == data) {
      if (i > 0) {
        swap( arr, i, i- 1);
      }
      return true;
    }
  }
  return false;
}
```

***80-20原则？？？？？？？？***  
仅 当 数据 位于 数据 集 的 前 20% 元素 之外 时， 该 数据 才 需要 被 重新 移动 到 数据 集 的 起始 位置。

```javascript
function seqSearch( arr, data) {
  for (var i = 0; i < arr. length; ++ i) {
    if (arr[ i] == data && i > (arr. length * 0. 2)) {
      swap( arr, i, 0);
      return true;
    } else if (arr[ i] == data) {
      return true;
    }
  }
  return false;
}

```

## 2. 二分查找

二分法查找的前提：数据需是排好序的，假设数据是按升序排序的。

逻辑：

```
对于给定值key，从序列的中间位置 mid 开始比较，l o w lowlow为初始位置，h i g h highhigh为末尾位置，

如果当前位置arr[mid]值等于key，则查找成功；

若key小于当前位置值arr[mid]，则在数列的前半段中查找arr[low,mid−1]；

若key大于当前位置值arr[mid]，则在数列的后半段中继续查找arr[mid+1,high]，直到找到为止。
```

二分法的时间复杂度为：O(log2(n))，n为序列长度。

递归法：

```js

function binarySearch(arr,low,high,key){
 if(low>high){return -1;}
 var mid=Math.floor((low+high)/2);
 if(key==arr[mid]){
  return mid;
 }else if(key<arr[mid]){
  high=mid-1;
  return binarySearch(arr,low,high,key);
 }else{
  low=mid+1;
  return binarySearch(arr,low,high,key);
 }
}
```

优化: 迭代法：

```js
// key 要找的值
function binarySearch(arr,key){
  var low=0; //数组最小索引值
  var high=arr.length-1; //数组最大索引值
  while(low <= high){
    var mid= Math.floor((low+high)/2);
    // 每次迭代，以二分位的值 与 目标值比较
    if (key == arr[mid]) {
      return mid;
    } else if (key > arr[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1; //low>high的情况，这种情况下key的值大于arr中最大的元素值或者key的值小于arr中最小的元素值
}
```

## 题目：在排序数组中查找元素的第一个和最后一个位置

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```

用二分查找

```js
let searchRange = function(nums, target) {
    return [leftSearch(nums, target), rightSearch(nums, target)]
}

let leftSearch = function(nums, target) {
    let low = 0, 
        high = nums.length - 1,
        mid
    while (low <= high) {
        mid = Math.floor((low+high)/2)
        if (nums[mid] < target) {
            low = mid + 1
        } else if (nums[mid] > target) {
            high = mid - 1
        } else if (nums[mid] === target) {
            // 这里不返回，继续收缩左侧边界
            high = mid - 1
        }
    }
    // 最后检查 low 是否越界或命中
    if (low >= nums.length || nums[low] != target)
        return -1
    return low
}


let rightSearch = function (nums, target) {
    let low = 0, 
        high = nums.length - 1,
        mid
    while (low <= high) {
        mid = Math.floor((low+high)/2)
        if (nums[mid] < target) {
            low = mid + 1
        } else if (nums[mid] > target) {
            high = mid - 1
        } else if (nums[mid] === target) {
            // 这里不返回，继续收缩右侧边界
            low = mid + 1
        }
    }
    // 最后检查 high 是否越界或命中
    if (high < 0 || nums[high] != target)
        return -1
    return high
}
```
