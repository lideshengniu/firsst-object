import { Maya } from "@icon-park/svg"
import * as mars3d from "mars3d"
import { useWidget } from "@mars/common/store/widget"
import { $alert, $message, $alert as globalAlert } from "@mars/components/mars-ui/index"
import { geojson } from "mapv"
export let graphicLayer
export let map
export const eventTabel = new mars3d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance
  const road = map.getLayerById(10002)
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
    layers: [{ type: "geojson", id: 10002, pid: 101, show: true }],

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
  map.addControl(overviewMap)
  map.flyToPoint([118.542203984638, 31.60508348261099], { pitch: -27, radius: 10000, heading: 30, roll: 90 })
  const threed = map.getLayerById(204012)
  threed.show = true
  map.eachLayer((e) => {
    if (e.id === 10001 || e.id === 10005) {
      e.show = false
    }
  })
  map.addLayer(threed)

  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  bindLayerPopup()

  // 本图层
  // addstart()

  // graphicLayer = map.getLayer(1002, "id")
  console.log("123123", graphicLayer)
  // 添加数据
  hms(graphicLayer)
  gys(graphicLayer)
  zs(graphicLayer)
  /// ///////   hms
  addlx(
    graphicLayer,
    [
      [118.5363059896879, 31.60948216307482, 0],
      [118.5365989626092, 31.60827326705473, 0],
      [118.5367909358951, 31.60738413882776, 0],
      [118.5370554884886, 31.60640922267683, 0],
      [118.5374739405596, 31.60484677211859, 0]
    ],
    11,
    "黄梅山边坡"
  )
  addstart(graphicLayer, [118.5363059896879, 31.60948216307482, 0], "k43+600")
  addstart(graphicLayer, [118.5374739405596, 31.60484677211859, 0], "k44+000")
  /// /  gys
  addlx(
    graphicLayer,
    [
      [118.5275836209556, 31.73224166621567, 0],
      [118.5274797643709, 31.73130147258882, 0],
      [118.5273870798814, 31.73040427092637, 0],
      [118.5272867901972, 31.7293671783328, 0],
      [118.5272611399019, 31.72840110133717, 0],
      [118.5272451767246, 31.72833512694259, 0],
      [118.5273087209669, 31.72726992084482, 0],
      [118.5277285963214, 31.72608015380521, 0],
      [118.5277314432624, 31.72533836636825, 0],
      [118.5280936628001, 31.72482213113176, 0],
      [118.5285430784441, 31.72406873862543, 0],
      [118.5289175536365, 31.72342657294138, 0],
      [118.5294256316071, 31.72261889937568, 0],
      [118.5300064119027, 31.72181839054412, 0]
    ],
    22,
    "葛羊山边坡"
  )
  addstart(graphicLayer, [118.5136098465132, 31.46441196201586, 0], "k60+000")
  addstart(graphicLayer, [118.5102331266842, 31.45999665443609, 0], "k60+500")

  /// // 钟山
  addlx(
    graphicLayer,
    [
      [118.5136098465132, 31.46441196201586, 0],
      [118.5128879104481, 31.4636660018495, 0],
      [118.5102331266842, 31.45999665443609, 0]
    ],
    33,
    "钟山边坡"
  )
  bindLayerEvent()
}
export function onUnmounted() {
  const threed = map.getLayerById(204012)
  const control = map.getControl(1000, "id")
  console.log("niubi", control)
  map.removeControl(control)
  control.enabled = false
  threed.show = false
  graphicLayer.remove(true)
  map = null
  table = []
}
/// / 加点
function addstart(graphicLayer, position, text) {
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
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}
/// /// 加线
function addlx(graphicLayer, positions, id, name) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      color: "skyblue",
      width: 3,
      opacity: 1,
      clampToGround: true
    },
    id: id,
    name: name,
    show: true
  })
  graphicLayer.addGraphic(graphic)
}
/// /1 黄梅山
function hms(graphicLayer) {
  const graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [118.5415509455, 31.6095595608],
      [118.5366011435, 31.6095595608],
      [118.5366011435, 31.60445976480001],
      [118.5415509455, 31.60445976480001],
      [118.5415509455, 31.6095595608]
    ],
    style: {
      clampToGround: true,
      image: "img/bpkw/insar/hms.png"
    },
    id: 1,
    name: "黄梅山边坡",
    show: false,
    attr: { xuhao: 1, bpmc: "黄梅山边坡", jgxx: "该处沉降较缓" }
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
/// /////////////// 葛羊山
function gys(graphicLayer) {
  const graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [118.537538606, 31.7335296018],
      [118.526739038, 31.7335296018],
      [118.526739038, 31.72123009380001],
      [118.537538606, 31.72123009380001],
      [118.537538606, 31.7335296018]
    ],
    style: {
      clampToGround: true,
      image: "img/bpkw/insar/btx.png"
    },
    id: 2,
    name: "葛羊山",
    show: false,
    attr: { xuhao: 2, bpmc: "葛羊山边坡", jgxx: "该处沉降较缓" }
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
/// //////钟山
function zs(graphicLayer) {
  const graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [118.5163769525, 31.46786522880001],
      [118.5075273065, 31.46786522880001],
      [118.5075273065, 31.4591655768],
      [118.5163769525, 31.4591655768],
      [118.5163769525, 31.46786522880001]
    ],
    style: {
      clampToGround: true,
      image: "img/bpkw/insar/zs.png"
    },
    id: 3,
    name: "钟山人工土堆边坡",
    show: false,
    attr: { xuhao: 3, bpmc: "钟山人工土堆边坡", jgxx: "该处沉降较缓" }
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
///
//
//
export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}

    return mars3d.Util.getTemplateHtml({ title: "边坡", template: "all", attr: attr })
  })
}
let table = []
function addTableItem(item) {
  console.log("itemitem", item.attr.chenjiang)
  table.push({
    key: item.id,
    bpmc: item.attr.bpmc,
    jgxx: item.attr.jgxx,
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
    if (graphic.attr.bpmc === "黄梅山边坡") {
      $alert("该处沉降较大")
    } else if (graphic.attr.bpmc === "葛羊山边坡") {
      $alert("该处沉降较大")
    }
  } else {
    graphic.show = false
  }
}
export function flyToGraphic(item) {
  const graphic = graphicLayer.getGraphicById(item)
  // if (graphic.id === 1) {
  //   $alert("该处沉降过大")
  // }
  const options = { pitch: -27, radius: 150, heading: 30, roll: 90 }
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
