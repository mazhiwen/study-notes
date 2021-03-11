# webpack原理

基于webpack官网教程  
本项目可直接用作webpack项目demo

[Webpack 原理浅析](https://juejin.cn/post/6854818576470933512)

[webpack原理](https://juejin.cn/post/6844903957769224206)

[webpack原理](https://imweb.io/topic/59324940b9b65af940bf58ae)

<https://juejin.cn/post/6844903573675835400#heading-8>

<https://juejin.cn/post/6844903582492426254>

<https://juejin.cn/post/6844903586942451726>

## 编译入口流程

获取到index.js的文件内容之后，并不能直接使用，需要通过将其解析成抽象语法树进行处理，需要使用一个插件@babel/parser将模块代码解析成AST，然后插件@babel/traverse配合着使用，将AST的节点进行替换，替换完成之后，使用插件@babel/generator将AST转换成模块的原有代码，改变的只是将require变成__webpack_require__，需要注意的是需要将路径处理一下，因为此时的路径是相对于src下面的。处理完index之后需要递归调用处理全部的模块，并声称bundle中自执行函数的参数modules

## modules

webpack对代码模块生成webpack可识别的模块，以及模块组，key-value形式存储

## bundle

modules的拼接

## loader

loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

处理一个文件可以使用多个loader，loader的执行顺序是和use字段声明的loader顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。

第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码

如：sass-loader其实就是一个函数，根据test的匹配规则，将以.scss结束的文件内容读取出来，然后将匹配到的文件内容作为参数传递给一个函数，这个函数将sass文件的内容按照规则进行加工处理成浏览器能够识别的css并输出，所以loader的本质就是一个函数，接受一个参数，这个参数就是匹配到的文件里面的代码。同理，css-loader和style-loader也是这样的处理流程，只是内部做的事情不同。

### 实现

```js
// loader
// 将js文件中的 信息 换成 msg
module.exports = function (content) {
  return content.replace(/信息/g, 'msg')
}
```

loader的入口需要导出一个函数，这个函数要干的事情就是转换一个文件的内容。 函数接收的参数content是一个文件在转换前的字符串形式内容，需要返回一个新的字符串形式内容作为转换后的结果，所有通过模块化倒入的文件都会经过loader。从这里可以看出loader只能处理一个个单独的文件而不能处理代码块。想编写更复杂的loader可参考官方文档

## plugin

<https://juejin.cn/post/6844903689442820110>

[官方插件文档](https://v4.webpack.docschina.org/contribute/writing-a-plugin/)

插件能够 钩入(hook) 到在每个编译(compilation)中触发的所有关键事件。在编译的每一步，插件都具备完全访问 compiler 对象的能力，如果情况合适，还可以访问当前 compilation 对象。

```
实现plugin需要:

1. 一个具名 JavaScript 函数。
2. 在它的原型上定义 apply 方法。
3. 指定一个触及到 webpack 本身的 事件钩子。
4. 操作 webpack 内部的实例特定数据。
5. 在实现功能后调用 webpack 提供的 callback。
```

### apply方法

每一个 plugin Class 都必须实现一个 apply 方法，这个方法接收 compiler 实例，然后将真正的钩子函数挂载到 compiler.hook 的某一个声明周期上。

插件是由一个构造函数（此构造函数上的 prototype 对象具有 apply 方法）的所实例化出来的。这个 apply 方法在安装插件时，会被 webpack compiler 调用一次apply

### 例子

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

## 插件异步钩子

根据所使用的 钩子(hook) 和 tap 方法，插件可以以多种不同的方式运行。

### 异步类型的事件钩子

tapAsync:执行callback()

tapPromise:返回promise

## Compiler 和 Compilattion 的区别

compile: 从webpack启动到退出只存在一个Compiler，Compiler存放着webpack配置

compilation: 由于webpack的监听文件变化自动编译机制，Compilation代表一次编译。

## plugin的事件钩子列表

官方文档 api目录查看

## loader和plugin区别

loader -》 plugin

loader对文件进行按照loader规则编译，plugin是在编译结束，生成最终文件之前

对于loader，它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程

plugin是一个扩展器，它丰富了wepack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。

19 * 14 = 26.6

23 * 14 = 32.2

## 选择loader 还是 plugin

如果你的扩展是想对一个个单独的文件进行转换那么就编写loader剩下的都是plugin。

## AST

就是将一行代码解析成对象的格式

## tabable

在webpack内部实现事件流机制的核心就在于tapable，有了它就可以通过事件流的形式，将各个插件串联起来，tapable类似于node中的events库，核心原理就是一个订阅发布模式
