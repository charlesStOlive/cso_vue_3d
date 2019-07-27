import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store/'
//
// import guest from './middleware/guest'
// import auth from './middleware/auth'
// import isSubscribed from './middleware/isSubscribed'
// import base3d from './middleware/base3d'
//
import middlewarePipeline from './middlewarePipeline'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/scenes',
    name: 'scenes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Scenes.vue')
  }
  ]
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
