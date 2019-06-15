




## vue webpack 懒加载 代码分离

https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/


## el 

this.$el 指当前挂载的组件，mounted才有，created没有


## 组件通信

1. vuex
全局

2. v-model
父子组件
组件使用v-model

```javascript
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
<base-checkbox v-model="lovingVue"></base-checkbox>
```

3. $parent $children $root  
较高耦合，一般不推荐

4. provide inject  
适合大型独立性组件，组件内需求耦合性较高
可以传递给子孙 深层次
基本是不可响应式的
核心用法是调用祖父等级别的方法

5. props  $emit  @on  
是响应式的,父子传递prop和event


6. $attrs和$listeners  
适用于第三方复杂组件构建，a -> b -> c 深层次传递prop 和 event

```javascript
a:
<B :messagec="messagec" v-on:getCData="getCData"></B>
getCData(val){
  console.log("这是来自C组件的数据："+val)
}
 

b:
<C v-bind="$attrs" v-on="$listeners"></C>
// <!-- C组件中能直接触发getCData的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性 -->
// <!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的） -->


c:
v-model="$attrs.messagec" @input="passCData($attrs.messagec)"
passCData(){
  this.$emit('getCData',val)
}
```

## 组合

### mixin

minxin适合有公用 类似react hoc，可以抽离template 和js 的还是抽离成组件比较合适



## 样式

vue 有时候局部样式组件 有时候全局控制