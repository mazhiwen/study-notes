<template>
  <div>
    {{$route.params.id}}
    <p>pagea</p>
    <button class="btn btn-default" type="submit">Button</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome sssss222tossssss Your Vue.jsss App'
    }
  }
}

swal('hello');
</script>

<style>
</style>