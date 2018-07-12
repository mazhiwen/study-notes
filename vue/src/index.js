import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import pagea from './components/pagea.vue'
import pageb from './components/pageb.vue'


Vue.use(VueRouter)
const pageaa = {
  template: '<div>page22222222aa</div>'
}
const pageab = {
  template: '<div>pageab</div>'
}
/*
window.onbeforeunload = function(event) {
  console.log(event);
  return confirm("确定退出吗！！！！！"); 
}*/
const routes = [
  { path: '/pageb', component: pageb },
  { path: '/pagea', component: pagea ,
    children:[
      {path: 'pageaa',component: pageaa},
      {path: 'pageab',component: pageab}
    ]
  },
  { path: '/pagea/:id', component: pagea }
]
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


