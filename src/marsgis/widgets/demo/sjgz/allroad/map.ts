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
  add2(graphicLayer)
  add1(graphicLayer)

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
  const graphic = new mars3d.graphic.CurveEntity({
    positions: [
      [118.53792, 31.603231, 35.4],
      [118.537185, 31.606465, 75.7],
      [118.536095, 31.609196, 64],
      [118.535413, 31.612957, 22.9],
      [118.534528, 31.617542, 17.4],
      [118.533941, 31.622452, 12.4],
      [118.534573, 31.622136, 10.7]
    ],
    style: {
      width: 8,
      clampToGround: true,
      color: "rgb(0,191,255)"
    },

    id: 1,
    name: "K27+000",
    show: false,
    attr: { xuhao: 1, zong: "-16.2mm", bannian: "-8.3mm", name: "K27+000~K27+500", beizhu: "该处沉降较缓" }
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
    attr:
      // 坡名: "大青山尾矿库",
      // 现状: "本项目道路两侧尚在运营的尾矿库为大青山尾矿库，尾矿库位于宁芜高速K54+200-K55+600段东侧，主坝距离高速约160-220m，设计坝高67m，库容2000万m³。按现阶段入尾矿排放量计算，剩余服务年限8年。根据其安全评价报告，目前，库区安全整体良好，坝体及排洪系统总体运行正常",
      { xuhao: 2, zong: "-16.2mm", bannian: "-8.3mm", beizhu: "该处沉降较缓", name: "k27+500~k28+000" },
    // 改建设计: "需开挖排土场，开挖高度约9 m，可能因施工扰动影响排土场稳定性，产生滑坡",
    // 管理措施: "施工期（开挖）时加强边坡状态感知，避免滑坡影响公路运营。"

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
const lizi = [
  {
    key: 3,
    name: "K28+000~K28+500",
    xuhao: 3,
    zong: "-2mm",
    bannian: "-3.3mm",
    beizhu: "缓"
  },
  {
    key: 4,
    name: "K28+500~K29+000",
    xuhao: 4,
    zong: "-5.2mm",
    bannian: "-7.3mm",
    beizhu: "缓"
  },
  {
    key: 5,
    name: "K29+000~K29+500",
    xuhao: 5,
    zong: "5.2mm",
    bannian: "5mm",
    beizhu: "缓"
  },
  {
    key: 6,
    name: "K29+500~K30+000",
    xuhao: 6,
    zong: "-4.2mm",
    bannian: "-6.3mm",
    beizhu: "缓"
  },
  {
    key: 7,
    name: "K30+000~K3+500",
    xuhao: 7,
    zong: "-8.2mm",
    bannian: "-2.3mm",
    beizhu: "缓"
  },
  {
    key: 8,
    name: "K30+500~K40+000",
    xuhao: 8,
    zong: "-10.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 9,
    name: "K40+000~K41+500",
    xuhao: 9,
    zong: "-13.2mm",
    bannian: "-5.3mm",
    beizhu: "缓"
  },
  {
    key: 10,
    name: "K41+500~K42+000",
    xuhao: 10,
    zong: "-6.2mm",
    bannian: "-4.3mm",
    beizhu: "缓"
  },
  {
    key: 11,
    name: "K42+000~K42+500",
    xuhao: 11,
    zong: "-4.2mm",
    bannian: "-5.3mm",
    beizhu: "缓"
  },
  {
    key: 12,
    name: "K42+500~K43+000",
    xuhao: 12,
    zong: "-5.2mm",
    bannian: "8.3mm",
    beizhu: "缓"
  },
  {
    key: 13,
    name: "K43+000~K43+500",
    xuhao: 13,
    zong: "-1.2mm",
    bannian: "-2.3mm",
    beizhu: "缓"
  },
  {
    key: 14,
    name: "K43+500~K44+000",
    xuhao: 14,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 15,
    name: "K44+000~K44+500",
    xuhao: 15,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 16,
    name: "K44+500~K45+000",
    xuhao: 16,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 17,
    name: "K45+000~K45+500",
    xuhao: 17,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 18,
    name: "K45+500~K46+000",
    xuhao: 18,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 19,
    name: "K46+000~K46+500",
    xuhao: 19,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 20,
    name: "K46+500~K47+000",
    xuhao: 20,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 21,
    name: "K47+000~K47+500",
    xuhao: 21,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 22,
    name: "K47+500~K48+000",
    xuhao: 22,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 23,
    name: "K48+000~K48+500",
    xuhao: 23,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 24,
    name: "K48+500~K49+000",
    xuhao: 24,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 25,
    name: "K49+000~K49+500",
    xuhao: 25,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 26,
    name: "K49+500~K50+000",
    xuhao: 26,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 27,
    name: "K50+000~K50+500",
    xuhao: 27,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 28,
    name: "K50+500~K51+000",
    xuhao: 28,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 29,
    name: "K51+000~K51+500",
    xuhao: 29,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 30,
    name: "K51+500~K52+000",
    xuhao: 30,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 31,
    name: "K52+000~K52+500",
    xuhao: 31,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 32,
    name: "K52+500~K53+000",
    xuhao: 32,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 33,
    name: "K53+000~K53+500",
    xuhao: 33,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 34,
    name: "K53+500~K54+000",
    xuhao: 34,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 35,
    name: "K54+000~K54+500",
    xuhao: 35,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 36,
    name: "K54+500~K55+000",
    xuhao: 36,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 37,
    name: "K55+000~K55+500",
    xuhao: 37,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 38,
    name: "K55+500~K56+000",
    xuhao: 38,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 39,
    name: "K56+000~K56+500",
    xuhao: 39,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 40,
    name: "K56+500~K57+000",
    xuhao: 40,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 41,
    name: "K57+000~K57+500",
    xuhao: 41,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 42,
    name: "K57+500~K58+000",
    xuhao: 42,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 43,
    name: "K58+000~K58+500",
    xuhao: 43,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 44,
    name: "K58+500~K59+500",
    xuhao: 44,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 45,
    name: "K59+500~K60+000",
    xuhao: 45,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 46,
    name: "K60+000~K60+500",
    xuhao: 46,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 47,
    name: "K60+500~K61+000",
    xuhao: 47,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 48,
    name: "K61+000~K61+500",
    xuhao: 3,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 49,
    name: "K61+500~K62+000",
    xuhao: 49,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 50,
    name: "K62+000~K62+500",
    xuhao: 50,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 51,
    name: "K62+500~K63+000",
    xuhao: 51,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 52,
    name: "K63+000~K63+500",
    xuhao: 52,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 53,
    name: "K63+500~K64+000",
    xuhao: 53,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 54,
    name: "K64+000~K64+500",
    xuhao: 54,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 55,
    name: "K64+500~K65+000",
    xuhao: 55,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 56,
    name: "K65+500~K66+000",
    xuhao: 56,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 57,
    name: "K66+000~K66+500",
    xuhao: 57,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 58,
    name: "K66+500~K67+000",
    xuhao: 58,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 59,
    name: "K67+000~K67+500",
    xuhao: 59,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 60,
    name: "K67+500~K68+000",
    xuhao: 60,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 61,
    name: "K68+000~K68+500",
    xuhao: 61,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 62,
    name: "K68+500~K69+000",
    xuhao: 62,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 63,
    name: "K69+000~K69+500",
    xuhao: 63,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 64,
    name: "K69+500~K70+000",
    xuhao: 64,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 65,
    name: "K70+000~K71+500",
    xuhao: 65,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 66,
    name: "K71+500~K72+000",
    xuhao: 66,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 67,
    name: "K72+000~K72+500",
    xuhao: 67,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 68,
    name: "K72+500~K73+000",
    xuhao: 3,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 69,
    name: "K73+000~K73+500",
    xuhao: 3,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 70,
    name: "K73+500~K74+000",
    xuhao: 70,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 71,
    name: "K74+000~K74+500",
    xuhao: 71,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 72,
    name: "K74+500~K75+000",
    xuhao: 72,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 73,
    name: "K75+000~K75+500",
    xuhao: 73,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 74,
    name: "K75+500~K76+000",
    xuhao: 74,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 75,
    name: "K76+000~K76+500",
    xuhao: 75,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 76,
    name: "K76+500~K77+000",
    xuhao: 76,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  },
  {
    key: 77,
    name: "K77+000~K77+500",
    xuhao: 77,
    zong: "-16.2mm",
    bannian: "-8.3mm",
    beizhu: "缓"
  }
]
let table = lizi

function addTableItem(item) {
  console.log("itemitem", item.attr.chenjiang)
  table.unshift({ key: item.id, name: item.name, bannian: item.attr.bannian, zong: item.attr.zong, beizhu: item.attr.beizhu, xuhao: item.attr.xuhao })
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
