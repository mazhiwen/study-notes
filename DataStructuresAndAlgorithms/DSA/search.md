
# 二分

## 二分查找


LeetCode：704. 二分查找


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
