import * as mars3d from "mars3d"
export let map
export let graphicLayer
export const Cesium = mars3d.Cesium
export const eventTarget = new mars3d.BaseClass()
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance
  graphicLayer = new mars3d.layer.GraphicLayer({ id: 104 })
  map.addLayer(graphicLayer)
  demo1(graphicLayer)
  demo11(graphicLayer)
}
export function onUnmounted() {
  map = null
}
function demo1(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: [103.022327, 26.592335, 70.4],
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
                              <div class="data-value"><span class="label-num">xx</span><span class="label-unit">mm</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">监测数据：</div>
                              <div class="data-value"><span class="label-num">13.14</span><span class="label-unit">m</span>
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
    pointerEvents: true
  })
  graphicLayer.addGraphic(graphic)
}
function demo11(graphicLayer) {
  const graphic = new mars3d.graphic.DivLightPoint({
    position: [103.022327, 26.592335],
    style: {
      color: "#f33349",
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    attr: { remark: "示例5" },
    popup: "测试popup",
    hasEdit: true
  })
  graphicLayer.addGraphic(graphic)
}

export function startDrawGraphic() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "div",
    style: {
      html: `<div class="marsImgPanel2">
                    <div class="title">测试DIV点</div>
                    <div class="content">此处可以绑定任意Html代码和css效果</div>
                </div >`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    }
  })
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
