<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" srcset="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
//引入设置标题与logo配置文件
import setting from "@/setting";
import {} from "vue";
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>

<style lang="scss" scoped>
.logo {
  height: $base-menu-logo-height;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
