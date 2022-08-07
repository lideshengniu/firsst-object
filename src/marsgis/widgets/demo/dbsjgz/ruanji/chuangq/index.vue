<template>
  <mars-dialog title="传感器" top="20" right="60" width="800" bottom="600">
    <a-row :gutter="[8, 25]">
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
            <template v-else-if="column.key === 'cgq'">
              {{ record.cgq }}
            </template>
            <template v-else-if="column.key === 'weizhi'">
              {{ record.weizhi }}
            </template>
            <template v-else>
              {{ record.cgqlx }}
            </template>
          </template>
        </a-table>
      </a-col></a-row
    >
  </mars-dialog>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref, onUnmounted } from "vue"
import type { UnwrapRef } from "vue"
import LayerState from "./layer-state/index.vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"
import { useWidget } from "@mars/common/store/widget"
// import "./style.css"
// useLifecycle(mapWork)
// const enabledEdit = ref(false)
// const onChangeHasEdit = () => {
//   mapWork.updateLayerHasEdit(enabledEdit.value)
// }

interface FormState {
  enabledShowHide: boolean

  enabledRightMenu: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: false,
  enabledRightMenu: false
})
// 恢复默认状态
// if (mapWork.eventTabel) {
//   mapWork.eventTabel.on("defuatData", (item: any) => {
//     formState.enabledShowHide = item.enabledShowHide
//     formState.enabledRightMenu = item.enabledRightMenu
//   })
// }

// setTimeout(() => {
//   const layer = mapWork.getManagerLayer()
//   if (layer) {
//     formState.enabledShowHide = layer.show

//     formState.enabledRightMenu = layer.hasContextMenu()
//   }
// }, 1000)
// function getManagerLayer() {
//   if (mapWork.getManagerLayer) {
//     return mapWork.getManagerLayer()
//   }
//   return mapWork.graphicLayer
// }
// const onChangeShow = () => {
//   const layer = getManagerLayer()
//   layer.show = formState.enabledShowHide
// }
// const onChangeRightMenu = () => {
//   const layer = getManagerLayer()
//   if (formState.enabledRightMenu) {
//     if (mapWork.bindLayerContextMenu) {
//       mapWork.bindLayerContextMenu()
//     }
//   } else {
//     layer.unbindContextMenu(true)
//   }
// }
// 获取map.js中定义的需要管理的图层

// 绑定右键
const { activate, disable, isActivate, updateWidget } = useWidget()
useLifecycle(mapWork)
const rowKeys = ref<string[]>([])
const dataSource = ref([])
const columns = ref([
  {
    title: "传感器",
    dataIndex: "cgq",
    key: "cgq"
  },
  {
    title: "位置",
    dataIndex: "weizhi",
    key: "weizhi"
  },
  {
    title: "传感器类型",
    dataIndex: "cgqlx",
    key: "cgqlx"
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
  dataSource.value = []
  nextTick(() => {
    dataSource.value = event.table

    // @@@@@@@@ 哪些默认选择
    // rowKeys.value =

    // event.table.map((item: any) => item.key)
  })
})
const flyto = (record: any) => {
  mapWork.flyToGraphic(record.key)
  if (record.key === 1) {
    activate("hmscjcgq1")
  }
  if (record.key === 2) {
    activate("hmscjcgq2")
  }
  // activate("zsptc")
}
const deleted = (record: any) => {
  mapWork.deletedGraphic(record.key)
  dataSource.value = dataSource.value.filter((item: any) => item.key !== record.key)

  mapWork.changeTable(dataSource.value)
}
// const showEditor = (e: any) => {
//   const graphic = e.graphic
//   if (!graphic._conventStyleJson) {
//     graphic.options.style = graphic.toJSON().style // 因为示例中的样式可能有复杂对象，需要转为单个json简单对象
//     graphic._conventStyleJson = true // 只处理一次
//   }

//   if (!isActivate("graphic-editor")) {
//     activate({
//       name: "graphic-editor",
//       data: { graphic: graphic }
//     })
//   } else {
//     updateWidget("graphic-editor", {
//       data: { graphic: graphic }
//     })
//   }
// }
// mapWork.eventTabel.on("graphicEditor-start", async (e: any) => {
//   showEditor(e)
// })
// mapWork.eventTabel.on("graphicEditor-update", async (e: any) => {
//   showEditor(e)
// })
mapWork.eventTabel.on("graphicEditor-stop", async (e: any) => {
  setTimeout(() => {
    if (!mapWork.graphicLayer.isEditing) {
      disable("graphic-editor")
    }
  }, 100)
})
</script>
<style scoped lang="ts"></style>
