<template>
  <mars-dialog right="650" top="100" width="700" bottom="100" title="黄梅山高边坡介绍"
    ><div>
      <img class="imgdemo" src="@photo/img/bpkw/hmss.png" />
      <li class="words" id="cardtext">
        <h1 class="a">现状：<span class="b"> 黄梅山隧道</span></h1>
        <h1 class="a">
          本次改建设计：
          <span class="b"
            >隧改堑，本段边坡最大开挖高度59.3米，七级坡，长约350m，设计坡率1:1.0，边坡岩性以全-强风化闪长玢岩为主，节理裂隙发育，完整性较差。设计中坡面以锚杆锚索+10m宽平台方案进行支护设计。</span
          >
        </h1>
        <h1 class="a">管理措施：<span class="b">加强施工及运营期边坡状态感知</span></h1>
      </li>
    </div></mars-dialog
  >
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
#card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 200px;
  box-shadow: 0 4px 8px 0 #aaa;
  font-size: 40px;
  text-align: center;
  background-color: #fff;
  border-radius: 3%;
}

.imgdemo {
  text-align: center;
  margin-left: 30px;
  line-height: 25rem;
  width: 90%;
  height: 25rem;
  padding: 5px;
}

#cardtext {
  padding: 2%;
  font-size: 10px;
}
.a {
  font-size: 20px;
  color: red;
}
.b {
  color: rgb(58, 148, 184);
}
</style>
