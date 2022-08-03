<template>
  <mars-dialog title="沉降" top="20" right="2" bottom="500" width="500">
    <ul class="chart">
      <li class="chart1">
        <div class="chart1-title">历史总沉降</div>
        <div class="chart1-points" ref="chart1"></div>
      </li>
      <li class="chart2">2</li>
    </ul>
  </mars-dialog>
</template>
<script setup lang="ts">
import { Color } from "mars3d-cesium"

// import { dataTime } from "src/components/title/map"

import { nextTick, onMounted, ref } from "vue"
import * as echart from "echarts"
onMounted(() => {
  nextTick(() => {
    initEncharts()
  })
})
const chart1 = ref()
function initEncharts() {
  const mychart1 = echart.init(chart1.value, "dark")
  const data = [
    ["k28", 5],
    ["k29", -5],
    ["k30", 8],
    ["k31", -6],
    ["k32", 9],
    ["k33", 4],
    ["k34", 6],
    ["k35", -10],
    ["k36", -2],
    ["k37", -6],
    ["k38", 12],
    ["k39", 8],
    ["k40", 3],
    ["k41", 5],
    ["k43", 5],
    ["k44", 5],
    ["k45", 5],
    ["k46", 5],
    ["k47", 5],
    ["k48", 5]
  ]
  const dateList = data.map(function (item) {
    return item[0]
  })
  const valueList = data.map(function (item) {
    return item[1]
  })
  const option = {
    visualMap: [],
    title: {
      // text: "anscombe",
      left: "center",
      top: 0
    },
    dataZoom: {
      type: "slider",
      id: "沉降",
      show: true,
      handleStyle: { color: "red" },
      start: 1,
      end: 35
    },
    grid: {
      left: "5%",
      right: "0%",
      top: "18%",
      bottom: "5%",
      containLabel: true
    },
    // eslint-disable-next-line no-dupe-keys
    // visualMap: {
    //   show: false,
    //   type: "continuous",
    //   seriesIndex: 0,
    //   min: 0,
    //   max: 400
    // },
    tooltip: {
      trigger: "axis",
      show: true,
      axisPointer: {
        type: "cross"
      },
      confine: true, // 是否将tooltip 限制在图表内
      textStyle: {
        align: "left"
      },
      formatter: function (item: any) {
        console.log(item, "item")
        let html = item[0].axisValue
        item.slice(0).forEach((s: any) => {
          if (s.seriesName.indexOf("series") === -1) {
            html = `${html} <br/> ${s.seriesName}:${s.data}mm`
          }
        })
        return html
      }
      //   // return  '{b0}<br/>{a1}: {c1}<br/>{a2}: {c2}'
      // },
      // axisPointer: { show: true, type: " line" }
    },
    legend: {
      // 图例
      show: true,
      // data:[""]
      top: "0%",
      left: "30%",
      icon: "circle",
      type: "scroll",
      itemHeight: fontSize(0.5),
      itemWidth: fontSize(0.5),
      textStyle: {
        fontSize: fontSize(0.6)
      }
    },
    xAxis: {
      type: "category",
      data: dateList,
      axisTick: {
        // 坐标轴
        alignWithLabel: false,
        show: true,
        lineStyle: {
          color: "#ccc"
        }
      },
      axisLine: {
        // show: "false",
        onZero: "false",
        // 坐标轴轴线相关设置
        lineStyle: {
          color: "#ccc"
        }
      }
      // axisTick: {
      //   show: true,
      //   lineStyle: {
      //     color: "#ccc"
      //   },
      //   alignWithLabel: false
      // },
      // axisLine: {
      //   lineStyle: {
      //     color: "#ccc"
      //   }
      // },
      // axisLabel: {
      //   // X轴文字样式
      //   fontSize: fontSize(0.6875),
      //   interval: 0,
      //   padding: [10, 0, 0, 0]
      // },
      // splitLine: {
      //   show: false
      // },
      // show: true
    },
    yAxis: {
      name: "mm/ly",
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: "#ccc"
        }
      },
      axisTick: {
        alignWithLabel: false,
        show: true,
        lineStyle: {
          color: "#ccc"
        }
      }
      // type: "category"
      // max: 0.03,
      // type: "value",
      // name: "",
      // axisLabel: {
      //   fontSize: fontSize(0.6),
      //   interval: 0,
      //   padding: [0, 0, 0, 0]
      // },
      // nameLocation: "end",
      // nameTextStyle: {
      //   align: "right",
      //   verticalAlign: "middle",
      //   borderDashOffset: 0,
      //   padding: [6, 6, 6, 6]
      // },
      // splitLine: { show: false },
      // axisLine: {
      //   lineStyle: {
      //     color: "#ccc"
      //   }
      // },
      // axisTick: {
      //   alignWithLabel: false,
      //   show: true,
      //   lineStyle: {
      //     color: "#ccc"
      //   }
      // }
    },
    color: ["skyblue", "orange", "yellow", "green"],
    series: [
      {
        type: "line",
        name: "总沉降",
        z: -8,
        symbol: "circle",
        itemStyle: {
          Color: "green",
          borderType: "dotted"
        },
        barGap: "-100%",
        barWidth: 12,
        lineStyle: {
          Color: "rgba(255,255,255,1)"
        },
        symbolSize: 5,
        // itemStyle: {
        //   normal: {
        //     color: "#06B800",
        //     color0: "#FA0000",
        //     borderColor: null,
        //     borderColor0: null
        //   }
        // },
        // itemStyle: {
        //   color: "green"
        // },
        data: valueList
      },
      {
        type: "scatter",
        name: "一月沉降",
        symbol: "circle",
        // colorBy: "data",
        symbolSize: 15,
        data: [1, 2, 3, 4, -1, -2, -3, -4, -5, -6, 7, -8, 5, -2]
      },
      {
        type: "scatter",
        name: "二月沉降",
        symbol: "circle",
        // colorBy: "data",
        symbolSize: 10,
        data: [10, 2, -15, -2, -5, -2, -3, -4, -5, 4, 7, -8, 5, -2]
      },
      {
        type: "scatter",
        name: "三月沉降",
        symbol: "circle",
        // colorBy: "data",
        symbolSize: 20,
        data: [1, 2, 5, 7, 1.2, -2, 2.2, -4, -4, -6, 7, 5, 1, -2]
      }
    ]
  }

  mychart1.setOption(option)
}
function fontSize(res: number) {
  return res * 16
}
</script>
<style scoped lang="less">
.chart {
  display: flex;
  // background-color: blue;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .chart1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .chart1-title {
      font-size: 1.56rem;
      text-align: center;
      height: 4rem;
      // background-color: red;
    }
    .chart1-points {
      height: 500px;
      width: 100%;
      // background-color: blue;
    }
  }
  .chart2 {
    background-color: rgb(236, 247, 236);
    width: 100%;
    height: 50%;
  }
}
</style>
