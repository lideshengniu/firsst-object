<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <span class="mars-pannel-item-label">编辑:</span>
      <a-checkbox v-model:checked="formState.enabledShowHide" @change="onChangeShow" title="显示隐藏状态">显示</a-checkbox>
      <a-checkbox v-model:checked="formState.enabledRightMenu" @change="onChangeRightMenu" title="是否绑定右键菜单">右键菜单</a-checkbox>
    </a-space>

    <div class="f-mb f-pt">
      <a-space>
        <span class="mars-pannel-item-label">传感器:</span>
        <mars-button @click="onClickStartDraw">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="onChangeHasEdit">是否编辑</a-checkbox>
      </a-space>
    </div>
  </mars-pannel>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import LayerState from "./layer-state/index.vue"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import * as mapWork from "./map"
import "./style.css"
useLifecycle(mapWork)
const enabledEdit = ref(false)
const onChangeHasEdit = () => {
  mapWork.updateLayerHasEdit(enabledEdit.value)
}

const onClickStartDraw = () => {
  mapWork.startDrawGraphic()
}

interface FormState {
  enabledShowHide: boolean

  enabledRightMenu: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledRightMenu: false
})
// 恢复默认状态
if (mapWork.eventTarget) {
  mapWork.eventTarget.on("defuatData", (item: any) => {
    formState.enabledShowHide = item.enabledShowHide
    formState.enabledRightMenu = item.enabledRightMenu
  })
}

setTimeout(() => {
  const layer = mapWork.getManagerLayer()
  if (layer) {
    formState.enabledShowHide = layer.show

    formState.enabledRightMenu = layer.hasContextMenu()
  }
}, 1000)
function getManagerLayer() {
  if (mapWork.getManagerLayer) {
    return mapWork.getManagerLayer()
  }
  return mapWork.graphicLayer
}
const onChangeShow = () => {
  const layer = getManagerLayer()
  layer.show = formState.enabledShowHide
}
const onChangeRightMenu = () => {
  const layer = getManagerLayer()
  if (formState.enabledRightMenu) {
    if (mapWork.bindLayerContextMenu) {
      mapWork.bindLayerContextMenu()
    }
  } else {
    layer.unbindContextMenu(true)
  }
}
// 获取map.js中定义的需要管理的图层

// 绑定右键
</script>
<style scoped lang="ts"></style>
