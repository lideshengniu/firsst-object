<template>
  <div class="head">
    <h1>宁芜智慧高速天地一体化感知平台</h1>
    <!-- <div class="showTime">{{ times }}</div> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, Ref } from "vue"
import { string } from "vue-types"

const times: Ref = ref("")
// time
let t = null
t = setTimeout(time, 1000) // 開始运行
function time() {
  clearTimeout(t) // 清除定时器
  const dt = new Date()
  const y = dt.getFullYear()
  const mt = dt.getMonth() + 1
  const day = dt.getDate()
  const h = dt.getHours() // 获取时
  const m = dt.getMinutes() // 获取分
  const s = dt.getSeconds() // 获取秒
  times.value = "当前时间：" + y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒"
  t = setTimeout(time, 1000) // 设定定时器，循环运行
}
// time
console.log(times, "@#@#")
</script>
<style scoped lang="less">
.head {
  background: url(./imgs/head_bg.png) no-repeat top center;
  height: 5rem;
  width: 100vw;
  // position: relative;
  text-align: center;
  background-size: 100% 100%;
  h1 {
    font-size: 3.5rem;
    height: 3.5rem;
    color: #fff;
    text-align: center;
    line-height: 4.5rem;
    letter-spacing: 9px;
    font-family: "system-ui", -apple-system, "Helvetica", Arial, sans-serif;
    margin-left: -15vw;
  }
  .showTime {
    position: absolute;
    right: 2rem;
    // height: rem;
    top: 0.2rem;
    font-size: 1.5rem;
    // background-color: red;
    z-index: 100;
  }
}
</style>
