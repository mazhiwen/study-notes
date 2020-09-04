# 动态规划

<https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/%E7%AE%97%E6%B3%95/%E7%AE%97%E6%B3%95.md#%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92>

<https://mp.weixin.qq.com/s?__biz=MzI1MTIzMzI2MA==&mid=2650561168&idx=1&sn=9d1c6f7ba6d651c75399c4aa5254a7d8&chksm=f1feec13c6896505f7886d9455278ad39749d377a63908c59c1fdceb11241e577ff6d66931e4&scene=21#wechat_redirect>

<https://juejin.im/post/6844903653992579079>

动态规划是一种算法，通过将复杂问题分解为子问题来解决给定的复杂问题，并存储子问题的结果，以避免再次计算相同的结果。

以下是一个问题的两个主要特性，表明可以使用动态规划解决给定的问题：重复子问题，最佳子结构

## 重叠子问题

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

### 自上而下

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

### 自下而上

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

## 最佳子结构

给定问题具有最优子结构性质，如果给定问题的最优解可以通过使用子问题的最优解得到。

例如，最短路径问题具有以下最佳的子结构属性：如果节点x位于从源节点u到目的节点v的最短路径，那么从u到v的最短路径是从u到x的最短路径和从x到v的最短路径的组合。

标准的 All Pair Shortest Path算法如Floyd-Warshall和Bellman-Ford都是动态规划的典型例子。

最长路径问题没有最佳子结构属性。

解决动态规划问题步骤: 确定是否为dp问题--->用最少的参数决定一个状态表达式--->确定不同状态之间的关系--->使用tabulation或memoization

dp问题一般都会包含一个状态，即子问题，而子状态之间如何转换就是一个关键。 什么是状态呢？一个状态可以被定义为一组参数，它可以唯一地标识某个特定的位置或站在给定的问题中。 这组参数应尽可能小以减少状态空间。例如背包问题的index weight 权重。

## 动态规划解决背包问题

## 动态规划解决LCS

## 最长公共子序列
