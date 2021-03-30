
# 组件库打包方案

参考:

[你的Tree-Shaking并没什么卵用](https://zhuanlan.zhihu.com/p/32831172)

[JS SDK 构建实现 Webpack VS Rollup](https://juejin.cn/post/6859539849972711437)

## 策略

使用 Rollup 作为 production 打包工具，Webpack5 作为 development 打包工具。

## 按需打包

打包出支持按需加载的库

## 参考antd - gulp

babel编译，但是不进行module 编译，保留es6 模块语法

打包后目录按照 babel-plugin-import 的引用规范

打包后的 入口index.js，以及模块js 内用es2015模块语法引入模块

打包后的style。用style.js引入样式文件

## rollup

## webpack问题

babel 转义后 的是有副作用的

uglifyjs 不能判断代码块是否有副作用
