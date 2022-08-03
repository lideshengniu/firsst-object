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
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  const graphicLayer2 = map.getLayer(1000, "id")
  map.addLayer(graphicLayer2)
  // graphicLayer = map.getLayer(1002, "id")
  console.log("123123", graphicLayer)
  add1(graphicLayer)
  add2(graphicLayer)
  add3(graphicLayer)
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
}
export function onUnmounted() {
  map = null
  table = []
  // graphicLayer.remove()
  // graphicLayer = null
}
function add1(graphicLayer) {
  const graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [118.5386010635, 31.5153508293],
      [118.5210517655, 31.4963015913]
    ],
    style: {
      // color: "skyblue",
      // diffHeight: 3,
      // closeTop: false,
      // closeBottom: false,
      opacity: 1,
      image: "img/insar/wsb.png",
      clampToGround: true
      // label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      // highlight: {
      //   opacity: 0.8
      // }
    },

    id: 1,
    name: "尾沙坝隐患",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function add3(graphicLayer) {
  const graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [118.507214819, 31.4587280943],
      [118.516814435, 31.4681777163]
    ],
    style: {
      // color: "skyblue",
      // diffHeight: 3,
      // closeTop: false,
      // closeBottom: false,
      opacity: 1,
      image: "img/insar/tjx.png",
      clampToGround: true
      // label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      // highlight: {
      //   opacity: 0.8
      // }
    },

    id: 3,
    name: "K60路段陶家巷附近",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function add2(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [118.5455077500001, 31.58181144700006],
      [118.5414199160001, 31.58178400600008],
      [118.5395094820001, 31.58052149500003],
      [118.53823422, 31.57834871200004],
      [118.5380138050001, 31.57650457000005],
      [118.5385699450001, 31.57395923600006],
      [118.5397361710001, 31.57271851900003],
      [118.541675582, 31.57178362800005],
      [118.5427755310001, 31.57134159500004],
      [118.5451454600001, 31.57098212700004],
      [118.547866202, 31.57152193400003],
      [118.5494616400001, 31.57351273700004],
      [118.5513272930001, 31.57725165600004],
      [118.54820398, 31.58091945900003],
      [118.5455077500001, 31.58181144700006]
    ],
    style: {
      color: "skyblue",
      // diffHeight: 3,
      // closeTop: false,
      // closeBottom: false,
      opacity: 1,
      // image: "img/insar/wsb.png",
      clampToGround: true
      // label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      // highlight: {
      //   opacity: 0.8
      // }
    },

    id: 2,
    name: "山坎村",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
let table = []
function addTableItem(item) {
  table.push({ key: item.id, name: item.name })
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
