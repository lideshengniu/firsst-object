/**
 * index页面的widget配置
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/common/store/widget"
import { StoreOptions } from "vuex"

const store: StoreOptions<WidgetState> = {
  state: {
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/query-poi/index.vue"))),
        name: "query-poi",
        autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/toolbar/index.vue"))),
        name: "toolbar",
        autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-basemap/index.vue"))),
        name: "manage-basemap",
        group: "manage"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/index.vue"))),
        name: "manage-layers",
        group: "manage",
        disableOther: ["roamLine"]
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-tree.vue"))),
        name: "layer-tree"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-picture-heatmap.vue"))),
        name: "layer-picture-heatmap"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/layer-picture-guihua.vue"))),
        name: "layer-picture-guihua"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/location-point/index.vue"))),
        name: "location-point",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/geojson/index.vue"))),
        name: "geojson",
        group: "tools"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/file/index.vue"))),
        name: "file",
        group: "tools2"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/Point-echarts/dangerpoints/points-echarts/index.vue"))),
        name: "point2",
        group: "tools2"
        // autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/Point-echarts/dangerpoints/index.vue"))),
        name: "point",
        group: "tools3"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/manage-layers/index.vue"))),
        name: "demo-manage-layers",
        group: "tools3"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/Point-echarts/subgrade/index.vue"))),
        name: "road",
        group: "tools3"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/graphic-editor/index.vue"))),
        name: "graphic-editor",
        meta: {
          props: {
            position: {
              left: 50,
              top: 10,
              bottom: 50
            }
          }
        }
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/jiance/index.vue"))),
        name: "jiance",
        group: "tools4"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/Mine/index.vue"))),
        name: "Mine",
        group: "tools4"
      }
    ],
    openAtStart: []
  }
}

export default store
