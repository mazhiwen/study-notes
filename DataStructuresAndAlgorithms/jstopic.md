# 算法题

<https://github.com/sisterAn/JavaScript-Algorithms>

<https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/%E7%AE%97%E6%B3%95/%E7%AE%97%E6%B3%95.md#7-%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97>

<https://juejin.cn/post/6844903621105041416#heading-14>

<https://www.jianshu.com/p/8876704ea9c8>

<https://juejin.cn/post/6844903669490515975>

***

## 递归法

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

## 动态规划

### 背包问题

<https://segmentfault.com/a/1190000012829866>

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
  // n 表示物品个数 
  // w 表示物品重量数组
  // p 表示物品价值数组
  // v 表示总空间
  // dp 表示空间对应的最大价值物品
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

## 链表

### 判断链表中是否有环

<https://leetcode-cn.com/problems/linked-list-cycle/solution/pan-duan-yi-ge-dan-lian-biao-shi-fou-you-huan-by-u/>

- 1.标志法

- 2.利用JSON.stringify()不能序列化含有循环引用的结构

```js
var hasCycle = function(head) {
    try{
        JSON.stringify(head);
        return false;
    }
    catch(err){
        return true;
    }
};
```

时间复杂度：O(n);空间复杂度：O(n)

- 3.快慢指针（双指针法）

设置快慢两个指针，遍历单链表，快指针一次走两步，慢指针一次走一步，如果单链表中存在环，则快慢指针终会指向同一个节点，否则直到快指针指向 null 时，快慢指针都不可能相遇

```js
var hasCycle = function(head) {
  if(!head || !head.next) {
      return false
  }
  let fast = head.next.next, slow = head
  while(fast !== slow) {
      if(!fast || !fast.next) return false
      fast = fast.next.next
      slow = slow.next
  }
  return true
};
```

时间复杂度：O(n);空间复杂度：O(1)

### 合并两个有序链表

<https://github.com/sisterAn/JavaScript-Algorithms/issues/11>

确定解题思路： 从链表头开始比较，l1 与 l2 是有序递增的，所以比较 l1.val 与 l2.val 的较小值就是合并后链表的最小值，次小值就是小节点的 next.val 与大节点的 val 比较的较小值，依次递归，直到递归到 l1 l2 均为 null

```js
function mergeTwoLists(l1, l2) {
    if(l1 === null) {
        return l2
    }
    if(l2 === null) {
        return l1
    }
    if(l1.val <= l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l2.next, l1)
        return l2
    }
}

```

### 反转链表

<https://github.com/sisterAn/JavaScript-Algorithms/issues/14>

有很多方法

迭代：

```js
var reverseList = function(head) {
    if(!head || !head.next) return head
    var prev = null, curr = head
    while(curr) {
        // 用于临时存储 curr 后继节点
        var next = curr.next
        // 反转 curr 的后继指针
        curr.next = prev
        // 变更prev、curr 
        // 待反转节点指向下一个节点 
        prev = curr
        curr = next
    }
    head = prev
    return head
};
```

### 求链表的中间节点

解法：快慢指针

解题思路： 快指针一次走两步，慢指针一次走一步，当快指针走到终点时，慢指针刚好走到中间

```js
const middleNode = function(head) {
    let fast = head, slow = head
    while(fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    return slow
};
```

### 删除链表中的倒数第 n 个节点

使用 2 个指针：

fast 快指针提前走 n+1 步
slow 指针指向当前距离 fast 倒数第 n 个节点， 初始为 head

## 栈

### 最小栈

<https://github.com/sisterAn/JavaScript-Algorithms/issues/23>

在常数时间内检索到最小元素的栈，即仅需保证 getMin 的时间复杂度为 O(1) 即可

```js
var MinStack = function() {
    this.items = []
    this.min = null
};

// 进栈
MinStack.prototype.push = function(x) {
    if(!this.items.length) this.min = x 
    this.min = Math.min(x, this.min)
    this.items.push(x) 
};

// 出栈
MinStack.prototype.pop = function() {
    let num = this.items.pop() 
    this.min = Math.min(...this.items)
    return num
};

// 获取栈顶元素
MinStack.prototype.top = function() {
    if(!this.items.length) return null
    return this.items[this.items.length -1] 
};

// 检索栈中的最小元素
MinStack.prototype.getMin = function() {
    return this.min
};
```

### 有效闭合括号

给定一个只包括 '(' ，')' ，'{' ，'}' ，'[' ，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。

左括号必须以正确的顺序闭合。

如： `{[]}`

利用栈结构

```js
const isValid = function(s) {
    let map = {
        '{': '}',
        '(': ')',
        '[': ']'
    }
    let stack = []
    for(let i = 0; i < s.length ; i++) {
        if(map[s[i]]) {
            stack.push(s[i])
        } else if(s[i] !== map[stack.pop()]){
            return false
        }
    }
    return stack.length === 0
};
```

### 删除字符串中的所有相邻重复项

<https://github.com/sisterAn/JavaScript-Algorithms/issues/26>

反复确认删除重复

```
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
```

解题思路： 遍历字符串，依次入栈，入栈时判断与栈头元素是否一致，如果一致，即这两个元素相同相邻，则需要将栈头元素出栈，并且当前元素也无需入栈

解题步骤： 遍历字符串，取出栈头字符，判断当前字符与栈头字符是否一致:

不一致，栈头字符进栈，当前字符进栈

一致，即栈头字符与当前字符相同相邻，都不需要进栈，直接进入下次遍历即可

## 队列

### 滑动窗口中的最大值(优先队列)

<https://leetcode-cn.com/problems/sliding-window-maximum/solution/hua-dong-chuang-kou-zui-da-zhi-by-leetco-ki6m/>

给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 滑动窗口k = 3
输出: [3,3,5,5,6,7] 
```

```
解释:

滑动窗口的位置 最大值

[1 3 -1] -3 5 3 6 7 3
1 [3 -1 -3] 5 3 6 7 3
1 3 [-1 -3 5] 3 6 7 5
1 3 -1 [-3 5 3] 6 7 5
1 3 -1 -3 [5 3 6] 7 6
1 3 -1 -3 5 [3 6 7] 7
```

## 回溯算法

### 全排列

<https://blog.csdn.net/qq_41056506/article/details/82659524>

<https://www.cnblogs.com/sooner/p/3264882.html>

<https://juejin.im/post/6844903907575988238>

<https://juejin.im/post/6844903809701904397>

<https://www.bilibili.com/video/av9830088/>

<https://juejin.im/post/6844903502121009160>

n个元素全排列为n！= n*(n-1)* .... *1;

题目：给定一个 没有重复 数字的序列，返回其所有可能的全排列。

```
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

```js
let permute = function(nums) {
    // 使用一个数组保存所有可能的全排列
    let res = []
    if (nums.length === 0) {
        return res
    }
    let used = {}, path = []
    dfs(nums, nums.length, 0, path, used, res)
    return res
}
let dfs = function(nums, len, depth, path, used, res) {
  // 所有数都填完了
  if (depth === len) {
    res.push([...path])
    return
  }
  for (let i = 0; i < len; i++) {
    if (!used[i]) {
      // 动态维护数组
      path.push(nums[i])
      used[i] = true
      // 继续递归填下一个数
      dfs(nums, len, depth + 1, path, used, res)
      // 撤销操作
      used[i] = false
      path.pop()
    }
    
  }
}
```

### 数组的子集

```
leetcode Q78（子集）：
给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。
示例:
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

```js
var subsets = function(nums) {
    //最终结果存在res
    var res = [];
    //返回二维数组，temp用于存储每一个结果的数组形式
    var temp = [];
    //调用回溯方法
    backtrack(res,nums,0,temp);
    return res;
};

var backtrack = function(res,nums,index,temp){
    //这里每次探索都是结果，所以res不用条件判断
    res.push(temp.slice());
    //对我们的nums进行探索，这里的i的起始点变化，是为了去重
    for(let i = index; i < nums.length; i ++){
        //往下探索的过程
        temp.push(nums[i]);
        backtrack(res,nums,i + 1,temp);
        //回溯
        temp.pop();
    }
}
```

## 其他

### 两个栈实现一个队列

栈的最大特点就是先进后出，让我们用两个先进后出的栈来实现一个先进先出的队列

那么我们把数据压入第一个栈，此时我们很清楚它的出战顺序是与我们想要的队列的出队顺序是相反的，如果再把这个栈里面的元素依次压入第二个栈，此时我们想想栈2里面的元素的顺序，相当于对一组数据进行了两次倒序，此时对第二个栈进行的出栈操作的顺序就相当于这组数据进入队列的顺序了。

push：当有数据要入队的时候，我们就让它压入stack1。

pop：当pop操作的时候，我们就把s1的元素都压入到s2中，然后对s2进行pop操作就相当于对队列的pop了。pop 操作时，首先判断栈2是否为空，如果不为空则直接 pop 元素。如果栈2为空，则将栈1中的所有元素 pop 然后 push 到栈2中，然后再执行栈2的 pop 操作

front ：前面也有提到，这个队列的front就是stack2的栈顶元素，只要stack2不为空我们返回stack2的栈顶就可以，为空的话还是像之前一样，我们把stack1的所有数据全部压入stack2中再取栈顶

### 计算数组中每个元素出现的次数

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
