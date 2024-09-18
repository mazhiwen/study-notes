# 算法题

<https://github.com/sisterAn/JavaScript-Algorithms>

<https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/%E7%AE%97%E6%B3%95/%E7%AE%97%E6%B3%95.md#7-%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97>

<https://juejin.cn/post/6844903621105041416#heading-14>

<https://www.jianshu.com/p/8876704ea9c8>

<https://juejin.cn/post/6844903669490515975>

[前端算法渣的救赎之路🚀](https://juejin.cn/post/6844904175562653710)
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
