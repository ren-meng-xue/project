<template>
  <div class="">
    <el-table
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :data="permissionArr"
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button type="primary" size="small">{{
            row.level == 3 ? " 添加功能" : "添加菜单"
          }}</el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 1 ? true : false"
          >
            编辑</el-button
          >
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 1 ? true : false"
          >
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//引入获取菜单请求的API
import { reqAllPermission } from "@/api/acl/menu";
//引入ts类型

import type {
  PermissionResponseData,
  PermissionList,
} from "@/api/acl/menu/type";

let permissionArr = ref<PermissionList>([]);
//组件挂载完毕
onMounted(() => {
  getHasPermission();
});
//获取菜单数据的方法
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission();
  console.log(result, "result");
  if (result.code == 200) {
    //存储数据
    permissionArr.value = result.data;
  }
};
</script>

<style lang="scss" scoped></style>
