# 学习webpack
基于webpack官网教程  
本项目可直接用作webpack项目demo


## 配置

执行webpack默认获取webpack.config.js配置





***
## tree-shaking， 死代码 dead code ，按需加载
目前发现对node_modules 无效  
如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。  
"sideEffects": false  
如果你的代码确实有一些副作用，那么可以改为提供一个数组：
```
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}
```
[tree-shaking](https://webpack.docschina.org/guides/tree-shaking/)

注意：  
* 使用 ES2015 模块语法（即 import 和 export）  
* 在项目 package.json 文件中，添加一个 "sideEffects" 入口。  
* 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

## 启动webpack配置使用config 或者 dev,prod

### dev prod
```
"start": "webpack-dev-server --open --config webpack.dev.js",
"build": "webpack --config webpack.prod.js"
```
### config
```
"build": "webpack"
```


## webpack.optimization


### runtimeChunk

webpack运行时的代码
单独打包为一个chunk
runtimeChunk: {
  name: "manifest"
}

### SplitChunksPlugin

代码分离



1. 根据不同entry
配置多个entry可以实现分离



2. SplitChunksPlugin

https://juejin.im/post/5af1677c6fb9a07ab508dabb
https://segmentfault.com/a/1190000013476837
https://blog.51cto.com/13869008/2164811

相比CommonsChunkPlugin更支持深度的定制optimizations 优化
```javascript
module.exports = {
  //...默认配置
  optimization: {
    splitChunks: {
      // 默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      chunks: 'async',
      // 形成一个新代码块最小的体积 30k
      minSize: 30000,
      maxSize: 0,
      // 在分割之前，这个代码块最小应该被引用的次数
      minChunks: 1,
      // 按需加载时候最大的并行请求数
      maxAsyncRequests: 5,
      //  一个入口最大的并行请求数
      maxInitialRequests: 3,
      // 自动命名连接符 chunk链接符
      automaticNameDelimiter: '~',
      name: true,
      // cacheGroups会继承splitChunks配置
      cacheGroups: {
        vendors: {

          // name赋值时，打出的包命名为一个name包，
          // 没有赋值name 时，打出的包会根据各个组合包命名
          // name:"vendors",
          // 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
          test: /[\\/]node_modules[\\/]/,
          // 有时候需要自定义cachegroup的时候需要设置高值 才有效
          // 目前不清楚为什么
          // 因为不设置高值 默认配置并没有加载
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 可设置是否重用该chunk
          reuseExistingChunk: true
        }
      }
    }
  }
};

// 一般配置:
{
  cacheGroups: {
    // 打包nodemodule
    vendors: {
      name:"vendors",
      chunks:"all",
      // name赋值时，打出的包命名为一个name包，
      // 没有赋值name 时，打出的包会根据各个组合包命名
      // name:"vendors",
      test: /[\\/]node_modules[\\/]/,
      // 有时候需要自定义cachegroup的时候需要设置高值 才有效
      // 目前不清楚为什么
      // 因为不设置高值 默认配置并没有加载
      priority: 10
    },
    // 打包公用js
    common: {
      name:"common",
      chunks:"all",
      priority: 9,
      minChunks: 2,

    }
  }
}
```

***注意***:
- cacheGroups 里的每一项最好都要加上chunks参数，不然可能打包不出来你想要的东西。
- minSize 默认是30KB（注意这个体积是压缩之前的）在小于30kb的情况下一定要设置一个值，否则也可能打包不出来你想要的东西，而且这东西要加在cacheGroups里面。
- priority 在某些情况下，还是挺有用的，可以设置打包chunks的优先级。



3. 异步  动态引入 懒加载

SplitChunksPlugin 会对asyc import.then等动态分离动态chunk
```javascript
import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}).catch(error => 'An error occurred while loading the component');



async function getComponent() {
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
getComponent().then(component => {
  document.body.appendChild(component);
});



button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
  var print = module.default;
  print();
});

// 注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。
```

## mode 配置  



## 创建library
兼容es6 commonjs amd cmd


## shimming  

让 webpack 打包时自动发现关键的全局变量并自动的引入。它是一种隐性的全局变量。  

```
module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      Config: path.resolve(__dirname, '../src/utils/Config')
    }
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.ProvidePlugin({
      Config: "Config"
    }),
  ],
  module: {
  }
};
```

## devtool

此选项控制是否生成，以及如何生成 source map。

https://github.com/webpack/webpack/tree/master/examples/source-map


## devserver
```
webpack-dev-server 配置 devServer
webpack-dev-middleware 
```
https://juejin.im/entry/574f95922e958a00683e402d

## 代码检测
[eslint](https://github.com/webpack-contrib/eslint-loader)



## resolve

alias:{
  'vue': 'vue/dist/vue.esm.js',
  'api': path.resolve(__dirname, 'src/api')
}

import api from 'api';



## html-webpack-plugin


### 单页面

默认output将所有bundlejs 添加到生成的index.html

### 多页面配置 

在config多建立 plugin实例就可以

plugins: [
  new HtmlWebpackPlugin({
    chunks: ['app1js']
  }),
  new HtmlWebpackPlugin({
    chunks: ['app2js']
  })
]


## output

是html js 的output配置，主要是js



## ProvidePlugin
自动加载模块，而不必到处 import 或 require 。

```javascript
new webpack.ProvidePlugin({
  identifier: 'module1',
  // ...
});

```

任何时候，当 identifier 被当作未赋值的变量时，module 就会自动被加载，并且 identifier 会被这个 module 导出的内容所赋值。（或者被模块的 property 导出的内容所赋值，以支持命名导出(named export)）。

```javascript
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});
```