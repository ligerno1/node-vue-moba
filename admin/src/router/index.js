import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Main from '../views/Main'
import CategoriesCreate from '../views/CategoriesCreate'
import CategoriesList from '../views/CategoriesList'
import GoodsCreate from '../views/GoodsCreate'
import GoodsList from '../views/GoodsList'
import HeroesCreate from '../views/HeroesCreate'
import HeroesList from '../views/HeroesList'
import ArticlesCreate from '../views/ArticlesCreate'
import ArticlesList from '../views/ArticlesList'
import AdCreate from '../views/AdCreate'
import AdList from '../views/AdList'
import AdminUsersCreate from '../views/AdminUsersCreate'
import AdminUsersList from '../views/AdminUsersList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isPublic: true } 
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: CategoriesCreate
      },
      {
        path: '/categories/edit/:id',
        component: CategoriesCreate,
        props: true
      },
      {
        path: '/categories/list',
        component: CategoriesList
      },

      {
        path: '/goods/create',
        component: GoodsCreate
      },
      {
        path: '/goods/edit/:id',
        component: GoodsCreate,
        props: true
      },
      {
        path: '/goods/list',
        component: GoodsList
      },

      {
        path: '/heroes/create',
        component: HeroesCreate
      },
      {
        path: '/heroes/edit/:id',
        component: HeroesCreate,
        props: true
      },
      {
        path: '/heroes/list',
        component: HeroesList
      },

      {
        path: '/articles/create',
        component: ArticlesCreate
      },
      {
        path: '/articles/edit/:id',
        component: ArticlesCreate,
        props: true
      },
      {
        path: '/articles/list',
        component: ArticlesList
      },

       {
        path: '/ads/create',
        component: AdCreate
      },
      {
        path: '/ads/edit/:id',
        component: AdCreate,
        props: true
      },
      {
        path: '/ads/list',
        component: AdList
      },

      {
        path: '/admin_users/create',
        component: AdminUsersCreate
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUsersCreate,
        props: true
      },
      {
        path: '/admin_users/list',
        component: AdminUsersList
      },
    ]
  }
]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  
  next()
})

export default router
