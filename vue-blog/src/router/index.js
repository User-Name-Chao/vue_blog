import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/homepage'
import list from '@/components/list'
import article from '@/components/article'
import mavon_editor from '@/components/mavon_editor'
import form_example from '@/components/form_example'
import quill_editor from '@/components/quill_editor'
import get_fodler_files from '@/components/get_fodler_files'

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
          path: '/mavon_editor',
          name: 'mavon_editor',
          component: mavon_editor,
        },
        {
          path: '/form_example',
          name: 'form_example',
          component: form_example,
        },
        {
          path: '/quill_editor',
          name: 'quill_editor',
          component: quill_editor,
        },
        {
          path: '/get_fodler_files',
          name: 'get_fodler_files',
          component: get_fodler_files,
        }
      ]
     },

  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
