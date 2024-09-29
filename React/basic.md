# React知识

[用React仿钉钉审批流、工作流前端](https://zhuanlan.zhihu.com/p/648307778)

[2022 年的 React 生态](https://juejin.cn/post/7085542534943883301)

[你要的 React 面试知识点，都在这了](https://juejin.cn/post/6844903857135304718)

[2019年17道高频React面试题及详解](https://juejin.cn/post/6844903922453200904)

[React 开发必须知道的 34 个技巧【近1W字】](https://juejin.cn/post/6844903993278201870#heading-6)

[掘金最污的 React16.x 图文视频教程(2万5千字长文-慎入)](https://juejin.cn/post/6844903870213292045)

## react与vue区别

mvc ：单向数据

mvvm：双向数据绑定


## JSX



- React.Fragment

<> </>
空文档标签

- HTML中嵌入JS表达式用{}语法

胡子语法

number/string 直接渲染

{}语法 不能嵌入数组以外的其他对象，但jsx对象 css对象可以

数组遍历用map

- 样式

类名 className="c"

行内样式，对象,属性驼峰语法


`style={{ }}`


- 编译基于 babel-preset-react-app

jsx编译为 -> React.createElement() -> 结果为react虚拟DOM



## React.createElement()

React.createElement(ele,props,...children)

返回虚拟DOM ，类

## 虚拟DOM渲染为真实DOM

ReactDOM.render

## React组件

没有全局局部概念 

组件名称一般大驼峰

调用引用的时候会给予babel-preset-react-app转换为虚拟DOM对象,渲染的时候调用函数渲染为真实DOM

- 组件分类

函数组件 类组件 hook组件(函数组件中使用hook函数)

## 函数组件

是静态组件，第一次渲染时，执行函数。组件的内容不会再根据组件内更新，不能自更新。但是如果父组件更新了，子组件一定会更新

不具备ref 状态 周期函数

一个返回jsx元素/虚拟DOM对象的函数


## 类组件

组件第一次渲染完毕后，除了父组件更新，还可以内部更新state更新实现自更新

函数组件比类组件渲染速度更快,类组件比函数组件功能更强大

推荐使用hooks组件



```js
class Demo extends React.Component { // 或者 继承 React.PureComponent
  
  static defaultProps = {

  }

  static propTypes = {

  }

  state = {
    num:0
  }

  constructor(props){
    super(props)
    console.log(this.props)
  }

 render() {
    console.log(this.props)
    return 
    <div>
      <div>{this.state.num}<div/>
      <div onClick={()=>{
        
        // 修改状态 + 视图更新
        this.setState({

        })

        // this.forceUpdate() //强制更新

      }}></div>
    
    
    <div/>
 }

 UNSAFE_componentWillMount(){
   // 组件第一次渲染之前
 }

  componentDidMount(){
    // 第一次渲染完毕（执行render） 可以获取到真实DOM
  }

  shouldComponentUpdate(nextProps,nextState){
    // 是否允许组件更新

    //如果是 forceUpdate 会跳过这个函数阶段 直接从 willUpdate执行

    // 需要返回 true/false 执行或者不执行下一步更新
    return true
  }

  UNSAFE_componentWillUpdate(){

  }


  componentDidUpdate(){
    // 组件更新完毕
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    // 接收新属性props之前
    // 之后执行 shouldUpdate周期
  }

  componentWillUnmount(){
    // 组件销毁之前
  }

}

```

原理: 创建类实例，执行render


## Hooks组件

Hook是React16.8的新特性

具备了函数组件和类组件的各自优势

在函数组件基础上。基于Hooks函数 让函数组件拥有状态 周期函数等

区别于类组件，每次渲染，都是把函数重新执行，执行函数代码上下文。类组件不会重新再次创建实例

第二次后执行函数，usState不会初始化，而是获取新值

## useState

类似setState

```js
let [num,setNum] = useState(initialValue);

useState(()=>{
  // 初始值惰性处理，初始值逻辑放在函数中，只有第一次render执行，后面render不会执行
  //返回初始值
})
```

返回 [状态值,修改数值方法]

setNum：更新数值，触发DOM更新

setNum不会局部更新数值，而是直接修改为新数值


setNum是异步的：  多个setNum顺序执行时,有一个更新队列updater，实现状态批处理,更新一次函数render ； setNum在异步函数中时会同步执行 如setTimeout ,更新多次；flushSync 会立即更新队列 

会检测数值变化： 是否更新 Object.is比较

```js
// 执行一次render 多次for
for(){
  setNum((pre)=>{

  return pre;
  })
}
```

## useEffect

函数组件中使用生命周期函数

```js
useEffect(()=>{

  //获取最新状态
  
  // 在第一次渲染完毕后会执行回调，等价于 componentDitMount
  // 在第一次渲染完毕后 也会执行回调，等价于 componentDitUpdate
})


useEffect(()=>{

  // 只有第一次执行
}, [])

let [x1,setx1] = useState()

useEffect(()=>{

  //第一次会执行
  //当 数组中任意数值变化都会执行
}, [x1,x2])


useEffect(()=>{
  // useEffect只可以返回一个函数 不能是promise等
  return ()=>{
    // 如果组件更新，小函数会在组件释放时更新 ,理解为unmount销毁
    // x是上一次值
    
    console.log(x);
  }
})

```

useEffect必须在函数最外层上下文调用 ，不能嵌入到条件判断，循环等语句中

effct链表：MountEffect方法把useEffect中的callback按顺序加入到effect链表中，按照以上顺序。render后会按照顺序规则执行链表callback

每次render都会执行 推入链表，执行链表callback

## useLayoutEffect

useLayoutEffect 和 useEffect 的区别的是，useLayoutEffect执行时间是render中的第二创建虚拟DOM后,并创建了真实DOM,但还未挂载渲染真实DOM马上执行，useEffect是render中的第三步骤渲染为真实DOM后执行.

useLayoutEffect会阻止最后一步挂载渲染真实DOM，执行 effect链表callback。useEffect不会阻止真实DOM挂载渲染

所以两者都可以获取真实DOM，区别只是是否渲染绘制

一般不容易出现样式闪烁 


## useRef

- React.createRef:

 既能类 也能函数组件用

- useRef:

只能函数组件

每次函数执行时 不会重新获取。而createRef会重新创建。所以类组件用createRef 函数中用useRef

```js
let box = useRef(null)
box.current

<   ref={box} >
```

- forwardRef

函数组件 实现ref转发，获取子组件内部的某个元素

类组件直接用ref挂载元素获取

```js
function parent(){
lex x= useRef(null);

return 
    <Child ref={x}>
}


React.forwardRef(function Child(props,ref){

})

```

- useImperativeHandle(ref)

获取子组件内部方法状态等。

useImperativeHandle(ref,()=>{

  // 返回结果可以被父组件获取到
  return {

  }
})

```JS

import React,{useRef,forwardRef} from 'react'

const SonComponent = forwardRef((props, refparams) => {
  useImperativeHandle(refparams, () => {
    return {
      logSon: () => {
        console.log('测试');
      }
    }
  },[])
  
  return (
    <>
      <div>
        <input type="text" defaultValue={props.value} ref={refparams} />
        <button onClick={() => console.log(refparams.current)}>点击打印ref</button>
      </div>
    </>
  )

})

const FatherComponent = () => {
  const sonRef = useRef()
  
  useEffect(()=>{
    sonRef.current.logSon()  ----测试
  },[])
  
  return (
    <>
      <SonComponent ref={sonRef} value='这是子组件的value值' />
    </>
  )
}

```
## useMemo

只会在第一次 和依赖变化时执行。

在依赖没变化时，会取上次的结果，会缓存

let z = useMemo(()=>{

  return res;
}, [x, y])


## useCallback

组件第一次渲染，执行useCallback，创建一个callback函数。

组件后续更新，会根据依赖是否更新，来是否创建新callback 

也就是可以在依赖不更新时，不重复创建重复的函数

```js
const handle = useCallback(
  //callback
  ()=>{

  }
  , 
  []
)
```


## PureComponent React.memo



继承PureComponent，在shouldComponentUpdate中已经对新旧属性做了浅比较

同样做法 函数组件用React.memo函数

## 自定义hook


类似于mixin

封装公共逻辑处理

创建一个函数，名字是useXxx ，后期就可以在组件中调用这个方法

例如在函数中 吧usestate封装 返回

useXxx命名会在执行时 进行校验。如果不这样命名，不会校验

## 渲染周期hook顺序

```
父willMount 
父render (子willmount 子render 子didMount)
父didMount


父shouldUpdate
父willUpdate
父Render（[子WillReceiveProps] 子shouldUpdate 子willUpdate 子Render 子didUpdate）
父didUpdate


父willUnmount 
父处理中 (子willUnmount  子处理中 子销毁)
父销毁

```

## 严格模式

react严格模式会校验不规范的语法

## props


- 基本概念

组件无法修改自身的props,传进来的props是只读的

组件属性通过props传递进去 子节点通过props.children


- 属性校验

设置默认值

Demo.defaultProps = { x: 0 };

用props-types插件做规则校验

Demo.propTypes = { x: propTypes.number };

## 插槽

React.children.toArray(props.children).forEach((child)=>{
  child.props
})




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


## 组件通信


- 类组件


父组件props传递属性给子组件，传递修改props的方法给子组件, 传递DOM用children插槽, 父组件通过ref调用子组件的属性或方法


- 函数组件

类似









