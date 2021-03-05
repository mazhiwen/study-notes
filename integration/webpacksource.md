# webpack原理

基于webpack官网教程  
本项目可直接用作webpack项目demo

[Webpack 原理浅析](https://juejin.cn/post/6854818576470933512)

<https://juejin.cn/post/6844903957769224206>

<https://juejin.cn/post/6844903573675835400#heading-8>

<https://juejin.cn/post/6844903582492426254>

<https://juejin.cn/post/6844903586942451726>

## plugin

<https://juejin.cn/post/6844903689442820110>

每一个 plugin Class 都必须实现一个 apply 方法，这个方法接收 compiler 实例，然后将真正的钩子函数挂载到 compiler.hook 的某一个声明周期上。

## loader

loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

处理一个文件可以使用多个loader，loader的执行顺序是和use字段声明的loader顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。

第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码

## loader和plugin区别

loader -》 plugin

loader对文件进行按照loader规则编译，plugin是在编译结束，生成最终文件之前

对于loader，它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程

plugin是一个扩展器，它丰富了wepack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。
