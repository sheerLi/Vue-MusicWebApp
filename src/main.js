import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false

import 'common/scss/index.scss'

// 创建 vm 实例
new Vue({
  el: '#app',
  router,
  // render 函数渲染
  render: h => h(App)
})
