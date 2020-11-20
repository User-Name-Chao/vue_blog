import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/homepage'
import list from '@/components/list'
import article from '@/components/article'
import editor from '@/components/editor'

Vue.use(Router)
export default new Router({
  routes: [
    {
    path: '/',
    redirect:'/homepage',
    name:'zhuye'
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage,
      redirect:'/list',
      children: [
        {
          path: '*',
          redirect:'/list',
          },
        {
          path: '/list',
          name: 'list',
          component: list
        } ,
        {
           path: '/articles/:id',
           name: 'articles',
           component: article,
         },
        {
          path: '/editor_tool',
          name: 'editor_tool',
          component: editor,
        }
      ]
     },

  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
