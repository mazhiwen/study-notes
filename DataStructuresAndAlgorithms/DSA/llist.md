## 链表

**单向链表**

链表是由一组节点组成的集合。每个节点都使用一个对象的引用指向它的后继。  
指向另一个节点的引用叫做链。  
尾元素指向null  
Head->节点->节点->null  

```javascript
//Node 表示节点
function Node( element) {
  this. element = element;
  this. next = null;
}

//LinkedList   表示链表 及 操作方法
function LList() {
  this. head = new Node(" head");
  this. find = find;
  this. insert = insert;
  this. findPrevious= findPrevious;
  this. remove = remove;
  this. display = display;
}

//查找节点
function find( item) {
  var currNode = this. head;
  while (currNode. element != item) {
    currNode = currNode. next;
  }
  return currNode;
}
//插入
function insert( newElement, item) {
  var newNode = new Node( newElement);
  var current = this. find( item);
  newNode. next = current. next;
  current. next = newNode;
}
//遍历展示
function display() {
  var currNode = this. head;
  while (!(currNode. next == null)) {
    print( currNode. next. element);
    currNode = currNode. next;
  }
}
//找出上一个节点
function findPrevious( item) {
  var currNode = this. head;
  while (!(currNode. next == null) && (currNode. next. element != item)) {
    currNode = currNode. next;
  }
  return currNode;
}
//移除节点
function remove( item) {
  var prevNode = this. findPrevious( item);
  if (!(prevNode. next == null)) {
    prevNode. next = prevNode. next. next;
  }
}
```

**双向链表**

null<-Head-><-节点-><-节点->null

```javascript
function Node( element) {
  this. element = element;
  this. next = null;
  this. previous = null;
}
//表示双向链表
function LList() {
  this. head = new Node(" head");
  this. find = find; //同单向链表
  this. insert = insert;
  this. display = display; //同单向链表
  this. remove = remove;
  this. findLast = findLast;
  this. dispReverse = dispReverse;
}
function insert( newElement, item) {
  var newNode = new Node( newElement);
  var current = this. find( item);
  newNode. next = current. next;
  newNode. previous = current;
  current. next = newNode;
}
function remove( item) {
  var currNode = this. find( item);
  if (!(currNode. next == null)) {
    currNode. previous. next = currNode. next;
    currNode. next. previous = currNode. previous;
    currNode. next = null;
    currNode. previous = null;
  }
}
//查找最后一个节点
function findLast() {
  var currNode = this. head;
  while (!(currNode. next == null)) {
    currNode = currNode. next;
  }
  return currNode;
}
//反序遍历显示链表
function dispReverse() {
  var currNode = this. head;
  currNode = this. findLast();
  while (!(currNode. previous == null)) {
    print( currNode. element);
    currNode = currNode. previous;
  }
}
```

**循环链表**

类似单向链表  
在创建循环链表时，Head.next指向Head  
Head->节点->节点->Head

```javascript
//修改单向链表 为 循环链表
function LList() {
  this. head = new Node(" head");
  this. head. next = this. head; //双向 初始化
  this. find = find;
  this. insert = insert;
  this. display = display;
  this. findPrevious = findPrevious;
  this. remove = remove;
}
function display() {
  var currNode = this. head;
  while (!(currNode. next == null) && !(currNode. next. element == "head")) {
    print( currNode. next. element);
    currNode = currNode. next;
  }
}

```

**判断链表中是否有环**

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
