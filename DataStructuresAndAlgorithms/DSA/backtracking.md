# 回溯算法

使用回溯法进行求解，回溯是一种通过穷举所有可能情况来找到所有解的算法。如果一个候选解最后被发现并不是可行解，回溯算法会舍弃它，并在前面的一些步骤做出一些修改，并重新尝试找到可行解。

究其本质，其实就是枚举。用递归

回溯算法是一种搜索法，试探法，它会在每一步做出选择，一旦发现这个选择无法得到期望结果，就回溯回去，重新做出选择。深度优先搜索利用的就是回溯算法思想。

<https://juejin.cn/post/6844903748456677389>

<https://juejin.cn/post/6844904037934972936>

[例子见算法题集](../jstopic.md)

## 适用场景

排列 组合 子集 切割 棋盘

回溯算法很简单，它就是不断的尝试，直到拿到解。它的这种算法思想，使它通常用于解决广度的搜索问题，即从一组可能的解中，选择一个满足要求的解

## 通用大概逻辑

```js
let result = []
backTrace(depth,temp){
  if(depth == len){
    result.push(temp);
  }
  for (let i = index; i < nums.length; i ++){
    temp.push(nums[i]);
    backTrace(depth+1,temp)
    //回溯
    temp.pop();
  }
}
return result;
```

## 例子：电话号码字母组合

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射（与电话按键相同）。注意 1 不对应任何字母。

```js
const letterCombinations = function (digits) {
    if (!digits) {
        return [];
    }
    const len = digits.length;
    const map = new Map();
    map.set('2', 'abc');
    map.set('3', 'def');
    map.set('4', 'ghi');
    map.set('5', 'jkl');
    map.set('6', 'mno');
    map.set('7', 'pqrs');
    map.set('8', 'tuv');
    map.set('9', 'wxyz');
    const result = [];

    function generate(i, str) {
        if (i == len) {
            result.push(str);
            return;
        }
        const tmp = map.get(digits[i]);
        for (let r = 0; r < tmp.length; r++) {
            generate(i + 1, str + tmp[r]);
        }
    }
    generate(0, '');
    return result;
};

letterCombinations([2,3]);
// 输入 [2,3]
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

## 例子：全排列

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

## 例子：数组的子集

```
leetcode Q78（子集）：
给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。
示例:
输入: nums = [1,2,3,4,5]
输出:
[

[]
	[1]
	[1, 2]
	[1, 2, 3]
	[1, 2, 3, 4]
	[1, 2, 3, 4, 5]
	[1, 2, 3, 5]
	[1, 2, 4]
	[1, 2, 4, 5]
	[1, 2, 5]
	[1, 3]
	[1, 3, 4]
	[1, 3, 4, 5]
	[1, 3, 5]
	[1, 4]
	[1, 4, 5]
	[1, 5]
	[2]
	[2, 3]
	[2, 3, 4]
	[2, 3, 4, 5]
	[2, 3, 5]
	[2, 4]
	[2, 4, 5]
	[2, 5]
	[3]
	[3, 4]
	[3, 4, 5]
	[3, 5]
	[4]
	[4, 5]
	[5]
]
```
```js
 0 1 2 3 4
[1,2,3,4,5]
length = 5

// backtrack有收集temp进入result
// for开始有收集path进入temp 中间有backtrack 结束有pop

backtrack0
res.push(t) []{
	for0{
		t.push(1) 1
		backtrack1{
			res.push(t) [1] //////
			for1{
				t.push(2)
				backtrack2{
					res.push(t) [12] //////
					for2{
						t.push(3)
						backtrack3{
							res.push(t) [123] //////
							for3{
								t.push(4)
								backtrack4{
									res.push(t) [1234] //////
									for4{
										t.push(5)
										backtrack5{
											res.push(t) [12345] //////
										}
										t.pop [1234] 7
									}
								}
								t.pop [123] 8
							}
							for4{
								t.push(5)
								backtrack5{
									res.push(t) [1235] //////
								} 
								t.pop [123] 10
							}
						}
						t.pop [12] 11
					}
					for3{
						t.push(4)
						backtrack4{
							res.push(t) [124] //////
							for4{
								t.push(5)
								backtrack5{
									res.push(t) [1245] //////
								}
								t.pop [124]
							}
						}
						t.pop [12]
					}
					for4{
						t.push(5)
						backtrack5{
							res.push(t) [125]  //////
						}
					}
				}
			}
			for2{
				t.push(3)
					b3
						b4
						t=12345
						t.pop
					t.pop
					b4
					t=1235
					t.pop
				t.pop
			}	
			for3{
				t=124
					4
			}			 
			for4{
				
			}
		}			
		t.push(2)
		backtrack2{

		}
		t.push(3)
		backtrack3{
			
		}
		t.push(4)
		backtrack4{
			
		}
	}			
	for1
	for2 
	for3
	for4 
}	
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
 console.log('backtrack', index, temp);
 res.push(temp.slice());
 //对我们的nums进行探索，这里的i的起始点变化，是为了去重
 for(let i = index; i < nums.length; i ++){

  //往下探索的过程
  temp.push(nums[i]);
  console.log('for', index , i, temp)
  backtrack(res,nums,i + 1,temp);
  //回溯
  temp.pop();
  console.log('for pop',  temp)
 }
}

subsets([1,2,3]);
```

```
backtrack(0)
res.push([])
for 0 - 2
0
 backtrack(1)
 res.push([1])
 for 1 - 2
    1
			backtrack(2)
			res.push([1,2])
			for 2
				backtrack(3)
				res.push([1,2,3]) temp=[1,2,3] 
			temp.pop() [1,2]
		temp.pop()	 [1] 
    2
			temp.push(3); [1,3]
			backtrack(3)
			res.push([1,3])
		temp.pop()

1

2
```
