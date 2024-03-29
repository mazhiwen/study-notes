# Web Components

[五分钟带你了解 Web Components](https://juejin.cn/post/7144888332575571981)

[哈啰前端Web Components最佳实践](https://juejin.cn/post/7044055764532461605)

## 库

并且在市场上也出现了很多 Web Components 库，可以轻松的使用和构建 Web Components，例如：

```
hybrids： 是一个 JavaScript UI 框架，用于创建功能齐全的 Web 应用程序、组件库或具有独特的混合声明性和功能性架构的单个 Web Components。

LitElement： 是一个简单的基类，用于使用 lit-html 创建快速、轻量级的 Web Components。

Polymer ：是 Google 推出的 Web Components 库，支持数据的单向和双向绑定，兼容性较好，跨浏览器性能也较好；提供了一组用于创建 custom elements 的功能。这些功能旨在使 custom elements 像标准 DOM 元素一样工作更容易和更快。

X-Tag： 是微软推出的开源库，支持 Web Components 规范，兼容Web Components API。

Slim.js： 是一个开源的轻量级 Web Components 库，它为组件提供数据绑定和扩展能力，使用 es6 原生类继承。专注于帮助开发者更好的编写原生web组件，而不依赖于其他框架，但是也提供了良好的拓展性，开发者可以自由拓展。

Stencil： 是一个用于构建可重用、可扩展的设计系统的工具链。生成可在每个浏览器中运行的小型、极快且 100% 基于标准的 Web Components。

Omi： 是 Web Components + JSX/TSX 融合为一个框架，小巧的尺寸和高性能，融合和 React 和 Web Components 各自的优势。
```

## Web Components 的限制

虽然 Web Components 有着巨大的优势，但是也存在一些限制，如果你正在使用它，那请注意了。例如：

Web Components 提供的 CSS 封装是有限。
虽然能实现 CSS 的隔离，但是隔离也会导致和外部 CSS 交互比较难。
Object.prototype.toString不返回与原生对象相同的字符串。
document 、 window、 document.body、 document.head是不可配置的，不能被覆盖。
未实现跨窗口/框架访问。
CSS:host()规则在其参数选择器中只能（最多）有一层嵌套括号。例如，:host(.zot)两者:host(.zot:not(.bar))都有效，但:host(.zot:not(.bar:nth-child(2)))没有。

## WCs的用途

组件库，跨端，微前端
