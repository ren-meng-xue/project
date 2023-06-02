<template>
  <div class="">
    <h1>测试SVG图标使用</h1>
    <!-- svg图标外层容器节点，内部需要与use标签结合使用 -->
    <SvgIcon name="home" color="pink" width="26px" height="26px"></SvgIcon>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
div {
  h1 {
    color: $color;
  }
}
</style>
