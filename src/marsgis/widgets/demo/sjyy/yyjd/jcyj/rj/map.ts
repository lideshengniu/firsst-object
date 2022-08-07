import { mapOptions } from "@/components/title"
import { Maya } from "@icon-park/svg"
import { group } from "console"
import * as mars3d from "mars3d"

export let graphicLayer
export let map
export const eventTabel = new mars3d.BaseClass()
let btroad
let threed
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance
  map.flyToPoint([118.537339, 31.6028072, 0], { pitch: -90, radius: 300, heading: 50, roll: 90 })
  //  加倾斜
  threed = map.getLayerById(204012)
  threed.show = true
  map.addLayer(threed)
  // 加天眼
  btroad = map.getLayerById(10002)
  map.addLayer(btroad)
  // const overviewMap = new mars3d.control.OverviewMap({
  //   id: 1000,
  //   basemap: {
  //     name: "天地图影像",
  //     type: "group",

  //     layers: [
  //       { name: "底图", type: "tdt", layer: "img_d" },
  //       { name: "注记", type: "tdt", layer: "img_z" }
  //       // { name: "注记", type: "tdt", layer: "img_z" }
  //     ]
  //   },
  //   layers: [
  //     // { type: "group", id: "100", name: "Insar" },
  //     // { type: "graphic", name: "graphicLayer" },
  //     { type: "geojson", name: "btroad", id: 10002 }
  //   ],

  //   rectangle: {
  //     color: "#fecd78",
  //     opacity: 0.4,
  //     outline: true,
  //     outlineWidth: 3,
  //     outlineColor: "black"
  //   },
  //   style: {
  //     left: "5px",
  //     top: "5px",
  //     width: "200px",
  //     height: "150px"
  //   }
  // })
  // //
  // map.addControl(overviewMap)
  // map.flyToPoint([118.536718, 31.602555], { pitch: -40, radius: 5000, heading: 60, roll: 150 })
  // btroad = map.getLayerById(10002)
  // btroad.show = true
  // map.addLayer(btroad)
  map.eachLayer((e) => {
    if (e.id === 10001 || e.id === 10005) {
      e.show = false
    }
  })
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  // add1(graphicLayer)
  bindLayerPopup()
  // graphicLayer = map.getLayer(1002, "id")
  console.log("123123", graphicLayer)
  // add1(graphicLayer)

  bindLayerEvent()
  add(
    graphicLayer,
    [
      [118.5371756268634, 31.60243323277239, 0],
      [118.537390466008, 31.60236984434204, 0],
      [118.5375928722048, 31.60241542717907, 0],
      [118.5376810282516, 31.60244994289971, 0],
      [118.5377488066051, 31.60262944792643, 0],
      [118.5373754330992, 31.60363453485703, 0],
      [118.5368663678596, 31.60359040501736, 0],
      [118.5371756268634, 31.60243323277239, 0]
    ],
    1,
    "k43+200~k43+400",
    "5mm",
    "轻微沉降",
    1,
    "btr"
  )
  // insar(graphicLayer)
}
export function onUnmounted() {
  // const btroad = map.getLayerById(10002)
  // btroad.show = false
  const control = map.getControl(1000, "id")
  threed.show = false
  console.log("niubi", control)
  graphicLayer.remove(true)
  map.removeControl(control)
  map = null
  table = []
}
/// insar
function insar(graphicLayer) {
  const graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [118.53543869, 31.6114219863],
      [118.531838834, 31.6114219863],
      [118.531838834, 31.6094720643],
      [118.53543869, 31.6094720643],
      [118.53543869, 31.6114219863]
    ],
    style: {
      clampToGround: true,
      image: "img/bpkw/insar/btx.png"
    },
    id: 2000,
    name: "保通线",
    show: true,
    attr: { xuhao: 2, bpmc: "葛羊山边坡", jgxx: "该处沉降较缓" }
  })
  graphicLayer.addGraphic(graphic)
}

/// //

// function add1(graphicLayer) {
//   const graphic = new mars3d.graphic.CurveEntity({
//     positions: [
//       [118.5379346562134, 31.599464869868722],
//       [118.5377319991984, 31.598057254940347]
//     ],
//     style: {
//       color: "#ffff00",
//       diffHeight: 2000, // 高度
//       speed: 20, // 速度
//       clampToGround: true,

//       // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
//       highlight: {
//         color: "#ff0000"
//       }
//     },

//     id: 1,
//     name: "葛羊山",
//     show: false,
//     attr: { xuhao: 1, cjl: "-16.2mm", zhuanghao: "k43+00~k43+500", beizhu: "检查" }
//   })
//   graphicLayer.addGraphic(graphic)
//   addTableItem(graphic)
// }
function add(graphicLayer, positions, xuhao, cgyzqy, cjl, bz, id, name) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      color: "red",
      width: 6,
      opacity: 1,
      clampToGround: true
    },
    attr: {
      xuhao: xuhao,
      cgyzqy: cgyzqy,
      cjl: cjl,
      bz: bz
    },
    id: id,
    name: name,
    show: false
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
    cgyzqy: item.attr.cgyzqy,
    cjl: item.attr.cjl,
    bz: item.attr.bz,
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
  const options = { pitch: -110, radius: 100, heading: 30, roll: 70 }
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
