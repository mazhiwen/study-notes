# 配置

基于webpack官网教程  
本项目可直接用作webpack项目demo

[带你深度解锁Webpack系列(进阶篇)](https://juejin.cn/post/6844904084927938567#heading-0)

<https://juejin.cn/post/6844903782581534727#heading-22>

## webbpack命令

### 输出打包到json文件

```
--json > webpack_build_log.json
```

### 地址路径问题

webpack配置中字符串格式的 路径'' 一般是以webpack执行命令的路径 ，pkgjson路径;

### 配置文件

执行webpack默认获取webpack.config.js配置

启动webpack配置使用config 或者 dev,prod

## webpack模块解析规则 import规则

<https://v4.webpack.docschina.org/concepts/module-resolution/>

工作机制

前提是你在做web开发，试图用webpack或者rollup打包你的项目；

首先会从本地的node_modules文件夹中找到vue文件夹，看是否存在package.json文件；

如果找到了package.json，就会先找module字段，然后读取对应的路径下的文件，查找到此结束；

如果没找到module字段，就会找main字段，然后读取对应的路径下的文件，查找到此结束；

如果没有main字段，就会在vue文件夹下找index.js文件，然后读取文件，查找到此结束；

如果以上都没找到就会返回异常，扔出not find异常

如果不存在package.json就会找index.js文件，然后读取文件，查找到此结束；如果还没有就会抛出异常；

### dev prod

```
"start": "webpack-dev-server --open --config webpack.dev.js",
"build": "webpack --config webpack.prod.js"
```

### config

```
"build": "webpack"
```

## module

### noparse

module.noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析处理

```js
{
  module: {
    noParse: (content) => {
      console.log(1111, content, /oparse/.test(content), content.includes('noparse'));
      return /oparse/.test(content);
    },
  }
}
```

### rules

rules: exclude优先级高于test和include

```js
rules: [
  {
    test: /\.js$/,
    // exclude: /(node_modules|bower_components)/,
    include: /(node_modules\/vue-editor-mar|src)/,
    use: {
      loader: 'babel-loader',
      options: {
        rootMode: 'upward',
      },
    },
  },
  // 处理资源路径
  {
    test: /\.(png|svg|jpg|gif|woff|ttf|eot)$/,
    // use: ['file-loader']
    // 可以用fileloader 和 urlloader
    // urlloader 将limit大小的文件转为dataurl
    // 超过则配置默认file-loader
    oneOf: [
      {
        // resourceQuery: /external/, // foo.css?external
        include: [
          path.resolve(__dirname, '../src/static'),
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'static/',
            publicPath: 'static/',
          },
        },
      },
      {
        use: [{
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
          },
        }],
      },
    ],
  },
]
```

## optimization

### minimizer

```js
minimizer: [
  new TerserPlugin({
    // 是对chunk进行压缩
    chunkFilter: (chunk) => {
      // Exclude uglification for the `SYSOUTCONFIG` chunk
      if (chunk.name === 'SYSOUTCONFIG') {
        return false;
      }
      return true;
    },
  }),
],
```

### runtimeChunk

webpack运行时的代码
单独打包为一个chunk
runtimeChunk: {
  name: "manifest"
}
runtime mainfest 是webpack用来管理所有模块的交互

### 根据不同entry

配置多个entry可以实现分离

### 预取/预加载模块(prefetch/preload module)

```js
import(/* webpackPrefetch: true */ 'LoginModal');
```

## shimming resolve

让 webpack 打包时自动发现关键的全局变量并自动的引入。它是一种隐性的全局变量。  

```js
module.exports = {
  resolve: {
    // 配置默认import index的文件扩展名
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

<https://github.com/webpack/webpack/tree/master/examples/source-map>

## resolve

```js
resolve: {
  alias:{
    'vue': 'vue/dist/vue.esm.js',
    'api': path.resolve(__dirname, 'src/api')
  }
}
```

import api from 'api';

## output

是html js 的output配置，主要是js

### path

output.path只是指示输出的目录，对应一个绝对路径

### publicPath

指定在输出html文件中，资源的引用src地址前缀。结合资源路径可拼接成实际访问url。

默认值是""

```
配置：
publicPath: "/assets/",
chunkFilename: "[id].chunk.js"

实际资源请求：/assets/4.chunk.js
对应的html中资源引用地址： <link href="/assets/spinner.gif" />
对应css加载图片：background-image: url(/assets/spinner.gif);

```

例子：

```js
publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
publicPath: "/assets/", // 相对于服务(server-relative)
publicPath: "assets/", // 相对于 HTML 页面
publicPath: "../assets/", // 相对于 HTML 页面
publicPath: "", // 相对于 HTML 页面（目录相同）
```

自由变量：

```__webpack_public_path__```

### library相关

#### library

#### libraryTarget

libraryTarget: 'var' - （默认值）

当 library 加载完成，入口起点的返回值将分配给一个变量：

当使用此选项时，将 output.library 设置为空，会因为没有变量导致无法赋值。

通过在对象上赋值暴露:

如

```js
// libraryTarget: 'window'

//
window['MyLibrary'] = _entry_return_;
window.MyLibrary.doSomething();
```

模块定义系统:

1. libraryTarget: 'commonjs2'

入口起点的返回值将分配给 module.exports 对象。这个名称也意味着模块用于 CommonJS 环境：

```js
module.exports = _entry_return_;
require('MyLibrary').doSomething();
```

注意，output.library 会被省略，因此对于此特定的 output.libraryTarget，无需再设置 output.library 。

2. libraryTarget: 'amd'

将你的 library 暴露为 AMD 模块。

```js
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'amd'
  }
};

//output文件
define('MyLibrary', [], function() {
  return _entry_return_;
});
//如果output.library未定义，则如下生成
define([], function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});

// 引用
require(['MyLibrary'], function(MyLibrary) {
  // 使用 library 做一些事……
});
```

3. libraryTarget: 'umd'

将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。了解更多请查看 UMD 仓库。

```js
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'umd'
  }
};

//output
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')//commonjs
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)//amd
    define([], factory);
  else if(typeof exports === 'object')//commonjs
    exports['MyLibrary'] = factory();
  else
    root['MyLibrary'] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});


```

## import中间件

```js
a.js
import {paramaterA} from "config.js"
paramaterA=2;

b.js
import {paramaterA} from "config.js"
console.log(paramaterA);
// 此处会对a.js变更做出响应
```

## externals

防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。  
例如：cdn

```js
// 1. html script引入
// 2.webpack
externals: {
  jquery: 'jQuery'
}
// 3.js引用
import $ from 'jquery';

$('.my-element').animate(...);
```

## html-webpack-plugin

### 单页面

默认output将所有bundle 添加到生成的index.html

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

### template

- ejs  
rule配置ejsloader
{
  test: /\.ejs$/,
  loader: 'ejs-loader',
  query: {

  },
},

ejsloader采用lodash.template编译函数的规则

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

## mini-css-extract-plugin

## webpack-dev-middleware

<https://juejin.im/entry/574f95922e958a00683e402d>

## SplitChunksPlugin

<https://juejin.im/post/5af1677c6fb9a07ab508dabb>
<https://segmentfault.com/a/1190000013476837>
<https://blog.51cto.com/13869008/2164811>

<https://juejin.cn/post/6844904198023168013#heading-1>

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

### chunks

选项，决定要提取那些模块。

默认是async：只提取异步加载的模块出来打包到一个文件中。

异步加载的模块：通过import('xxx')或require(['xxx'],() =>{})加载的模块。

initial：提取同步加载和异步加载模块，如果xxx在项目中异步加载了，也同步加载了，那么xxx这个模块会被提取两次，分别打包到不同的文件中。

同步加载的模块：通过 import xxx或require('xxx')加载的模块。

all：不管异步加载还是同步加载的模块都提取出来，打包到一个文件中。

### minChunks

选项：表示要被提取的模块最小被引用次数，引用次数超过或等于minChunks值，才能被提取。

### minSize

默认是30KB（注意这个体积是压缩之前的）在小于30kb的情况下一定要设置一个值，否则也可能打包不出来你想要的东西，而且这东西要加在cacheGroups里面。

### priority

方案的优先级，值越大表示提取模块时优先采用此方案。默认值为0。

### cacheGroups

里的每一项最好都要加上chunks参数，不然可能打包不出来你想要的东西。

reuseExistingChunk选项：true/false。为true时，如果当前要提取的模块，在已经在打包生成的js文件中存在，则将重用该模块，而不是把当前要提取的模块打包生成新的js文件。

priority同外面

## 异步加载 按需加载 懒加载

[webpack的异步加载原理及分包策略](https://juejin.cn/post/6895546761255845901)

### vue 异步组件

vue路由懒加载:

这种方法主要是使用了 resolve 的异步机制，用 require 代替了 import 实现按需加载

```js
export default new Router({
  routes: [
    {
      path: '/home',',
      component: (resolve) => require(['@/components/home'], resolve),
    },
    {
      path: '/about',',
      component: (resolve) => require(['@/components/about'], resolve),
    },
  ],
})
```

### webpack 的 require.ensure 异步加载

### 最新的推荐：ES6的 import() 按需加载

```js
export default new Router({
  routes: [
    {
      path: '/home',
      component: () => import('@/components/home'),
    },
    {
      path: '/about',
      component: () => import('@/components/home'),
    },
  ],
})
```

SplitChunksPlugin 会对asyc import().then等动态分离动态chunk

```javascript
import().then((module)=>{

})
```

用法：

```js
// then写法
import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
  var element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}).catch(error => 'An error occurred while loading the component');

//async写法
async function getComponent() {
  const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
getComponent().then(component => {
  document.body.appendChild(component);
});
```

例子：

两个按钮分别触发不同事件.

生成两个按需加载的js文件，需要时加载对应js

```js
document.getElementById('aBtn').onclick = function () {
  //异步加载A.js
  import(/* webpackChunkName: "A" */ './A').then((data) => {
    alert(data.A)
  })
}

document.getElementById('bBtn').onclick = function () {
  //异步加载B.js
  import(/* webpackChunkName: "B" */ './B').then((data) => {
    alert(data.B)
  })
}
// 注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。
```

## DllPlugin 提升构建速度

在webpack脚本命令输入参数，来控制是否刷新dll文件

dll文件后缀以打包时时间戳做后缀

当需要更新dll包时，打包命令输入相关开关，来控制刷新dll文件

也可以加入判断打包目录是否有dll文件

<https://juejin.cn/post/6844903951410659341>

## 打包优化思路

优化思路：

1. 初次加载，优化为每个1m以内大小的5个包

2. 继续优化，可以把部分比较大的包，如700k的echarts ，放到不同域下的CDN，提升初次请求速度

3. 不需要初次加载的包，放到按需加载。如路由按需加载，动态组建按需加载

4. 把公共文件抽离出来，单独打包chunk，方便长期缓存

## 代码检测

[eslint](https://github.com/webpack-contrib/eslint-loader)

## tree-shaking

见 当前目录 tree-shaking 文件

## babel-loader

cacheDirectory 选项可以提升编译速度。

会将转译的结果缓存到文件系统中。之后的编译会尝试读取缓存。

```js
{
  test: /\.js$/,
  use: 'babel-loader?cacheDirectory',
  include: [resolve('src'), resolve('test') ,resolve('node_modules/webpack-dev-server/client')]
}
```

## HardSourceWebpackPlugin

优化打包速度

## HtmlWebpackPlugin

```js
new HtmlWebpackPlugin({
  // 如果设置了templeta 则tile等可能以template配置为主
  // title: 'marjovenprogram',
  // template html 模版html
  // 可以使用ejs jade 等template,需要配置对应loader
  //  详情查看HtmlWebpackPlugin官方
  // template: './index.html',
  template: path.resolve(__dirname, './index.ejs'),
  // ejs template参数
  // 参数可以在ejs文件中以es template字符 :${title}
  // 或者其他查看lodash template相关配置
  templateParameters: {
    title: '系统',
  },
}),
```

## CopyWebpackPlugin

```js
new CopyWebpackPlugin([
  // {
  //   from: './webpackConfig/public/*',
  //   to: path.resolve(__dirname, '../dist'),
  //   flatten: true,
  // },
]),
```

## HtmlWebpackTagsPlugin

```js
new HtmlWebpackTagsPlugin({
  // 生产环境开启这个选项 并且配置path 为 cdn地址
  // usePublicPath: false,
  // path: 'http://cdn.test/echarts.min.js',
  tags: [
    // {
    //   path: 'echarts.min.js',
    // },
  ],
  append: false,
}),
```

## VueLoaderPlugin

```js
// vueloader需要的plugin
// 相关options选项:
// https://vue-loader.vuejs.org/zh/options.html#transformasseturls
new VueLoaderPlugin(),
```

## DllReferencePlugin

```js
// dllplugin 搭配 build:dll
// html 加下面脚本
// <script type="text/javascript" src="./vendor.dll.js"></script>
new webpack.DllReferencePlugin({
  manifest: require('../dist/vendor-manifest.json'),
}),
```

## webpack优化

[【webpack 性能优化】编译速度从 50S 到 7S](https://juejin.cn/post/6887863430510968839#heading-0)

<https://juejin.cn/post/6877354359940874254#heading-4>

<https://juejin.cn/post/6844903782581534727#heading-26>
