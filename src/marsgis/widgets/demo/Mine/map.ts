import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
let terrainClip: mars3d.thing.TerrainClip

export const mapOptions = {
  scene: {
    center: { lat: 30.827414, lng: 116.378229, alt: 16933, heading: 0, pitch: -56 }
  }
}

export const eventTabel = new mars3d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  addTerrainClip()

  // globalNotify(
  //   "已知问题：",
  //   `(1) 开挖区域内矢量对象无法穿透进行拾取。
  //     (2) 多个开挖区域距离太远时会存在误差。`,
  //   { duration: null }
  // )
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  table = []
}

function addTerrainClip() {
  terrainClip = new mars3d.thing.TerrainClip({
    // diffHeight: 20, // 井的深度
    image: "img/textures/excavate_side_min.jpg",
    imageBottom: "img/textures/excavate_bottom_min.jpg",
    splitNum: 80, // 井边界插值数,
    enabled: true,
    id: 1
  })
  map.addThing(terrainClip)

  const areaItem = terrainClip.addArea(
    [
      [118.545453967, 31.5817166337, 0],
      [118.5432987357, 31.5819098817, 0],
      [118.5414224024, 31.5817157412, 0],
      [118.5394428976, 31.5804817792, 0],
      [118.5382041813, 31.5783815934, 0],
      [118.5381213707, 31.577304501, 0],
      [118.5380035893, 31.5765784419, 0],
      [118.5383620805, 31.5751324127, 0],
      [118.5385355608, 31.5739629765, 0],
      [118.5397032791, 31.5727468865, 0],
      [118.5427933093, 31.57133808, 0],
      [118.545105328488, 31.5709750985246, 0],
      [118.5478243315, 31.5715134556, 0],
      [118.5495606822, 31.5736828296, 0],
      [118.5508155091, 31.5756151042, 0],
      [118.5513649865, 31.5772833195, 0],
      [118.548196632, 31.580821228, 0],
      [118.5456501485, 31.5813061227, 0]
    ],
    { diffHeight: 900 }
  )
  const areaItems = { areaItem: areaItem, name: "甄山凹尾矿坝" }
  addTableItem(areaItems)

  const areaItem2 = terrainClip.addArea(
    [
      [118.5289942309, 31.5133501779],
      [118.5260845433, 31.5138099936],
      [118.5245630798, 31.5132644289],
      [118.5236780019, 31.512211131],
      [118.5230926524, 31.510375403],
      [118.5225507783, 31.5084473598],
      [118.5227335769, 31.5068844699],
      [118.5227992587, 31.5051797],
      [118.5233780747, 31.5031638375],
      [118.5243704855, 31.5008874723],
      [118.5270187997, 31.4991887058],
      [118.5310155009, 31.4979738117],
      [118.5343117812, 31.498461808],
      [118.5362968818, 31.5000486042],
      [118.5370011578, 31.5035742084],
      [118.5371251792, 31.5074364826],
      [118.5364142896, 31.5105114805],
      [118.5342764164, 31.5124751793],
      [118.5297613472, 31.513200416]
    ],
    { diffHeight: 200 }
  )
  const areaItemss = { areaItem: areaItem2, name: "大青山尾矿坝" }
  addTableItem(areaItemss)

  eventTabel.fire("loadTerrainClip", { terrainClip })
}

// 添加矩形
export function btnDrawExtent(isShow) {
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8
    },
    success: function (graphic) {
      // 绘制成功后回调
      const positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      // 挖地区域
      const areaItem = terrainClip.addArea(positions)
      const areaItems = { areaItem: areaItem, name: "test" }
      addTableItem(areaItems)
    }
  })
}
// 添加多边形
export function btnDraw(isShow) {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    },
    success: function (graphic) {
      // 绘制成功后回调
      const positions = graphic.positionsShow
      map.graphicLayer.clear()

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      const areaItem = terrainClip.addArea(positions)
      const areaItems = { areaItem: areaItem, name: "test" }
      addTableItem({ areaItems })
    }
  })
}

// 清除
export function removeAll() {
  terrainClip.clear() // 清除挖地区域
  table = []
}

// 改变切割的深度
export function changeClipHeight(val) {
  terrainClip.diffHeight = val
}

// 是否挖地
export function chkClippingPlanes(val) {
  terrainClip.enabled = val
}

// 是否外切割
export function chkUnionClippingRegions(val) {
  terrainClip.clipOutSide = val
}

// 是否深度检测
export function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}

let table = []
// 区域表格添加一行记录
function addTableItem(x) {
  table.push({ key: x.areaItem.id, name: "矿区" + x.name })

  eventTabel.fire("tableObject", { table })
}
export function changeTable(data) {
  table = data
}

// 表格操作
export function flyToGraphic(item) {
  const graphic = terrainClip.getAreaById(item)
  map.flyToPositions(graphic.positions)
}

export function deletedGraphic(item) {
  const graphic = terrainClip.getAreaById(item)
  terrainClip.removeArea(graphic)
}

export function showHideArea(id, selected) {
  if (selected) {
    terrainClip.showArea(id)
  } else {
    terrainClip.hideArea(id)
  }
}
