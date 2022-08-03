<template>
  <div class="container">
    <!-- <div class="left">
      <ul class="left-ul">
        <li @click="gohome()">
          <div class="icons">
            <mars-icon class="icon" width="50" icon="home-two"></mars-icon>
          </div>
          <div class="icon-bottom"></div>
        </li>
        <li @click="showif()">
          <div class="icons"><mars-icon class="icon" width="50" top="5" icon="search"></mars-icon></div>
          <div class="icon-bottom"></div>
        </li>
        <li @click="showpoint()">
          <div class="icons"><mars-icon width="50" icon="radar" class="icon"></mars-icon></div>
          <div class="icon-bottom"></div>
        </li>
      </ul>
    </div> -->
    <div class="middle">
      <div class="logo">宁芜智慧高速天地一体化感知平台</div>
      <div class="middle-line"></div>
    </div>
    <!-- <div class="right">
      <div class="time">时间：{{ map.dataTime }}</div>
      <div v-bind="map.dataTime"></div>
      <div class="right-icon">
        <mars-icon width="50" class="icon" icon="sun-one"></mars-icon>
      </div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import mars3d from "mars3d"
import marsIcon from "@mars/components/mars-ui/mars-icon/index.vue"
import { useWidgetStore, useWidget } from "@mars/common/store/widget"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import { ref, onMounted, onUnmounted, Ref } from "vue"
import * as map from "./map"
import { useStore } from "vuex"
import { key } from "@mars/common/store/test"
import * as mapWork from "./index"
onUnmounted(() => {
  disableAll(true)
})
// useLifecycle(mapWork)
function gohome() {
  mapWork.flyhome()
  // map.map.flyToPoint([103.022327, 26.592335])
}
let trueif = true
const showif = () => {
  trueif = !trueif
  console.log("trueif")
  console.log(trueif)
  if (trueif) {
    activate("query-poi")
  } else {
    disable("query-poi")
  }
}

let showpoints
showpoints = false
const showpoint = () => {
  showpoints = !showpoints
  console.log("trueif")
  console.log(trueif)
  if (showpoints) {
    activate("toolbar")
  } else {
    disable("toolbar")
  }
}
// const layers = mapWork.getLayers()
// console.log(layers, "layers")
const store = useStore(key)
const { activate, disableAll, disable } = useWidget()
// activate("line")
console.log(store)
let timer
const widgetStore = useWidgetStore()
// const a = widgetStore.state.testModule.really

onMounted(() => {
  timer = setInterval(() => {
    map.getNowTime()
  }, 1000)
})
onUnmounted(() => {
  // 清理定时器要处理 timer 的类型
  clearInterval(Number(timer))
})
// time =
</script>
<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  border-left: 1px solid #008aff70;
  border-right: 1px solid #008aff70;
  background: url(./imgs/head_bg.png) no-repeat top center;
  // background-color: @mars-primary-color-self;
  background-size: 1px 10px, 10px 1px, 1px 10px, 10px 1px;
  // background-color: @mars-primary-color-self;
  .left {
    height: 100vh;
    width: 20%;
    // color: @mars-primary-color;
    // display: flex;
    border-right: 4px solid skyblue;
    // background-color: @mars-primary-color-self;
    box-shadow: 0px 4px 7px 5px skyblue;
    .left-ul {
      display: flex;
      justify-content: space-around;
      // background-color: red;
      height: 8vh;
      li {
        display: flex;
        flex-direction: column;
        .icons {
          height: 80px;
          // background-color: rgba(135, 206, 235, 1);
          width: 80px;
          margin-top: 10px;
          .icon {
            margin-left: 15px;
          }
        }
        .icon-bottom {
          height: 2px;
          // background-color: red;
          // background-color: rgba(135, 206, 235, 1);
          // box-shadow: 0px 0px 7px 3px skyblue, 0px 0px 7px 3px rgb(0 251 255);
          border-radius: 40px / 70px;
          border-top: none;
        }
        &:hover {
          // background-color: rgb(141, 241, 241);
          // border-bottom: 10px;
          // border-bottom:rgb(108, 178, 199) 5px solid;
          box-shadow: 500px rgba(69, 128, 184, 0.3);
          background-image: repeating-linear-gradient(to top, rgba(122, 148, 153, 0.1), rgba(79, 223, 233, 0.8));
          .icon-bottom {
            width: 85px;
            //  border: solid 3px rgb(10, 202, 236);
            height: 2px;
            background-color: rgba(135, 206, 235, 1);

            box-shadow: 0px 0px 7px 3px skyblue, 0px 0px 7px 4px rgb(11, 65, 66);
            border-radius: 40px / 70px;
            border-top: none;
          }
        }
      }
    }
  }
  .middle {
    // font-size: 10rem;
    width: 100%;
    // background-color: green;
    height: 7rem;
    line-height: 10vh;
    // background-color: @mars-primary-color-self;
    z-index: 100;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-items: center;
    .logo {
      height: 70px;
      line-height: 70px;
      // background-color: red;
      font-size: 3.5rem;
      color: aliceblue;
      // text-transform: uppercase;
      letter-spacing: 9px;
      text-align: center;
      // margin-top: -15px;
      font-family: "system-ui", -apple-system, "Helvetica", Arial, sans-serif;
    }
    .middle-line {
      // background-color: green;
      width: 450px;
      height: 8px;
      background-image: linear-gradient(to right, rgba(55, 170, 190, 0.1), rgba(116, 177, 187, 0.8), rgba(55, 170, 190, 0.1));
      box-shadow: 0px 0px 7px 1px skyblue;
      // margin-top: -15px;
    }
  }
  .right {
    // background-color: @mars-primary-color-self;
    height: 100vh;
    width: 30%;
    border-left: 4px solid skyblue;
    box-shadow: 0px 4px 15px 10px skyblue;
    display: flex;
    justify-content: space-around;
    // background-color: red;s
    .time {
      font-size: 20px;
      line-height: 80px;
      height: 80px;
      // background-color: green;
      margin-left: 0px;
    }
    .right-icon {
      // background-color: green;
      text-align: center;
      line-height: 80px;
      height: 80px;
      // background-color: rgba(135, 206, 235, 1);
      width: 60px;
      margin-top: 10px;
    }
  }
}
</style>
