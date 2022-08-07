<template>
  <!-- <mars-dialog left="10" top="10" height="200" width="200"> </mars-dialog> -->
  <mars-dialog right="10" top="10" height="250">
    <div class="yj">红色预警</div>
    <!-- <div class="yj"></div> -->
    <a-from class="xinxi">
      <!-- <a-form-item label="预警信息:"> </a-form-item> -->
      <a-form-item label="预警信息:">
        边坡整体处于黄色预警状态，重点关注部位为大桩号Kxx+xxx右侧n1~m1米
        <!-- <mars-color-picker :value="reds" /> -->
      </a-form-item>
    </a-from>
  </mars-dialog>
</template>
<script lang="ts">
import { ref, reactive } from "vue"
import dayjs, { Dayjs } from "dayjs"
const reds = ref("red")
interface FormState {
  areaColor: string
}
const formState = reactive<FormState>({
  areaColor: "red"
})
</script>
<style scoped>
.red {
  width: 100%;
  height: 100%;
  background-color: red;
}
.yj {
  text-align: center;
  color: rgb(221, 248, 68);
  /* align-items: center; */
  font-size: larger;
  height: 30px;
  line-height: 30px;
  width: 100%;
  background-color: red;
}
.xinxi {
  width: 100%;
  background-color: rgb(83, 218, 218);
}
</style>
