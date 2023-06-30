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
    <el-table border style="margin: 10px 0" :data="skuArr">
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
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默认图片" width="150px">
        <template #default="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateSku"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定删除${row.skuName}吗?`"
            icon="Delete"
            width="200px"
            @confirm="removeSku(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasSku"
      @size-change="handler"
    />
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin: 5px"
              >{{ item.valueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 5px"
              >{{ item.saleAttrValueName }}</el-tag
            ></el-col
          >
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//引入请求
import {
  reqSkuList,
  reqSaleSku,
  reqCancel,
  reqSkuInfo,
  reqRemoveSku,
} from "@/api/product/sku";
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from "@/api/product/sku/type";
import { ElMessage } from "element-plus";
//分页器当前页码
let pageNo = ref<number>(1);
//每一页展示几条数据
let pageSize = ref<number>(10);

//总的数据
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);
//控制抽屉显示与隐藏的字段
let drawer = ref<boolean>(false);

let skuInfo = ref<any>({});
//组件挂载完毕
onMounted(() => {
  getHasSku();
});
//获取已有Skulist
const getHasSku = async (pager = 1) => {
  //当前分页器的页码
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value);
  if (result.code == 200) {
    skuArr.value = result.data.records;
    total.value = result.data.total;
  }
};
//点击页码发生变化的时候触发
//因为事件是v-model绑定的，自动会注入这个事件的值

// const handler = (num: number) => {
//   pageNo.value = num;
//   getHasSku(pageNo.value);
// };

//分页器下拉菜单发生变化触发
const handler = (pageSizes: number) => {
  // pageSizes: number自动注入v-model
  getHasSku();
};
//上架下架功能

const updateSale = async (row: SkuData) => {
  //row.isSale == 1,说明当前商品是处于上架的状态,需要更新为下架
  // 否则else的情况与上面的相反
  if (row.isSale == 1) {
    //下架
    await reqCancel(row.id as number);
    //提示信息
    ElMessage({
      type: "success",
      message: "下架成功",
    });
    //发请求获取当前更新完毕的全部已有SKU 因为是更新，只停留在当前页面就可以了
    getHasSku(pageNo.value);
  } else {
    //上架
    await reqSaleSku(row.id as number);
    ElMessage({
      type: "success",
      message: "上架成功",
    });
    getHasSku(pageNo.value);
  }
};
//更新已有的sku
const updateSku = () => {
  ElMessage({ type: "success", message: "程序员在努力的更新中...." });
};
//查看商品详情按钮的回调
const findSku = async (row: SkuData) => {
  //抽屉展示出来
  drawer.value = true;
  //获取已有商品详情数据
  let result: SkuInfoData = await reqSkuInfo(row.id as number);
  console.log(result, "result0");
  //存储已有skuInfo
  skuInfo.value = result.data;
};

//删除商品

const removeSku = async (id: number) => {
  let result: any = await reqRemoveSku(id);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "删除成功" });
    //获取已有全部的商品 删除的时候到底是停留在当前页，还是上一页
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
