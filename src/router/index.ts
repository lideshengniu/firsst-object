import { createRouter, createWebHistory, createMemoryHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  // { path: "/" },
  {
    name: "marsgiss",
    path: "/",
    redirect: "/marsgis",

    meta: { headname: "insar" }
  },
  {
    name: "marsgis",
    path: "/marsgis",
    component: () => import("@mars/views/index.vue"),
    meta: { headname: "insar" }
  },
  {
    name: "chart",
    path: "/chart",
    component: () => import("../views/chart/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导出router
export default router
