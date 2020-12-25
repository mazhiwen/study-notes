# 动态规划

<https://mp.weixin.qq.com/s?__biz=MzI1MTIzMzI2MA==&mid=2650561168&idx=1&sn=9d1c6f7ba6d651c75399c4aa5254a7d8&chksm=f1feec13c6896505f7886d9455278ad39749d377a63908c59c1fdceb11241e577ff6d66931e4&scene=21#wechat_redirect>

<https://juejin.im/post/6844903653992579079>

<https://blog.csdn.net/baidu_28312631/article/details/47418773>

<https://blog.csdn.net/ailaojie/article/details/83014821>

<https://blog.csdn.net/zw6161080123/article/details/80639932>

动态规划是一种算法，通过将复杂问题分解为子问题来解决给定的复杂问题，并存储子问题的结果，以避免再次计算相同的结果。

以下是一个问题的两个主要特性，表明可以使用动态规划解决给定的问题：重复子问题，最佳子结构

## 问题特性

### 1. 重叠子问题

```js
/* simple recursive program for Fibonacci numbers */
int fib(int n)
{
    if ( n <= 1 )
    return n;
    return fib(n-1) + fib(n-2);
}
```

当没有共同的（重叠的）子问题时，动态规划是没有用的

典型：斐波那契数列

有以下两种不同的方式来存储值，以便这些值可以重复使用：自上而下 和 自下而上

爬楼梯问题:有一座高度是10级台阶的楼梯，从下往上走，每跨一步只能向上1级或者2级台阶。要求用程序来求出一共有多少种走法？

- 自上而下

类似于递归

一个问题的memoized程序类似于递归版本，只是在计算解决方案之前查看一个查找表。 我们初始化一个所有初始值为NIL的查找数组。 每当我们需要解决一个子问题，我们首先查找查找表。 如果预先计算的值在那里，那么我们返回该值，否则我们计算该值并将结果放在查找表中，以便稍后可以重新使用。

```java
public class Fibonacci {
    final int MAX = 100;
    final int NIL = -1;

    int lookup[] = new int[MAX];

    void _initialize() {
        for (int i = 0; i < MAX; i++) {
            lookup[i] = NIL;
        }
    }

    int fib(int n) {
        if (lookup[n] == NIL) {
            if (n <= 1)
                lookup[n] = n;
            else
                lookup[n] = fib(n - 1) + fib(n - 2);
        }
        return lookup[n];
    }

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Fibonacci f = new Fibonacci();
        int n = 10;
        f._initialize();
        System.out.println(f.fib(n));
    }
}
```

- 自下而上

给定问题的表格程序以自下而上的方式构建一个表，并从表中返回最后一个条目。 例如，对于相同的斐波纳契数，我们首先计算fib（0），然后计算fib（1），然后计算fib（2），然后计算fib（3）等等。 所以从字面上看，我们正在自下而上地构建子问题的解决方案。

```java
public static int fib(int n) {
        int f[] = new int[n + 1];
        f[0] = 0;
        f[1] = 1;
        for (int i = 2; i <= n; i++) {
            f[i] = f[i - 1] + f[i - 2];
        }
        return f[n];
    }
```

合理的动态规划实现是自下而上的逻辑，写出的是递推型动态规划程序。

### 2. 最佳子结构

给定问题具有最优子结构性质，如果给定问题的最优解可以通过使用子问题的最优解得到。

例如，最短路径问题具有以下最佳的子结构属性：如果节点x位于从源节点u到目的节点v的最短路径，那么从u到v的最短路径是从u到x的最短路径和从x到v的最短路径的组合。

标准的 All Pair Shortest Path算法如Floyd-Warshall和Bellman-Ford都是动态规划的典型例子。

最长路径问题没有最佳子结构属性。

解决动态规划问题步骤: 确定是否为dp问题--->用最少的参数决定一个状态表达式--->确定不同状态之间的关系--->使用tabulation或memoization

dp问题一般都会包含一个状态，即子问题，而子状态之间如何转换就是一个关键。 什么是状态呢？一个状态可以被定义为一组参数，它可以唯一地标识某个特定的位置或站在给定的问题中。 这组参数应尽可能小以减少状态空间。例如背包问题的index weight 权重。

### 3. 无后效行

## 动态规划解题思路

### 1. 画表格

<https://juejin.im/post/6844904181187215368>

动态规划解决问题时，可以直接粗暴 画表格，找规律。把问题的规模变小，变成小问题思考。根据小问题来填表格，找出规律。特别是矩阵型dp问题，用这种方法方便。

例如，题目，在m*n的表格，机器人只能往下，或者往右走，到达右下角有多少种走法。

通过画表格，在3*3, 4*4时候总结发现规律，dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

### 2. 推导最佳子结构公式

缓存为dp的，一维或者二维数组.

坐标为维度

缓存维度变化时的， 当前子解构问题的最优解

可以按照维度初始变化，一步步推导出最佳子结构dp[i][j] 和 维度 i,j 的关系

### 3. 维度遍历，起始值

一维 ，或者二维。代表

## 优化路径

```
函数递归 -》 循环实现记忆递归【可以转换为记忆递推】=》记忆递推空间优化

时间2^n            时间n^2                         空间复杂n
```

递归有时候会造成2的n次方的重复计算 2^n, 记忆型优化后，优化为n^2。改进后，使之成为记忆循环型的动态规划程序

递归总是需要使用大量堆栈上的空间，很容易造成栈溢出

递归一般情况下是可以转化为递推的

空间优化：动态规划中每一个需要创建一个二维数组的解法，都可以换成只创建一个一维数组的滚动数组解法，依据的规则是一般二维数组中存放的是所有的结果，但是一般我们需要的结果实在二维数组的最后一行的某个值，前面几行的值都是为了得到最后一行的值而需要的，所以可以开始就创建跟二维数组最后一行一样大的一维数组，每次存放某一行的值，下一次根据这一行的值算出下一行的值，在存入这个数组，也就是把这个数组滚动了，最后数组存储的结果就是原二维数组中最后一行的值。

## 递推

通用逻辑：

```
初始化存储状态的数组，一维数组或者二维数组或者最终状态值的变量，

外层for循环 内层for循环分别为表格行列纬度

两层for循环{
  状态条件判断
  状态赋值
}

return 状态结果[i]
```

例如三角形数据，自下而上处理。

递推，本质上是从下而上进行 记忆 循环。

```c++
#include <iostream>  
#include <algorithm>
using namespace std;

#define MAX 101  

int D[MAX][MAX];
int n;  
int maxSum[MAX][MAX];
int main(){
 int i,j;
 cin >> n;
 for(i=1;i<=n;i++)
  for(j=1;j<=i;j++)
   cin >> D[i][j];
 for( int i = 1;i <= n; ++ i )
  maxSum[n][i] = D[n][i];
 for( int i = n-1; i>= 1;  --i ) // 外层从 n-1 底层开始
  for( int j = 1; j <= i; ++j ) // 内层从 1 开始
   maxSum[i][j] = max(maxSum[i+1][j],maxSum[i+1][j+1]) + D[i][j];
 cout << maxSum[1][1] << endl;  
}
```

记忆递归可以考虑进行空间优化，减少记忆数据的存储

如下，空间优化的代码：

```c++
 int i,j;
 cin >> n;
 for(i=1;i<=n;i++)
  for(j=1;j<=i;j++)
   cin >> D[i][j];
 maxSum = D[n]; //maxSum指向第n行
 for( int i = n-1; i>= 1;  --i )
  for( int j = 1; j <= i; ++j )
   maxSum[j] = max(maxSum[j],maxSum[j+1]) + D[i][j];
 cout << maxSum[1] << endl;  
```

那么递归到动规的一般转化方法为:

如果该递归函数有n个参数,那么就定义一个n维数组,数组下标是递归函数参数的取值范围(也就是数组每一维的大小).数组元素的值就是递归函数的返回值(初始化为一个标志值,表明还未被填充),这样就可以从边界值开始逐步的填充数组,相当于计算递归函数的逆过程(这和前面所说的推导过程应该是相同的).

## 实际案例

### 斐波那契数列

[见算法题集](../jstopic.md)

### 最长公共子序列

[见算法题集](../jstopic.md)

### 背包问题

[见算法题集](../jstopic.md)

### 数字三角形问题

在上面的数字三角形中寻找一条从顶部到底边的路径，使得路径上所经过的数字之和最大。路径上的每一步都只能往左下或 右下走。只需要求出这个最大和即可，不必给出具体路径。 三角形的行数大于1小于等于100，数字为 0 - 99

```
      7
    3   8
  4   5   6
...
```

二维数组来存放数字三角形

D( r, j) 来表示第r行第 j 个数字(r,j从1开始算)

MaxSum(r, j)表示从D(r,j)到底边的各条路径中，最佳路径的数字之和。

最终问题就变成了求 MaxSum(1,1)

```js
// 递归思路
if ( r == N)
 MaxSum(r,j) = D(r,j)  
else
 MaxSum( r, j) = Max{ MaxSum(r＋1,j), MaxSum(r+1,j+1) } + D(r,j)
```

后续优化代码见 [递推代码示例](#递推)

### 数组最大不连续递增子序列

arr[] = {3,1,4,1,5,9,2,6,5}的最长递增子序列长度为4。即为：1,4,5,9

思路：设置一个数组temp，长度为原数组长度，数组第i个位置上的数字代表0...i上最长递增子序列，当增加一个数字时，最大递增子序列可能变成前面最大的递增子序列+1，也可能就是前面最大递增子序列，这需要让新增加进来的数字arr[i]跟前面所有数字比较大小，即当 arr[i] > arr[j]，temp[i] = max{temp[j]}+1，其中，j 的取值范围为：0,1...i-1，当 arr[i] < arr[j]，temp[i] = max{temp[j]}，j 的取值范围为：0,1...i-1，所以在状态转换方程为temp[i]=max{temp[i-1], temp[i-1]+1}

```java
public static int MaxChildArrayOrder(int a[]) {
  int n = a.length;
  int temp[] = new int[n];//temp[i]代表0...i上最长递增子序列
  for(int i=0;i<n;i++){
    temp[i] = 1;//初始值都为1
  }
  for(int i=1;i<n;i++){
    for(int j=0;j<i;j++){
      if(a[i]>a[j]&&temp[j]+1>temp[i]){
        //如果有a[i]比它前面所有的数都大，则temp[i]为它前面的比它小的数的那一个temp+1取得的最大值
        temp[i] = temp[j]+1;
      }
    }
  }
  int max = temp[0];
  //从temp数组里取出最大的值
  for(int i=1;i<n;i++){
    if(temp[i]>max){
      max = temp[i];
    }
  }
  return max;
}
```
