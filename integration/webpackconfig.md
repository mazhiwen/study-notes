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

- noparse

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

- rules

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

- optimization.minimizer 压缩

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

- runtimeChunk

webpack运行时的代码
单独打包为一个chunk
runtimeChunk: {
  name: "manifest"
}
runtime mainfest 是webpack用来管理所有模块的交互

- 根据不同entry

配置多个entry可以实现分离



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



## webpack-dev-server

把输出文件放内存 启动服务 监听更新编译

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

## 环境变量

webpack --env pro --env aa=bb 传入环境参数 再配置文件回调函数中获取参数

## output.publicPath



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


## output

是html js 的output配置，主要是js

- path

output.path只是指示输出的目录，对应一个绝对路径



- library相关

- library

libraryTarget

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

- 单页面

默认output将所有bundle 添加到生成的index.html

- 多页面配置

在config多建立 plugin实例就可以

plugins: [
  new HtmlWebpackPlugin({
    chunks: ['app1js']
  }),
  new HtmlWebpackPlugin({
    chunks: ['app2js']
  })
]

- template

ejs  

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


## SplitChunksPlugin



把公共代码抽离出来 


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

- chunks

选项，决定要提取那些模块。

默认是async：只提取异步加载的模块出来打包到一个文件中。

异步加载的模块：通过import('xxx')或require(['xxx'],() =>{})加载的模块。

initial：提取同步加载和异步加载模块，如果xxx在项目中异步加载了，也同步加载了，那么xxx这个模块会被提取两次，分别打包到不同的文件中。

同步加载的模块：通过 import xxx或require('xxx')加载的模块。

all：不管异步加载还是同步加载的模块都提取出来，打包到一个文件中。

- minChunks

选项：表示要被提取的模块最小被引用次数，引用次数超过或等于minChunks值，才能被提取。

- minSize

默认是30KB（注意这个体积是压缩之前的）在小于30kb的情况下一定要设置一个值，否则也可能打包不出来你想要的东西，而且这东西要加在cacheGroups里面。

- priority

方案的优先级，值越大表示提取模块时优先采用此方案。默认值为0。

- cacheGroups

里的每一项最好都要加上chunks参数，不然可能打包不出来你想要的东西。

reuseExistingChunk选项：true/false。为true时，如果当前要提取的模块，在已经在打包生成的js文件中存在，则将重用该模块，而不是把当前要提取的模块打包生成新的js文件。

priority同外面

##  动态导入 /  懒加载

动态导入/懒加载： 本质上是全部分开打包，运行时动态选择是否加载包体 

- import() 

推荐：ES6的 import() 按需加载

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

- 懒加载：

按需加载 

降低初始代码块，其他代码块在需要的时候再请求。

本质上是把不同代码块都分别打包，需要的时候再加载。

vue 异步组件

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

- require.ensure

webpack 的 异步加载

## 预取/预加载模块(prefetch/preload module)

prefetch: 将来某些导航下可能需要的资源。增加link prefetch

preload：当前导航下可能需要的资源。类似懒加载

```js
import(/* webpackPrefetch: true */ 'LoginModal');
```

## DllPlugin 提升构建速度

在webpack脚本命令输入参数，来控制是否刷新dll文件

dll文件后缀以打包时时间戳做后缀

当需要更新dll包时，打包命令输入相关开关，来控制刷新dll文件

也可以加入判断打包目录是否有dll文件

<https://juejin.cn/post/6844903951410659341>


## 如何提高webpack的打包速度

利用缓存：利用Webpack的持久缓存功能，避免重复构建没有变化的代码

使用多进程/多线程构建 ：使用thread-loader、happypack等插件可以将构建过程分解为多个进程或线程

使用DllPlugin和HardSourceWebpackPlugin： DllPlugin可以将第三方库预先打包成单独的文件，减少构建时间。HardSourceWebpackPlugin可以缓存中间文件，加速后续构建过程

使用Tree Shaking: 配置Webpack的Tree Shaking机制，去除未使用的代码，减小生成的文件体积

移除不必要的插件: 移除不必要的插件和配置，避免不必要的复杂性和性能开销

## 如何减少打包后的代码体积

代码分割（Code Splitting）：将应用程序的代码划分为多个代码块，按需加载

Tree Shaking：配置Webpack的Tree Shaking机制，去除未使用的代码

压缩代码：使用工具如UglifyJS或Terser来压缩JavaScript代码

使用生产模式：在Webpack中使用生产模式，通过设置mode: 'production'来启用优化

使用压缩工具：使用现代的压缩工具，如Brotli和Gzip，来对静态资源进行压缩

利用CDN加速：将项目中引用的静态资源路径修改为CDN上的路径，减少图片、字体等静态资源等打包


## 打包优化思路

优化思路：

1. 初次加载，优化为每个1m以内大小的5个包

2. 继续优化，可以把部分比较大的包，如700k的echarts ，放到不同域下的CDN，提升初次请求速度

3. 不需要初次加载的包，放到按需加载。如路由按需加载，动态组建按需加载

4. 把公共文件抽离出来，单独打包chunk，方便长期缓存

## 浏览器缓存文件

业务代码文件 通过文件名hash缓存


缓存第三方: splitchunkplugin: cachegroups




## tree-shaking

见 当前目录 tree-shaking 文件

## babel-loader

es6转为es5 以更多浏览器支持

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


## webpack构建流程

Webpack的构建流程主要包括以下几个步骤：

```
初始化参数。解析Webpack配置参数，合并Shell传入和webpack.config.js文件配置的参数，形成最终的配 置结果。

开始编译。使用上一次得到的参数初始化compiler对象，注册所有配置的插件，插件监听Webpack构建生命周期的事件节点，做出相应的反应，执行对象的run方法开始执行编译。

确定入口。从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去。

编译模块。递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。

完成模块编译。在经过第四步使用Loader翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。

输出资源。根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把每个Chunk转换成单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。

输出完成。在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
```

这个流程是一个串行的过程，Webpack的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来。在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条Webpack机制中，去改变Webpack的运作，使得整个系统扩展性良好。



## 模块 解析原理


webpack模块： 支持各种js模块化的模块原始模块是webpack模块，loader处理这些各类型模块化的模块转化后的模块也成为webpack模块

compiler: 描述webpack整个编译流程的对象



## modules

webpack对代码模块生成webpack可识别的模块，以及模块组，key-value形式存储

chunk 由 module 组成

## bundle

modules的拼接 

module -> chunk -> bundle

## loader

loader把依赖树中引入的资源先经过loader处理后，最终会返回js模式的引入模块。被依赖树引入。

loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

处理一个文件可以使用多个loader，loader的执行顺序是和use字段声明的loader顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。

第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码

如：sass-loader其实就是一个函数，根据test的匹配规则，将以.scss结束的文件内容读取出来，然后将匹配到的文件内容作为参数传递给一个函数，这个函数将sass文件的内容按照规则进行加工处理成浏览器能够识别的css并输出，所以loader的本质就是一个函数，接受一个参数，这个参数就是匹配到的文件里面的代码。同理，css-loader和style-loader也是这样的处理流程，只是内部做的事情不同。

- 实现

```js
// loader
// 将js文件中的 信息 换成 msg
module.exports = function (content) {
  return content.replace(/信息/g, 'msg')
}
```

loader的入口需要导出一个函数，这个函数要干的事情就是转换一个文件的内容。 函数接收的参数content是一个文件在转换前的字符串形式内容，需要返回一个新的字符串形式内容作为转换后的结果，所有通过模块化倒入的文件都会经过loader。从这里可以看出loader只能处理一个个单独的文件而不能处理代码块。想编写更复杂的loader可参考官方文档

## plugin


插件通过在webpack生命周期挂载任务函数实现功能

```
实现plugin需要:

1. 一个具名 JavaScript 函数。
2. 在它的原型上定义 apply 方法。
3. 指定一个触及到 webpack 本身的 事件钩子。
4. 操作 webpack 内部的实例特定数据。
5. 在实现功能后调用 webpack 提供的 callback。
```

```js
///////////////////////////编写插件
// 1. 一个JavaScript命名函数
// 2. 在插件函数的 prototype 上定义一个apply方法
class HelloWordPlugin {
  // 3. apply 中有一个 compiler 形参
  apply(compiler){
    console.log('插件执行了');
    // 4. 通过compiler对象可以注册对应的事件，全部的钩子都可以使用
    // 注册一个编译完成的钩子， 一般需要将插件名作为事件名即可
    compiler.hooks.done.tap('HelloWordPlugin', (stats) => {
      console.log('整个webpack打包结束了');
    })

    compiler.hooks.compilation.tap('HelloWordPlugin', (compilation) => {
      // 现在，通过 compilation 对象，我们可以 tap(触及) 到各种可用的 hooks 了
      compilation.hooks.optimize.tap('HelloWordPlugin', () => {
        console.log('正在优化资源。');
      });
    })
  }
}

module.exports = HelloWordPlugin
```

```js
//////////////////////////// webapck使用插件
// webpack.config.js
var HelloWorldPlugin = require('hello-world');

module.exports = {
  // ... 这里是其他配置 ...
  plugins: [new HelloWorldPlugin({ options: true })]
};

```

## 同步与异步的插件钩子

根据所使用的 钩子(hook) 和 tap 方法，插件可以以多种不同的方式运行。

同步类型，用 tap()

异步类型的事件钩子，用tapAsync tapPromise：

```
tapAsync:执行callback()

tapPromise:返回promise
```

## Compiler 和 Compilation 的区别

compile: 从webpack启动到退出只存在一个Compiler，Compiler存放着webpack配置

compilation: 由于webpack的监听文件变化自动编译机制，Compilation代表一次编译。

具体这两个实例的内部api现在还没找到全面的文档

## plugin的事件钩子列表

相关内容在官方文档 api目录查看

## loader和plugin区别


loader是在引入资源时处理，而plugin应用范围更广，涉及整个webpack周期

对于loader，它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程。 

plugin是一个扩展器，它丰富了wepack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。



## 选择loader 还是 plugin

如果你的扩展是想对一个个单独的文件进行转换那么就编写loader剩下的都是plugin。

## AST

就是将一行代码解析成对象的格式

## tabable

在webpack内部实现事件流机制的核心就在于tapable，有了它就可以通过事件流的形式，将各个插件串联起来，tapable类似于node中的events库，核心原理就是一个订阅发布模式


## tree-shaking


tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。这个术语和概念实际上是由 ES2015 模块打包工具 rollup 普及起来的。

所谓Tree-shaking就是‘摇’的意思，作用是把项目中没必要的模块全部抖掉，用于在不同的模块之间消除无用的代码，可列为性能优化的范畴。

## 什么是有副作用

有副作用： 例如，函数修改外部参数。被认为有副作用，不能删除

一个文件有副作用表示：会影响全局，不会对他进行treeshaking，也就是这种有副作用的文件，即使没有被引用，打包也会打包进去

## webpack1-4 的 treeshaking 问题

对node_modules 不支持的无效  

webpack4: webpack从第2版本就开始支持Tree-shaking的功能，但是至wp4也并不能实现的那么完美。凡是具有副作用的模块，webpack的Tree-shaking就歇菜了。也就是webpack摇不掉有副作用的，但是没有被引用的代码

## webpack treeshaking 新用法

### 1.语法：需要引用的模块都是ES6规范

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

