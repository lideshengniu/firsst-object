import { Maya } from "@icon-park/svg"
import * as mars3d from "mars3d"

export let graphicLayer
export let map
export const eventTabel = new mars3d.BaseClass()
let btroad
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance

  // 加天眼
  const overviewMap = new mars3d.control.OverviewMap({
    id: 1000,
    basemap: {
      name: "天地图影像",
      type: "group",
      layers: [
        { name: "底图", type: "tdt", layer: "img_d" },
        { name: "注记", type: "tdt", layer: "img_z" }
      ]
    },
    layers: [{ id: 10002, type: "geojson" }],

    rectangle: {
      color: "#fecd78",
      opacity: 0.2,
      outline: 1,
      outlineColor: "#ff7800"
    },
    style: {
      left: "5px",
      top: "5px",
      width: "200px",
      height: "150px"
    }
  })
  //
  map.addControl(overviewMap)
  map.flyToPoint([118.54389, 31.603902], { pitch: -70, radius: 5000, heading: 60, roll: 150 })
  btroad = map.getLayerById(10002)
  btroad.show = true
  map.addLayer(btroad)
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
      [118.5325427490663, 31.61077927073853, 0],
      [118.5326235302454, 31.61077329940857, 0],
      [118.5331130126114, 31.61085524371561, 0],
      [118.5335594035123, 31.61098553532786, 0],
      [118.5337319339201, 31.61117314708714, 0],
      [118.5346017974314, 31.61128879614763, 0],
      [118.5351817644289, 31.61107135882999, 0],
      [118.5351930615818, 31.61105475796745, 0],
      [118.5353758042056, 31.61058631189656, 0],
      [118.5353816295572, 31.61056325142818, 0],
      [118.5353691954274, 31.61053115191695, 0],
      [118.5352919923733, 31.61010086515559, 0],
      [118.5352959416572, 31.61006028190764, 0],
      [118.5352790564915, 31.61002222263897, 0],
      [118.5352701013503, 31.609979685825, 0],
      [118.535250329282, 31.60995300649939, 0],
      [118.5350636549706, 31.60940906011232, 0],
      [118.5338514609567, 31.60941185870553, 0],
      [118.5327247452045, 31.60956829546966, 0],
      [118.5322645556801, 31.60985814836589, 0],
      [118.5320245508732, 31.61026957193733, 0],
      [118.5322496040948, 31.61062505784871, 0],
      [118.5325427490663, 31.61077927073853, 0]
    ],
    1,
    "k43+200~k43+400",
    "5mm",
    "轻微沉降",
    1,
    "btr"
  )
  insar(graphicLayer)
}
export function onUnmounted() {
  // const btroad = map.getLayerById(10002)
  btroad.show = false
  const control = map.getControl(1000, "id")
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
  const options = { pitch: -90, radius: 250, heading: 30, roll: 90 }
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
