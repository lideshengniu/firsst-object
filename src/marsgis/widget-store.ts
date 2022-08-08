/**
 * index页面的widget配置
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/common/store/widget.js"
import { StoreOptions } from "vuex"

const store: StoreOptions<WidgetState> = {
  state: {
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/points11/index.vue"))),
        name: "point11",
        autoDisable: true
      },

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
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/file/index.vue"))),
        name: "file",
        group: "tools2"
      },
      // insar 数据感知
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/insarsjgz/manage-layers/index.vue"))),
        name: "demo-manage-layers",
        group: "tools3"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/insarsjgz/allroad/index.vue"))),
        name: "insarsjgzallroad",
        group: "tools3"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/insarsjgz/subgrade/index.vue"))),
        name: "insarsjgzechart",
        group: "tools3"
      },
      // insar 数据感知
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
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/gaobp/index.vue"))),
        name: "gaopo",
        group: "tools4"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/bridge/index.vue"))),
        name: "bridge",
        group: "tools4"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/insarsjgz/Road/index.vue"))),
        name: "road",
        group: "tools4"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/insarsjgz/subgrade/index.vue"))),
        name: "echartcjlx",
        group: "tools4"
      },
      /// /////////////////////
      /// ///////////////
      // 地表数据感知
      /// ////////////////
      /// //////
      /// 3.3 软基
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/ruanji/gdb/index.vue"))),
        name: "dbsjgzgdb",
        group: "tools4"
      },
      // 示例 3.3.1 沉降传感器1曲线
      {
        component: markRaw(defineAsyncComponent(() => import("@/marsgis/widgets/demo/dbsjgz/ruanji/chuangq/hmscjcgq/index.vue"))),
        name: "hmscjcgq1"
      },
      // 示例 3.3.2 沉降传感器2曲线
      {
        component: markRaw(defineAsyncComponent(() => import("@/marsgis/widgets/demo/dbsjgz/ruanji/chuangq/hmscjcgq2/index.vue"))),
        name: "hmscjcgq2"
      },
      // 示例 3.3.3 水平位移传感器1曲线
      {
        component: markRaw(defineAsyncComponent(() => import("@/marsgis/widgets/demo/dbsjgz/ruanji/chuangq/hmsspcgq/index.vue"))),
        name: "hmsspcgq1"
      },
      // 示例 3.3.4 水平位移传感器2曲线
      {
        component: markRaw(defineAsyncComponent(() => import("@/marsgis/widgets/demo/dbsjgz/ruanji/chuangq/hmsspcgq2/index.vue"))),
        name: "hmsspcgq2"
      },
      // 3.1 高边坡
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/gbp/gdb/index.vue"))),
        name: "dbsjgzgbpgdb",
        group: "tools4"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/gbp/chuangq/index.vue"))),
        name: "dbsjgzgbpcgq",
        group: "tools4"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/gbp/chenjiangqx/manage-layers/index.vue"))),
        name: "dbsjgzgbplayer",
        group: "tools4"
      },

      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/ruanji/chenjiangqx/manage-layers/index.vue"))),
        name: "rjcjqx"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/ruanji/chuangq/index.vue"))),
        name: "zsptc"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/ruanji/chuangq/index.vue"))),
        name: "rjcgq"
      },

      // 传感器曲线
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/tdql/chuangq/index.vue"))),
        name: "dbsjgztdqlcgq",
        group: "tools4"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/tdql/gdb/index.vue"))),
        name: "dbsjgztdqlgdb",
        group: "tools4"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/dbsjgz/tdql/chenjiangqx/manage-layers/index.vue"))),
        name: "dbsjgztdqllayer",
        group: "tools4"
      },
      /// /////////////////////
      /// ///////////////
      //  4.数据应用
      /// ////////////////
      /// //////

      // 4.1勘察设计
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/kcsj/dzks/Area/index.vue"))),
        name: "dzks"
      },
      // 4.2施工阶段
      // 4.2.1 边坡开挖
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/sgjd/bpkw/liebiao/index.vue"))),
        name: "bpkw"
      },
      // 4.2.1 地图
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/sgjd/bpkw/liebiao/ditu/geyangshan/index.vue"))),
        name: "bpkwgysdt"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/sgjd/bpkw/liebiao/ditu/huangmeishan/index.vue"))),
        name: "bpkwhmsdt"
      },

      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/sgjd/bpkw/liebiao/ditu/zhongshan/index.vue"))),
        name: "bpkwzsdt"
      },
      // --------------

      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/sgjd/rjyy/index.vue"))),
        name: "rjyy"
      },

      // 运营阶段

      // 软基
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/rj/index.vue"))),
        name: "yyjdjceyjrj"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/rj/yujing/index.vue"))),
        name: "yyjdjceyjrjys"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/rj/cgq/index.vue"))),
        name: "yyjdjceyjrjcgq"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/rj/ditu/index.vue"))),
        name: "yyjdjcyjrjditu"
      },
      // 软基完
      // 边坡
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/bp/index.vue"))),
        name: "jcbp"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/bp/cgq/index.vue"))),
        name: "yyjdjcyjbpcgq"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/bp/ditu/index.vue"))),
        name: "yyjdjcyjbpditu"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/bp/yujing/index.vue"))),
        name: "yyjdjcyjbpyujing"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/jcyj/bp/index.vue"))),
        name: "yyjdjcyjbp"
      },
      // 运营阶段
      /// 靶向运营
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/bxyy/ditu/index.vue"))),
        name: "bxyydt"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/yyjd/bxyy/index.vue"))),
        name: "bxyy"
      },
      //
      // 黄梅山介绍
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/demo/sjyy/sgjd/bpkw/liebiao/jiesao/huangmeishan/index.vue"))),
        name: "hmsjs"
      }
    ],
    openAtStart: []
  }
}

export default store
