import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'
import Search from 'components/search/search'

// 全局使用路由
Vue.use(Router)

// 路由对象
export default new Router({
  routes: [
   {path: '/',redirect:'/recommend'},
   {
     path: '/recommend',
     component:Recommend,
     children: [
       {
         path: ':id',
         component: Disc
       }
     ]
   },
   {
     path: '/singer',
     component:Singer,
     children: [
       {
        path: ':id',
        component: SingerDetail
       }
     ]
   },
   {
     path: '/rank',
     component:Rank,
     children: [
       {
         path: ':id',
         component: TopList
       }
     ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
