import { components } from "@mars/components/mars-ui/mars-gui"
import { RouteRecordRaw, RouterView } from "vue-router"

const routes: RouteRecordRaw = {
  path: "/chart",
  component: () => import("@/views/chart/index.vue")
}
export default routes
