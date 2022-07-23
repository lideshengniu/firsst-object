<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" style="background: red"></div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1" class="menu-item">
          <pie-chart-outlined />
          <span style="font-size: 25px !important">沉降图</span>
        </a-menu-item>
        <a-menu-item key="2" class="menu-item" @click="tomap">
          <environment-outlined />
          <span style="font-size: 25px !important">地图</span>
        </a-menu-item>
        <a-sub-menu key="sub1" class="menu-item">
          <template #title>
            <span>
              <user-outlined />
              <span style="font-size: 25px !important">图组</span>
            </span>
          </template>
          <a-menu-item key="6" @click="showinsar">insar</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2" class="menu-item">
          <template #title>
            <span style="font-size: 25px !important">
              <team-outlined />
              <span style="font-size: 25px !important">Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9" class="menu-item">
          <file-outlined />
          <span style="font-size: 25px !important">File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: rgba(55, 170, 190, 0.8); padding: 0; margin-bottom: -25px">
        <!-- <component :is="m"> </component> -->
        <MapTitles></MapTitles>
      </a-layout-header>
      <a-layout-content style="margin: 25px 0px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <map-titles z-index="1000"></map-titles> </component>
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <!-- <router-link to="/Marsgis">跳转a</router-link> -->
        <RouterView />
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">Bill is a cat.</div>
      </a-layout-content>
      <a-layout-footer> nihao </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import marsgis from "@mars/views/index.vue"
import header from "./head/index.vue"
import insar from "./insar/index.vue"
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined, EnvironmentOutlined } from "@ant-design/icons-vue"
import { ref, reactive, Ref, computed, toRaw, markRaw, onUnmounted, onMounted } from "vue"
import MapTitles from "../components/title/index.vue"
import { useRouter, Router, RouteRecordName } from "vue-router"
// import { showinsar } from "./insar/index"
import { useWidgetStore, useWidget } from "@mars/common/store/widget"
onMounted(() => {
  const a = useRouter()
  console.log(a, "a")
})
const selectedKeys = ref<string[]>(["2"])
const collapsed = ref<boolean>(true)
const router = useRouter()
console.log("/", router.currentRoute.value.fullPath)
// .currentRoute.fullPath
// console.log("router", a)
let ismarsgis: string

// const a = toRaw(router).currentRoute.value.fullPath
// let comName
// console.log("ismarsgis", ismarsgis)
// const m = computed<string>(() => {
//   if (ismarsgis === ("/" || "/marsgis")) {
//     comName = markRaw(MapTitles)
//   } else {
//     comName = 0
//   }
//   return comName
// })
/*
  按需切换头部
*/
let a: Ref
const { activate, isActivate, disable } = useWidget()
function tochart() {
  router.push("./chart")
  a.value = false
  console.log("a", a)
}
console.log("aa", a)
function tomap() {
  router.push("./marsgis")
  a.value = true
}
console.log("yes")
function showinsar() {
  activate("demo-manage-layers")
}
const showinsars = false
// function showinsar(show: boolean): void {}
</script>
<style>
.logo {
  height: 100px;
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
.menu-item {
  font-size: 15px !important;
  margin-top: 40px !important;
  /* color: rgb(35, 99, 219) !important; */
}
</style>
