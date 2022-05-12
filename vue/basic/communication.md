# 组件通信

<https://segmentfault.com/a/1190000019208626?utm_source=tag-newest>

## 1. vuex

全局

## 2. v-model

父子组件
组件使用v-model

```javascript
Vue.component('base-checkbox', {
  model: {
    // 默认prop是value 默认event是input
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
<base-checkbox
  v-model="lovingVue"
  @change=""
>
</base-checkbox>
```

## 3. $parent $children $root $refs

较高耦合，一般不推荐

## 4. provide inject  

[Vue中使用provide和inject](https://juejin.cn/post/6844904157963354126)

适合大型独立性组件，组件内需求耦合性较高

可以传递给子孙 深层次

基本是不可响应式的，传入了一个可监听的对象，那么其对象的 property 还是可响应的。

核心用法是调用祖父等级别的方法

适合未知深层次

```js
//  provide 选项允许我们指定我们想要提供给后代组件的数据/方法。在这个例子中，就是 <google-map> 内部的 getMap 方法：

provide: function () {
  return {
    getMap: this.getMap
  }
}

// 然后在任何后代组件里，我们都可以使用 inject 选项来接收指定的我们想要添加在这个实例上的属性：
inject: ['getMap']


示例
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
  // 另外写法
  provide:function(){
    return {
      setFun:this.setFun
    }
  }
}


// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}

```

## 5. props $emit @on  

是响应式的,父子传递prop和event

## 6. $attrs 和 $listeners  

适用于第三方复杂组件构建，a -> b -> c 深层次传递prop 和 event  
简单来说：$attrs与$listeners 是两个对象，$attrs 里存放的是父组件中绑定的非 Props 属性，$listeners里存放的是父组件中绑定的非原生事件。

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
