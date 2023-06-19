<!--
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-18 14:48:12
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-18 15:21:51
-->
<template>
  <el-card>
    <el-table border style="margin: 10px 0">
      <el-table-column
        type="index"
        align="center"
        width="80px"
        label="序号"
      ></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
      ></el-table-column>
      <el-table-column label="默认图片" width="150px"></el-table-column>
      <el-table-column label="重量" width="150px"></el-table-column>
      <el-table-column label="价格" width="150px"></el-table-column>
      <el-table-column
        label="操作"
        width="250px"
        fixed="'right'"
      ></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="400"
    />
    <!-- @size-change="handleSizeChange" -->
    <!-- @current-change="handleCurrentChange" -->
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//分页器当前页码
let pageNo = ref<number>(1)
//每一页展示10条数据
let pageSize = ref<number>(10)
</script>

<style lang="scss" scoped></style>
