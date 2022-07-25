<template>
  <a-layout-header style="background: rgba(55, 170, 190, 0.8); padding: 0; margin-bottom: -25px">
    <component :is="ismarsgis()"> </component>
    <!-- <MapTitles></MapTitles> -->
  </a-layout-header>
</template>
<script lang="ts" setup>
import { ref, reactive, Ref, computed, toRaw, markRaw, onUnmounted, onMounted, nextTick, watch, watchEffect } from "vue"
import { useRouter, useRoute, Router, RouteRecordName } from "vue-router"
import MapTitles from "../../components/title/index.vue"
import Headers from "../../components/headers/index.vue"
const router = useRouter()
const curRoute = useRoute()
let c
function ismarsgis() {
  if (curRoute.path === "/" || curRoute.path === "/marsgis") {
    console.log("xx888888", curRoute.path)
    return MapTitles
  } else {
    console.log("xx888888", curRoute.path, 9999)
    return Headers
  }
}
</script>
<style scoped></style>
