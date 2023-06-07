<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu background-color="#001529" text-color="white">
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="useStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabBar">456</div>
    <!-- 内容展示区域 -->
    <div class="layout_main">
      <p style="height: 10000px">12</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入左侧菜单logo子组件
import Logo from "./Logo/index.vue";
//引入菜单组件
import Menu from "./menu/index.vue";
//获取用户相关的小仓库
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();
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
    background-color: hotpink;
    position: fixed;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabBar-height);
    background: yellow;
    left: $base-menu-width;
    top: $base-tabBar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
