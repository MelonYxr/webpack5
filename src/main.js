
import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
