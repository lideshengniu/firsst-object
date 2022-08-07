<template>
  <!-- <teleport to="body" v-if="true"><shili></shili> </teleport> -->
  <teleport to="body" v-if="Test.shili"><shili></shili> </teleport>
  <teleport to="body" v-if="Test.gys"><imgee></imgee> </teleport>

  <a-table
    :columns="columns"
    :dataSource="data"
    size="middle"
    style="background-color: skyblue; font-size: 15; color: red !important"
    :pagination="{ pageSize: 3 }"
    :width="8"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>工点信息</span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a href="javascript:;" @click="showmessage(record)">{{ record.name }}</a>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { Snowman } from "@icon-park/svg"
import imgee from "./son/index.vue"
import shili from "./son/shili.vue"
import { ref, nextTick } from "vue"
import { useTestStore } from "@/store/sy/index"
const Test = useTestStore()
const columns = ref([
  {
    title: "工点信息",
    dataIndex: "name",
    key: "name",
    with: "25%"
  },
  {
    title: "位置",
    dataIndex: "weizhi",
    key: "weizhi",
    width: "45%"

    // ellipsis: true
  },
  {
    title: "状态",
    key: "tags",
    dataIndex: "tags",
    width: "30%"
  }
])
const data = ref([
  { key: "1", name: "示例1", weizhi: "Kxx+xxx-Kxx+xxx", tags: "预警" },
  {
    key: "8",
    name: "葛羊山",
    weizhi: "32",
    tags: "正常"
  },
  {
    key: "2",
    name: "马鞍山北互通",
    weizhi: "K43+200~k44+500",
    tags: "正常"
  },
  {
    key: "3",
    name: "太白服务器右侧",
    weizhi: "K43+200~k44+500",
    tags: "正常"
  },
  {
    key: "4",
    name: "黄梅山隧道",
    weizhi: "K43+200~k44+500",
    tags: "正常"
  },
  {
    key: "5",
    name: "钟山排土场",
    weizhi: "Y6K59+600-Y6K60+500右侧",
    tags: "正常"
  },
  {
    key: "6",
    name: "大青山尾矿库",
    weizhi: "宁芜高速K54+200-K55+600段右侧",
    tags: "正常"
  },
  {
    key: "7",
    name: "大青山尾矿库",
    weizhi: "宁芜高速K54+200-K55+600段右侧",
    tags: "正常"
  }
])
const gys = ref(false)

const showmessage = (record: any) => {
  if (record.name === "示例1") {
    Test.shili = !Test.shili
  }
  if (record.name === "葛羊山") {
    Test.gys = !Test.gys
  }
}

// const gysshow = () => {}
// function rowclick(record, index) {
//   return (gys.value = true)
// }
// <!-- :customRow="rowclick('name', 1)" -->
</script>
<style scoped lang="less">
.test2 {
  width: 100%;
  height: 100%;
  background-color: red;
}
.ant-table-row {
  border-bottom: 5px solid #b88e8e !important;
  background-color: red !important;
  transition: none !important;
}
</style>
