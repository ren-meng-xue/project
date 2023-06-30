<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->

    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          background-color="#001529"
          text-color="white"
          active-text-color="yellow"
          :default-active="$route.path"
          :collapse="LayoutSettingStore.fold ? true : false"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="useStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabBar"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <!-- layout组件的顶部导航tabBar -->
      <TabBar />
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from "vue-router";
// 引入左侧菜单logo子组件
import Logo from "./Logo/index.vue";
//引入菜单组件
import Menu from "./menu/index.vue";
//引入顶部 tabBar组件
import TabBar from "./tabBar/index.vue";
//右侧内容展示区域
import Main from "./main/index.vue";
let $route = useRoute();
// console.log($route.path, "9090");
//获取用户相关的小仓库
import useUserStore from "@/store/modules/user";
import useLayoutSettingStore from "@/store/modules/setting";
let useStore = useUserStore();
//获取layout配置仓库
let LayoutSettingStore = useLayoutSettingStore();
// console.log(LayoutSettingStore, "LayoutSettingStore");
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none; //清楚菜单右侧的边框
      }
    }
  }
  .layout_tabBar {
    width: calc(100% - $base-menu-width);
    height: $base-tabBar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabBar-height);
    /* background: yellow; */
    left: $base-menu-width;
    top: $base-tabBar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
