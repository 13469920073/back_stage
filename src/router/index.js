import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }

]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/customer',
    component: Layout,
    meta: {
      title: '客户管理',
      icon: 'lock'
    },
    children: [
      {
        path: 'cust-list',
        component: () => import('@/views/customer/cust-list'),
        name: 'custList',
        meta: { title: '客户列表', icon: 'edit' }
      },
      {
        path: 'loan-list',
        component: () => import('@/views/customer/loan-list'),
        name: 'loanList',
        meta: { title: '客户待审核', icon: 'list' }

      },
      {
        path: 'audited',
        component: () => import('@/views/customer/audited'),
        name: 'audited',
        meta: { title: '客户已审核', icon: 'list' }
      },
      {
        path: 'account-review',
        component: () => import('@/views/customer/account-review'),
        name: 'accountReview',
        meta: { title: '账户待审核', icon: 'list' }
      },
      {
        path: 'account-audited',
        component: () => import('@/views/customer/account-audited'),
        name: 'accountAudited',
        meta: { title: '账户已审核', icon: 'list' }
      }
    ]
  },
  {
    path: '/agency',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '代理管理',
      icon: 'guide'
    },
    children: [
      {
        path: 'agency-list',
        component: () => import('@/views/agency/agency-list'),
        name: 'agencyList',
        meta: { title: '代理列表', icon: 'edit' }
      },
      {
        path: 'create-proxy',
        component: () => import('@/views/agency/create-proxy'),
        name: 'createProxy',
        meta: { title: '创建代理', icon: 'edit' }

      }
    ]
  },
  {
    path: '/financial',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '财务管理',
      icon: 'guide'
    },
    children: [
      {
        path: 'deposit-list',
        component: () => import('@/views/financial/deposit-list'),
        name: 'depositList',
        meta: { title: '客户入金列表', icon: 'edit' }
      },
      {
        path: 'deposit-audit',
        component: () => import('@/views/financial/deposit-audit'),
        name: 'depositAudit',
        meta: { title: '客户入金审核', icon: 'edit' }
      },
      {
        path: 'refusal-deposit',
        component: () => import('@/views/financial/refusal-deposit'),
        name: 'refusalDeposit',
        meta: { title: '拒绝入金列表', icon: 'list' }
      },
      {
        path: 'withdrawal-list',
        component: () => import('@/views/financial/withdrawal-list'),
        name: 'withdrawalList',
        meta: { title: '客户出金列表', icon: 'list' }
      },
      {
        path: 'refusal-withdrawal',
        component: () => import('@/views/financial/refusal-withdrawal'),
        name: 'refusalWithdrawal',
        meta: { title: '拒绝出金列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/position',
    component: Layout,
    alwaysShow: true,
    name: 'position',
    meta: {
      title: '持仓列表',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'position-list',
        component: () => import('@/views/position/position-list'),
        name: 'positionList',
        meta: { title: '持仓列表', icon: 'edit' }
      },
      {
        path: 'settlement-list',
        component: () => import('@/views/position/settlement-list'),
        name: 'settlementList',
        meta: { title: '结算列表', icon: 'edit' }

      }
    ]
  },
  {
    path: '/platform-statistics',
    component: Layout,
    alwaysShow: true,
    name: 'platformStatistics',
    meta: {
      title: '平台统计',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'agency-statistics',
        component: () => import('@/views/platform-statistics/agency-statistics'),
        name: 'agencyStatistics',
        meta: { title: '代理统计', icon: 'edit' }
      },
      {
        path: 'user-statistics',
        component: () => import('@/views/platform-statistics/user-statistics'),
        name: 'userStatistics',
        meta: { title: '用户统计', icon: 'edit' }

      }

    ]
  },
  {
    path: '/editPassword',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/editPassword'),
        name: 'Tab1',
        meta: { title: '修改密码', icon: 'tab' }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: '退出', icon: 'tab' }
      }
    ]
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
