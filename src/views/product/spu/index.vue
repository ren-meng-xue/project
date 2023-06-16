<template>
  <div class="">
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0">
      <!-- v-if与v-show都可以实现显示与隐藏，但是建议使用v-show，这样就可以使用一次，剩下的就是css显示与隐藏 -->
      <div v-show="scene == 0">
        <el-button
          icon="Plus"
          type="primary"
          style="margin: 10px 0"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
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
                @click="updateSpu(row)"
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
      </div>
      <!-- 添加｜修改spu子组件 -->
      <SpuForm v-show="scene == 1" ref="SpuForms" @changeScene="changeScene" />
      <!-- 添加sku子组件 -->
      <SkuForm v-show="scene == 2" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
//引入分类的仓库
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();
import { reqHasSpu } from "@/api/product/spu";
import type {
  HasSpuResponseData,
  Records,
  SpuData,
} from "@/api/product/spu/type";
//场景的数据
import { ref, watch } from "vue";
import SkuForm from "./skuForm.vue";
import SpuForm from "./spuForm.vue";
let scene = ref<number>(0); //0显示已有spu，1添加｜修改已有spu ，3添加sku
//分页器默认页码
let pageNo = ref<number>(1);
//每一页展示几条数据
let pageSize = ref<number>(3);
//存储已有spu的数据
let records = ref<Records>([]);
//存储总个数
let total = ref<number>(0);
//获取子组件实例
let SpuForms = ref<any>();
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
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager;
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id
  );
  if (result.code == 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
};

//添加新的SPU按钮的回调
const addSpu = () => {
  //切换为场景1：添加与修改已有Spu结构 SpuForm
  scene.value = 1;
  //点击添加spu按钮，调用子组件的方法
  SpuForms.value.initAddSpu(categoryStore.c3Id);
};

/***
 * 面试题 在父组件的内部，如何拿到子组件的实例vc
 *
 */
//修改已有的spu的按钮的回调
const updateSpu = (row: SpuData) => {
  //切换为场景1：添加与修改已有Spu结构 SpuForm
  scene.value = 1;
  //调用子组件实例的方法（因为template模版一上来就是v-show隐藏了，是可以拿到组件的实例的）
  console.log(SpuForms.value);
  //调用子组件实例方法获取完整已有的SPU数据
  SpuForms.value.initHasSpuData(row);
};

//子组件SpuForm绑定自定义事件：目前是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
  console.log(obj, "1999");

  //子组件SpuForm点击取消变为场景0，展示已有的spu
  scene.value = obj.flag;

  if (obj.params === "update") {
    //更新留在当前页
    getHasSpu(pageNo.value);
  } else {
    //第一页
    getHasSpu();
  }
};
</script>

<style lang="scss" scoped></style>
