import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap'
import App from './App'
import router from './router';

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.component('Loading', Loading);

axios.defaults.withCredentials = true;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



router.beforeEach((to, from, next) => {
  
  // console.log(to, from, next)
  if(to.meta.requiresAuth){
    console.log('這裡需要驗證')
    const api = `${process.env.APIPATH}/api/user/check`;
      const vm = this
      axios.post(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
          next();
        }else{
          next({
            path: '/login'
          }); 
        }
      })
  }else{
    next();
  }

  
})