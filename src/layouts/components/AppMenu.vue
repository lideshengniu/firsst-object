<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1" class="menu-item" @click="tochart()">
      <pie-chart-outlined />
      <span>沉降图</span>
    </a-menu-item>
    <a-menu-item key="2" class="menu-item" @click="tomap">
      <environment-outlined />
      <span>地图</span>
    </a-menu-item>
    <a-sub-menu key="sub1" class="menu-item">
      <template #title>
        <span>
          <user-outlined />
          <span>图组</span>
        </span>
      </template>
      <a-menu-item key="6" @click="showinsar">insar</a-menu-item>
      <a-menu-item key="4">Bill</a-menu-item>
      <a-menu-item key="5">Alex</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2" class="menu-item">
      <template #title>
        <span>
          <team-outlined />
          <span>Team</span>
        </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="9" class="menu-item">
      <file-outlined />
      <!-- style="font-size: 25px !important" -->
      <span>File</span>
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts">
import { useRouter, useRoute, Router, RouteRecordName } from "vue-router"
import { ref, reactive, Ref, computed, toRaw, markRaw, onUnmounted, onMounted, nextTick, watch, watchEffect } from "vue"
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined, EnvironmentOutlined } from "@ant-design/icons-vue"
// import { showinsar } from "./insar/index"
import { useWidgetStore, useWidget } from "@mars/common/store/widget"
const selectedKeys = ref<string[]>(["2"])
const router = useRouter()
const curRoute = useRoute()
const { activate, isActivate, disable } = useWidget()
const tochart = function () {
  router.push("./chart")
}

function tomap() {
  router.push("./marsgis")
}
console.log("yes")
function showinsar() {
  activate("demo-manage-layers")
}
const showinsars = false
// function showinsar(show: boolean): void {}
</script>
<style scoped lang="less">
.menu-item {
  font-size: 15px !important;
  margin-top: 40px !important;
  /* color: rgb(35, 99, 219) !important; */
}
</style>
