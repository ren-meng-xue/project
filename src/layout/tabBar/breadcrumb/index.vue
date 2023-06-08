<template>
  <!-- 顶部左侧 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <!-- <Expand />. -->
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    <!-- Fold -->
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 图标 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题 -->
      <span style="margin: 0px 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useLayoutSettingStore from "@/store/modules/setting";
//获取layout配置相关的仓库
let LayoutSettingStore = useLayoutSettingStore();
//点击图标的方法
const changeIcon = () => {
  //图标进行切换
  LayoutSettingStore.fold = !LayoutSettingStore.fold;
};
let $route = useRoute();
console.log($route.matched, "$route");
</script>

<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>
<style lang="scss" scoped></style>
