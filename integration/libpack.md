[你的Tree-Shaking并没什么卵用](https://zhuanlan.zhihu.com/p/32831172)

# 组件库打包方案

## 参考antd - gulp

babel编译，但是不进行module 编译，保留es6 模块语法

## rollup

## webpack问题

babel 转义后 的是有副作用的

uglifyjs 不能判断代码块是否有副作用
