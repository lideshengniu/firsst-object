<template>
  <div class="bg">
    <section class="mainbox">
      <div v-show="Test.show" class="column">
        <div class="panel bar">
          <h2>
            沉降量超越阈值个数 <a href="javascript:;">2019</a>
            <a href="javacript:;"> 2020</a>
          </h2>
          <div class="chart" ref="bar1"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>沉降速率变化</h2>
          <div class="chart" ref="chart1"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>重点沉降区域分布</h2>
          <div class="chart" ref="circle1"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <!-- <div class="no">
          <div class="no-hd">
            <ul>
              <li>xx</li>
              <li>xx</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>标题1</li>
              <li>标题2</li>
            </ul>
          </div>
        </div> -->
        <div class="no">
          <div class="no-bd">
            <mars class="mars"></mars>
          </div>
        </div>
      </div>

      <div v-show="Test.show" class="column">
        <div class="panel bar1">
          <h2>地表传感器</h2>
          <div class="chart sensor" ref="sensor"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line1">
          <ul class="yujin">
            <li class="a title">
              <div>当前报警</div>
            </li>
            <li class="a smchart">
              <div class="b green">
                <div class="e f">10</div>
                <div class="e">正常</div>
              </div>
              <div class="b blue">
                <div class="e f">0</div>
                <div class="e">一级</div>
              </div>
              <div class="b yellow">
                <div class="e f">0</div>
                <div class="e">二级</div>
              </div>
              <div class="b red">
                <div class="e f">0</div>
                <div class="e">三级</div>
              </div>
            </li>
            <li class="a title">
              <div>历史报警</div>
            </li>
            <li class="a down" ref="yujin"></li>

            <div class="panel-footer"></div>
          </ul>
        </div>
        <div class="panel pie1">
          <h2>工点状况</h2>
          <div pie1>
            <gd />
          </div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import sc from "./json/sichuan.json"
import { ref, nextTick, onMounted } from "vue"
import * as echarts from "echarts"
import mars from "@mars/views/index.vue"
import gd from "./gongdian/index.vue"
import { useTestStore } from "@/store/xx/index"
const columns = ref([
  {
    title: "工点信息",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "位置",
    dataIndex: "weizhi",
    key: "weizhi",
    width: 150,
    ellipsis: true
  },
  {
    title: "状态",
    key: "tags",
    dataIndex: "tags"
  }
])
const data = ref([
  {
    key: "1",
    name: "戚山铁矿采场",
    weizhi: "32",
    tag: "正常"
  },
  {
    key: "2",
    name: "戚山铁矿采场",
    weizhi: "K43+200~k44+500",
    tag: "正常"
  },
  {
    key: "3",
    name: "戚山铁矿采场",
    weizhi: "K43+200~k44+500",
    tag: "正常"
  }
])
const bar1 = ref()
const chart1 = ref()
const circle1 = ref()
const map1 = ref()
const sensor = ref()
const yujin = ref()
onMounted(() => {
  nextTick(() => {
    initEcharts()
  })
})
const Test = useTestStore()

function initEcharts() {
  const mychart1 = echarts.init(bar1.value, "dark")
  const option1 = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      show: true,
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true,
      backgroundColor: "transparent",
      ShadowColol: "yellow",
      shadowOffsetX: 3
    },
    xAxis: [
      {
        type: "category",
        data: ["一月", " 二月", "三月", "四月", "五月", "六月"],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: "rgba(255,255,255,.6)",
          fontSize: "12"
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "rgba(255,255,255,.6)",
          fontSize: 12,
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          }
        }
      }
    ],
    series: [
      {
        name: "点数",
        type: "bar",
        barWidth: "35%",
        data: [2, 3, 4, 1, 6, 2],
        itemStyle: {
          barBorderRadius: 6
        }
      }
    ]
  }
  mychart1.setOption(option1)

  // chart1
  const mychart2 = echarts.init(chart1.value, "dark")
  const data = {
    num: [
      [0.5, -2, 6, -4.3, -2.521, 8],

      [5, -7.2, 3.55, -2.3, 8, 0]
    ]
  }
  const option2 = {
    color: ["#00f2f1", "#ed3f35"],
    tooltip: { trigger: "axis" },
    legend: {
      right: "10%",
      itemStyle: {
        color: "inherit"
      }
    },
    grid: { top: "10%", bottom: "4%", left: 0, show: true, borderColor: "#012f4a", containLabel: true },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["一月", "二月", "三月", "四月", "五月", "六月"],
      axisTick: {
        show: false
      },
      axisLabel: { color: "rgba(255,255,255,.7)" },

      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false
      },
      axisLabel: { color: "rgba(255,255,255,.7)" },
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [
      { name: "半年", type: "line", smooth: true, symbol: "circle", data: data.num[0] },
      { name: "平均", type: "line", smooth: true, data: data.num[1], symbol: "circle" }
    ]
  }
  mychart2.setOption(option2)

  const mychart3 = echarts.init(circle1.value, "dark")
  const option3 = {
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/>{b}:{c} ({d}%)",
      position: function (p) {
        return [p[0] + 10, p[1] - 10]
      }
    },
    legend: {
      top: "5%",
      left: "1%",
      itemWidth: 10,
      itemHeigth: 10,
      // data: ["0-5 mm/ly", "0-10 mm/ly", "0 - -5 mm/ly", "10-15 mm/ly", "-5- -10 mm/ly"],
      textStyle: {
        color: "ragba(255,255,255,.5)",
        fontSize: "10"
      }
    },
    series: [
      {
        name: "沉降区域分布",
        type: "pie",
        center: ["50%", "55%"],
        radius: ["40%", "60%"],
        color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 1, name: "沉降量0-(-5) mm/ly" },
          { value: 5, name: "沉降量0-(-10) mm/ly" },
          { value: 4, name: "沉降量在0-5 mm/ly" },
          { value: 5, name: "沉降量5-10 mm/ly" },
          { value: 7, name: "沉降量5-15 mm/ly" }
        ]
      }
    ]
  }
  mychart3.setOption(option3)
  // const mymap1 = echarts.init(map1.value, "dark")

  // const option4 = {
  //   backgroundColor: "rgba(255,255,255,.01)",
  //   tooltip: {
  //     show: true,
  //     trigger: "item",
  //     alwaysShowContent: false,
  //     backgroundColor: "#0C121C",
  //     borderColor: "rgba(0, 0, 0, 0.16);",
  //     hideDelay: 100,
  //     triggerOn: "mousemove",
  //     enterable: true,
  //     textStyle: {
  //       color: "#DADADA",
  //       fontSize: "12",
  //       width: 20,
  //       height: 30,
  //       overflow: "break"
  //     },
  //     showDelay: 100
  //   },
  //   geo: {
  //     map: "sichuan",
  //     label: {
  //       // 通常状态下的样式
  //       normal: {
  //         show: true,
  //         textStyle: {
  //           color: "#fff"
  //         }
  //       },
  //       // 鼠标放上去的样式
  //       emphasis: {
  //         textStyle: {
  //           color: "#fff"
  //         }
  //       }
  //     },
  //     // 地图区域的样式设置
  //     itemStyle: {
  //       normal: {
  //         borderColor: "rgba(147, 235, 248, 1)",
  //         borderWidth: 1,
  //         areaColor: {
  //           type: "radial",
  //           x: 0.5,
  //           y: 0.5,
  //           r: 0.8,
  //           colorStops: [
  //             {
  //               offset: 0,
  //               color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
  //             },
  //             {
  //               offset: 1,
  //               color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
  //             }
  //           ],
  //           globalCoord: false // 缺省为 false
  //         },
  //         shadowColor: "rgba(128, 217, 248, 1)",
  //         shadowOffsetX: -2,
  //         shadowOffsetY: 2,
  //         shadowBlur: 10
  //       },
  //       // 鼠标放上去高亮的样式
  //       emphasis: {
  //         areaColor: "#389BB7",
  //         borderWidth: 0
  //       }
  //     }
  //   }
  // }
  // echarts.registerMap("sichuan", scs)
  // mymap1.setOption(option4)
  const mychart4 = echarts.init(sensor.value, "dark")
  const data4 = [10, 8, 2]
  const valdata = [10, 8, 2]
  const titlename = ["总数", "正常", "损坏"]
  const color4 = ["#1089E7", "#F57474", "#56D0E3"]

  const option5 = {
    grid: {
      top: "2%",
      left: "15%",
      bottom: "10%"
    },
    xAxis: {
      show: false
    },
    yAxis: [
      {
        show: true,
        data: titlename,
        inverse: true,
        axisLine: {
          show: false
        },
        offset: 10,
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#fff",

          // rich: {
          //   lg: {
          //     backgroundColor: "#339911",
          //     color: "#fff",
          borderRadius: 15,
          // padding: 5,
          align: "center",
          width: 10,
          height: 10
          //   }
          // }
        }
      },
      {
        show: true,
        inverse: true,
        data: valdata,
        axisLabel: {
          fontSize: 12,
          color: "#fff"
        }
      }
    ],
    series: [
      {
        name: "条",
        type: "bar",
        yAxisIndex: 0,
        data: data4,
        barCategoryGap: 50,
        barWidth: 10,
        itemStyle: {
          barBorderRadius: 20
          // color: function (params) {
          //   const num = color4.length
          //   return color4[params.dataIndex % num]
          // }
        },
        label: {
          show: true,
          position: "inside",
          formatter: "{c}0%"
        }
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        barCategoryGap: 5,
        data: [10, 10, 10],
        barWidth: 15,
        itemStyle: {
          normal: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
          }
        }
      }
    ]
  }
  // const option5 = {
  //   color: ["#2f89cf"],
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "shadow"
  //     }
  //   },
  //   grid: {
  //     show: true,
  //     left: "0%",
  //     top: "10px",
  //     right: "0%",
  //     bottom: "4%",
  //     containLabel: true,
  //     backgroundColor: "transparent",
  //     ShadowColol: "yellow",
  //     shadowOffsetX: 3
  //   },
  //   xAxis: [
  //     {
  //       type: "category",
  //       data: ["一月", " 二月", "三月", "四月", "五月", "六月"],
  //       axisTick: {
  //         alignWithLabel: true
  //       },
  //       axisLabel: {
  //         color: "rgba(255,255,255,.6)",
  //         fontSize: "12"
  //       },
  //       axisLine: {
  //         show: false
  //       }
  //     }
  //   ],
  //   yAxis: [
  //     {
  //       type: "value",
  //       axisLabel: {
  //         color: "rgba(255,255,255,.6)",
  //         fontSize: 12,
  //         axisLine: {
  //           lineStyle: {
  //             color: "rgba(255,255,255,.1)"
  //           }
  //         }
  //       }
  //     }
  //   ],
  //   series: [
  //     {
  //       name: "点数",
  //       type: "bar",
  //       barWidth: "35%",
  //       data: [2, 3, 4, 1, 6, 2],
  //       itemStyle: {
  //         barBorderRadius: 6
  //       }
  //     }
  //   ]
  // }
  mychart4.setOption(option5)
  const mychart5 = echarts.init(yujin.value, "dark")
  const option8 = {
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/>{b}:{c} ({d}%)",
      position: function (p) {
        return [p[0] + 10, p[1] - 10]
      }
    },
    legend: {
      top: "5%",
      left: "1%",
      itemWidth: 10,
      itemHeigth: 10,
      // data: ["0-5 mm/ly", "0-10 mm/ly", "0 - -5 mm/ly", "10-15 mm/ly", "-5- -10 mm/ly"],
      textStyle: {
        color: "ragba(255,255,255,.5)",
        fontSize: "10"
      }
    },
    series: [
      {
        name: "沉降区域分布",
        type: "pie",
        center: ["50%", "70%"],
        radius: ["40%", "60%"],
        color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 10, name: "正常" },
          { value: 0, name: "一级" },
          { value: 0, name: "二级" },
          { value: 0, name: "三级" },
          { value: 0, name: "4级" }
        ]
      }
    ]
  }
  mychart5.setOption(option8)
}
</script>

<style scoped lang="less">
.bg {
  line-height: 1;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  height: 100%;
  background-image: url("./images/bg.jpg");
  // background-size: 100% 100%;
}
@font-face {
  font-family: electronicFont;
  src: url(./font/DS-DIGIT.TTF);
}
.mainbox {
  // background-color: red;
  height: 100%;
  min-width: 1024px;
  max-width: 1800px;
  margin: 0 auto;
  padding-left: 10px;
  padding-top: 10px;
  display: flex;
  .column {
    flex: 3;
    height: 100%;
    // background-color: red;
  }
  .column:nth-child(2) {
    flex: 5;
  }
  .panel {
    position: relative;
    height: 21rem;
    // background-color: red;
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: rgba(255, 255, 255, 0.04) url(./images/line1.png);
    padding: 0 0.1875rem 0.5rem;
    margin-bottom: 0.1875rem;
  }
  .panel::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
  }
  .panel::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-top: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
  }
  .panel .panel-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 440px;
  }
  .panel .panel-footer::before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
  }
  .panel .panel-footer::after {
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
  }
  .panel h2 {
    // background-color: red;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 400;
  }
  .panel h2 a {
    margin: 0 0.4rem;
    color: #fff;
    text-decoration: underline;
  }
  .panel .chart {
    height: 15rem;
    // background-color: red;
  }
  .no {
    background: rgba(101, 132, 226, 0.1);
    padding: 0.8rem;
    // .no-hd {
    //   position: relative;
    //   border: 5px solid rgba(25, 186, 139, 0.17);
    //   &::before {
    //     content: "";
    //     position: absolute;
    //     width: 30px;
    //     height: 10px;
    //     border-top: 2px solid #02a6b5;
    //     border-left: 2px solid #02a6b5;
    //     top: 0;
    //     left: 0;
    //   }
    //   &::after {
    //     content: "";
    //     position: absolute;
    //     width: 30px;
    //     height: 10px;
    //     border-bottom: 2px solid #02a6b5;
    //     border-right: 2px solid #02a6b5;
    //     right: 0;
    //     bottom: 0;
    //   }
    //   ul {
    //     display: flex;
    //     li {
    //       position: relative;
    //       flex: 1;
    //       text-align: center;
    //       height: 2rem;
    //       line-height: 2rem;
    //       font-size: 3rem;
    //       color: #ffeb7b;
    //       padding: 0.05rem 0;
    //       font-family: electronicFont;
    //       font-weight: bold;
    //       &:first-child::after {
    //         content: "";
    //         position: absolute;
    //         height: 50%;
    //         width: 1px;
    //         background: rgba(255, 255, 255, 0.2);
    //         right: 0;
    //         top: 25%;
    //       }
    //     }
    //   }
    // }
    // .no-bd ul {
    //   // display: flex;
    //   li {
    //     flex: 1;
    //     height: 0.5rem;
    //     line-height: 0.5rem;
    //     text-align: center;
    //     font-size: 0.225rem;
    //     color: rgba(255, 255, 255, 0.7);
    //     padding-top: 0.125rem;
    //   }
    // }
  }
  .marsbd::after {
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #02a6b5;
    border-right: 2px solid #02a6b5;
  }
  .marsbd::before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #02a6b5;
    border-left: 2px solid #02a6b5;
  }
  .mars {
    //   margin-top: -20px;
    // height: 45rem;
  }
  .map {
    // background-color: red;
    position: relative;
    height: 100%;
    width: 100%;
    .chart {
      // background-color: red;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      height: 100%;
      width: 100%;
    }
    .map1,
    .map2,
    .map3 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 35rem;
      height: 35rem;
      background: url(./images/map.png) no-repeat;
      background-size: 100% 100%;
      opacity: 0.3;
    }
    .map2 {
      width: 40rem;
      height: 40rem;
      background-image: url(./images/lbx.png);
      opacity: 0.6;
      animation: rotate 15s linear infinite;
      z-index: 2;
    }
    .map3 {
      width: 40rem;
      height: 40rem;
      background-image: url(./images/jt.png);
      animation: rotate1 10s linear infinite;
    }

    @keyframes rotate {
      from {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    @keyframes rotate1 {
      from {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(-360deg);
      }
    }
  }

  @media screen and (max-width: 1024px) {
    html {
      font-size: 42px !important;
    }
  }
  @media screen and (min-width: 1920) {
    html {
      font-size: 80px !important;
    }
  }
  .yujin {
    height: 100%;
    display: flex;
    flex-direction: column;
    .a {
      flex: 3;
    }
    .a:nth-child(1) {
      flex: 0.5;
    }
    .a:nth-child(2) {
      flex: 4;
    }
    .a:nth-child(3) {
      flex: 0.5;
    }
    .a:nth-child(4) {
      flex: 5;
    }
    .title {
      div {
        font-size: 20px;
        height: 100%;
        line-height: 30px;
        text-align: center;
        // background-color: red;
      }
    }
    // .down {
    //   // background-color: blue;
    // }
    .smchart {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // background-color: rgb(9, 0, 128);
      .b {
        flex: 2.5;
        // background-color:;
        margin: 5px;
        font-size: 25px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        line-height: 25px;
        height: 25px;
        text-align: center;
        // background-color: red;
        .f {
          margin-top: 25px;
          margin-bottom: 25px;
        }
        .e {
          font-size: 25px;
        }
      }

      .green {
        color: green;
      }
      .blue {
        color: skyblue;
      }
      .yellow {
        color: yellow;
      }
      .red {
        color: red;
      }
      .e {
        flex: 5;
        // width: 50%;
        // width: 50px;
        height: 50%;
        font-size: 30px;
        // background-color: red;
      }
    }

    // .smchart {
    //   // background-color: green;
    // }
  }
  .gd {
    background-color: green;
  }
}
.pie1 {
  background-color: #7fb502;
  width: 100%;
  height: 100%;
  font-size: 20px;
}
.ant-table-fixed .ant-table-row-hover {
  background: #eef1f6 !important;
}
</style>
