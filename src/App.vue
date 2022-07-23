<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import Marsgis from "./marsgis/views/index.vue"
import Title from "./components/title/index.vue"
import View from "./layouts/index.vue"
</script>

<template>
  <!-- <Title></Title> -->
  <!-- <marsgis></marsgis> -->
  <View></View>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
