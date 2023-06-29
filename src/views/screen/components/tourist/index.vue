<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>9999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 展示图形图表的节点 -->
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill"; //水球图拓展插件
let people = ref("215980人");
let charts = ref();
// console.log(echarts, "echarts");
onMounted(() => {
  //获取echarts类的实例
  let mycharts = echarts.init(charts.value);
  //设置实例的配置项
  mycharts.setOption({
    //标题组件
    title: {
      text: "水球图",
    },
    //x轴组件
    xAxis: {},
    //y轴组件
    yAxis: {},
    //系列：决定你展示什么样的图形图标
    series: {
      type: "liquidFill",
      data: [0.6, 0.4, 0.2], //数据
      waveAnimation: true,
      animationDuration: 0,
      animationDurationUpdate: 0,
      radius: "100%", //大小半径
      outline: {
        //外层边框颜色设置
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: "skyblue",
          borderColor: "#294D99",
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: "rgba(0, 0, 0, 0.25)",
        },
      },
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
});
</script>

<style lang="scss" scoped>
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
