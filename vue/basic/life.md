# Vue生命周期

<https://juejin.im/post/5c6d48e36fb9a049eb3c84ff>

## beforeCreate

实例初始化，初始化界面前

属性 options 的合并处理

添加响应数据: 在vue响应式系统中加入data对象中的所有数据,defineReactive

初始化一些属性 方法 参数：如，$前缀的 $parent $root 等

初始化事件：

## created

初始化界面前

组件实例创建完成，属性已绑定，但DOM还未生成，$el属性还不存在

把tempalte编译成render函数

## beforeMount

模版编译/挂载之前

## mounted

模版编译/挂载之后

创建vue实例的$el，然后用它替代 this.$el 属性。

## beforeUpdate

数据改变——> 导致虚拟DOM的改变——>调用 beforeUpdate updated 这两个生命钩子去改变视图

组件更新之前

## updated

组件更新之后

## beforeDestroy

组件销毁前

## destroyed

组件销毁后

## activated

for keep-alive,组件被激活时调用

## deactivated

for keep-alive,组件被移除时调用

## 加载渲染过程

父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
