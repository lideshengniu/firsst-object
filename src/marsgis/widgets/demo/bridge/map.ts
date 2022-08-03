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
  bindLayerPopup()
  // graphicLayer = map.getLayer(1002, "id")
  console.log("123123", graphicLayer)
  add1(graphicLayer)
  // add2(graphicLayer)
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
}

function add1(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [118.938688, 31.410264, 10.7],
      [118.919478, 31.573725, 23]
    ],
    style: {
      width: 10,
      materialType: mars3d.MaterialType.LineFlowColor,
      materialOptions: {
        color: "skyblue",
        speed: 10,
        percent: 0.15,
        alpha: 0.2
      }
    },
    // show: false,
    attr: {
      桥名: "姑溪河特大桥",
      桥梁概况: "排土场位于Y6K59+600-Y6K60+500段右侧，上世纪60年代矿坑弃渣堆积形成。现状最大堆高48.8m，坡面整体处于稳定状态",
      结构信息:
        "拱圈及主纵梁均采用钢箱结构，桥面采用正交异性钢桥面板，桥面铺装采用UHPC高性能混凝土，下部结构采用承台＋群桩基础。钢纵梁采用单箱单室结构，梁高2.2m，支座处局部加厚至3.0m。每个系梁设2根Φ15.2-12的体外预应力钢绞线，组成结构的柔性系杆体系。吊杆采用Φ15.2-10、Φ15.2-12钢绞线整束挤压式吊杆体系。"
    },

    id: 1,
    name: "姑溪河特大桥",
    show: true
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function add2(graphicLayer) {
  const graphic = new mars3d.graphic.ScrollWall({
    positions: [
      [118.5292869238, 31.7328543576, 0],
      [118.5276624933, 31.7321264009, 0],
      [118.527081013, 31.7312173458, 0],
      [118.5270279704, 31.7300882807, 0],
      [118.5270311765, 31.7288281564, 0],
      [118.5270399331, 31.7277381089, 0],
      [118.5273958085, 31.7256918589, 0],
      [118.5282346788, 31.7239225743, 0],
      [118.5290428673, 31.7223814384, 0],
      [118.5298875226, 31.7217163701, 0],
      [118.5331718721, 31.7222369002, 0],
      [118.5361428182, 31.7239264927, 0],
      [118.5365906811, 31.7257128913, 0],
      [118.5366653374, 31.7279038829, 0],
      [118.5341471817, 31.7308067712, 0],
      [118.5318926338, 31.7324895889, 0],
      [118.5294380848, 31.7328319819, 0]
    ],
    style: {
      color: "skyblue",
      diffHeight: 500.0,
      closeTop: false,
      closeBottom: false,
      opacity: 0.5,

      // label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    },
    attr: {
      坡名: "大青山尾矿库",
      现状: "本项目道路两侧尚在运营的尾矿库为大青山尾矿库，尾矿库位于宁芜高速K54+200-K55+600段东侧，主坝距离高速约160-220m，设计坝高67m，库容2000万m³。按现阶段入尾矿排放量计算，剩余服务年限8年。根据其安全评价报告，目前，库区安全整体良好，坝体及排洪系统总体运行正常"
      // 改建设计: "需开挖排土场，开挖高度约9 m，可能因施工扰动影响排土场稳定性，产生滑坡",
      // 管理措施: "施工期（开挖）时加强边坡状态感知，避免滑坡影响公路运营。"
    },

    id: 2,
    name: "大青山尾矿库",
    show: true
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
