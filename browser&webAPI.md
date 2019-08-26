GUI渲染线程
javascript引擎线程
浏览器事件触发线程
HTTP请求线程


浏览器中, js引擎线程会循环从 任务队列 中读取事件并且执行, 这种运行机制称作 Event Loop (事件循环).








## **event**

MDN参考:https://developer.mozilla.org/zh-CN/docs/Web/Events

###  **drag 拖动**

需要draggable = "true"

拖动的元素事件流:  
dragstart  
drag 持续  
dragend

拖动移动到的目标元素事件流:  
dragenter  
dragover  
dragleave  
drop

### **mouse 鼠标**

mouseover: 在鼠标穿过元素和子元素的时候都会触发一次，并重新初始化mouse事件
mouseout：指针移出元素，或者移到它的子元素上。（会冒泡），每个当前元素以及子元素移出都会触发

mouseenter: 只有鼠标穿过绑定元素，才会触发mouseenter，且子元素不会。（不冒泡）
mouseleave: 指针移出元素范围外。（不冒泡）

### **焦点事件**

focus:获得焦点(不冒泡)

blur:失去焦点(不冒泡)


## **http**

### 1.1



### 2.0


### https



## SessionStorage, LocalStorage, Cookie

参考：https://harttle.land/2014/10/01/http.html#header-5
