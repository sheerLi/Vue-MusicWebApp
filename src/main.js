import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('common/image/lazyload.png')
})

import 'common/scss/index.scss'



// 创建 vm 实例
new Vue({
  el: '#app',
  router,
  // render 函数渲染
  render: h => h(App)
})
