# tree-shaking

webpack中实现的Tree-shaking

所谓Tree-shaking就是‘摇’的意思，作用是把项目中没必要的模块全部抖掉，用于在不同的模块之间消除无用的代码，可列为性能优化的范畴。

目前发现对node_modules 无效  

webpack4: webpack从第2版本就开始支持Tree-shaking的功能，但是至今也并不能实现的那么完美。凡是具有副作用的模块，webpack的Tree-shaking就歇菜了。

## 用法

### 1.引用的模块都是ES6规范

Tree-shaking是依赖ES6模块静态分析的（即 import 和 export），必然要保证引用的模块都是ES6规范的。比如： 引入的是lodash-es而不是lodash。

### 2.sideEffects 属性

在项目 package.json 文件中，添加一个 "sideEffects" 入口。

还可以在 module.rules 配置选项 中设置 "sideEffects"

- 没有副作用

表示哪些文件文件 -》没有副作用 -》 也就是可以被 treeshaking 删除

sideEffect: false 表示全部没有副作用

```js
"sideEffects": false
```

- 有副作用

一个文件有副作用表示：会影响全局，不可以对他进行 treeshaking

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
