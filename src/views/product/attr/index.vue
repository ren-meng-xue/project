<!--
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-08 22:46:16
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-10 20:55:55
-->
<template>
  <div class="">
    <!-- 三级分类全局组件 -->
    <Category></Category>
    <el-card style="margin: 10px 0">
      <el-button
        icon="Plus"
        type="primary"
        :disabled="CategoryStore.c3Id ? false : true"
        >添加属性</el-button
      >
      <el-table>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性名称 " width="120px"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//获取分类的仓库
import useCategoryStore from '@/store/modules/category'

import {} from 'vue'
let CategoryStore = useCategoryStore()
</script>

<style lang="scss" scoped></style>
