学习webpack,基于webpack官网教程




### tree-shaking 死代码 dead code

目前发现对node_modules 无效
如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。
"sideEffects": false
如果你的代码确实有一些副作用，那么可以改为提供一个数组：

{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}

https://webpack.docschina.org/guides/tree-shaking/

注意：

1.使用 ES2015 模块语法（即 import 和 export）
2.在项目 package.json 文件中，添加一个 "sideEffects" 入口。
3.引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

### 使用config 或者 dev prod

#### dev prod

"start": "webpack-dev-server --open --config webpack.dev.js",
"build": "webpack --config webpack.prod.js"

#### config

"build": "webpack"

### 代码分离

#### 同步

webpack.optimize.SplitChunksPlugin

#### 异步 

import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}).catch(error => 'An error occurred while loading the component');

OR

async function getComponent() {
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
getComponent().then(component => {
  document.body.appendChild(component);
});


### 懒加载

button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
  var print = module.default;
  print();
});

注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。


### mode 配置



### 创建library

兼容es6 commonjs amd cmd


### shimming

new webpack.ProvidePlugin({
  _: 'lodash'
  //join: ['lodash', 'join']
})


### devtool

此选项控制是否生成，以及如何生成 source map。

https://github.com/webpack/webpack/tree/master/examples/source-map


### devserver

webpack-dev-server 配置 devServer

webpack-dev-middleware 

https://juejin.im/entry/574f95922e958a00683e402d