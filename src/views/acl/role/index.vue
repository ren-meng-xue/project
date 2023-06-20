<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus">添加角色</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column label="Id" align="center"></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          width="260px"
          align="center"
        ></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="  prev, pager, next, jumper,->,sizes,total"
        :total="total"
      />
      <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//当前页码
let pageNo = ref<number>(1)
//一页显示多少条数据
let pageSize = ref<number>(10)
let total = ref<number>(0)
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
