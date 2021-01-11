
# 设计模式在vue项目应用

## 组件实现

拆分视图处理与数据处理：.vue来做功能视图渲染  +  数据处理方法.js

以子组件组合的形式实现复合组件，

子组件保证参数独立性，子组件只包括功能逻辑。子组件去除业务逻辑,业务逻辑在外层组件处理

## ui不同，状态相同，数据相同

适用mixins

状态与方法都抽离

适用于状态与数据处理相同，但是ui不同的情况

## ui不同，状态不同，数据处理相同

utils.js

只抽离方法，与数据。不抽离状态

## 功能扩展

利于页面Page，要有一个功能，功能基于 Component 组件

扩展功能 Extend

Component组件原始功能 Origin

### 直接应用原组件

在应用页面，直接写扩展功能 + 原组件

```js
<Page>
  Extend...
  <Component/>
</Page>
```

### 封装原组件

后续可复用

基于原组件再封装一层

```js
<ComponentExtend>
  Extend..
  <Component/>
<ComponentExtend/>

<Page>
  <ComponentExtend/>
</Page>
```

### 修改原组件

扩展功能放在

```js
<Component>
  Extend...
  Origin...
<Component/>

<Page>
  <Component/>
</Page>
```

### 拆分合并原组件

原始功能拆分为 OriginA + OriginB

```js
// Component组件:
<Component>
  <OriginA>
  <OriginB>
<Component/>

// 扩展组件:
<ComponentExtend>
  <OriginA>
  <OriginB>
  extend
<ComponentExtend/>


<Page>
  <ComponentExtend/>
</Page>
```

再把拆分后的组合为新的组件
