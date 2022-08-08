import * as mars3d from "mars3d"
export let map
let graphicLayer
export const Cesium = mars3d.Cesium
export const eventTabel = new mars3d.BaseClass()
export function onMounted(mapInstance) {
  map = mapInstance
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  insarcjt(
    graphicLayer,
    [
      [118.5329512895, 31.6202591328],
      [118.5397010195, 31.6202591328],
      [118.5397010195, 31.5947601528],
      [118.5329512895, 31.5947601528],
      [118.5329512895, 31.6202591328]
    ],
    "public/img/insar/yujingbp/bp.png",
    10,
    "insar沉降图"
  )
  dbcgq(graphicLayer, [118.537328, 31.603128121, 10], "red", 11, "地表传感器")

  // insarcgq(graphicLayer)
}
export function onUnmounted() {
  // const btroad = map.getLayerById(10002)
  // btroad.show = false

  graphicLayer.remove(true)
  table = []
  map = null
}
function hmscjcgq(graphicLayer) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: [118.537268, 31.603038121, 10],
    style: {
      semiMajorAxis: 1, // 长半轴 半径
      semiMinorAxis: 1, // 短半轴 半径
      height: 10,
      // extrudedHeight: 100,
      // addHeight: 20,
      color: "black",
      opacity: 0.3,
      rotationDegree: 45,
      clampToGround: true,
      pixelOffsetY: -40,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      label: {
        text: "沉降传感器1",
        addHeight: 500,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
        // clampToGround: true
      },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        color: "#00ff00",
        opacity: 0.7
      }
    },
    attr: { cgq: "1号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "沉降器传感器", cgqqx: "hmscjcgq" },

    // hasEdit: true,
    id: 1,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
// function insarcgq(graphicLayer) {
//   const graphic = new mars3d.graphic.EllipseEntity({
//     position: [118.537268, 31.603038121, 10],
//     style: {
//       semiMajorAxis: 1, // 长半轴 半径
//       semiMinorAxis: 1, // 短半轴 半径
//       height: 10,
//       // extrudedHeight: 100,
//       // addHeight: 20,
//       color: "black",
//       opacity: 0.3,
//       rotationDegree: 45,
//       clampToGround: true,
//       pixelOffsetY: -40,
//       classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
//       label: {
//         text: "沉降传感器1",
//         addHeight: 500,
//         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//         scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//         // clampToGround: true
//       },
//       // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
//       highlight: {
//         color: "#00ff00",
//         opacity: 0.7
//       }
//     },
//     attr: { cgq: "1号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "沉降器传感器", cgqqx: "hmscjcgq" },

//     // hasEdit: true,
//     id: 1,
//     // name: "1号",
//     show: false
//   })
//   graphicLayer.addGraphic(graphic)
//   // graphicLayer.addGraphic(graphic)
//   // addTableItem(graphic)
//   console.log("asdasd")
// }
function insarcjt(graphicLayer, positions, image, id, cgqlx) {
  const graphic = new mars3d.graphic.RectangleEntity({
    positions: positions,
    style: {
      clampToGround: true,
      image: image
    },
    attr: { cgqlx: cgqlx },

    // hasEdit: true,
    id: id,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
  console.log("asdasd")
}
function dbcgq(graphicLayer, position, color, id, cgqlx) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: position,
    style: {
      semiMajorAxis: 1, // 长半轴 半径
      semiMinorAxis: 1, // 短半轴 半径
      height: 10,
      // extrudedHeight: 100,
      // addHeight: 20,
      color: color,
      opacity: 1,
      rotationDegree: 45,
      clampToGround: true,
      pixelOffsetY: -40,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      label: {
        text: cgqlx,
        addHeight: 500,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
        // clampToGround: true
      },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        color: "#00ff00",
        opacity: 0.7
      }
    },
    attr: { cgqlx: cgqlx },

    // hasEdit: true,
    id: id,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
  console.log("asdasd")
}
let table = []
function addTableItem(item) {
  table.push({ key: item.id, cgqlx: item.attr.cgqlx })
  eventTabel.fire("tableObject", { table })
}
export function showHideArea(id, selected) {
  const graphic = graphicLayer.getGraphicById(id)
  if (selected) {
    graphic.show = true
  } else {
    graphic.show = false
  }
}
