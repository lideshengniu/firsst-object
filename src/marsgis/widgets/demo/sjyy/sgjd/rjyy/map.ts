import { Maya } from "@icon-park/svg"
import * as mars3d from "mars3d"
import { useWidget } from "@mars/common/store/widget"
import { mapOptions } from "@/components/title"

export let graphicLayer
export let map
export const eventTabel = new mars3d.BaseClass()
let btroad
let threed
/** const btroad
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance
  // btroad = map.getLayerById(10002)
  // btroad.show = true
  // map.addLayer(btroad)
  map.getLayerById(10001).show = true
  map.flyToPoint([118.538492, 31.602902], { pitch: -45, radius: 80000, heading: 0, roll: 90 })
  // const insar = map.getLayer(1002)
  // const insarPoints = map.getLayer(1000)
  // insarPoints.show = true
  // const threed = map.getLayerById(204012)
  // threed.show = true
  // map.addLayer(threed)
  // insar.show = false
  // map.eachLayer((e) => {
  //   if (e.id === 10002) {
  //     e.show = true
  //   }
  // })
  map.eachLayer((e) => {
    if (e.id === 1002) {
      e.show = false
    }
    if (e.id === 10005) {
      e.show = true
    }
  })

  //
  // map.addLayer(insar)
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  const graphicLayer2 = map.getLayer(1000, "id")
  map.addLayer(graphicLayer2)
  // graphicLayer = map.getLayer(1002, "id")
  console.log("123123", graphicLayer)
  add1(graphicLayer)
  // add2(graphicLayer)
  // add3(graphicLayer)
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      show: function (e) {
        const graphic = e.graphic
        if (!graphicLayer || !graphic.startEditing) {
          return false
        }
        return !graphic.isEditing
      },
      callback: (e) => {
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
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.stopEditing(graphic)
        }
      }
    }
  ])
  bindLayerEvent()
  addstart(graphicLayer, [118.491453, 31.43254], "k64", 1, "k64", "1mm", "轻微沉降")
}
// (graphicLayer, position, text, xuhao, zhuanghao, cjl, beizhu)
export function onUnmounted() {
  // const insarPoints = map.getLayer(1000, "id")
  // insarPoints.show = false
  // const threed = map.getLayerById(204012)
  // threed.show = false
  // const btroad = map.getLayerById(10002)
  // btroad.show = false
  // btroad.remove(true)
  // threed.remove(true)
  map = null
  table = []

  // graphicLayer.remove()
  // graphicLayer = null
}
function addstart(graphicLayer, position, text, xuhao, zhuanghao, cjl, beizhu) {
  const graphic = new mars3d.graphic.PointEntity({
    position: position,
    style: {
      color: "#ff0000",
      pixelSize: 10,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      label: {
        text: text,
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -50,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 200000,
        distanceDisplayCondition_near: 0
      },
      clampToGround: true
    },
    attr: { xuhao, zhuanghao: zhuanghao, cjl: cjl, beizhu: beizhu }
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function add1(graphicLayer) {
  const graphic = new mars3d.graphic.CurveEntity({
    positions: [
      [118.52022691784931, 31.47988479851522],
      [118.52022706969107, 31.479893816518057],
      [118.52022721788605, 31.479902834565443],
      [118.52022736244786, 31.479911852656127],
      [118.52022750339006, 31.47992087078887]
    ],
    style: {
      color: "skyblue",
      with: 5,
      opacity: 0.5,

      // label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }

      // }
    },
    attr: {
      xuhao: 1,
      zhuanghao: "k44+000~k44+500",
      cjl: "15mm",
      beizhu: "检查"
    },
    id: 1,
    name: "K55+000~K55+500",
    show: false
  })
  graphicLayer.addGraphic(graphic)
}

let table = []
function addTableItem(item) {
  table.push({ key: item.id, zhuanghao: item.attr.zhuanghao, cjl: item.attr.cjl, beizhu: item.attr.beizhu, xuhao: item.attr.xuhao })
  eventTabel.fire("tableObject", { table })
}
export function changeTable(data) {
  table = data
}
export function showHideArea(id, selected) {
  const graphic = graphicLayer.getGraphicById(id)
  if (selected) {
    graphic.show = true
  } else {
    graphic.show = false
  }
}
export function flyToGraphic(item) {
  const graphic = graphicLayer.getGraphicById(item)
  map.flyToGraphic(graphic)
}
export function deletedGraphic(item) {
  const graphic = graphicLayer.getGraphicById(item)
  graphicLayer.removeGraphic(graphic)
}

function bindLayerEvent() {
  graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    eventTabel.fire("graphicEditor-start", e)
  })

  graphicLayer.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e) {
      eventTabel.fire("graphicEditor-update", e)
    }
  )

  graphicLayer.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
    eventTabel.fire("graphicEditor-stop", e)
  })
}
