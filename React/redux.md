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


