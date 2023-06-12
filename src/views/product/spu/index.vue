<template>
  <div class="">
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0">
      <el-button
        icon="Plus"
        type="primary"
        style="margin: 10px 0"
        :disabled="categoryStore.c3Id ? false : true"
      >
        添加SPU</el-button
      >
      <el-table style="margin: 10px 0" border :data="records">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="SPU操作">
          <template #default="{ row, $index }">
            <el-button
              icon="Plus"
              type="primary"
              size="small"
              title="添加SKU"
            ></el-button>
            <el-button
              icon="Edit"
              type="primary"
              size="small"
              title="修改SPU"
            ></el-button>
            <el-button
              icon="View"
              type="primary"
              size="small"
              title="查看SPU"
            ></el-button>
            <el-button
              icon="Delete"
              type="primary"
              size="small"
              title="删除SPU"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @current-change="getHasSpu"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
//引入分类的仓库
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();
import { reqHasSpu } from "@/api/product/spu";
import type { HasSpuResponseData, Records } from "@/api/product/spu/type";
//场景的数据
import { ref, watch } from "vue";
let scene = ref<number>(0);
//分页器默认页码
let pageNo = ref<number>(1);
//每一页展示几条数据
let pageSize = ref<number>(3);
//存储已有spu的数据
let records = ref<Records>([]);
//存储总个数
let total = ref<number>(0);
//监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    //务必保证categoryStore.c3Id有值
    if (!categoryStore.c3Id) return;
    getHasSpu();
  }
);
//获取某一个三级分类下全部的已有SPU
const getHasSpu = async () => {
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id
  );
  if (result.code == 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
  console.log(result, "888");
};
</script>

<style lang="scss" scoped></style>
