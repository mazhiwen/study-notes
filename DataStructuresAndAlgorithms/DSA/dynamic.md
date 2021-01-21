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

## 题目

### 背包问题

<https://segmentfault.com/a/1190000012829866>

已知 物品个数，总空间，物品重量数组，物品价值数组，求背包能放物品最大价值

转换为表格 行为物品，列为容量，从左到右，从上到下计算值。

```
          size
          4     3     2    1
num 吉他
    音响   
    电脑
```

计算每个单元格的值的公式cell[i][j]：比较 上一个单元格的值cell[i-1][j] 和 当前商品的价值+剩余空间的价值(cell[i-1][j-当前商品的重量])

```js
function PackageHelper2(goodsNums, goodsWeights, goodsPrice, maxSize) {
  // goodsNums 表示物品个数 
  // goodsWeights 表示物品重量数组
  // goodsPrice 表示物品价值数组
  // maxSize 表示总空间
  // fixedNumPriceBySize 表示当前固定 物品数下，空间对应的最大价值物品
  let fixedNumPriceBySize = new Array[maxSize+1];
  for (let i=1; i <= goodsNums; i++) { // i: 物品从 1 到 n 遍历
    for (let j=maxSize; j > 0; j--) { // j：空间从 maxSize 到 0 递减
      if(j > goodsWeights[i]) {
        fixedNumPriceBySize[j] = Math.max(
          fixedNumPriceBySize[j], 
          fixedNumPriceBySize[j-goodsWeights[i]] + goodsPrice[i]
        );
      } else {
        fixedNumPriceBySize[j] = fixedNumPriceBySize[j];
      }
    }
  }
  return fixedNumPriceBySize[maxSize];
 }
```

不同写法：

```js
//by 司徒正美
 function knapsack(weights, values, W){
    var n = weights.length -1
    var f = [[]]
    for(var j = 0; j <= W; j++){
        if(j < weights[0]){ //如果容量不能放下物品0的重量，那么价值为0
           f[0][j] = 0
        }else{ //否则等于物体0的价值
           f[0][j] = values[0]
        }
    }
    for(var j = 0; j <= W; j++){
        for(var i = 1; i <= n; i++ ){
            if(!f[i]){ //创建新一行
                f[i] = []
            }
            if(j < weights[i]){ //等于之前的最优值
                f[i][j] = f[i-1][j]
            }else{
                f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]] + values[i]) 
            }
        }
    }
    return f[n][W]
}
var a = knapsack([2,2,6,5,4],[6,3,5,4,6],10)
console.log(a)
```

### 回文子串

<https://github.com/sisterAn/JavaScript-Algorithms/issues/107>

给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

显然，一个子串由两端的 i 、j 指针确定，就是描述子问题的变量，子串 s[i...j] （ dp[i][j] ） 是否是回文串，就是子问题。

最佳子结构公式：

```js
i === j： dp[i][j]=true
j - i == 1 && s[i] == s[j]： dp[i][j] = true
j - i > 1 && s[i] == s[j] && dp[i + 1][j - 1]： dp[i][j] = true
```

实现：

```js
let countSubstrings = function(s) {
  const len = s.length
  let count = 0
  const dp = new Array(len)

  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len).fill(false)
  }
  for (let j = 0; j < len; j++) {
    for (let i = 0; i <= j; i++) {
      if (s[i] == s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
        dp[i][j] = true
        count++
      } else {
        dp[i][j] = false
      }
    }
  }
  return count
}
```

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

### 斐波那契数列

<https://www.thisjs.com/2017/09/21/my-view-of-fibonacci/>

大家都知道斐波那契数列，现在要求输入一个整数 n，请你输出斐波那契数列的第 n 项。 n<=39

斐波那契数列的规律是，第一项为0，第二项为1，第三项以后的值都等于前面两项的和

**递归实现, 普通分治算法**

```js
function fibonacci(n){
  if(n === 1 || n === 0 ) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}

```

问题；

1. 在递归过程中，每创建一个新函数，解释器都会创建一个新的函数栈帧，并且压在当前函数的栈帧上，这就形成了调用栈。因而，当递归层数过大之后，就可能造成调用栈占用内存过大或者溢出。

2. 分析可以发现，递归造成了大量的重复计算。

**尾调用优化**

尾调用是指一个函数里的最后一个动作是一个函数调用的情形：即这个调用的返回值直接被当前函数返回的情形。

在ES6中，只有在strict模式下，才会开启尾调用优化

在ES6中，strict模式下，满足以下条件，尾调用优化会开启，此时引擎不会创建一个新的栈帧，而是清除当前栈帧的数据并复用：

1. 尾调用函数不需要访问当前栈帧中的变量

2. 尾调用返回后，函数没有语句需要继续执行

3. 尾调用的结果就是函数的返回值

例如:

```js
function B() {
    return 1;
}
function A() {
    return B();  // return 1
}
```

实现斐波那契:

```js
'use strict'
function fibonacci(n, current = 0, next = 1) { //es2015默认参数：
    if(n === 1) return next;
    if(n === 0) return 0;
    return fibonacci(n - 1, next, current + next);
}
fibonacci(6);
```

**递推, 动态规划算法**

```js
function fibonacci(n) {
  let current = 0;
  let next = 1;
  let temp;
  for(let i = 0; i < n; i++){
    temp = current;
    current = next;
    next += temp;
  }
  return current;
}
```

**通项公式法**

```js
function fibonacci(n) {
    const SQRT_FIVE = Math.sqrt(5);
    return Math.round(1/SQRT_FIVE * (Math.pow(0.5 + SQRT_FIVE/2, n) - Math.pow(0.5 - SQRT_FIVE/2, n)));
}
```

**转化为矩阵**

.....

<https://juejin.im/post/596837b75188250d781d1552>

### 最长公共子序列

LCS-最长公共子序列

<https://juejin.im/post/6844903782325682183>

<https://juejin.im/post/6844903613861462029>

最长公共子序列与最长公共子串不一样,子串是连续的，子序列不连续

利用画表格的方法：

最终验证了答案，当两个字符相等的时候，就等于上一个规模小的问题加1，不想等的就相当于有没有这个字符都一样。取两个串少一个的情况下的最大值就可以了。

所以规律如下：

```js
if(input1[i] == input2[j]){
 T[i][j] = T[i-1][j-1] + 1;
}else{
 T[i][j] = max(T[i-1][j],T[i][j-1])
}
```

```js
//动态规划 -- 最长公共子序列


//!!!!  T[i][j] 计算，记住口诀：相等左上角加一，不等取上或左最大值

function longestSeq(input1,input2,n1,n2){
 var T = []; // T[i][j]表示 公共子序列长度
 for(let i=0;i<n1;i++){
  T[i] = [];
  for(let j= 0;j<n2;j++){
   if(j==0 ||i==0){
    T[i][j] = 0;
    continue;
   }
   if(input1[i] == input2[j]){
    T[i][j] = T[i-1][j-1] + 1;
   }else{
    T[i][j] = Math.max(T[i-1][j],T[i][j-1])
   }

  }

 }

 findValue(input1,input2,n1,n2,T);

 return T;

}

//!!!如果它来自左上角加一，则是子序列，否则向左或上回退。
//findValue过程，其实就是和 就是把T[i][j]的计算反过来。
function findValue(input1,input2,n1,n2,T){
 var i = n1-1,j=n2-1;
 var result = [];//结果保存在数组中
 console.log(i);
 console.log(j);
 while(i>0 && j>0){
  if(input1[i] == input2[j]){
   result.unshift(input1[i]);
   i--;
   j--;
  }else{
   //向左或向上回退
   if(T[i-1][j]>T[i][j-1]){
    //向上回退
    i--;
   }else{
    //向左回退
    j--;
   }
  }

 }

 console.log(result);
}


//两个序列，长度不一定相等, 从计算表格考虑，把input1和input2首位都补一个用于占位的空字符串
var input2 = ["","a","b","c","a","d","f"],
 input1 = ["","a","c","b","a","d"],
 n1 = input1.length,
 n2 = input2.length;

console.log(longestSeq(input1,input2,n1,n2));

```

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
