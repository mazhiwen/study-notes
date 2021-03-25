# rollup

[关于Rollup那些事](https://juejin.cn/post/6844903596970999815)

[一文带你快速上手Rollup](https://juejin.cn/post/6869551115420041229)

## Tree Shaking

ES6 module特性使得ES6 Modules缺少了一定的灵活性，但使得所有的依赖都是确定的，能够对代码进行静态分析。不需要依靠运行时去确定依赖关系。

## 导入 CommonJS(Importing CommonJS)

Rollup 可以通过插件导入已存在的 CommonJS 模块。转为可以treeshaking的es6

rollup.js编译源码中的模块引用默认只支持 ES6+的模块方式import/export。然而大量的npm模块是基于CommonJS模块方式，这就导致了大量 npm模块不能直接编译使用。

因此使得rollup.js编译支持npm模块和CommonJS模块方式的插件就应运而生：@rollup/plugin-commonjs。

## webpack与rollup

与Webpack偏向于应用打包的定位不同，rollup.js更专注于Javascript类库打包。

总体来说webpack和rollup在不同场景下，都能发挥自身优势作用。webpack对于代码分割和静态资源导入有着“先天优势”，并且支持热模块替换(HMR)，而rollup并不支持。

rollup对于代码的Tree-shaking和ES6模块有着算法优势上的支持，若你项目只需要打包出一个简单的bundle包，并是基于ES6模块开发的，可以考虑使用rollup。
