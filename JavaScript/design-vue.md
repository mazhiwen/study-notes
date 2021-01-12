
# 设计模式在vue项目应用

Extend：表示某个独立功能

## 拆分组合实现组件

以子组件组合的形式实现复合组件，

实现一个组件，应该是先把功能拆分为小功能，由细粒度小组件，拼合成最终组件

目的是实现逻辑功能 ，代码， 样式的分离

不是子组件独立拥有的逻辑，即组件之间的逻辑，在上层组件处理

```js
// Component组件:
<Component>
  <OriginA>
  <OriginB>
<Component/>

<Page>
  <Component/>
</Page>
```

## 解耦

### mixins

ui不同，状态相同，数据相同

状态与方法都抽离

适用于状态与数据处理相同，但是ui不同的情况

### utils.js

ui不同，状态不同，数据处理相同

只抽离方法

不抽离状态

### 函数解耦

原则上js一个函数尽量只负责一个单一的功能，复合功能时，需要先拆分，后调用

组件ui功能方法，业务逻辑，纯数据处理，都需要单独拆分为独立的函数

### 细粒度

实现功能时，应该以功能等，拆分为最细粒度的函数，组件，类，对象，

## 每个功能尽量封装为独立组件

根据以下：

Extend 未来是否具有独立性，是否具有与其他组件组合的可能

Extend是否 只依附与 Component的逻辑，是否高度耦合Component。有些DOM结构需要深度耦合的情况下，不用封装组件

原则上，每个扩展功能，都需要优先采取创建新组件的形式开发

## Extend 扩展功能插入位置

按照优先级：

- 优先1: 封装原组件【装饰器模式】

适用情况：

ComponentExtend 需要独立复用的情况下

不影响原 Component

优点：

修改原组件的基础

```js
<ComponentExtend>
  Extend..
  <Component/>
<ComponentExtend/>

<Page>
  <ComponentExtend/>
</Page>
```

- 优先2: 直接应用原组件

在应用页面，直接写扩展功能 + 原组件

适用于 ：

Extend 与Component 的耦合低，

并且耦合功能 不需要再复用

缺点：

Extend 与 Component 耦合交互部分的逻辑，与当前页面无耦合，会混乱当前页面

```js
<Page>
  Extend...
  <Component/>
</Page>

```

- 优先3: 修改原组件

适用：

Extend 与 原组件DOM高度耦合，完全无法拆离

缺点：

修改原组件，影响比较大，影响应用到原组件的代码

```js
<Component>
  Extend...
  Origin...
<Component/>

<Page>
  <Component/>
</Page>
```
