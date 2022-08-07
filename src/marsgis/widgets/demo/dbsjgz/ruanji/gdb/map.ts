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
  const threed = map.getLayerById(204012)
  threed.show = true
  map.addLayer(threed)

  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  bindLayerPopup()
  // graphicLayer = map.getLayer(1002, "id")
  console.log("123123", graphicLayer)
  add1(graphicLayer)

  bindLayerEvent()
}
export function onUnmounted() {
  const threed = map.getLayerById(204012)
  threed.show = false
  graphicLayer.remove(true)
  map = null
  table = []
}

function add1(graphicLayer) {
  const graphic = new mars3d.graphic.WallEntity({
    positions: [
      [118.5371756268634, 31.60243323277239, 0],
      [118.537390466008, 31.60236984434204, 0],
      [118.5375928722048, 31.60241542717907, 0],
      [118.5376810282516, 31.60244994289971, 0],
      [118.5377488066051, 31.60262944792643, 0],
      [118.5373754330992, 31.60363453485703, 0],
      [118.5368663678596, 31.60359040501736, 0],
      [118.5371756268634, 31.60243323277239, 0]
    ],
    style: {
      width: 5,
      color: "red",
      opacity: 0.1,
      diffHeight: 35,
      clampToGround: true,
      classification: true
      // materialType: mars3d.MaterialType.LineFlowColor,
      // materialOptions: {
      //   color: "#00ffff",
      //   speed: 0.0001,
      //   percent: 0.15,
      //   alpha: 1
      // }
    },
    id: 1,
    name: "黄梅山保通线",
    show: false,
    attr: {
      xuhao: 1,
      gd: "黄梅山保通线JK44+135-JK44+245",
      jcnr: "地基沉降、地基水平位移、地下水位及土压力",
      cgqsl: 28,
      beizhu: "尾矿泥堆积软基段",
      options: { pitch: -83 }
    }
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
  console.log("itemitem", item.attr.chenjiang)

  table.push({ key: item.id, xuhao: item.attr.xuhao, gd: item.attr.gd, jcnr: item.attr.jcnr, cgqsl: item.attr.cgqsl, beizhu: item.attr.beizhu })
  table.push({ key: 2, xuhao: 2, gd: "软基工点2", jcnr: "x" })
  table.push({ key: 3, xuhao: 3, gd: "软基工点3", jcnr: "x" })
  table.push({ key: 4, xuhao: 4, gd: "软基工点4", jcnr: "x" })
  table.push({ key: 5, xuhao: 5, gd: "软基工点5", jcnr: "x" })
  table.push({ key: 6, xuhao: 6, gd: "软基工点6", jcnr: "x" })

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
  const options = { pitch: -27, radius: 100, roll: 90 }
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
