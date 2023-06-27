import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/homepage'
import list from '@/components/list'
import article from '@/components/article'
import mavon_editor from '@/components/mavon_editor'
import form_example from '@/components/form_example'
import quill_editor from '@/components/quill_editor'
import empty_page from '@/components/empty_page'
import Video from "../assets/js/video";
import store from '../store/store'
import menu_test_page from "../components/menu_test_page";

// 根据后台返回的权限数组，筛选对应的路由信息对象
export function routerListFun(arr,allList){

  let arrArray=[]

  for(let i=0;i<arr.length;i++){

    for(let k=0;k<allList.length;k++){
      if(arr[i] == allList[k].id){
        arrArray.push(allList[k])
      }
    }
  }

  for(let i=0;i<arrArray.length;i++){
    if(arrArray[i].children && arrArray[i].children.length>0){
      arrArray[i].childrens=[]
      for(let k=0;k<arrArray[i].children.length;k++){
        for(let j=0;j<arr.length;j++){
          if(arrArray[i].children[k].id == arr[j]){
            arrArray[i].childrens.push(arrArray[i].children[k])
          }
        }
      }
      arrArray[i].children=arrArray[i].childrens
    }
  }
  return arrArray;
}

// 根据全部的路由信息对象 返回 权限列表
export function  routerListStr(routerStr){

  let routerJson= JSON.parse(routerStr)
  for(let i=0;i<routerJson.length;i++){
    if(routerJson[i].component){
      routerJson[i].component=''
    }

    if(routerJson[i].children && routerJson[i].children.length>0){
      for(let k=0;k<routerJson[i].children.length;k++){
        routerJson[i].children[k].component=''
      }
    }
  }

  return routerJson;
}


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

// 在router.js 路由文件 新建数组路由存储 '/'  父路由下的所有子路由(这里所有的动态路由均为 '/' 的子路由)
let routerLists=[
  {
    id:1,
    path: '/',
    name:'首页',
    label: '首页',
    redirect: '/homepage',
    meta:{
      title: '首页',
      table: true,
      display: true,
      only_one_path: true,
      icon: 'el-icon-s-home'
    }
  },
  {
    id: 2,
    path: '/mavon_editor_menu',
    name: 'mavon_editor_menu',
    label: '富文本1',
    component: mavon_editor,
    meta:{
      title: '富文本1',
      table: true,
      display:true,
      only_one_path: true,
      icon: 'el-icon-edit'
    }
  },
  {
    id: 3,
    path: '/quill_editor_menu',
    name: 'quill_editor_menu',
    label: '富文本2',
    component: quill_editor,
    meta:{
      title: '富文本2',
      table: true,
      display:true,
      only_one_path: true,
      icon: 'el-icon-edit'
    }
  },
  {
    id:4,
    path: '/homepage',
    name: '主页',
    label: '主页',
    component: homepage,
    redirect: '/list',
    meta:{
      title: '主页',
      table: true,
      display:true,
      icon: 'el-icon-menu'
    },
    children: [
      {
        id:5,
        path: '/list',
        name: 'list',
        label: 'list',
        component: list,
        meta: {
          title: 'list',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      },
      {
        id:6,
        path: '/list/:page',
        name: 'list_page',
        label: 'list_page',
        component: list,
        meta: {
          title: 'list_page',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      }
    ]
  },
  {
    id:7,
    path: '/empty_page',
    name: 'empty_page',
    label: '第二主页面',
    component: empty_page,
    redirect: '/mavon_editor',
    meta:{
      title: '第二主页面',
      table: true,
      display:true,
      icon: 'el-icon-menu'
    },
    children: [
      {
        id:8,
        path: '/mavon_editor',
        name: 'mavon_editor',
        label: 'mavon_editor',
        component: mavon_editor,
        meta: {
          title: 'mavon_editor',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      },
      {
        id:9,
        path: '/mavon_editor/:id',
        name: 'article_edit',
        label: 'article_edit',
        component: mavon_editor,
        meta: {
          title: 'article_edit',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      },
      {
        id:10,
        path: '/quill_editor',
        name: 'quill_editor',
        label: 'quill_editor',
        component: quill_editor,
        // meta: {
        //   permission: ['admin'],
        //   remark: "", //对于该菜单的一个解释说明
        //   title: { String }, //显示在侧边栏、面包屑和标签栏的文字
        //   hideInBread: true,
        //   hideInMenu: true,
        //   notCache: true,
        // },
        meta: {
          title: 'quill_editor',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      },
      {
        id:11,
        path: '/quill_editor/:id',
        name: 'quill_article_edit',
        label: 'quill_article_edit',
        component: quill_editor,
        meta: {
          title: 'quill_article_edit',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      },
      {
        id:12,
        path: '/articles/:id/:page',
        name: 'articles',
        label: 'articles',
        component: article,
        meta: {
          title: 'articles',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      },
      {
        id:13,
        path: '/form_example',
        name: 'form_example',
        label: 'form_example',
        component: form_example,
        meta: {
          title: 'form_example',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      },
      {
        id:14,
        path: '/timer_example',
        name: 'timer_example',
        label: 'timer_example',
        component: () =>
          import('../components/timer_example'),
        meta: {
          title: 'timer_example',
          table: true,
          display:true,
          icon: 'el-icon-link'
        },
      }
    ]
  }
]
//定义 上面数组的父路由
let routerAlls=[   //这里为routerLists的父路由
]
// 1 .权限配置表
// 先把路由信息对象字符串化，然后去除component字段 ，再传递给 权限配置表
let routerListString =JSON.stringify(routerLists)
let src= routerListStr(routerListString)
store.commit('setRouterList',src)

let arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]   //这里为权限列表数组(既后台根据用户身份返回的对应的路由数组)


//根据权限配置表(arr数组)和动态路由信息对象(routerLists数组) 获取本用户的路由信息表，并添加到 routerAlls 路由的二级路由里

// 2.获取动态路由
routerAlls = routerListFun(arr,routerLists)
//获取 路径 '/' 的子路由，并添加至 routerAlls   这里的  routerListFun函数 为 根据权限列表数组（arr）筛选动态路由信息对象（routerLists） PS：函数内容见 文章末尾：附录


// 3.获取侧边导航栏 的 渲染菜单 数组
//根据权限配置表数组（arr）和动态路由信息对象（routerLists） 获取本用户的菜单列表
let mentParse =JSON.parse(JSON.stringify(src))
let menuList = routerListFun(arr,mentParse)   //这里routerListFun函数注意去除返回数组中的component
store.commit('setMents',menuList)   //将其添加到vuex



Vue.use(Router)
const routers = new Router({
  routes: [
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

// 将筛选后的路由信息对象添加至路由表
routers.addRoutes(routerAlls)

//https://www.cnblogs.com/yizhilin/p/12902356.html
routers.beforeEach((to, from, next) => {　　//从cookie中取值并给vux中的token赋值
  console.log(">>>>>router.beforeEach>>>>", store.state.name, store.getters.getName)
  console.log(">>>>>router.beforeEach>>1>>", store.state.ments)

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

export default routers
