<template>
  <div class="">
    首页
    {{ useStore.username }}
    {{ useStore.avatar }}
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();
</script>

<style lang="scss" scoped></style>
