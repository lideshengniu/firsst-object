<template>
  <div :id="withKeyId" class="mars3d-container"></div>
</template>
<script setup lang="ts">
/**
 * 地图渲染组件
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */

import { computed, onUnmounted, onMounted, h, ref } from "vue"

import * as mars3d from "mars3d"
import { getQueryString } from "@mars/utils/mars-util"
import { getDefaultContextMenu } from "@mars/utils/getDefaultContextMenu"
import { $alert, $message, $alert as globalAlert } from "@mars/components/mars-ui/index"
import { useWidget } from "@mars/common/store/widget"
import { useTestStore } from "@/store/index"
// import { graphicLayer } from "@/marsgis/widgets/demo/Road/map.js"
const Cesium = mars3d.Cesium
const Test = useTestStore()
const { activate, disable, isActivate, updateWidget } = useWidget()
const props = withDefaults(
  defineProps<{
    url: string
    mapKey?: string
    options?: any
  }>(),
  {
    url: "",
    mapKey: "default",
    options: () => ({})
  }
)

// 用于存放地球组件实例
let map: mars3d.Map // 地图对象

// 使用用户传入的 mapKey 拼接生成 withKeyId 作为当前显示容器的id
const withKeyId = computed(() => `mars3d-container-${props.mapKey}`)

onMounted(() => {
  // 获取配置
  mars3d.Util.fetchJson({ url: props.url }).then((data: any) => {
    initMars3d({
      // 合并配置项
      ...data.map3d,
      ...props.options
    })
  })
})

// onload事件将在地图渲染后触发
const emit = defineEmits(["onload"])
const initMars3d = (option: any) => {
  map = new mars3d.Map(withKeyId.value, option)
  // 绑定当前项目的默认右键菜单
  map.bindContextMenu(getDefaultContextMenu(map))
  let terrainClip
  // addTerrainClip()
  // function addTerrainClip() {
  //   terrainClip = new mars3d.thing.TerrainClip({
  //     // diffHeight: 20, // 井的深度
  //     image: "/img/textures/excavate_side_min.jpg",
  //     imageBottom: "/img/textures/excavate_bottom_min.jpg",
  //     splitNum: 80, // 井边界插值数,
  //     enabled: true
  //   })
  //   map.addThing(terrainClip)

  //   const areaItem = terrainClip.addArea(
  //     [
  //       [103.19, 26.899171, 645.46],
  //       [103.22, 26.899171, 645.46],
  //       [103.22, 26.944509, 645.46],
  //       [103.19, 26.944509, 645.46]
  //     ],
  //     { diffHeight: 900 }
  //   )
  //   // addTableItem(areaItem)

  //   const areaItem2 = terrainClip.addArea(
  //     [
  //       [116.416497, 30.934256, 775.89],
  //       [116.427392, 30.962941, 1084.88],
  //       [116.434838, 30.932608, 900.43],
  //       [116.462994, 30.923081, 771.42],
  //       [116.437571, 30.916044, 906.39],
  //       [116.44977, 30.894487, 776.06],
  //       [116.424183, 30.908752, 727.02],
  //       [116.402218, 30.898406, 593.08],
  //       [116.414309, 30.918806, 588.78],
  //       [116.387022, 30.933539, 700.65]
  //     ],
  //     { diffHeight: 200 }
  //   )
  //   // addTableItem(areaItem2)

  //   // eventTabel.fire("loadTerrainClip", { terrainClip })
  // }
  // 如果有xyz传参，进行定位
  const lat = getQueryString("lat")
  const lng = getQueryString("lng")
  if (lat && lng) {
    map.flyToPoint(new mars3d.LngLatPoint(lng, lat), { duration: 0 })
  }

  // 开场动画
  // map.openFlyAnimation();

  // 针对不同终端的优化配置
  if (mars3d.Util.isPCBroswer()) {
    map.zoomFactor = 2.0 // 鼠标滚轮放大的步长参数

    // IE浏览器优化
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
      map.viewer.targetFrameRate = 20 // 限制帧率
      map.scene.requestRenderMode = false // 取消实时渲染
    }
  } else {
    map.zoomFactor = 5.0 // 鼠标滚轮放大的步长参数

    // 移动设备上禁掉以下几个选项，可以相对更加流畅
    map.scene.requestRenderMode = false // 取消实时渲染
    map.scene.fog.enabled = false
    map.scene.skyAtmosphere.show = false
    map.scene.globe.showGroundAtmosphere = false
  }

  // //二三维切换不用动画
  if (map.viewer.sceneModePicker) {
    map.viewer.sceneModePicker.viewModel.duration = 0.0
  }

  // webgl渲染失败后，刷新页面
  map.on(mars3d.EventType.renderError, async () => {
    await $alert("程序内存消耗过大，请重启浏览器")
    window.location.reload()
  })
  const ninghuroad = map.getLayer(10001, "id")

  const eventTarget = new mars3d.BaseClass()
  const showEditor = (e: any) => {
    const graphic = e.graphic
    if (!graphic._conventStyleJson) {
      graphic.options.style = graphic.toJSON().style // 因为示例中的样式可能有复杂对象，需要转为单个json简单对象
      graphic._conventStyleJson = true // 只处理一次
    }

    if (!isActivate("graphic-editor")) {
      activate({
        name: "graphic-editor",
        data: { graphic: graphic }
      })
    } else {
      updateWidget("graphic-editor", {
        data: { graphic: graphic }
      })
    }
  }
  eventTarget.on("graphicEditor-start", async (e: any) => {
    showEditor(e)
  })
  eventTarget.on("graphicEditor-update", async (e: any) => {
    showEditor(e)
  })
  eventTarget.on("graphicEditor-stop", async (e: any) => {
    setTimeout(() => {
      if (!ninghuroad.isEditing) {
        disable("graphic-editor")
      }
    }, 100)
  })
  function bindLayerEvent() {
    ninghuroad.on(mars3d.EventType.drawCreated, function (e) {
      eventTarget.fire("graphicEditor-start", e)
    })

    ninghuroad.on(
      [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
      function (e) {
        eventTarget.fire("graphicEditor-update", e)
      }
    )

    ninghuroad.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
      eventTarget.fire("graphicEditor-stop", e)
    })
  }
  bindLayerEvent()
  // map构造完成后的一些处理
  onMapLoad()

  emit("onload", map)
}

// map构造完成后的一些处理
function onMapLoad() {
  // Mars3D地图内部使用，如右键菜单弹窗
  // @ts-ignore
  const ninghuroad = map.getLayer(10001, "id")
  function addjiance(graphicLayer) {
    const Cesium = mars3d.Cesium
    const graphic1 = new mars3d.graphic.DivGraphic({
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
      </div>`
        // horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        // clampToGround: true,
        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000) // 按视距距离显示
      },
      id: 1,
      name: "2号",
      show: true
      // pointerEvents: true
    })
    const graphic11 = new mars3d.graphic.DivLightPoint({
      position: [118.529255, 31.552994, 70.4],
      style: {
        color: "#f33349"
        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
        // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      },
      attr: { remark: "示例5" },
      popup: "测试popup",
      hasEdit: true,
      id: 11,
      name: "2号",
      show: true
    })
    graphicLayer.addGraphic(graphic1)
    graphicLayer.addGraphic(graphic11)
  }
  addjiance(ninghuroad)
  ninghuroad.bindContextMenu([
    {
      text: "开始编辑对象",
      show: function (e) {
        const graphic = e.graphic
        if (!ninghuroad || !graphic.startEditing) {
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
          ninghuroad.startEditing(graphic)
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
          ninghuroad.stopEditing(graphic)
        }
      }
    }
  ])
  // const bhtpoints = map.getLayer(1000, "id")
  // bhtpoints.bindContextMenu([
  //   {
  //     text: "沉降量",
  //     show: true,
  //     callback: (e) => {
  //       const graphic = e.graphic
  //       console.log(graphic.attr)
  //       // const html = `${graphic.attr.D_20220217}`
  //       // alert(html)
  //       Test.showinsar2(graphic.attr)
  //       setTimeout(() => {
  //         activate("point3")
  //       }, 2000)
  //     }
  //   }
  // ])
  const insarPoints = map.getLayerById(1000)
  insarPoints.show = true
  map.addLayer(insarPoints)
  insarPoints.bindContextMenu([
    {
      text: "沉降量",
      show: true,
      callback: (e) => {
        const graphic = e.graphic
        console.log(graphic.attr)
        // const html = `${graphic.attr.D_20220217}`
        // alert(html)
        Test.showinsar2(graphic.attr)
        setTimeout(() => {
          activate("point11")
        }, 2000)
      }
    }
  ])
  // 显示沉降const Cesium = mars3d.Cesium
  // const insar = map.getLayer(1000, "id")
  // insar.bindContextMenu([
  //   {
  //     text: "查看沉降数据",
  //     show: true,
  //     callback: (e) => {
  //       // const Cartesian3_to_WGS84 = function (point) {
  //       //   const cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z)
  //       //   const cartographic = Cesium.Cartographic.fromCartesian(cartesian33)
  //       //   const lat = Cesium.Math.toDegrees(cartographic.latitude)
  //       //   const lng = Cesium.Math.toDegrees(cartographic.longitude)
  //       //   const alt = cartographic.height
  //       //   return { lng: lng, lat: lat, alt: alt }
  //       // }
  //       // const a = Cartesian3_to_WGS84(e.cartesian)
  //       // console.log(a, "lrrrp")
  //       // const viewer = new Cesium.Viewer("mars3d-container")
  //       // const ellipsoid = viewer.scene.globe.ellipsoid
  //       // 世界坐标系
  //       // const cartesianss = e.cartesian
  //       // const cartesians = new Cesium.Cartesian3(cartesianss.x, cartesianss.y, cartesianss.z)
  //       // const cartographic = Cesium.Cartographic.fromCartesian(cartesians)
  //       // const lat = cartographic.latitude
  //       // const lng = cartographic.longitude
  //       //  const point = mars3d.LngLatPoint.fromCartesian(e.cartesian)
  // const lat = Cesium.Math.toDegrees(cartographic.latitude)
  // const lng = Cesium.Math.toDegrees(cartographic.longitude)
  //       // const alt = cartographic.height
  //       // console.log("therss", lat, lng, alt)
  //       // const mpt = mars3d.LngLatPoint.fromCartesian(e.cartesian)
  //       // const ptNew = mars3d.PointTrans.proj4Trans([mpt.lng, mpt.lat], "EPSG:4326", mars3d.CRS.CGCS2000_GK_Zone_3)
  //       // let viewer = window.viewer
  //       // const point = mars3d.LngLatPoint.fromCartesian(e.cartesian)
  //       // Test.showinsar(a.lng)
  //       // setTimeout(() => {
  //       //   activate("point2")
  //       // }, 7000)
  //       // const inhtml = `
  //       //  经度:${a.lng}, 纬度:${a.lat}, 海拔:${a.alt},
  //       // `
  //       // globalAlert(inhtml, "位置信息")
  //     }
  //   }
  // ])
  // @ts-ignore
  window.globalMsg = $message
  // window.globalAlert = $alert
  // 用于 config.json 中 西藏垭口 图层的详情按钮 演示
  // @ts-ignore
  window.showPopupDetails = (item: any) => {
    $alert(item.NAME)
  }

  // 用于 config.json中配置的图层，绑定额外方法和参数
}
// 组件卸载之前销毁mars3d实例
onUnmounted(() => {
  if (map) {
    map.destroy()
    map = null
  }
  console.log("map销毁完成", map)
})
</script>

<style lang="less">
/**cesium 工具按钮栏*/
.cesium-viewer-toolbar {
  top: auto !important;
  bottom: 35px !important;
  left: 12px !important;
  right: auto !important;
}
.cesium-toolbar-button img {
  height: 100%;
}
.cesium-viewer-toolbar > .cesium-toolbar-button,
.cesium-navigationHelpButton-wrapper,
.cesium-viewer-geocoderContainer {
  margin-bottom: 5px;
  float: left;
  clear: both;
  text-align: center;
}
.cesium-button {
  background-color: @mars-bg-base;
  color: #e6e6e6;
  fill: #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  line-height: 32px;
}
.cesium-button:hover {
  background: @mars-hover-btn-bg;
}

/**cesium 底图切换面板*/
.cesium-baseLayerPicker-dropDown {
  bottom: 0;
  left: 40px;
  max-height: 700px;
  margin-bottom: 5px;
  background-color: @mars-bg-base;
}

/**cesium 帮助面板*/
.cesium-navigation-help {
  top: auto;
  bottom: 0;
  left: 40px;
  transform-origin: left bottom;
  background: none;
  background-color: @mars-bg-base;
  .cesium-navigation-help-instructions {
    background: none;
  }
  .cesium-navigation-button {
    background: none;
  }
  .cesium-navigation-button-selected,
  .cesium-navigation-button-unselected:hover {
    background: @mars-select-bg;
  }
}

/**cesium 二维三维切换*/
.cesium-sceneModePicker-wrapper {
  width: auto;
}
.cesium-sceneModePicker-wrapper .cesium-sceneModePicker-dropDown-icon {
  float: right;
  margin: 0 3px;
}

/**cesium POI查询输入框*/
.cesium-viewer-geocoderContainer .search-results {
  left: 0;
  right: 40px;
  width: auto;
  z-index: 9999;
}
.cesium-geocoder-searchButton {
  background-color: @mars-bg-base;
}
.cesium-viewer-geocoderContainer .cesium-geocoder-input {
  background-color: rgba(63, 72, 84, 0.7);
}
.cesium-viewer-geocoderContainer .cesium-geocoder-input:focus {
  background-color: rgba(63, 72, 84, 0.9);
}
.cesium-viewer-geocoderContainer .search-results {
  background-color: @mars-bg-base;
}

/**cesium info信息框*/
.cesium-infoBox {
  top: 50px;
  background-color: @mars-bg-base;
}
.cesium-infoBox-title {
  background-color: @mars-bg-base;
}

/**cesium 任务栏的FPS信息*/
.cesium-performanceDisplay-defaultContainer {
  top: auto;
  bottom: 35px;
  right: 50px;
}
.cesium-performanceDisplay-ms,
.cesium-performanceDisplay-fps {
  color: #fff;
}

/**cesium tileset调试信息面板*/
.cesium-viewer-cesiumInspectorContainer {
  top: 10px;
  left: 10px;
  right: auto;
}
.cesium-cesiumInspector {
  background-color: @mars-bg-base;
}

/**覆盖mars3d内部控件的颜色等样式*/
.mars3d-compass .mars3d-compass-outer {
  fill: @mars-bg-base;
}
.mars3d-contextmenu-ul,
.mars3d-sub-menu {
  background-color: @mars-bg-base;

  > li > a:hover,
  > li > a:focus,
  > li > .active {
    background-color: @mars-hover-btn-bg;
  }

  > .active > a,
  > .active > a:hover,
  > .active > a:focus {
    background-color: @mars-hover-btn-bg;
  }
}

/* Popup样式*/
.mars3d-popup-color {
  color: @mars-base-color;
}
.mars3d-popup-background {
  background: @mars-bg-base;
}
.mars3d-template-content label {
  padding-right: 6px;
}
.mars3d-template-titile {
  border-bottom: 1px solid @mars-hover-btn-bg;
}
.mars3d-template-titile a {
  font-size: 16px;
}

.mars3d-popup-btn-custom {
  padding: 3px 10px;
  border: 1px solid #209ffd;
  background: #209ffd1c;
}
</style>
