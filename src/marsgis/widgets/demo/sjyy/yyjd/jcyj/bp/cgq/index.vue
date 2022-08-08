<template>
  <mars-pannel :visible="true" left="10" top="250" height="200" width="200">
    <a-row :gutter="[5, 25]">
      <a-col :span="24">
        <a-table :pagination="false" :row-selection="rowSelection" :dataSource="dataSource" :columns="columns" size="small" bordered>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'cgqlx'">
              {{ record.cgqlx }}
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </mars-pannel>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, onUnmounted } from "vue"
import * as mapWork from "./map"
import useLifecycle from "@mars/common/uses/use-lifecycle"
useLifecycle(mapWork)
const rowKeys = ref<string[]>([])
// const Source = ref([])
const dataSource = ref([])
const columns = ref([
  {
    title: "传感器类型",
    dataIndex: "cgqlx",
    key: "cgqlx"
  }
])
interface TableItem {
  key: number
  cgqlx: string
}
const rowSelection = ref({
  hideSelectAll: true,
  hideDefaultSelections: true,
  selectedRowKeys: rowKeys,
  onChange: (selectedRowKeys: string[]) => {
    // 使得点击之后选项改变
    rowKeys.value = selectedRowKeys
  },
  onSelect: (record: TableItem, selected: boolean) => {
    // if(record.cgqlx === '地表传感器')
    mapWork.showHideArea(record.key, selected)
  }
})
mapWork.eventTabel.on("tableObject", function (event: any) {
  dataSource.value = []
  console.log("aaaaasdas", event.table)
  nextTick(() => {
    dataSource.value = event.table
    console.log("这里", dataSource.value)
    // rowKeys.value = event.table.map((item: any) => item.key)
  })
})
</script>
<style scoped></style>
