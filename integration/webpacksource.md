# webpack原理



## 编译入口以及流程

获取到index.js的文件内容之后，并不能直接使用，需要通过将其解析成抽象语法树进行处理，需要使用一个插件@babel/parser将模块代码解析成AST，然后插件@babel/traverse配合着使用，将AST的节点进行替换，替换完成之后，使用插件@babel/generator将AST转换成模块的原有代码，改变的只是将require变成__webpack_require__，需要注意的是需要将路径处理一下，因为此时的路径是相对于src下面的。处理完index之后需要递归调用处理全部的模块，并声称bundle中自执行函数的参数modules


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
