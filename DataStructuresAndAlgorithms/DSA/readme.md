# 数据结构与算法

目录
  
***

参考：

***

## 集合

特点：成员无序，不能有相同成员

## 图

由边的集合和顶点的集合组成  
***边***:由顶点对(v1,v2)定义  
***权重***:顶点也有权重，称为成本  
***有向图***:顶点对是有序的;顶点无序为无序图  
***路径***:一系列的顶点构成路径. 路径的 ***长度*** 用 路径 中 第一个 顶点 到 最后 一个 顶点 之间 边 的 数量 表示。  
***环***:由 指向 自身 的 顶点 组成 的 路径 称为 环， 环 的 长度 为 0。  
***圈***: 是 至少 有 一条 边 的 路径， 且 路径 的 第一个 顶点 和 最后 一个 顶点 相同。 无论是 有向 图 还是 无向 图， 只要 是 没有 重复 边 或 重复 顶点 的 圈， 就是 一个 ***简单圈***。 除了 第一个 和 最后 一个 顶点 以外， 路径 的 其他 顶点 有 重复 的 圈 称为 ***平凡圈***。  
***强连通***：如果 两个 顶点 之间 有 路径， 那么 这 两个 顶点 就是 强 连通 的， 反之亦然。 如果 有向 图 的 所有 的 顶点 都是 强 连通 的， 那么 这个 有向 图 也是 强 连通 的。

### 1. 图类

```javascript
//顶点
function Vertex( label) {
  this. label = label;
}
//边：邻接表，邻接矩阵
//图类
function Graph( v) {
  //顶点数
  this. vertices = v;
  //边的数量
  this. edges = 0;
  //相邻顶点 邻接表
  this. adj = [];
  for (var i = 0; I < this. vertices; ++ i) {
    this. adj[ i] = [];
    this. adj[ i]. push("");
  }
  this. addEdge = addEdge;
  this. toString = toString;
}
//添加边
function addEdge( v, w) {
  this. ajd[ v]. push( w);
  this. adj[ w]. push( v);
  this. edges++;
}
//展示所有顶点 和 相邻顶点列表
function showGraph() {
  for (var i = 0; i < this. vertices; ++ i) {
    putstr( i + "->");
    for (var j = 0; j < this. vertices; ++ j) {
      if (this. adj[ i][ j] != undefined)
      putstr( this. adj[ i][ j] + ' ');
    }
    print();
  }
}
```

### 2. 搜索

* 深度优先搜索:  
  深度 优先 搜索 包括 从 一条 路径 的 起始 顶点 开始 追溯， 直到 到达 最后 一个 顶点， 然后 回溯， 继续 追溯 下一 条 路径， 直到 到达 最后 的 顶点， 如此 往复， 直到 没有 路径 为止。 这不 是在 搜索 特定 的 路径， 而是 通过 搜索 来 查看 在 图中 有 哪些 路径 可以 选择。

```javascript
//以上图类添加 点是否访问过的标记数组
this. marked = [];
for (var i = 0; i < this. vertices; ++ i ) {
  this. marked[ i] = false;
}
//搜索算法
function dfs( v) {
  this. marked[ v] = true;
  //用于 输出 的 if 语句 在这里 不是 必须的
  if (this. adj[ v] != undefined)
  print(" Visited vertex: " + v);
  for each( var w in this. adj[ v]) {
    if (!this. marked[ w]) {
      this. dfs( w);
    }
  }
}
```

* 广度优先搜索:  
  广度 优先 搜索 从 第一个 顶点 开始， 尝试 访问 尽可能 靠近 它的 顶点。 本质上， 这种 搜索 在 图上 是 逐 层 移动 的， 首先 检查 最靠近 第一个 顶点 的 层， 再 逐渐 向下 移动 到 离 起始 顶点 最 远的 层。

```javascript
//s=0
function bfs( s) {
  var queue = [];
  this. marked[ s] = true;
  queue. push( s); //添 加到 队 尾
  while (queue. length > 0) {
    var v = queue. shift(); //从 队 首 移 除
    if (v == undefined) {
      print(" Visisted vertex: " + v);
    }
    for each( var w in this. adj[ v]) {
      if (!this. marked[ w]) {
        // this. edgeTo[ w] = v;
        this. marked[ w] = true;
        queue. push( w);
      }
    }
  }
}
```

### 3. 查找最短路径

```javascript
//Graph类添加 edgeTo:从一个顶点到下一个顶点的所有边
this.edgeTo=[];
//广度优先搜索bfs 放开edgeTo操作
//pathTo 与指定顶点有共同边的所有顶点
function pathTo( v) {
  var source = 0;
  if (!this. hasPathTo( v)) {
    return undefined;
  }
  var path = [];
  for (var i = v; i != source; i = this. edgeTo[ i]) {
    path. push( i);
  }
  path. push( source);
  return path;
}
function hashPathTo( v) {
  return this. marked[ v];
}
```

### 4. 拓扑排序

```javascript
//Graph类添加
this. vertexList = [];
//拓扑排序函数
function topSort() {
  var stack = [];//排序存储栈
  var visited = [];//是否访问过标记
  //遍历所有顶点 都标记为未访问
  for (var i = 0; i < this. vertices; i++) {
    visited[ i] = false;
  }
  //遍历所有顶点
  for (var i = 0; i < this. vertices; i++) {
    if (visited[ i] == false) {//如果顶点未访问过
      this. topSortHelper( i, visited, stack);//(深度优先)排序访问顶点
    }
  }
  //遍历 并输出排序存储栈
  for (var i = 0; i < stack. length; i++) {
    if (stack[ i] != undefined && stack[ i] != false) {
      print( this. vertexList[ stack[ i]]);
    }
  }
}
//排序访问函数(深度优先)
function topSortHelper( v, visited, stack) {
  visited[ v] = true;//设置v已访问
  for each( var w in this. adj[ v]) { //遍历v的邻接点 w
    if (!visited[ w]) {//如果w未访问
      //排序访问w 第二层第一个参数为false
      this. topSortHelper( visited[ w], visited, stack);
    }
  }
  //排序存储栈 push v
  stack. push( v);
}

```

## 高级算法

**动态规划**

背包问题：

最简单的算法：尝试所有组合，但算法的运行时间为$O(2^n)$

**贪心算法**
