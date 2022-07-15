import { createApp } from "vue"
// import "./style.css"
import App from "./App.vue"
import MarsUIInstall from "./marsgis/install/index"
const app = createApp(App)
app.use(MarsUIInstall)
app.mount("#app")
