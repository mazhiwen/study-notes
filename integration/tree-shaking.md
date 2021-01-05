# tree-shaking

<https://webpack.docschina.org/guides/tree-shaking/>

<https://juejin.cn/post/6844903544760336398>

<https://juejin.cn/post/6901580077998276622>

webpack中实现的Tree-shaking

所谓Tree-shaking就是‘摇’的意思，作用是把项目中没必要的模块全部抖掉，用于在不同的模块之间消除无用的代码，可列为性能优化的范畴。

目前发现对node_modules 无效  

webpack4: webpack从第2版本就开始支持Tree-shaking的功能，但是至今也并不能实现的那么完美。凡是具有副作用的模块，webpack的Tree-shaking就歇菜了。

## 用法注意  

Tree-shaking是依赖ES6模块静态分析的（即 import 和 export），必然要保证引用的模块都是ES6规范的。比如： 引入的是lodash-es而不是lodash。

在项目 package.json 文件中，添加一个 "sideEffects" 入口。  

必须引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

在项目中，注意要把babel设置module: false，避免babel将模块转为CommonJS规范。

引入的模块包，也必须是符合ES6规范，并且在最新的webpack中加了一条限制，即在package.json中定义sideEffect: false，这也是为了避免出现import xxx导致模块内部的一些函数执行后影响全局环境，却被去除掉的情况。

## 现行方案

百度： <https://juejin.cn/post/6844903777229635598>

尽量书写代码规范为纯函数

腾讯：<https://juejin.cn/post/6844903669100445710>

## webpack-deep-scope-analysis-plugin
