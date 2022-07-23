import type { App } from "vue"
import { Layout, Input } from "ant-design-vue"
export function registerGlobcomp(app: App) {
  app.use(Input).use(Layout)
}
