import { defineStore } from "pinia"
import { Names } from "../store-namespace"

import { Result } from "ant-design-vue"
import { useWidget } from "@mars/common/store/widget"
import { resultProps } from "ant-design-vue/lib/result"
const { activate } = useWidget()
export const useTestStore = defineStore(Names.Test4, {
  state: () => {
    return {
      hms: false
    }
  },
  getters: {},
  actions: {
    showgys() {
      this.hms = !this.hms
    }
  }
})
