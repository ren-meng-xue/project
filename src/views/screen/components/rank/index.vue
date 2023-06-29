<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
//获取Dom节点
let charts = ref();
onMounted(() => {
  //一个容器可以同时展示多种类型的图形图标
  let mycharts = echarts.init(charts.value);
  //设置配置项
  mycharts.setOption({
    //标题组件
    title: {
      //主标题
      text: "景区排行",
      link: "http://www.baidu.com", //点击主标题可以跳转到百度
      //标题的位置
      left: "50%",
      //主标题样式
      textStyle: {
        color: "hotpink",
        fontSize: 20,
      },
      //子标题
      subtext: "各大景区",
      //子标题的样式
      subtextStyle: {
        color: "hotpink",
        fontSize: 16,
      },
      // sublink:''//点击子标题可以跳转
    },
    // x|y
    xAxis: {
      type: "category", //代表图形图标在x轴均匀分布
    },
    yAxis: {},
    //如果想让x轴｜y轴都贴边，可以调整布局
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    //系列：决定你选择的图形图标是哪一种
    series: [
      {
        type: "bar",
        data: [10, 20, 30, 40, 50, 60],
        //柱状图：图形上的文本标签
        label: {
          show: true,
          color: "yellow",
          position: "insideTop", //top位置的位置
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          //底部背景的颜色
          color: "#ccc",
        },
        //图形条
        itemStyle: {
          // borderRadius: [50, 50, 0, 0], //配置圆角 左上、右上、右下、左下
          //柱条的颜色
          color: function (data: any) {
            console.log(data);
            //给每一个柱条设置背景颜色
            let arr = [
              "red",
              "orange",
              "yellow",
              "hotpink",
              "green",
              "skyblue",
            ];
            return arr[data.dataIndex];
          },
          // color: "cyan",
        },
      },
      {
        type: "line", //折线图
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true, //平滑曲线
      },
    ],
    tooltip: {
      backgroundColor: "rgba(50,50,50,.7)",
    },
  });
});
</script>

<style lang="scss" scoped>
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%; //和整个盒子一边款一边高
  margin: 20px 0;
  .title {
    margin-left: 5px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 30px);
  }
}
</style>
