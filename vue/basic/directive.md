
# 指令

[vue 自定义指令的魅力](https://juejin.cn/post/6844903508785758215)

指令是可以写在DOM元素的小命令，他们以v-为前缀，vue就能识别这是一个指令并保持语法的一致性。如果你需要对HTML进行底层操作的话，这种方式是非常有用的。

## 指令钩子函数

指令定义函数提供了几个钩子函数 (可选)：

```
bind-只调用一次，指令第一次绑定到元素时调用。
insert-被绑定元素插入父节点时调用。
update-所在组件的 VNode 更新时调用，但是可能发生在其子元素的 VNode 更新之前。
componentUpdated-所在组件的 VNode 及其子元素的 VNode 全部更新时调用。
unbind-只调用一次，指令与元素解绑时调用。
```

钩子函数的参数：

他们中的每一个都有可以用的el,binding和vnode参数，除了update和componentUpdated之外，还会暴露oldVnode，以区分传递的旧值和新值。

```
el 指令所绑定的元素，可以用来直接操作 DOM 。
binding 一个对象，包含以下属性：name,value,oldValue,expression,arg和modifiers。
vnode Vue 编译生成的虚拟节点。
```
