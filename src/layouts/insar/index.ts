import { useWidgetStore, useWidget } from "@mars/common/store/widget"
const { activate, isActivate, disable } = useWidget()

export function showinsar(showinsars) {
  showinsars = !showinsars
  const showinsarss = showinsar
  if (showinsarss) {
    activate("demo-manage-layers")
  }
}
