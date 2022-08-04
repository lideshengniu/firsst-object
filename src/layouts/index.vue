<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :collapsible="false" :style="{ overflow: 'auto' }">
      <Logo></Logo>
      <Menu></Menu>
    </a-layout-sider>
    <a-layout>
      <Heads></Heads>
      <a-layout-content class="layoutcontent">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <map-titles z-index="1000"></map-titles> </component>
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <!-- <router-link to="/Marsgis">跳转a</router-link> -->
        <RouterView />
        <!-- <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">Bill is a cat.</div> -->
      </a-layout-content>
      <!-- <a-layout-footer> nihao </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import marsgis from "@mars/views/index.vue"
import insar from "./insar/index.vue"

import { ref, reactive, Ref, computed, toRaw, markRaw, onUnmounted, onMounted, nextTick, watch, watchEffect } from "vue"
import MapTitles from "../components/title/index.vue"
import { useRouter, useRoute, Router, RouteRecordName } from "vue-router"
import Menu from "./components/AppMenus/AppMenu.vue"
import Logo from "./components/Logo.vue"
import Heads from "./components/Head.vue"
// import { showinsar } from "./insar/index"
import { useWidgetStore, useWidget } from "@mars/common/store/widget"
// onMounted(() => {})

const collapsed = ref<boolean>(false)

const router = useRouter()
const curRoute = useRoute()
let c
// function ismarsgis() {
//   if (curRoute.path === "/" || curRoute.path === "/marsgis") {
//     console.log("xx888888", curRoute.path)
//     return MapTitles
//   } else {
//     console.log("xx888888", curRoute.path, 9999)
//     return null
//   }
// }

/*
  按需切换头部
*/
</script>
<style>
.logo {
  height: 100px;
}
.layoutcontent {
  height: 100%;
  margin-top: 25px;
}
#components-layout-demo-side .logo {
  height: 50px;
  margin: 20px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
