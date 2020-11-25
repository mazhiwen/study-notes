# DOM标准

DOM 全称是 Document Object Model，也就是文档对象模型。

DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

DOM 是为了操作文档出现的 API，document 是其的一个对象；

官方文档:

<https://dom.spec.whatwg.org/>

***

## Node

**NodeList**

<https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/item>

### Node.nextSibling

是一个只读属性，返回其父节点的 childNodes 列表中紧跟在其后面的节点，如果指定的节点为最后一个节点，则返回 null。

就是相邻的下一个节点

### Node.insertBefore()

```js
var insertedNode = parentNode.insertBefore(newNode, referenceNode);
```

parentNode： 新插入节点的父节点

newNode： 用于插入的节点

referenceNode ： newNode 将要插在这个节点之前

在参考节点之前插入一个拥有指定父节点的子节点。

如果给定的子节点是对文档中现有节点的引用，insertBefore() 会将其从当前位置移动到新位置（在将节点附加到其他节点之前，不需要从其父节点删除该节点）。

## document

当浏览器下载到一个网页，通常是 HTML，这个 HTML 就叫 document（当然，这也是 DOM 树中的一个 node），从上图可以看到，document 通常是整个 DOM 树的根节点。这个 document 包含了标题（document.title）、URL（document.URL）等属性，可以直接在 JS 中访问到。

在一个浏览器窗口中可能有多个 document，例如，通过 iframe 加载的页面，每一个都是一个 document。

### document.createElement

<https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement>

返回ELement
