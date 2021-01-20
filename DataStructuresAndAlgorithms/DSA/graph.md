
# 图

由边的集合和顶点的集合组成

边(顶点对): 由顶点对(v1,v2)定义  

权重: 顶点有权重，称为成本  

加权图: 当图的每条边都被分配了权重时，我们就有了一个加权图（weighted graph）。如果边的权重被忽略，那么可以将（每条边的）权重都视为 1（译者注：权重都是一样，也就是无权重）。

度（degree）: 一个顶点的度，是指与该顶点相连的边的条数。无向图中，顶点的度就是与顶点相关联的边的数目，没有入度和出度。

入度和出度: 有向图中，链接向节点v的节点个数叫入度，节点v链接出的节点个数叫出度

有向图: 所有的顶点对是有序的;顶点无序为无序图  

无向图: 如果所有的边都是双向（译者注：或者理解为没有方向）的，那我们就有了一个无向图

路径: 一系列的顶点之间的边构成路径. 路径的长度: 用路径中第一个顶点到最后一个顶点之间边的数量表示。  

环: 即如果遍历图的顶点，某个顶点可以被访问超过一次。包含相同的顶点两次或者两次以上

无环：参考环

圈: 是 至少 有 一条 边 的 路径， 且 路径 的 第一个 顶点 和 最后 一个 顶点 相同。 无论是 有向 图 还是 无向 图， 只要 是 没有 重复 边 或 重复 顶点 的 圈， 就是 一个 ***简单圈***。 除了 第一个 和 最后 一个 顶点 以外， 路径 的 其他 顶点 有 重复 的 圈 称为 ***平凡圈***。  

强连通：如果 两个 顶点 之间 有 路径， 那么 这 两个 顶点 就是 强 连通 的， 反之亦然。 如果 有向 图 的 所有 的 顶点 都是 强 连通 的， 那么 这个 有向 图 也是 强 连通 的。

简单图: 若不存在顶点到其自身的边，且同一条边不重复出现，则称这样的图为简单图。目前讨论的都是简单图

参考:

<https://mp.weixin.qq.com/s/L8Dui7gJdUdOTmrYCg_wmQ>

## 图的表示

图结构的常见的两个表达方式：邻接矩阵 、邻接表

图的结构很简单，就是由顶点 V 集和边 E 集构成，因此图可以表示成 G = (V,E)

### 邻接矩阵

二维数组， 表示矩阵

对应的坐标值表示两个点是否有边

### 邻接表

邻接表: 是由每个顶点以及它的相邻顶点组成的

用一个HashMap来存储每个点 对应的链接的点列表

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
  this. adj[ v]. push( w);
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

## 深度优先搜索  

深度 优先 搜索 包括 从 一条 路径 的 起始 顶点 开始 追溯， 直到 到达 最后 一个 顶点， 然后 回溯， 继续 追溯 下一 条 路径， 直到 到达 最后 的 顶点， 如此 往复， 直到 没有 路径 为止。

这不 是在 搜索 特定 的 路径， 而是 通过 搜索 来 查看 在 图中 有 哪些 路径 可以 选择。

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

## 广度优先搜索  

广度优先搜索从第一个顶点开始，尝试访问尽可能靠近它的顶点。本质上，这种搜索在图上是逐层移动的，

首先检查最靠近第一个顶点的层，再逐渐向下移动到离起始顶点最远的层。

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

## 查找最短路径

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

## 拓扑排序

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

## 题目: 找到小镇的法官

在一个小镇里，按从 1 到 N 标记了 N 个人。传言称，这些人中有一个是小镇上的秘密法官。

如果小镇的法官真的存在，那么：

小镇的法官不相信任何人。
每个人（除了小镇法官外）都信任小镇的法官。
只有一个人同时满足属性 1 和属性 2 。
给定数组 trust ，该数组由信任对 trust[i] = [a, b] 组成，表示标记为 a 的人信任标记为 b 的人。

如果小镇存在秘密法官并且可以确定他的身份，请返回该法官的标记。否则，返回 -1 。

```
输入：N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
输出：3
```

```js
let findJudge = function(N, trust) {
  //构造0-N个节点的图
  let graph = Array.from({length:N+1}, () => ({outDegree:0, inDegree:0}))
  trust.forEach(([a, b]) => {
    graph[a].outDegree++
    graph[b].inDegree++
  })
  return graph.findIndex(({outDegree, inDegree}, index) => {
    //剔除0
    return index != 0 && outDegree === 0 && inDegree === N-1 
  })
};
```

## 题目: 选课

你这个学期必须选修 numCourse 门课程，记为 0 到 numCourse-1 。

在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们：[0,1]

给定课程总量以及它们的先决条件，请你判断是否可能完成所有课程的学习？

示例 1:

```
输入: 2, [[1,0]] 
输出: true
解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
```

这种关系通常使用有向图来表示，如果这套流程能够成功的帮助你最后吃到火锅（无环），那这种依赖顺序就是拓扑排序，即拓扑排序是针对有向无环图的

解法：广度优先遍历

所以我们可以使用 邻接表 来表示有向图中各个节点的依赖关系，同时维护一个入度表，则入度表中入度为 0 的节点所表示的课程是可以立即开始学习的（没有先决条件条件或先觉条件已完成）

那么这题就很简单了:

创建一个队列，并将临接表中所有入度为 0 的节点放入队列中

若队列非空，则从队列中出队第一个节点，numCourse — （学习该课程），然后将将依赖该课程所有临接节点的入度减 1: 若减 1 后节点入度为 0，则该课程又是可立即学习课程，将该节点添加到队尾; 若减 1 后节点入度不为 0 ，则继续遍历下一节点

当队列为空，检查 numCourses === 0 （所有课程是否全部学习结束）即可
