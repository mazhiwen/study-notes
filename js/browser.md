GUI渲染线程
javascript引擎线程
浏览器事件触发线程
HTTP请求线程


浏览器中, js引擎线程会循环从 任务队列 中读取事件并且执行, 这种运行机制称作 Event Loop (事件循环).








## event


###  drag

需要draggable = "true"

拖动的元素事件流:
dragstart 
ondrag

拖动移动到的目标元素事件流:
dragenter
dragover
dragleave

