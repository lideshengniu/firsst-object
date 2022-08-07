import * as mars3d from "mars3d"
import { useWidget } from "@mars/common/store/widget"
import { mapOptions } from "@/components/title"
export let map
export let graphicLayer
export const Cesium = mars3d.Cesium
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
  graphicLayer = new mars3d.layer.GraphicLayer({ id: 104, show: true })
  map.addLayer(graphicLayer)
  // demo1(graphicLayer)
  hmscjcgq(graphicLayer)
  hmscjcgq2(graphicLayer)
  hmsspwycgq(graphicLayer)
  hmsspwycgq2(graphicLayer)
  hmscxcgq(graphicLayer)

  // hmsspwycgq2(graphicLayer)
  tylh1(graphicLayer)
  tylh2(graphicLayer)
  tylh3(graphicLayer)
  // labellllllllllllllllllll
  // hmscjcgqlable(graphicLayer)
  // hmscxcgqlable(graphicLayer)
  // hmsspcgqlable(graphicLayer)
  // hmsspcgqlable2(graphicLayer)
  // hmscjcgqlable2(graphicLayer)
  // tylh1lable1(graphicLayer)
  // tylh1lable2(graphicLayer)
  // tylh1lable3(graphicLayer)
  // demo2(graphicLayer)
  // demo22(graphicLayer)
}
export function onUnmounted() {
  table = []
  graphicLayer.remove(true)
  // const graphicLayer = map.getLayerById(104)
  // map.addGrahicLayer(graphicLayer)
  // graphicLayer.show = false
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
function hmscjcgq2(graphicLayer) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: [118.537338, 31.60305321, 10],
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
        text: "沉降传感器2",
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
    attr: { cgq: "2号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "沉降传感器2", cgqqx: "hmscjcgq" },

    // hasEdit: true,
    id: 2,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}

function hmsspwycgq(graphicLayer) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: [118.537168, 31.603038121, 10],
    style: {
      semiMajorAxis: 1, // 长半轴 半径
      semiMinorAxis: 1, // 短半轴 半径
      height: 10,
      // extrudedHeight: 100,
      // addHeight: 20,
      color: "yellow",
      opacity: 0.3,
      rotationDegree: 45,
      clampToGround: true,
      pixelOffsetY: -40,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      label: {
        text: "水平位移传感器1",
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
    attr: { cgq: "3号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "水平位移传感器1", cgqqx: "hmscjcgq" },

    // hasEdit: true,
    id: 3,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function hmsspwycgq2(graphicLayer) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: [118.537528, 31.603128121, 10],
    style: {
      semiMajorAxis: 1, // 长半轴 半径
      semiMinorAxis: 1, // 短半轴 半径
      height: 10,
      // extrudedHeight: 100,
      // addHeight: 20,
      color: "yellow",
      opacity: 0.3,
      rotationDegree: 45,
      clampToGround: true,
      pixelOffsetY: -40,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      label: {
        text: "水平位移传感器2",
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
    attr: { cgq: "4号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "水平位移传感器2", cgqqx: "hmscjcgq" },

    // hasEdit: true,
    id: 4,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function hmscxcgq(graphicLayer) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: [118.537508, 31.603181121, 10],
    style: {
      semiMajorAxis: 1, // 长半轴 半径
      semiMinorAxis: 1, // 短半轴 半径
      height: 10,
      // extrudedHeight: 100,
      // addHeight: 20,
      color: "red",
      opacity: 0.3,
      rotationDegree: 45,
      clampToGround: true,
      pixelOffsetY: -40,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      label: {
        text: "测斜器传感器",
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
    attr: { cgq: "5号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "测斜器传感器", cgqqx: "hmscjcgq" },

    // hasEdit: true,
    id: 5,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function tylh1(graphicLayer) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: [118.537268, 31.603006121],
    style: {
      semiMajorAxis: 1, // 长半轴 半径
      semiMinorAxis: 1, // 短半轴 半径
      height: 10,
      // extrudedHeight: 100,
      // addHeight: 20,
      color: "pink",
      opacity: 0.3,
      rotationDegree: 45,
      clampToGround: true,
      pixelOffsetY: -40,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      label: {
        text: "土压力盒1",
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
    attr: { cgq: "6号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "土压力盒1", cgqqx: "hmscjcgq" },

    // hasEdit: true,
    id: 6,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function tylh2(graphicLayer) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: [118.537338, 31.60301321, 10],
    style: {
      semiMajorAxis: 1, // 长半轴 半径
      semiMinorAxis: 1, // 短半轴 半径
      height: 10,
      // extrudedHeight: 100,
      // addHeight: 20,
      color: "pink",
      opacity: 0.3,
      rotationDegree: 45,
      clampToGround: true,
      pixelOffsetY: -40,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      label: {
        text: "土压力盒2",
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
    attr: { cgq: "7号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "土压力盒2", cgqqx: "hmscjcgq" },

    // hasEdit: true,
    id: 7,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function tylh3(graphicLayer) {
  const graphic = new mars3d.graphic.EllipseEntity({
    position: [118.537468, 31.603038121, 10],
    style: {
      semiMajorAxis: 1, // 长半轴 半径
      semiMinorAxis: 1, // 短半轴 半径
      height: 10,
      // extrudedHeight: 100,
      // addHeight: 20,
      color: "pink",
      opacity: 0.3,
      rotationDegree: 45,
      clampToGround: true,
      pixelOffsetY: -40,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      label: {
        text: "土压力盒3",
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
    attr: { cgq: "8号", weizhi: "黄梅山保通线JK44+135-JK44+245", cgqlx: "土压力盒3", cgqqx: "hmscjcgq" },

    // hasEdit: true,
    id: 8,
    // name: "1号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
// labbbbbbbbbbbbbbbel
// function hmsspcgqlable2(graphicLayer) {
//   const graphic = new mars3d.graphic.LabelEntity({
//     name: "根据视距缩放文字",
//     position: [118.53717, 31.603038121, 35.4],
//     style: {
//       text: "水平位移传感器",
//       font_size: 20,
//       color: "white",
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//       // clampToGround: true
//     },
//     attr: { remark: "示例3" }
//   })
//   graphicLayer.addGraphic(graphic)
// }
// function hmsspcgqlable(graphicLayer) {
//   const graphic = new mars3d.graphic.LabelEntity({
//     name: "根据视距缩放文字",
//     position: [118.53753, 31.603038121, 35.4],
//     style: {
//       text: "水平位移传感器",
//       font_size: 20,
//       color: "white",
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//       // clampToGround: true
//     },
//     attr: { remark: "示例3" }
//   })
//   graphicLayer.addGraphic(graphic)
// }
// function hmscjcgqlable(graphicLayer) {
//   const graphic = new mars3d.graphic.LabelEntity({
//     name: "根据视距缩放文字",
//     position: [118.537368, 31.603038121, 35],
//     style: {
//       text: "沉降器传感器",
//       font_size: 20,
//       color: "white",
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//       // clampToGround: true
//     },
//     attr: { remark: "示例3" }
//   })
//   graphicLayer.addGraphic(graphic)
// }
// function hmscxcgqlable(graphicLayer) {
//   const graphic = new mars3d.graphic.LabelEntity({
//     name: "根据视距缩放文字",
//     position: [118.53744, 31.603351121, 35],
//     style: {
//       text: "测斜传感器",
//       font_size: 20,
//       color: "white",
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//       // clampToGround: true
//     },
//     attr: { remark: "示例3" }
//   })
//   graphicLayer.addGraphic(graphic)
// }
// function hmscjcgqlable2(graphicLayer) {
//   const graphic = new mars3d.graphic.LabelEntity({
//     name: "根据视距缩放文字",
//     position: [118.53728, 31.603038121, 31],
//     style: {
//       text: "沉降器传感器2",
//       font_size: 20,
//       color: "white",
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//       // clampToGround: true
//     },
//     attr: { remark: "示例3" }
//   })
//   graphicLayer.addGraphic(graphic)
// }
// function tylh1lable1(graphicLayer) {
//   const graphic = new mars3d.graphic.LabelEntity({
//     name: "根据视距缩放文字",
//     position: [118.53751, 31.60288121, 31],
//     style: {
//       text: "沉降器传感器2",
//       font_size: 20,
//       color: "white",
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//       // clampToGround: true
//     },
//     attr: { remark: "示例3" }
//   })
//   graphicLayer.addGraphic(graphic)
// }
// function tylh1lable2(graphicLayer) {
//   const graphic = new mars3d.graphic.LabelEntity({
//     name: "根据视距缩放文字",
//     position: [118.53741, 31.60288121, 31],
//     style: {
//       text: "土压力盒2",
//       font_size: 20,
//       color: "white",
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//       // clampToGround: true
//     },
//     attr: { remark: "示例3" }
//   })
//   graphicLayer.addGraphic(graphic)
// }
// function tylh1lable3(graphicLayer) {
//   const graphic = new mars3d.graphic.LabelEntity({
//     name: "根据视距缩放文字",
//     position: [118.53731, 31.60286121, 31],
//     style: {
//       text: "土压力盒3",
//       font_size: 20,
//       color: "white",
//       horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//       scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
//       // clampToGround: true
//     },
//     attr: { remark: "示例3" }
//   })
//   graphicLayer.addGraphic(graphic)
// }
// function demo2(graphicLayer) {
//   const graphic = new mars3d.graphic.DivGraphic({
//     position: [118.525601, 31.515678, 70.4],
//     style: {
//       html: `<div class="marsTiltPanel marsTiltPanel-theme-blue">
//           <div class="marsTiltPanel-wrap">
//               <div class="area">
//                   <div class="arrow-lt"></div>
//                   <div class="b-t"></div>
//                   <div class="b-r"></div>
//                   <div class="b-b"></div>
//                   <div class="b-l"></div>
//                   <div class="arrow-rb"></div>
//                   <div class="label-wrap">
//                       <div class="title">1号传感器</div>
//                       <div class="label-content">
//                           <div class="data-li">
//                               <div class="data-label">沉降量：</div>
//                               <div class="data-value"><span class="label-num">-6</span><span class="label-unit">mm</span>
//                               </div>
//                           </div>
//                           <div class="data-li">
//                               <div class="data-label">监测数据：</div>
//                               <div class="data-value"><span class="label-num">2</span><span class="label-unit">km</span>
//                               </div>
//                           </div>
//                           <div class="data-li">
//                               <div class="data-label">传感器状态：</div>
//                               <div class="data-value"><span class="label-tag data-value-status-1" alt="中间状态">开启状态</span><span
//                                       class="label-tag data-value-status-0" alt="关闭状态">关闭状态</span></div>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//               <div class="b-t-l"></div>
//               <div class="b-b-r"></div>
//           </div>
//           <div class="arrow" ></div>
//       </div>`,
//       horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
//       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//       clampToGround: true,
//       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000) // 按视距距离显示
//     },
//     id: 2,
//     name: "2号",
//     show: true
//     // pointerEvents: true
//   })
//   graphicLayer.addGraphic(graphic)
//   addTableItem(graphic)
// }
// function demo22(graphicLayer) {
//   const graphic = new mars3d.graphic.DivLightPoint({
//     position: [118.525601, 31.515678, 70.4],
//     style: {
//       color: "#f33349",
//       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
//       heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
//     },
//     attr: { remark: "示例5" },
//     popup: "测试popup",
//     hasEdit: true,
//     id: 22,
//     name: "2号",
//     show: true
//   })
//   graphicLayer.addGraphic(graphic)
//   addTableItem(graphic)
// }

// 在图层绑定Popup弹窗
export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    console.log(attr, "attr")
    attr["类型"] = event.graphic.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })
  })
}

// 绑定右键菜单
export function bindLayerContextMenu() {
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
        graphicLayer.stopEditing(graphic)
        graphicLayer.removeGraphic(graphic)
      }
    }
  ])
}

export function updateLayerHasEdit(enabledEdit) {
  graphicLayer.hasEdit = enabledEdit
}
// export function getManagerLayer() {
//   if (map.getLayer) {
//     console.log("@32@", map.getLayer(104, "id"))
//     return map.getLayer(104, "id")
//   }
//   return map.getLayer
// }
let table = []
function addTableItem(item) {
  table.push({ key: item.id, cgq: item.attr.cgq, weizhi: item.attr.weizhi, cgqlx: item.attr.cgqlx })
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

  map.flyToPoint(graphic.position, { pitch: -77, radius: 119, heading: -20, roll: 90 })
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
