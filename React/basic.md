# React知识

[2022 年的 React 生态](https://juejin.cn/post/7085542534943883301)

[你要的 React 面试知识点，都在这了](https://juejin.cn/post/6844903857135304718)

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904)

[React 开发必须知道的 34 个技巧【近1W字】](https://juejin.cn/post/6844903993278201870#heading-6)

[掘金最污的 React16.x 图文视频教程(2万5千字长文-慎入)](https://juejin.cn/post/6844903870213292045)

## props

组件无法修改自身的props

## refs与state的选择

***refs***

React.createRef()

***state***

## 样式

```javascript
<div
    style={{minWidth:200}}
    className=""
>
</div>


//materialUI组件 可添加classes props控制样式
<div classes={{}}>
</div>


// materialui 样式

withStyles
const StyledChip = withStyles(createStyles({
  root: {
    height: 25,
  },
}))(Chip);
```

## render渲染dom

```javascript
{
if true
return <div>2</div>
}
```

## react-router

<https://segmentfault.com/a/1190000010318444>

## render

## Hooks

<https://juejin.cn/post/6844903903981469703>
