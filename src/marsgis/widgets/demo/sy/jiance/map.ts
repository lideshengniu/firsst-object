import * as mars3d from "mars3d"
export let map
export let graphicLayer
export const Cesium = mars3d.Cesium
export const eventTabel = new mars3d.BaseClass()
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
  demo1(graphicLayer)
  demo11(graphicLayer)
  demo2(graphicLayer)
  demo22(graphicLayer)
}
export function onUnmounted() {
  table = []
  map = null
}
function demo1(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: [118.529255, 31.552994, 70.4],
    style: {
      html: `<div class="marsTiltPanel marsTiltPanel-theme-blue">
          <div class="marsTiltPanel-wrap">
              <div class="area">
                  <div class="arrow-lt"></div>
                  <div class="b-t"></div>
                  <div class="b-r"></div>
                  <div class="b-b"></div>
                  <div class="b-l"></div>
                  <div class="arrow-rb"></div>
                  <div class="label-wrap">
                      <div class="title">2号传感器</div>
                      <div class="label-content">
                          <div class="data-li">
                              <div class="data-label">沉降量：</div>
                              <div class="data-value"><span class="label-num">10</span><span class="label-unit">mm</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">监测数据：</div>
                              <div class="data-value"><span class="label-num">20</span><span class="label-unit">km</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">传感器状态：</div>
                              <div class="data-value"><span class="label-tag data-value-status-1" alt="中间状态">开启状态</span><span
                                      class="label-tag data-value-status-0" alt="关闭状态">关闭状态</span></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="b-t-l"></div>
              <div class="b-b-r"></div>
          </div>
          <div class="arrow" ></div>
      </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      clampToGround: true,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000) // 按视距距离显示
    },
    id: 1,
    name: "2号",
    show: false
    // pointerEvents: true
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function demo11(graphicLayer) {
  const graphic = new mars3d.graphic.DivLightPoint({
    position: [118.529255, 31.552994, 70.4],
    style: {
      color: "#f33349",
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    attr: { remark: "示例5" },
    popup: "测试popup",
    hasEdit: true,
    id: 11,
    name: "2号",
    show: false
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function demo2(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: [118.525601, 31.515678, 70.4],
    style: {
      html: `<div class="marsTiltPanel marsTiltPanel-theme-blue">
          <div class="marsTiltPanel-wrap">
              <div class="area">
                  <div class="arrow-lt"></div>
                  <div class="b-t"></div>
                  <div class="b-r"></div>
                  <div class="b-b"></div>
                  <div class="b-l"></div>
                  <div class="arrow-rb"></div>
                  <div class="label-wrap">
                      <div class="title">1号传感器</div>
                      <div class="label-content">
                          <div class="data-li">
                              <div class="data-label">沉降量：</div>
                              <div class="data-value"><span class="label-num">-6</span><span class="label-unit">mm</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">监测数据：</div>
                              <div class="data-value"><span class="label-num">2</span><span class="label-unit">km</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">传感器状态：</div>
                              <div class="data-value"><span class="label-tag data-value-status-1" alt="中间状态">开启状态</span><span
                                      class="label-tag data-value-status-0" alt="关闭状态">关闭状态</span></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="b-t-l"></div>
              <div class="b-b-r"></div>
          </div>
          <div class="arrow" ></div>
      </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      clampToGround: true,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000) // 按视距距离显示
    },
    id: 2,
    name: "2号",
    show: true
    // pointerEvents: true
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}
function demo22(graphicLayer) {
  const graphic = new mars3d.graphic.DivLightPoint({
    position: [118.525601, 31.515678, 70.4],
    style: {
      color: "#f33349",
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    attr: { remark: "示例5" },
    popup: "测试popup",
    hasEdit: true,
    id: 22,
    name: "2号",
    show: true
  })
  graphicLayer.addGraphic(graphic)
  addTableItem(graphic)
}

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
export function getManagerLayer() {
  if (map.getLayer) {
    console.log("@32@", map.getLayer(104, "id"))
    return map.getLayer(104, "id")
  }
  return map.getLayer
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
