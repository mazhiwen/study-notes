# tree-shaking

<https://webpack.docschina.org/guides/tree-shaking/>

<https://juejin.cn/post/6844903544760336398>

<https://juejin.cn/post/6901580077998276622>

webpack中实现的Tree-shaking

所谓Tree-shaking就是‘摇’的意思，作用是把项目中没必要的模块全部抖掉，用于在不同的模块之间消除无用的代码，可列为性能优化的范畴。

目前发现对node_modules 无效  

webpack4: webpack从第2版本就开始支持Tree-shaking的功能，但是至今也并不能实现的那么完美。凡是具有副作用的模块，webpack的Tree-shaking就歇菜了。

## 用法

### 引用的模块都是ES6规范

Tree-shaking是依赖ES6模块静态分析的（即 import 和 export），必然要保证引用的模块都是ES6规范的。比如： 引入的是lodash-es而不是lodash。

### sideEffects

在项目 package.json 文件中，添加一个 "sideEffects" 入口。

在package.json中定义某个模块sideEffect: false，说明了这个模块没有副作用。那么在引入这个模块，却没有使用它时，webpack 会自动把它 Tree Shaking 丢掉：

```js
"sideEffects": false

"sideEffects": [
  "./src/some-side-effectful-file.js"
]
```

### 配置minifier插件

必须引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

### 关闭babel转换

现在好像不需要

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

## 现行方案

百度： <https://juejin.cn/post/6844903777229635598>

尽量书写代码规范为纯函数

腾讯：<https://juejin.cn/post/6844903669100445710>

## webpack-deep-scope-analysis-plugin
