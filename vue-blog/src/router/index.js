import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/homepage'
import list from '@/components/list'
import article from '@/components/article'
import mavon_editor from '@/components/mavon_editor'
import form_example from '@/components/form_example'
import quill_editor from '@/components/quill_editor'
import get_fodler_files from '@/components/get_fodler_files'
import empty_page from '@/components/empty_page'

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
          path: '/list',
          name: 'list',
          component: list,
          meta: {
            permission: ['admin']
          },
        },
        {
          path: '/list/:page',
          name: 'list_page',
          component: list,
          meta: {
            permission: ['admin']
          },
        }
      ]
     },
    {
      path: '/empty_page',
      name: 'empty_page',
      component: empty_page,
      redirect:'/mavon_editor',
      children: [
        {
          path: '/mavon_editor',
          name: 'mavon_editor',
          component: mavon_editor,
          meta: {
            permission: ['admin']
          },
        },
        {
          path: '/mavon_editor/:id',
          name: 'article_edit',
          component: mavon_editor,
          meta: {
            permission: ['admin']
          },
        },
        {
          path: '/quill_editor',
          name: 'quill_editor',
          component: quill_editor,
          meta: {
            permission: ['admin']
          },
        },
        {
          path: '/articles/:id/:page',
          name: 'articles',
          component: article,
          meta: {
            permission: ['admin']
          },
        },
        {
          path: '/form_example',
          name: 'form_example',
          component: form_example,
          meta: {
            permission: ['admin']
          },
        },
        {
          path: '/timer_example',
          name: 'timer_example',
          component: () =>
            import('../components/timer_example'),
          meta: {
            permission: ['admin']
          },
        },
        {
          path: '/get_fodler_files',
          name: 'get_fodler_files',
          component: get_fodler_files,
          meta: {
            permission: ['admin']
          },
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
