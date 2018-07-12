<template>
  <div id="app">
    <!-- <h1>Hello App!</h1>
     <p>
      <router-link> 默认会被渲染成一个 `<a>` 标签 
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
     </p>-->
     <router-view></router-view>
  </div>
</template>

<script>
import 'sweetalert2/dist/sweetalert2.min.css';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome tossssss Your Vue.jsss App'
    }
  }
}
</script>

<style>
a {
  color: blue;
}
</style>