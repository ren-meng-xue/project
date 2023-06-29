<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图标容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//引入echarts

import * as echarts from "echarts";
let charts = ref();
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  let option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: 40,
      right: 30,
      orient: "vertical", //图例组件方向设置，默认水平
      textStyle: {
        color: "white",
        fontSize: "14px",
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          color: "white",
        },
        //放大的效果
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "军事" },
          { value: 735, name: "新闻" },
          { value: 580, name: "娱乐" },
          { value: 484, name: "财经" },
          { value: 300, name: "体育" },
        ],
      },
    ],
    grid: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
  };
  mycharts.setOption(option);
});
</script>
<style lang="scss" scoped>
.box2 {
  width: 100%;
  height: 100%;
  background-color: red;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%; //和整个盒子一边款一边高
  .title {
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 260px; //echarts一定需要一个高度
  }
}
</style>
