import { createApp } from "vue"
// import "./style.css"
import App from "./App.vue"
import MarsUIInstall from "./marsgis/install/index"
import router from "./router"
import { registerGlobcomp } from "./components/registerGlobComp"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
// import "./style/tailwind.css"
const app = createApp(App)
registerGlobcomp(app)
app.use(MarsUIInstall)
app.use(router)
app.mount("#app")
