# 算法题

<https://github.com/sisterAn/JavaScript-Algorithms>

<https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/%E7%AE%97%E6%B3%95/%E7%AE%97%E6%B3%95.md#7-%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97>

***

## 斐波那契数列

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

## 假设你有8个球，其中一个略微重一些，但是找出这个球的惟一方法是将两个球放在天平上对比。最少要称多少次才能找出这个较重的球

最少两次可以称出。

首先将 8 个球分为 3 组，其中两组为 3 个球，一组为 2 个球。

第一次将两组三个的球进行比较，如果两边相等，则说明重的球在最后一组里。第二次将最后一组的球进行比较即可。如
果两边不等，则说明重的球在较重的一边，第二次只需从这一组中随机取两球出来比较即可判断。

## 两个栈实现一个队列

栈的最大特点就是先进后出，让我们用两个先进后出的栈来实现一个先进先出的队列

那么我们把数据压入第一个栈，此时我们很清楚它的出战顺序是与我们想要的队列的出队顺序是相反的，如果再把这个栈里面的元素依次压入第二个栈，此时我们想想栈2里面的元素的顺序，相当于对一组数据进行了两次倒序，此时对第二个栈进行的出栈操作的顺序就相当于这组数据进入队列的顺序了。

push：当有数据要入队的时候，我们就让它压入stack1。

pop：当pop操作的时候，我们就把s1的元素都压入到s2中，然后对s2进行pop操作就相当于对队列的pop了。pop 操作时，首先判断栈2是否为空，如果不为空则直接 pop 元素。如果栈2为空，则将栈1中的所有元素 pop 然后 push 到栈2中，然后再执行栈2的 pop 操作

front ：前面也有提到，这个队列的front就是stack2的栈顶元素，只要stack2不为空我们返回stack2的栈顶就可以，为空的话还是像之前一样，我们把stack1的所有数据全部压入stack2中再取栈顶

## 数组去重

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
  
## 计算数组中每个元素出现的次数

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

## 最长公共子序列

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

## 背包问题

转换为表格 行为物品，列为容量，从左到右，从上到下计算值。

```

          j
          1     2     3      4
i 吉他
  音响
  电脑
```

计算每个单元格的值的公式cell[i][j]：比较 上一个单元格的值cell[i-1][j] 和 当前商品的价值+剩余空间的价值(cell[i-1][j-当前商品的重量])

```java
public static int PackageHelper2(int n,int w[],int p[],int v) {
  //设置一个二维数组，横坐标代表从第一个物品开始放到第几个物品，纵坐标代表背包还有多少容量，dp代表最大价值
  int dp[] = new int[v+1];
  for(int i=1;i<=n;i++){
   for(int j=v;j>0;j--){
    if(j>w[i]){
     dp[j] = Math.max(dp[j], dp[j-w[i]]+p[i]);
    }else{
     dp[j] = dp[j];
    }
   }
  }
  return dp[v];
 }
```

## 全排列

<https://blog.csdn.net/qq_41056506/article/details/82659524>

<https://www.cnblogs.com/sooner/p/3264882.html>

<https://juejin.im/post/6844903907575988238>

<https://juejin.im/post/6844903809701904397>

<https://www.bilibili.com/video/av9830088/>

<https://juejin.im/post/6844903502121009160>

n个元素全排列为n！= n*(n-1)* .... *1;

### 递归法

```js
// arr即表示问题的输入，from 表示从哪里开始全排列。
var ret = []; // 定义数组存储排列结果
function permutation(arr,from){
  console.log('permutation', from);

    if(from===arr.length-1){ // 当from到达arr最后一个元素时，问题规模达到最小
      console.log('生成结果:',arr.join(''));  
      ret.push(arr.join(''))
        return;
    }
    // ...something need to do...here
    // 缩小问题规模
    for(var i=from;i<arr.length;i++){
        console.log('i => ',i, 'swap:',from,i);
        swap(arr,from,i)//每一位都与第一位发生交换，i===from时，也就是自己和自己交换，并不会发生值的变化，所以我们可以直接这样处理，不需要让i从from+1开始，当然也可以从i=from+1开始循环。

        permutation(arr,from+1) // 固定位置后移
        swap(arr,from,i)// 这一步的操作是为了在循环体中的第一步，我们对arr,进行了位置交换，对数组产生了影响。arr的顺序发生了变化，如果我们要假定第一位的所有可能性的话，那么，就必须是在建立在这些序列的初始状态一致的情况下,所以每次交换后，要还原，确保初始状态一致。
    }
}
// 位置交换
function swap(list, m, n) {
    var temp = list[m];
    list[m] = list[n];
    list[n] = temp;
}

permutation([0,1,2,3],0);
console.log(ret);
```

## 排列组合

<https://juejin.im/post/6844904021510062094>
