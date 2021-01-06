import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('./../views/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('./../views/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    meta: { layout: 'main', requiresAuth: true},
    component: () => import('./../views/Main.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', requiresAuth: true},
    component: () => import('./../views/History.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: { layout: 'main', requiresAuth: true},
    component: () => import('./../views/Statistics.vue')
  },
  {
    path: '/admin/history',
    name: 'admin_history',
    meta: { layout: 'main', isAdmin: true },
    component: () => import('./../views/Admin_history.vue')
  },
  {
    path: '/admin/add_dezinfectors',
    name: 'admin_add_dezinfectors',
    meta: { layout: 'main', isAdmin: true },
    component: () => import('./../views/Admin_add_dezinfectors.vue')
  },
  {
    path: '/admin/add_operators',
    name: 'admin_add_operators',
    meta: { layout: 'main', isAdmin: true},
    component: () => import('./../views/Admin_add_operators.vue')
  },
  {
    path: '/admin/statistics',
    name: 'admin_statistics',
    meta: { layout: 'main', isAdmin: true },
    component: () => import('./../views/Admin_statistics.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  const isAdminServer = localStorage.getItem('isAdmin')
  

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      store.dispatch('logout')
      next('/login?message=unauth')
    } else {
      if(isAdminServer == "1"){
        store.dispatch('logout')
        next("/login?message=configure")
      }else{
        next()
      }
    }
  }else if(to.matched.some(record => record.meta.isAdmin)){
    if(isAdminServer == "1"){
      next()
    }
    else{      
      store.dispatch('logout')
      next("/login?message=configure")
    }
  } else {
    next()
  }
})

export default router
