<template>
  <div class="container">
    <!-- 数据大屏展示内容的区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="Tourist" />
          <Sex class="Sex" />
          <Age class="Age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <rank class="rank" />
          <year class="year" />
          <counter class="counter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//引入顶部子组件
import Top from "./components/top/index.vue";
//引入左侧三个子组件
import Tourist from "./components/tourist/index.vue";
import Age from "./components/age/index.vue";
import Sex from "./components/sex/index.vue";
//引入中间两个子组件
import Map from "./components/map/index.vue";
import Line from "./components/line/index.vue";

//引入右侧排行组件
import rank from "./components/rank/index.vue";
import year from "./components/year/index.vue";
import counter from "./components/counter/index.vue";
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
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.5;
          /* background-color: skyblue; */
        }
        .year {
          flex: 1;
          /* background-color: lightcoral; */
        }
        .counter {
          flex: 1;
          /* background-color: red; */
        }
        /* background-color: red; */
      }
      .left {
        flex: 1;
        height: 1040px;
        /* background-color: red; */
        display: flex;
        flex-direction: column;
        .Tourist {
          flex: 1.2;
          /* background: skyblue; */
        }
        .Sex {
          flex: 1;
          /* background-color: lightcoral; */
        }
        .Age {
          flex: 1;
          /* background-color: beige; */
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .map {
          flex: 4;
          /* background-color: skyblue; */
        }
        .line {
          flex: 1;
          /* background-color: orange; */
        }
      }
    }
  }
}
</style>
