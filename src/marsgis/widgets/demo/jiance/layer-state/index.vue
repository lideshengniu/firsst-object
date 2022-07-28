<template>
  <a-space>
    <span class="mars-pannel-item-label" v-if="props.label !== ''">{{ props.label }}</span>
    <a-checkbox v-model:checked="formState.enabledShowHide" @change="onChangeShow" title="显示隐藏状态">显示</a-checkbox>
    <a-checkbox v-model:checked="formState.enabledRightMenu" @change="onChangeRightMenu" title="是否绑定右键菜单">右键菜单</a-checkbox>
  </a-space>
</template>

<script lang="ts" setup>
/**
 * 公共组件：封装图层状态操作
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2022-01-01
 */
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import { $alert } from "@mars/components/mars-ui/index"
import * as mapWork from "../map"
import useLifecycle from "@mars/common/uses/use-lifecycle"
import mars3d from "mars3d"
useLifecycle(mapWork)
const props = withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: "图层状态:"
  }
)

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
    } else {
      bindLayerContextMenu()
    }
  } else {
    layer.unbindContextMenu(true)
  }
}
// 获取map.js中定义的需要管理的图层
function bindLayerContextMenu() {
  const graphicLayer = getManagerLayer()

  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.startEditing) {
          return false
        }
        return !graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.stopEditing(graphic)
        }
      }
    },
    {
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      icon: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "polyline" ||
          graphic.type === "polylineP" ||
          graphic.type === "curve" ||
          graphic.type === "curveP" ||
          graphic.type === "polylineVolume" ||
          graphic.type === "polylineVolumeP" ||
          graphic.type === "corridor" ||
          graphic.type === "corridorP" ||
          graphic.type === "wall" ||
          graphic.type === "wallP"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        $alert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      icon: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        $alert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      icon: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP" ||
          graphic.type === "scrollWall" ||
          graphic.type === "water"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        $alert("该对象的面积为:" + strArea)
      }
    }
  ])
}
// 绑定右键菜单
</script>
