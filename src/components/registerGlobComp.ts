import type { App } from "vue"
import { Layout, Input, Table } from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
export function registerGlobcomp(app: App) {
  app.use(Input).use(Layout).use(Table)
}
