<template>
  <div class="tabBar">
    <div class="tabBar_left">
      <Breadcrumb />
    </div>
    <div class="tabBar_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>
<script lang="ts">
export default {
  name: "TabBars",
};
</script>
<style lang="scss" scoped>
.tabBar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* background-image: linear-gradient(to right, white, black, white); */
  .tabBar_left {
    display: flex;
    align-items: center;
  }
  .tabBar_right {
    display: flex;
    align-items: center;
  }
}
</style>
