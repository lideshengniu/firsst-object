<template>
  <!-- <teleport to="body"><div class="bbody"></div></teleport> -->
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1" class="menu-item" @click="sy">
      <pie-chart-outlined />
      <span>首页</span>
    </a-menu-item>
    <a-menu-item key="12" class="menu-item">
      <WarningOutlined />
      <!-- style="font-size: 25px !important" -->
      <span @click="insarsjgz">InSAR数据感知</span>
    </a-menu-item>
    <a-sub-menu key="sub3" class="menu-item">
      <template #title>
        <span>
          <AreaChartOutlined />
          <span>地表数据感知</span>
        </span>
      </template>
      <a-menu-item key="6" @click="gbp()">高边坡</a-menu-item>
      <a-menu-item key="7" @click="tdql()">特大桥梁</a-menu-item>
      <a-menu-item key="8" @click="shruanji()">深厚软基</a-menu-item>
      <!-- <a-menu-item key="8" @click="MineSee()">分析</a-menu-item> -->
    </a-sub-menu>
    <a-sub-menu key="sub4" class="menu-item">
      <template #title>
        <span>
          <team-outlined />
          <span>数据应用</span>
        </span>
      </template>
      <a-sub-menu key="sub5" class="menu-item">
        <template #title>
          <span>
            <!-- <team-outlined /> -->
            勘察设计阶段
          </span>
        </template>
        <a-menu-item key="116" @click="dzks()">对症勘设</a-menu-item>
        <!-- <a-menu-item key="8" @click="MineSee()">特大桥梁</a-menu-item>
        <a-menu-item key="9" @click="MineSee()">深厚软基</a-menu-item> -->
        <!-- <a-menu-item key="8" @click="MineSee()">分析</a-menu-item> -->
      </a-sub-menu>
      <a-sub-menu key="sub6" class="menu-item">
        <template #title>
          <span>
            <!-- <team-outlined /> -->
            施工阶段
          </span>
        </template>

        <a-menu-item key="10" @click="bpkw()">边坡开挖监测</a-menu-item>
        <a-menu-item key="101" @click="rjyy()">软基预压效果</a-menu-item>
        <!-- <a-menu-item key="8" @click="MineSee()">特大桥梁</a-menu-item>
        <a-menu-item key="9" @click="MineSee()">深厚软基</a-menu-item> -->
        <!-- <a-menu-item key="8" @click="MineSee()">分析</a-menu-item> -->
      </a-sub-menu>
      <a-sub-menu key="sub7" class="menu-item">
        <template #title>
          <span>
            <!-- <team-outlined /> -->
            运营阶段
          </span>
        </template>

        <a-menu-item key="11" @click="bxyy()">靶向管养</a-menu-item>
        <a-sub-menu key="sub16" class="menu-item">
          <template #title>
            <span>
              <!-- <team-outlined /> -->
              监测预警
            </span>
          </template>

          <a-menu-item key="1000">桥梁</a-menu-item>
          <a-menu-item key="1001" @click="yyjdjcyjbp()">边坡</a-menu-item>
          <a-menu-item key="1002" @click="yyjdjceyjrj()">软基</a-menu-item>
          <a-menu-item key="1003">尾矿坝</a-menu-item>
          <!-- <a-menu-item key="8" @click="MineSee()">特大桥梁</a-menu-item>
        <a-menu-item key="9" @click="MineSee()">深厚软基</a-menu-item> -->
          <!-- <a-menu-item key="8" @click="MineSee()">分析</a-menu-item> -->
        </a-sub-menu>
        <!-- <a-menu-item key="8" @click="MineSee()">特大桥梁</a-menu-item>
        <a-menu-item key="9" @click="MineSee()">深厚软基</a-menu-item> -->
        <!-- <a-menu-item key="8" @click="MineSee()">分析</a-menu-item> -->
      </a-sub-menu>
      <!-- <a-menu-item key="6" @click="Mine()">高边坡</a-menu-item>
      <a-menu-item key="8" @click="MineSee()">特大桥梁</a-menu-item>
      <a-menu-item key="10" @click="MineSee()">深厚软基</a-menu-item> -->
      <!-- <a-menu-item key="8" @click="MineSee()">分析</a-menu-item> -->
    </a-sub-menu>
    <a-menu-item key="122" class="menu-item">
      <user-outlined />
      <!-- style="font-size: 25px !important" -->
      <span>用户管理</span>
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts">
import { Emitter } from "mitt"
import { useRouter, useRoute, Router, RouteRecordName } from "vue-router"
import { ref, reactive, Ref, computed, toRaw, markRaw, onUnmounted, onMounted, nextTick, watch, watchEffect } from "vue"
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  EnvironmentOutlined,
  WarningOutlined,
  AreaChartOutlined
} from "@ant-design/icons-vue"
// import { showinsar } from "./insar/index"
import { useWidgetStore, useWidget } from "@mars/common/store/widget"
import { useTestStore } from "@/store/xx/index"
const Test = useTestStore()
const selectedKeys = ref<string[]>(["2"])
const router = useRouter()
const curRoute = useRoute()
const { activate, isActivate, disable, disableAll } = useWidget()
const gaopo = ref("gaopo")
const file = ref("file")
const Mine = ref("Mine")
const road = ref("road")
const bridge = ref("bridge")
const insarsjgz = () => {
  Test.showechart()
  disableAll(true)
  activate("demo-manage-layers")
  activate("insarsjgzechart")
  activate("insarsjgzallroad")
}
const sy = () => {
  Test.showinsar()
  disableAll(true)
  activate("toolbar")
}
const shruanji = () => {
  console.log(1)
  Test.showechart()
  disableAll(true)

  activate("rjcjqx")
  activate("rjcgq")
  // activate("road")
  activate("dbsjgzgdb")
}
const bpkw = () => {
  Test.showechart()
  disableAll(true)
  // disableAll(true)
  activate("bpkw")
}
const rjyy = () => {
  Test.showechart()
  disableAll(true)
  activate("rjyy")
}
function dzks() {
  Test.showechart()
  disableAll(true)
  activate("dzks")
}

const gbp = () => {
  Test.showechart()
  disableAll(true)
  activate("dbsjgzgbpcgq")
  activate("dbsjgzgbplayer")
  activate("dbsjgzgbpgdb")
}
const tdql = () => {
  Test.showechart()
  disableAll(true)
  activate("dbsjgztdqlcgq")
  activate("dbsjgztdqllayer")
  activate("dbsjgztdqlgdb")
}
const bxyy = () => {
  Test.showechart()
  disableAll(true)

  activate("bxyy")
  activate("bxyydt")
}
// const jcbp = () => {
//   Test.showechart()
//   disableAll(true)
//   activate("jcbp")
// }
// const showgbp = ref(false)
function yyjdjceyjrj() {
  Test.showechart()
  disableAll(true)
  activate("yyjdjceyjrj")
  activate("yyjdjceyjrjys")
  activate("yyjdjceyjrjcgq")
  activate("yyjdjcyjrjditu")
}
function yyjdjcyjbp() {
  Test.showechart()
  disableAll(true)
  activate("yyjdjcyjbpcgq")
  activate("yyjdjcyjbpditu")
  activate("yyjdjcyjbpyujing")
  activate("yyjdjcyjbp")
}
// const tochart = function () {
//   router.push("./chart")
// }

// function tomap() {
//   router.push("./marsgis")
// }
console.log("yes")
// function showinsar() {}
const buildshow = ref(false)
function Building() {
  buildshow.value = !buildshow.value
  if (buildshow.value) {
    activate("file")
  } else {
    disable("file")
  }
}
const sensorsshow = ref(false)
function Sensors() {
  sensorsshow.value = !sensorsshow.value
  if (sensorsshow.value) {
    activate("jiance")
  } else {
    disable("jiance")
  }
}
const mineshow = ref(false)

const mineshows = ref(false)
function MineSee() {
  mineshows.value = !mineshows.value
  if (mineshows.value) {
    activate("road")
  } else {
    disable("road")
  }
}
// const showAreas = ref(false)

// function showinsar(show: boolean): void {}
</script>
<style scoped lang="less">
.menu-item {
  font-size: 15px !important;
  margin-top: 40px !important;
  /* color: rgb(35, 99, 219) !important; */
}
.bbody {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  /* 100%的窗口高度 */
  height: 100vh;
  /* 弹性布局 水平+垂直居中 */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* 渐变背景 */
  background-color: aqua;
}
</style>
