<template>
  <div class="ni" v-if="Test.shili">
    <!-- <div class="ni" v-if="true"> -->
    <ul class="text">
      <li class="a">
        <h1 class="b">工点介绍</h1>
        <br />
        <div class="c">此为示例1工点介绍</div>
      </li>
      <div class="line"></div>
      <li class="a">
        <h1 class="b">异常信息</h1>
        <br />
        <div class="c">此为工点1异常信息显示处，仅作示例用</div>
      </li>
      <!-- <img src="../imgs/gys.png" /> -->
    </ul>
    <div class="bt" @click="noshow()">关 闭</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useTestStore } from "@/store/sy/index"
const Test = useTestStore()

// const shows = ref(true)
const noshow = () => {
  Test.shili = !Test.shili
}
</script>
<style scoped lang="less">
.ni {
  /* 初始化 取消内外边距 */
  // width: 100;
  position: absolute;
  display: flex;
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
  background-color: rgba(43, 199, 199, 0.2);
  /* 指定背景图像的大小 */
  background-size: 500%;
  /* 执行动画方法 : 动画名 时长 线性的 无限次播放 */
  /* animation: bgAnimation 15s linear infinite; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.text {
  display: flex;
  margin-top: 20px;
  color: rgba(106, 224, 199, 0.7);
  font-size: 30px;
  /* 字间距 */
  letter-spacing: 15px;
  text-align: center;
  .a {
    background-image: linear-gradient(rgba(116, 240, 219, 0.9) 35%, rgb(84, 168, 247) 65%);
    width: 20vh;
    height: 20vw;
    font-size: 3rem;
    .b {
      font-size: 2.2rem;
      .c {
        font-size: 1rem;
        letter-spacing: 2px;
      }
    }
  }
}
.bt {
  /* background-color: red; */
  font-size: 5vh;
  text-align: center;
  margin-top: 20px;
  width: 30vw;
  height: 10vh;
  letter-spacing: 2vw;
  border-radius: 40px;
  background-color: rgba(23, 62, 192, 0.5);
  &:hover {
    background-color: rgba(9, 23, 70, 0.4);
  }
}
.line {
  width: 1rem;
  height: 100%;
}
/* 定义动画 */
/* @keyframes bgAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
} */
</style>
