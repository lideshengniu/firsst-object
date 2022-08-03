import { url } from "inspector"
import request from "../utils/request"

export const getXY = (params) => {
  return request({
    method: "get",
    url: "/",
    params: params
  })
}
