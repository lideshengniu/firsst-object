import { createApp } from "vue"
// import "./style.css"
import App from "./App.vue"
import MarsUIInstall from "./marsgis/install/index"
import router from "./router"
import { injectState, key } from "@mars/common/store/widget"
import { registerGlobcomp } from "./components/registerGlobComp"
import store from "@mars/widget-store"
import { createPinia } from "pinia"
// import "./style/tailwind.css"
import "./styles/index.less"
import mitt from "mitt"
// import "amfe-flexible"
// import Antd from "ant-design-vue"

// const $bus = {}
// const emitter = mitt()
// $bus.on = emitter.on
// $bus.emit = emitter.emit
// $bus.off = emitter.off
// import mitt from "mitt"

const store2 = createPinia()
const app = createApp(App)
app.config.globalProperties.$bus = mitt()
registerGlobcomp(app)
app.use(MarsUIInstall)
app.use(injectState(store), key)
app.use(store2)
app.use(router)
app.mount("#app")
