<template>
  <mars-dialog right="10" top="10" width="360" bottom="50">
    <a-row :gutter="[5, 25]">
      <a-col :span="24">
        <a-table :pagination="false" :row-selection="rowSelection" :dataSource="dataSource" :columns="columns" size="small" bordered>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'caozuo'">
              <a-space>
                <mars-button type="link">
                  <mars-icon icon="move-one" color="#f2f2f2" class="icon-vertical-a" @click="flyto(record)" />
                </mars-button>
                <mars-button type="link">
                  <mars-icon icon="delete" color="#f2f2f2" class="icon-vertical-a" @click="deleted(record)" />
                </mars-button>
              </a-space>
            </template>
            <template v-else>
              {{ record.name }}
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </mars-dialog>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref, onUnmounted } from "vue"
import type { UnwrapRef } from "vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"
import { useWidget } from "@mars/common/store/widget"
const { activate, disable, isActivate, updateWidget } = useWidget()
useLifecycle(mapWork)
const rowKeys = ref<string[]>([])
const dataSource = ref([])
const columns = ref([
  {
    title: "高边坡",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    key: "caozuo",
    width: 80
  }
])
interface TableItem {
  key: number
  name: string
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
    mapWork.showHideArea(record.key, selected)
  }
})
mapWork.eventTabel.on("tableObject", function (event: any) {
  // dataSource.value = []

  nextTick(() => {
    dataSource.value = event.table
    rowKeys.value = event.table.map((item: any) => item.key)
    console.log("这里", event.table)
  })
})
const flyto = (record: any) => {
  mapWork.flyToGraphic(record.key)
}
const deleted = (record: any) => {
  mapWork.deletedGraphic(record.key)
  dataSource.value = dataSource.value.filter((item: any) => item.key !== record.key)

  mapWork.changeTable(dataSource.value)
}
const showEditor = (e: any) => {
  const graphic = e.graphic
  if (!graphic._conventStyleJson) {
    graphic.options.style = graphic.toJSON().style // 因为示例中的样式可能有复杂对象，需要转为单个json简单对象
    graphic._conventStyleJson = true // 只处理一次
  }

  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: { graphic: graphic }
    })
  } else {
    updateWidget("graphic-editor", {
      data: { graphic: graphic }
    })
  }
}
mapWork.eventTabel.on("graphicEditor-start", async (e: any) => {
  showEditor(e)
})
mapWork.eventTabel.on("graphicEditor-update", async (e: any) => {
  showEditor(e)
})
mapWork.eventTabel.on("graphicEditor-stop", async (e: any) => {
  setTimeout(() => {
    if (!mapWork.graphicLayer.isEditing) {
      disable("graphic-editor")
    }
  }, 100)
})
</script>
<style scoped></style>
