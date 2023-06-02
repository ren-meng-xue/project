<template>
  <svg :style="{ width, height }">
    <!-- xlink:href执行哪一个图标 eg: #icon-是svg文件名称 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
  prefix: {
    //xlink:href属性值前缀
    type: String,
    default: "#icon-",
  },
  //接收使用的图标名字
  name: {
    type: String,
  },
  //接收父组件传递颜色
  color: {
    type: String,
    default: "",
  },
  //接收父组件传递过来的图标的宽度
  width: {
    type: String,
    default: "16px",
  },
  //接收父组件传递过来的图标的高度
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style lang="scss" scoped></style>
