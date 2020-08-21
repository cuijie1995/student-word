import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'

Vue.use(Router)


export const constantRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/chinese',
    component: Index,
    children: [

      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue'),
      },
      {
        path: '/chinese',
        name: 'Chinese',
        component: () => import('@/views/Chinese.vue'),
      },
      {
        path: '/english',
        name: 'English',
        component: () => import('@/views/English.vue'),
      },
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
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
