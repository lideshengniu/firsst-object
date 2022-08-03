import { defineStore } from "pinia"
import { Names } from "./store-namespace"
import { getXY } from "../api/common"
import { Result } from "ant-design-vue"
import { useWidget } from "@mars/common/store/widget"
import { resultProps } from "ant-design-vue/lib/result"
const { activate } = useWidget()
export const useTestStore = defineStore(Names.Test, {
  state: () => {
    return {
      points: {},
      point: {}
    }
  },
  getters: {},
  actions: {
    showinsar2(y) {
      // const result = y
      this.point = y
      console.log("this,point", this.point)
      // activate("point2")
    },
    async showinsar(x) {
      const result = await getXY({ x: x })
      console.log(result, "result")
      // if (result.status === Number(200)) {
      this.points = result.data
      // } else {
      //   alert("该处无点数据")
      // }
    }
  }
})
