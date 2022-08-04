import { Maya } from "@icon-park/svg"
import * as mars3d from "mars3d"
import { useWidget } from "@mars/common/store/widget"

export let graphicLayer
export let map
export const eventTabel = new mars3d.BaseClass()
const { activate, disable, isActivate, updateWidget } = useWidget()
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance

  map.flyToPoint([118.53889, 31.602902], { pitch: -40, radius: 3000, heading: 60, roll: 150 })
  const btroad = map.getLayerById(10002)
  btroad.show = true
  map.addLayer(btroad)
  map.eachLayer((e) => {
    if (e.id === 10001 || e.id === 10005) {
      e.show = false
    }
  })
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  add1(graphicLayer)
  bindLayerPopup()
  // graphicLayer = map.getLayer(1002, "id")
  console.log("123123", graphicLayer)
  // add1(graphicLayer)

  bindLayerEvent()
}
export function onUnmounted() {
  const btroad = map.getLayerById(10002)
  btroad.show = false
  map = null
  table = []
}

function add1(graphicLayer) {
  const graphic = new mars3d.graphic.CurveEntity({
    positions: [
      [118.5379346562134, 31.599464869868722],
      [118.5377319991984, 31.598057254940347]
    ],
    style: {
      color: "#ffff00",
      diffHeight: 2000, // 高度
      speed: 20, // 速度
      clampToGround: true,

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        color: "#ff0000"
      }
    },

    id: 1,
    name: "葛羊山",
    show: false,
    attr: { xuhao: 1, cjl: "-16.2mm", zhuanghao: "k43+00~k43+500", beizhu: "检查" }
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}

export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}

    return mars3d.Util.getTemplateHtml({ title: "边坡", template: "all", attr: attr })
  })
}
let table = []
function addTableItem(item) {
  // console.log("itemitem", item.attr.chenjiang)
  table.push({
    key: item.id,
    zhuanghao: item.attr.zhuanghao,
    cjl: item.attr.cjl,
    beizhu: item.attr.beizhu,
    xuhao: item.attr.xuhao
  })
  console.log(table, "table")
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
  const options = { pitch: -27, radius: 250, heading: 30, roll: 90 }
  map.flyToGraphic(graphic, options)
}
export function deletedGraphic(item) {
  const graphic = graphicLayer.getGraphicById(item)
  graphicLayer.removeGraphic(graphic)
}

function bindLayerEvent() {
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
