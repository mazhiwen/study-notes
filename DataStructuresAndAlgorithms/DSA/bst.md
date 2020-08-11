# 二叉树

树：非线性数据结构,存储层级关系数据，有序列表。

由边连接的节点组成  

一棵树最上面的节点称为根节点，如果一个节点下面连接多个节点，那么该节点称为父节点，它下面的节点称为子节点。一个节点可以有0个、1个或多个子节点。

叶子节点：没有任何子节点的节点称为叶子节点。  

二叉树：二叉树是一种特殊的树，它的子节点个数不超过两个(左节点，右节点)。二叉树具有一些特殊的计算性质，使得在它们之上的一些操作异常高效。  

路径：从一个节点到另一个节点的这一组边称为路径。  

遍历：以某种特定顺序访问树中所有的节点称为树的遍历。  

深度：树可以分为几个层次，根节点是第0层，它的子节点是第1层，子节点的子节点是第2层，以此类推。树中任何一层的节点可以都看做是子树的根，该子树包含根节点的子节点，子节点的子节点等。我们定义树的层数就是树的深度。  

## 二叉查找树(BST)

二叉查找树是一种特殊的二叉树，相对较小的值保存在左节点中，较大的值保存在右节点中。

这一特性使得查找的效率很高，对于数值型和非数值型的数据，比如单词和字符串，都是如此。

查找所需的最大次数等同于二叉查找树的高度,也正是二分查找的思想

特点：

左子树上所有结点的值均小于或等于它的根结点的值。

右子树上所有结点的值均大于或等于它的根结点的值。

左、右子树也分别为二叉排序树。

没有键值相等的点

```javascript
//节点
function Node( data, left, right) {
  this. data = data;
  this. left = left;
  this. right = right;
  this. show = show;
}
function show() {
  return this. data;
}
//二叉树
function BST() {
  //初始根节点为null
  this. root = null;
  this. insert = insert;
  this. inOrder = inOrder;
}
//插入节点
function insert( data) {
  var n = new Node( data, null, null);
  //如果是第一个节点
  if (this. root == null) {
    this. root = n;
  } else {
    //当前节点设置为根节点  
    var current = this. root;
    var parent;
    while (true) {
      parent = current;
      //如果插入值 < 当前节点
      if (data < current. data) {
        //当前节点设置为当前节点左节点
        current = current. left;
        //如果当前节点左节点为空 进行赋值操作
        if (current == null) {
          parent. left = n;
          break;
        }
        //左节点不为空 ,continue循环
      } else {
        //如果插入值 > 当前节点
        current = current. right;
        //如果当前节点右节点为空 进行赋值操作
        if (current == null) {
           parent. right = n;
           break;
        }
        //右节点不为空 ,continue循环
      }
    }
  }
}
//实践
var bst=new BST();
bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);
//      23
//  16        45
//3   22   37     99
```

## 遍历二叉查找树

中序，先序，后序

```javascript
//中序：左中右的顺序
//输出:3 16 22 23 37 45 99
function inOrder( node) {
  if (!(node == null)) {
    inOrder( node. left);
    console.log( node. show() + " ");
    inOrder( node. right);
  }
}

//先序：输出:23 16 3 22 45 37 99
function preOrder( node) {
  if (!(node == null)) {
    console.log( node. show() + " ");
    preOrder( node. left);
    preOrder( node. right);
  }
}

//后序: 输出3 22 16 37 99 45 23
function postOrder( node) {
  if (!(node == null)) {
    postOrder( node. left);
    postOrder( node. right);
    putstr( node. show() + " ");
  }
}
```

## 查找二叉查找树

查找给定值，最大值，最小值

```javascript
//最小值:遍历左子树的最后一个节点
function getMin() {
  var current = this. root;
  while (!(current. left == null)) {
    current = current. left;
  }
  return current. data;
}
//最大值：遍历右子树的最后一个节点
function getMax() {
  var current = this. root;
  while (!(current. right == null)) {
    current = current. right;
  }
  return current. data;
}
//给定值
function find( data) {
  var current = this. root;
  while (current != null) {
    if (current. data == data) {
      return current;
    } else if (data < current. data) {
      current = current. left;
    } else {
      current = current. right;
    }
  }
  return null;
}
```

## 删除二叉查找树节点

```javascript
function remove( data) {
  root = removeNode( this. root, data);
}
function removeNode( node, data) {
  if (node == null) {
    return null;
  }
  if (data == node. data) {
    //没有 子 节点 的 节点
    if (node. left == null && node. right == null) { return null; }
    //没有 左 子 节点 的 节点
    if (node. left == null) { return node. right; }
    //没有 右 子 节点 的 节点
    if (node. right == null) { return node. left; }
    //有两个子节点的节点
    //正确的做法有两种：要么查找待删除节点左子树上的最大值，要么查找其右子树上的最小值。这里我们选择后一种方式。
    var tempNode = getSmallest( node. right);
    node. data = tempNode. data;
    node. right = removeNode( node. right, tempNode. data);
    return node;
  } else if (data < node. data) {
    node. left = removeNode( node. left, data);
    return node;
  } else {
    node. right = removeNode( node. right, data);
    return node;
  }
}
```

## 节点计次

```javascript
function Node( data, left, right) {
  this. data = data;
  this. count = 1;
  this. left = left;
  this. right = right;
  this. show = show;
}
//计次函数
function update( data) {
  var grade = this. find( data);
  grade. count++;
  return grade;
}
```

## 红黑树

红黑树是一种自平衡的二叉查找树

红黑树的应用非常广泛，常见的函数库，如C++中的map，multimap,以及Java中的TreeMap，TreeSet， Java8中的HashMap的实现也采用了红黑树。

它主要是为了解决不平衡的二叉查找树的查找效率不高的缺点。红黑树保证了从根到叶子 节点的最长路径不会超过最短路径的两倍。

新插入的节点总是设为红色的

特点：

1.节点是红色或黑色。

2.根节点是黑色。

3.每个叶子节点都是黑色的空节点（NIL节点）。

4 每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)

5.从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

### 变色

为了重新符合红黑树的规则，尝试把红色节点变为黑色，或者把黑色节点变为红色。
