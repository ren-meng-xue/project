<!--
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-08 22:46:16
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-08 23:39:43
-->
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
  <el-popover title="主题设置" :width="300" trigger="hover">
    <!-- 表单元素 -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="colors"
          show-alpha
          size="small"
          :predefine="predefineColors"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式"
        ><el-switch
          v-model="dark"
          size="small"
          active-icon="MoonNight"
          inactive-icon="Sunny"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
//获取用户相关的小仓库
import useUserStore from "@/store/modules/user";
//获取骨架的小仓库
import useLayoutSettingStore from "@/store/modules/setting";
let userStore = useUserStore();
//获取路由器对象
let $router = useRouter(); //用来操作路由的
//收集开关数据
let dark = ref<boolean>(false);
let colors = ref("rgba(255, 69, 0, 0.68)");
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
const logout = async () => {
  //一、需要向服务器发送请求(退出登陆接口)*******
  // 二、仓库当中关于用户相关的数据清空（token,username,avatar）
  //三、跳转到登陆页面
  await userStore.userLogout();
  //跳转到登陆
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

//switch开关的change事件进行暗黑模式的切换
const changeDark = () => {
  //获取html的根结点
  let html = document.documentElement;
  console.log(html, "html");
  //判断HTML标签是否有类名Dark
  html.className = dark.value ? "dark" : "";
};
//主题颜色的设置
const setColor = () => {
  //通过js修改根结点的样式对象的属性与属性值
  const el = document.documentElement;
  el.style.setProperty("--el-color-primary", colors.value);
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>

<style lang="scss" scoped></style>
