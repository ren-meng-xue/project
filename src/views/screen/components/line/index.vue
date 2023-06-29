<template>
  <div class="box5">
    <div class="title">
      <p>未来7天游客数量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let line = ref();
onMounted(() => {
  let mychart = echarts.init(line.value);
  //设置配置项
  mychart.setOption({
    title: {
      text: "访问量",
    },
    //x｜y轴
    xAxis: {
      type: "category", //在x轴上均匀分布
      boundaryGap: false, //数据是0的时候x轴两侧不留白
      //分割线不要
      splitLine: {
        show: false,
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      //y轴轴线
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //y轴轴线
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 0,
      bottom: 20,
      right: 20,
    },
    //系列
    series: {
      type: "line",
      data: [120, 1240, 66, 2999, 321, 890, 1200],
      smooth: true, //曲线是否平滑
      //区域填充样式
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "red", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "blue", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  });
});
</script>

<style lang="scss" scoped>
.box5 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%; //和整个盒子一边款一边高
  margin: 0 20px;
  .title {
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 40px);
  }
}
</style>
