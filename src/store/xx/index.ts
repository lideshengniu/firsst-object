import { defineStore } from "pinia"
import { Names } from "../store-namespace"

import { Result } from "ant-design-vue"
import { useWidget } from "@mars/common/store/widget"
import { resultProps } from "ant-design-vue/lib/result"
const { activate } = useWidget()
export const useTestStore = defineStore(Names.Test2, {
  state: () => {
    return {
      show: true
      // sy:{

      // }
    }
  },
  getters: {},
  actions: {
    showechart() {
      this.show = false
    },
    ruanji() {
      console.log(1)
    },
    showinsar() {
      this.show = true
    }
  }
})
