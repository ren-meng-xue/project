<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    alt=""
    srcset=""
    style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
//获取用户相关的小仓库
import useUserStore from "@/store/modules/user";
//获取骨架的小仓库
import useLayoutSettingStore from "@/store/modules/setting";
let userStore = useUserStore();
//获取路由器对象
let $router = useRouter(); //用来操作路由的
let $route = useRoute(); //用来获取路由信息的
// console.log($router, $route, "9999999");
let LayoutSettingStore = useLayoutSettingStore();
//刷新按钮点击的回调
const updateRefresh = () => {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh;
};

//全屏按钮点击(只有在谷歌能用，没有兼容)
const fullScreen = () => {
  // console.log(document.fullscreenElement);
  // Dom 对象的一个属性，可以用来判断当前是不是全凭，如果是全凭返回true 否则返回null就是false
  let full = document.fullscreenElement;
  //切换为全屏模式
  if (!full) {
    //文档根节点的方法requestFullscreen(),实现全屏模式
    document.documentElement.requestFullscreen();
  } else {
    //退出全屏模式
    document.exitFullscreen();
  }
};

//退出登陆
const logout = () => {
  //一、需要向服务器发送请求(退出登陆接口)*******
  // 二、仓库当中关于用户相关的数据清空（token,username,avatar）
  //三、跳转到登陆页面
  userStore.userLogout();
  //跳转到登陆
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style lang="scss" scoped></style>
