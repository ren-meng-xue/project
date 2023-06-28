<template>
  <div class="container">
    <!-- 数据大屏展示内容的区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">左侧</div>
        <div class="center">中间</div>
        <div class="right">右侧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//引入顶部子组件
import Top from "./components/top/index.vue";
//获取数据大屏展示内容盒子的Dom元素
let screen = ref();
onMounted(() => {
  //初始化的时候再给他加载回来
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  // 16:9 的关系
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}
//监听适口的变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    width: 1920px;
    height: 1080px;
    /* background-color: red; */
    //以中心为点，固定定位，这样以后都是基于中心旋转的
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
      /* background-color: seagreen; */
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
      }
      .left {
        flex: 1;
      }
      .center {
        flex: 2;
      }
    }
  }
}
</style>
