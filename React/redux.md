# Redux


```js
// src/store/index.js
import { createStore, applyMiddleware } from "redux";
// 用于支持异步action
import thunk from "redux-thunk";
import reducers from "./reducers";

export default createStore(reducers, applyMiddleware(thunk));





//reducers.js
import {INCREMENT, DECREMENT} from '../constants'
// 初始化状态
const initState = 0;
export default function count(preState = initState, action) {
    const { type, data } = action;
    state = { ...preState }

    switch (type) {
    case INCREMENT:
        return state + data;
    case DECREMENT:
        return state - data;
    default:
        return state;
    }
    // return state
}
```


## useContext


```js

//app.js
// store = stroe/index.js
<ThemeContext.Provider 
    value={{
        store
    }}
>
    <App>
<ThemeContext.Provider/>    
```


```js
// ThemeContext.js
const ThemeContext = React.createContext();
```


```js
//a.js
import React, { useContext } from 'React'
const Compo = function Compo(){
    const  {store} = useContext(ThemeContext)

    store.dispatch({
        type:'',
        data:0
    })
}
// 类组件也类似


```

## store.getState()



## store.dispatch()

派发事件

会执行reduce

## store.subscribe()

注册方法到store事件池中

返回结果：unsubscribe 注销方法

一般注册react状态更新操作

## redux工程化

1. reducer模块化

处理state，action

```js
import { combineReducers } from 'redux'

const redecer = combineReducers({
    //...模块化命名
    namea: ,
    nameb: ,
})

// 此时容器中的公共状态
state = {
    namea:{
         
    },
    nameb:{

    }
}

store.getState().namea 
```

2. 派发标识统一

```js
// action-types.js
// 存所有的派发标识，避免冲突
export const AA = 'AA'
//...

```

3. actionCreator

管理派发行为对象

actions

## react-redux

在react组件中更方便使用redux

```js
import {connect} from 'react-redux'


connect(mapStateToProps, mapDispatchToProps)(组件)

connect(state=>{

    return {} 
    // 返回的 作为属性传给组件
},
dispatch=>{

    return {}
    // 返回派发函数
}
)

```