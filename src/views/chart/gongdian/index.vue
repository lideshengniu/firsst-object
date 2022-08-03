<template>
  <a-table :columns="columns" :dataSource="data" size="small">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>工点信息</span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>{{ record.name }}</a>
      </template>
      <template v-else-if="column.key === 'weizhi'">
        <a> {{ record.weizhi }}</a>
      </template>
      <!-- <template v-else-if="column.key === 'tags'">
        <a> {{ record.tag }}</a>
      </template> -->

      -->
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { ref } from "vue"
const columns = ref([
  {
    title: "工点信息",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "位置",
    dataIndex: "weizhi",
    key: "weizhi",
    width: 150
    // ellipsis: true
  },
  {
    title: "状态",
    key: "tags",
    dataIndex: "tags"
  }
])
const data = ref([
  {
    key: "1",
    name: "戚山铁矿采场",
    weizhi: "32",
    tags: "正常"
  },
  {
    key: "2",
    name: "戚山铁矿采场",
    weizhi: "K43+200~k44+500",
    tags: "正常"
  },
  {
    key: "3",
    name: "戚山铁矿采场",
    weizhi: "K43+200~k44+500",
    tags: "正常"
  }
])
</script>
<style scoped lang="less"></style>
