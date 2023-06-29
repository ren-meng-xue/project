<template>
  <div class="box4" ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
//引入中国地图的经纬度
import chinaJson from "./china.json";
//获取Dom元素
let map = ref();
//注册中国地图
echarts.registerMap("china", chinaJson as any);
onMounted(() => {
  let myechart = echarts.init(map.value);
  // console.log(myechart,'');

  //设置配置项
  myechart.setOption({
    geo: {
      //地图组件
      map: "china",
      // show: true, //false就隐藏了
      roam: true, //鼠标缩放效果
      //地图位置调试
      left: 50,
      top: 100,
      right: 50,
      bottom: 50,
      //地图上的文字设置
      label: {
        show: true,
        color: "#fff",
        // rotate: 20, //文字旋转
      },
      //每一个多边形的样式
      itemStyle: {
        borderColor: "rgba(147, 235, 248, 1)",
        opacity: 0.8, //图形绘制透明度
        borderWidth: 1,
        areaColor: {
          //图形背景
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(147, 235, 248, 0.2)", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        shadowColor: "rgba(128, 217, 248, 1)", //图形阴影的模糊大小
        shadowOffsetX: -2, //图形阴影的模糊大小
        shadowOffsetY: 2, //图形阴影的模糊大小
        shadowBlur: 10, //文字本身的阴影长度。
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: "skyblue",
        },
        label: {
          fontSize: 25,
        },
      },
    },
    //布局位置
    grid: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    //系列
    series: [
      {
        type: "lines",
        data: [
          {
            coords: [
              //北京
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点//福建
            ],
            //统一的样式设置
            lineStyle: {
              color: "white",
              width: 5,
            },
          },
        ],
        //是否显示特效
        effect: {
          show: true, //从起点到终点的一个特效
          symbol:
            "path://M597.877173 341.135574l-297.529548-83.504056-45.830823 45.979142 239.83314 148.319815-125.923523 146.391657-64.370799-2.818076-45.830823 45.830822 48.797219 33.371959a136.30591 136.30591 0 0 0-22.544612 57.844727 97.594438 97.594438 0 0 0 67.188876-14.831981l25.214369 42.122827 45.682503-27.142526-8.45423-84.838934 156.625725-130.669756 150.247972 257.928157 44.495944-43.754345-77.126303-309.691773 102.637311-103.82387c44.495944-49.687138 64.3708-93.738123 44.495945-128.59328-38.563152-10.975666-78.757822-3.707995-122.067208 40.04635z",
          color: "#000",
          symbolSize: 20,
        },
      },
    ],
  });
});
</script>

<style lang="scss" scoped></style>
