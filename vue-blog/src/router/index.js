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
import Video from "../assets/js/video";

/**
 * meta: {
 *  remark: (string) 对于该菜单的一个解释说明
 *  engRemark: (string) 英文
 *  title: { String }
 *         显示在侧边栏、面包屑和标签栏的文字
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/homepage',
      name: 'zhuye'
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage,
      redirect: '/list',
      children: [
        {
          path: '/list',
          name: 'list',
          component: list,
          // meta: {
          //   permission: ['admin'],
          // },
        },
        {
          path: '/list/:page',
          name: 'list_page',
          component: list,
          // meta: {
          //   permission: ['admin']
          // },
        }
      ]
    },
    {
      path: '/empty_page',
      name: 'empty_page',
      component: empty_page,
      redirect: '/mavon_editor',
      children: [
        {
          path: '/mavon_editor',
          name: 'mavon_editor',
          component: mavon_editor,
          // meta: {
          //   permission: ['admin']
          // },
        },
        {
          path: '/mavon_editor/:id',
          name: 'article_edit',
          component: mavon_editor,
          // meta: {
          //   permission: ['admin']
          // },
        },
        {
          path: '/quill_editor',
          name: 'quill_editor',
          component: quill_editor,
          // meta: {
          //   permission: ['admin'],
          //   remark: "", //对于该菜单的一个解释说明
          //   title: { String }, //显示在侧边栏、面包屑和标签栏的文字
          //   hideInBread: true,
          //   hideInMenu: true,
          //   notCache: true,
          // },
        },
        {
          path: '/quill_editor/:id',
          name: 'quill_article_edit',
          component: quill_editor,
          // meta: {
          //   permission: ['admin']
          // },
        },
        {
          path: '/articles/:id/:page',
          name: 'articles',
          component: article,
          // meta: {
          //   permission: ['admin']
          // },
        },
        {
          path: '/form_example',
          name: 'form_example',
          component: form_example,
          // meta: {
          //   permission: ['admin']
          // },
        },
        {
          path: '/timer_example',
          name: 'timer_example',
          component: () =>
            import('../components/timer_example'),
          // meta: {
          //   permission: ['admin']
          // },
        },
        {
          path: '/get_fodler_files',
          name: 'get_fodler_files',
          component: get_fodler_files,
          // meta: {
          //   permission: ['admin']
          // },
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
import store from '../store/store'
//https://www.cnblogs.com/yizhilin/p/12902356.html
router.beforeEach((to, from, next) => {　　//从cookie中取值并给vux中的token赋值
  console.log(">>>>>router.beforeEach>>>>", store.state.name, store.getters.getName)
  // this.$store.commit('setToken', Cookie.get('token'))　　//如果vux有值就讲登录状态改成1
  // if (this.$store.state.token) {
  //   this.$store.commit('changIsSignIn', 1)
  // }　//判断是否为true，如果为true就是要登录，去判断token是否存在。存在就执行，不存在就跳转登录页面
  // if (to.meta.permission) {
  //   if (store.state.token) {
  //     next()
  //   } else {
  //     next({path: '/login'})
  //   }
  // } else {
  //   next()
  // }
  next()
})

export default router
