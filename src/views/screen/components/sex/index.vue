<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士50%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// import * echarts from 'echarts'
import * as echarts from "echarts";
//获取图形图标的Dom节点
let charts = ref();
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  console.log(mycharts, "mycharts");
  //设置配置项
  mycharts.setOption({
    //标题组件
    title: {
      text: "男女比例", //主标题
      textAlign: "center",
      textStyle: {
        //主标题颜色
        color: "skyblue",
      },
      left: "40%",
    },
    // x|y
    xAxis: {
      // type: "category",
      show: false, //隐藏x轴
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false, //隐藏y轴
      type: "category", //在y轴上均匀分布
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: "hotpink",
          borderRadius: 20,
        },
      },
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        //调整女士柱条的位置
        barGap: "-100%",
        itemStyle: {
          color: "pink",
          borderRadius: 20,
        },
      },
    ],
    grid: {
      //对布局平均分布
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>

<style lang="scss" scoped>
.box1 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%; //和整个盒子一边款一边高
  margin: 20px 0;
  .title {
    p {
      color: white;
      font-size: 20px;
    }
  }
  .sex {
    display: flex;
    align-items: center;
    justify-content: center;
    .man {
      margin: 20px;
      width: 111px;
      height: 115px;

      background: url(../../images/man-bg.png) no-repeat;
      background-size: 100% 100%; //和整个盒子一边款一边高
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .woman {
      margin: 20px;
      width: 111px;
      height: 115px;
      text-align: center;
      line-height: 115px;
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: 100% 100%; //和整个盒子一边款一边高
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .charts {
    height: 100px;
  }
}
</style>
