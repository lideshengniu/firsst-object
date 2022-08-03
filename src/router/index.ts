import { createRouter, createWebHistory, createMemoryHistory, RouteRecordRaw, createWebHashHistory } from "vue-router"
import ChartRoute from "./module/index"
const routes: Array<RouteRecordRaw> = [
  // { path: "/" },
  {
    // name: "marsgiss",
    path: "/",
    redirect: "/chart",
    meta: { headname: "insar" }
  },
  // {
  //   name: "marsgis",
  //   path: "/marsgis",
  //   component: () => import("@mars/views/index.vue"),
  //   meta: { headname: "insar" }
  // },
  ChartRoute
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导出router
export default router
