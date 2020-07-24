
# vue插件

Vue 插件允许开发人员构建全局级别的功能并将其添加到 Vue。用于向程序添加可以全局访问的方法和属性、资源，选项，mixin 以及其他自定义 API

<https://www.imooc.com/article/19691>

<https://juejin.im/post/5d3eb28cf265da03e71acd15>

## extend

场景:vue 组件中有些需要将一些元素挂载到元素上,这个时候 extend 就起到作用了 是构造一个组件的语法器 写法:

```js
import DropMenu from './DropMenu.vue';
const DropMenuConstructor = Vue.extend(DropMenu);
```

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>',//template对应的标签最外层必须只有一个标签
  data: function () {
    return {
      extendData: '这是extend扩展的数据',
    }
  },
  props:['propsExtend']
})

// 创建的构造器可以挂载到元素上,也可以通过 components 或 Vue.component()注册使用
// 挂载到一个元素上。可以通过propsData传参.
new Profile({propsData:{propsExtend:'我是实例传入的数据'}}).$mount('#app-extend')

// 通过 components 或 Vue.component()注册
Vue.component('Profile',Profile)

```

## install,Vue.use

```js
var MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  // 2. 添加全局资源,第二个参数传一个值默认是update对应的值
  Vue.directive('click', {
    bind(el, binding, vnode, oldVnode) {
      //做绑定的准备工作,添加时间监听
      console.log('指令my-directive的bind执行啦');
    },
    inserted: function(el){
    //获取绑定的元素
    console.log('指令my-directive的inserted执行啦');
    },
    update: function(){
    //根据获得的新值执行对应的更新
    //对于初始值也会调用一次
    console.log('指令my-directive的update执行啦');
    },
    componentUpdated: function(){
    console.log('指令my-directive的componentUpdated执行啦');
    },
    unbind: function(){
    //做清理操作
    //比如移除bind时绑定的事件监听器
    console.log('指令my-directive的unbind执行啦');
    }
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      console.log('注入组件的created被调用啦');
      console.log('options的值为',options)
    }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    console.log('实例方法myMethod被调用啦');
  }
}

//调用MyPlugin
Vue.use(MyPlugin,{someOption: true })

//3.挂载
new Vue({
  el: '#app'
});
```
