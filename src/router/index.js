import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'

// 全局使用路由
Vue.use(Router)

// 路由对象
export default new Router({
  routes: [
   {path: '/',redirect:'/recommend'},
   {path: '/recommend',component:Recommend},
   {path: '/singer',component:Singer},
   {path: '/rank',component:Rank}
  ]
})
