import { defineStore } from "pinia"
import { Names } from "../store-namespace"

import { Result } from "ant-design-vue"

// const { activate } = useWidget()
export const useTestStore = defineStore(Names.Test3, {
  state: () => {
    return {
      gys: false,
      shili: false
    }
  },
  getters: {},
  actions: {
    showgys() {
      this.gys = !this.gys
    },
    showshili() {
      this.shili = !this.shili
    }
  }
})
