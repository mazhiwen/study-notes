# webpack原理

基于webpack官网教程  
本项目可直接用作webpack项目demo

[Webpack 原理浅析](https://juejin.cn/post/6854818576470933512)

[webpack原理](https://juejin.cn/post/6844903957769224206)

<https://juejin.cn/post/6844903573675835400#heading-8>

<https://juejin.cn/post/6844903582492426254>

<https://juejin.cn/post/6844903586942451726>

## 编译入口流程

获取到index.js的文件内容之后，并不能直接使用，需要通过将其解析成抽象语法树进行处理，需要使用一个插件@babel/parser将模块代码解析成AST，然后插件@babel/traverse配合着使用，将AST的节点进行替换，替换完成之后，使用插件@babel/generator将AST转换成模块的原有代码，改变的只是将require变成__webpack_require__，需要注意的是需要将路径处理一下，因为此时的路径是相对于src下面的。处理完index之后需要递归调用处理全部的模块，并声称bundle中自执行函数的参数modules

## modules

webpack对代码模块生成webpack可识别的模块，以及模块组，key-value形式存储

## bundle

## loader

loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

处理一个文件可以使用多个loader，loader的执行顺序是和use字段声明的loader顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。

第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码

如：sass-loader其实就是一个函数，根据test的匹配规则，将以.scss结束的文件内容读取出来，然后将匹配到的文件内容作为参数传递给一个函数，这个函数将sass文件的内容按照规则进行加工处理成浏览器能够识别的css并输出，所以loader的本质就是一个函数，接受一个参数，这个参数就是匹配到的文件里面的代码。同理，css-loader和style-loader也是这样的处理流程，只是内部做的事情不同。

## plugin

<https://juejin.cn/post/6844903689442820110>

每一个 plugin Class 都必须实现一个 apply 方法，这个方法接收 compiler 实例，然后将真正的钩子函数挂载到 compiler.hook 的某一个声明周期上。

### 注意 Compiler 和 Compilattion 的区别

compile: compile对象表示不变的webpack环境，是针对webpack的

compilation: compilation对象针对的是随时可变的项目文件，只要文件有改动，compilation就会被重新创建

## loader和plugin区别

loader -》 plugin

loader对文件进行按照loader规则编译，plugin是在编译结束，生成最终文件之前

对于loader，它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程

plugin是一个扩展器，它丰富了wepack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。

19 * 14 = 26.6

23 * 14 = 32.2
