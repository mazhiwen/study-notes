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

适用于元素已经排序的列表，效率高  

a. 将 数组 的 第一个 位置 设置 为 下 边界（ 0）。  
b. 将 数组 最后 一个 元素 所在 的 位置 设置 为上 边界（ 数组 的 长度 减 1）。  
c.若 下边 界 等于 或 小于 上 边界， 则 做 如下 操作。  
  将 中点 设置 为（ 上边 界 加上 下 边界） 除以 2。  
  如果 中点 的 元素 小于 查询 的 值， 则 将 下边 界 设置 为 中点 元素 所在 下标 加 1。  
  如果 中点 的 元素 大于 查询 的 值， 则 将上 边界 设置 为 中点 元素 所在 下标 减 1。  
  否则 中点 元素 即为 要 查找 的 数据， 可以 进行 返回。

```javascript
function binSearch( arr, data) {
  var upperBound = arr. length- 1;
  var lowerBound = 0;
  while (lowerBound <= upperBound) {
    var mid = Math. floor(( upperBound + lowerBound) / 2);
    if (arr[ mid] < data) {
      lowerBound = mid + 1;
    } else if (arr[ mid] > data) {
      upperBound = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}
//计算重复次数
function count( arr, data) {
  var count = 0;
  //position是重复位置的中间位置
  var position = binSearch( arr, data);
  if (position > -1) {
    ++ count;
    for (var i = position- 1; i > 0; --i) {
      if (arr[ i] == data) {
        ++ count;
      } else {
        break;
      }
    }
    for (var i = position+ 1; i < arr. length; ++ i) {
      if (arr[ i] == data) {
        ++ count;
      } else {
        break;
      }
    }
  }
  return count;
}

```
