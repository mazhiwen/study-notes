# tree-shaking

[你的Tree-Shaking并没什么卵用](https://zhuanlan.zhihu.com/p/32831172)

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。这个术语和概念实际上是由 ES2015 模块打包工具 rollup 普及起来的。

所谓Tree-shaking就是‘摇’的意思，作用是把项目中没必要的模块全部抖掉，用于在不同的模块之间消除无用的代码，可列为性能优化的范畴。

## 什么是有副作用

有副作用： 例如，函数修改外部参数。被认为有副作用，不能删除

一个文件有副作用表示：会影响全局，不会对他进行treeshaking，也就是这种有副作用的文件，即使没有被引用，打包也会打包进去

## webpack1-4 的 treeshaking 问题

对node_modules 不支持的无效  

webpack4: webpack从第2版本就开始支持Tree-shaking的功能，但是至wp4也并不能实现的那么完美。凡是具有副作用的模块，webpack的Tree-shaking就歇菜了。也就是webpack摇不掉有副作用的，但是没有被引用的代码

## webpack treeshaking 新用法

### 1.需要引用的模块都是ES6规范

Tree-shaking是依赖ES6模块静态分析的（即 import 和 export），必然要保证引用的模块都是ES6规范的。比如： 引入的是lodash-es而不是lodash。

### 2.配置sideEffects 属性

在项目 package.json 文件中，添加一个 "sideEffects" 入口。还可以在 module.rules 配置选项 中设置 "sideEffects"

如果被标记为无副作用的模块没有被直接导出使用，打包工具会跳过进行模块的副作用分析评估。”。

- 没有副作用

表示哪些文件文件 -》没有副作用 -》 也就是这种文件如果没有被引用，可以被 treeshaking 删除，不会打包进去

sideEffect: false 表示全部没有副作用。

```js
"sideEffects": false
```

- 有副作用

sideEffect: [] 。数组表示 有副作用的文件

注意这个文件地址，写的是最终被引用的文件。而不是入口

```js
"sideEffects": [
  "./src/some-side-effectful-file.js"
]
```

### 3.mode: production

mode: production情况下

需要开启配置minifier插件

必须引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

### 4.关闭babel转换

目前 @babel/preset-env 是默认的，默认是false

在项目中，要把babel设置module: false，禁止 babel将 es6 module 转为CommonJS规范。

```js
// 使用以下好像不影响 treeshaking 
[
  "@babel/preset-env",
  {
    "modules": false
  }
],
```

## 参考方案

<https://juejin.cn/post/6844903544760336398>

<https://juejin.cn/post/6901580077998276622>

百度： <https://juejin.cn/post/6844903777229635598>

尽量书写代码规范为纯函数

腾讯：<https://juejin.cn/post/6844903669100445710>

## webpack-deep-scope-analysis-plugin
