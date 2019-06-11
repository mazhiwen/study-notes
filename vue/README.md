




### vue webpack 懒加载 代码分离

https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/


### el 

this.$el 指当前挂载的组件，mounted才有，created没有


### 组件通信

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