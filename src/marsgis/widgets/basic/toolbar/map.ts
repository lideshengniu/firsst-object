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
  map.flyToPoint([118.540203984638, 31.58308348261099], { pitch: -69, radius: 27500, heading: 50, roll: 90 })
  const zongroad = map.getLayerById(10001)
  const zongzh = map.getLayerById(10005)
  zongroad.show = true
  zongzh.show = true
  map.addLayer(zongroad)
  // map.eachLayer((e) => {
  //   if (e.id === 10005) {
  //     e.show = false
  //   }
  // })

  // graphicLayer = new mars3d.layer.GraphicLayer()
  // map.addLayer(graphicLayer)
  // bindLayerPopup()
  // // graphicLayer = map.getLayer(1002, "id")
  // console.log("123123", graphicLayer)
  // add1(graphicLayer)

  // bindLayerEvent()
}
export function onUnmounted() {
  const threed = map.getLayerById(204012)
  threed.show = false

  map = null
  // table = []
}

// function add1(graphicLayer) {
//   const graphic = new mars3d.graphic.DiffuseWall({
//     positions: [
//       [118.5416203984638, 31.60508348261099],
//       [118.5416203984638, 31.605007478849576],
//       [118.54157278215202, 31.60501532348175],
//       [118.54167785717546, 31.604919240347346]
//     ],
//     style: {
//       color: "#ffff00",
//       diffHeight: 2000, // 高度
//       speed: 20, // 速度

//       // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
//       highlight: {
//         color: "#ff0000"
//       }
//     },

//     id: 1,
//     name: "葛羊山",
//     show: false,
//     attr: { xuhao: 1, zong: "-16.2mm", bannian: "-8.3mm", name: "葛羊山", jgxx: "该处沉降较缓", options: { pitch: -83 }, img: "xx" }
//   })
//   graphicLayer.addGraphic(graphic)
//   addTableItem(graphic)
// }

// export function bindLayerPopup() {
//   graphicLayer.bindPopup(function (event) {
//     const attr = event.graphic.attr || {}

//     return mars3d.Util.getTemplateHtml({ title: "边坡", template: "all", attr: attr })
//   })
// }
// let table = []
// function addTableItem(item) {
//   console.log("itemitem", item.attr.chenjiang)
//   table.push({
//     key: item.id,
//     name: item.name,
//     bannian: item.attr.bannian,
//     zong: item.attr.zong,
//     jgxx: item.attr.jgxx,
//     xuhao: item.attr.xuhao,
//     img: item.attr.img
//   })
//   console.log(table, "table")
//   eventTabel.fire("tableObject", { table })
// }
// export function changeTable(data) {
//   table = data
// }
// export function showHideArea(id, selected) {
//   const graphic = graphicLayer.getGraphicById(id)
//   if (selected) {
//     graphic.show = true
//   } else {
//     graphic.show = false
//   }
// }
// export function flyToGraphic(item) {
//   const graphic = graphicLayer.getGraphicById(item)
//   const options = { pitch: -27, radius: 250, heading: 30, roll: 90 }
//   map.flyToGraphic(graphic, options)
// }
// export function deletedGraphic(item) {
//   const graphic = graphicLayer.getGraphicById(item)
//   graphicLayer.removeGraphic(graphic)
// }

// function bindLayerEvent() {
//   graphicLayer.on(
//     [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
//     function (e) {
//       eventTabel.fire("graphicEditor-update", e)
//     }
//   )

//   graphicLayer.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
//     eventTabel.fire("graphicEditor-stop", e)
//   })
// }
