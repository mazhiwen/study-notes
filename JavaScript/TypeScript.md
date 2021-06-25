# TypeScript

本质上是向 JavaScript 增加静态类型系统

它是 JavaScript 的超集，所有现有的 JavaScript 都可以不加改变就在其中使用

<https://juejin.cn/post/6844904013289226254>

<https://blog.csdn.net/weixin_41643133/article/details/87883135?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161122217916780266283325%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=161122217916780266283325&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~hot_rank-1-87883135.pc_search_result_before_js&utm_term=webpack%20ts&spm=1018.2226.3001.4187>

<https://juejin.cn/post/6917523407886106631>

[1.2W字 | 了不起的 TypeScript 入门教程](https://juejin.cn/post/6844904182843965453)

[2021年与TypeScript愉快玩耍](https://juejin.cn/post/6917830695301677069#heading-15)

[从 JavaScript 到 TypeScript 6 - Vue 引入 TypeScript](https://tasaid.com/blog/20171011233132.html)

[Typescript在Vue中的实践](https://juejin.cn/post/6877373779471761416#heading-4)

[TypeScript + 大型项目实战](https://juejin.cn/post/6844903641829081095#heading-13)

<https://www.cnblogs.com/eedc/p/12166326.html>

## TS能做什么

首先TS的定位是静态类型语言，而不是类型检查器（对比flow）。从开发工具提供的能力看也不仅仅是类型检查，很直观的就是Intellisense over Compilation Error，当一段代码有问题（比如少写了字母）时，写完马上就会有红色波浪线提示，而不是等到编译的时候才告诉你哪一行有问题。因此使用TS提供的类型系统+静态分析检查+智能感知/提示，使大规模的应用代码质量更高，运行时bug更少，更方便维护。

## 泛型

因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。

```js
function identity<T>(arg: T): T {
    return arg;
}
```

## vue迁移ts

### ts-loader

### vue-property-decorator

需要安装 vue-class-component

### vue-shims.d.ts

### tsconfig配置

[typescript官网]<https://www.typescriptlang.org/tsconfig>

### 引入写上.vue后缀

而在代码中导入 *.vue 文件的时候，需要写上 .vue 后缀。原因还是因为 TypeScript 默认只识别*.ts 文件，不识别 *.vue 文件：

import Component from 'components/component.vue'
