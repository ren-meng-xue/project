<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="SKU价格(元)">
      <el-input
        placeholder="价格(元)"
        type="number"
        v-model="skuParams.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="重量(克)"
        type="number"
        v-model="skuParams.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        placeholder="SKU描述"
        type="textarea"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="attr in item.attrValueList"
              :key="attr.id"
              :label="attr.valueName"
              :value="`${item.id}:${attr.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          :label="item.saleAttrName"
          v-for="(item, index) in saleArr"
          :key="item.id"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="(sale, i) in item.spuSaleAttrValueList"
              :label="sale.saleAttrName"
              :key="sale.id"
              :value="`${item.id}:${sale.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgList" ref="table">
        <el-table-column
          type="selection"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button size="small" type="primary" @click="handler(row)"
              >设置默认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
//引入请求的API
import { reqAttr } from "@/api/product/attr";
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from "@/api/product/spu";
import type { AttrResponseData, Attr } from "@/api/product/attr/type";
import type {
  SaleAttrResponseData,
  SpuHasImg,
  SaleAttr,
  SpuImg,
  SkuData,
} from "@/api/product/spu/type";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
//自定义事件方法
let $emits = defineEmits(["changeScene"]);

//平台属性
let attrArr = ref<Attr[]>([]);
// 销售属性
let saleArr = ref<SaleAttr[]>([]);
//照片墙
let imgList = ref<SpuImg[]>([]);

//获取table组件实例
let table = ref<any>();
//收集SKU参数
let skuParams = reactive<SkuData>({
  //父组件传递过来的数据
  category3Id: "", //三级分类的id
  spuId: "", //已有的SPU的ID
  tmId: "", //SPU品牌的id
  // v-model收集
  skuName: "", //SKU名字
  price: "", //价格
  weight: 0, //重量
  skuDesc: "", //sku描述

  skuAttrValueList: [
    //平台属性的收集
    // {
    //   attrId: "", //平台属性的ID
    //   valueId: "", //属性值的ID
    // },
  ],
  skuSaleAttrValueList: [
    //销售属性
    // {
    //   saleAttrId: "", //属性id
    //   saleAttrValueId: "", //属性值的id
    // },
  ],
  skuDefaultImg: "", //sku图片地址
});
//当前子组件的方法对外暴露
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any
) => {
  //收集数据

  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id;
  skuParams.tmId = spu.tmId;
  //获取平台属性
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id);
  //获取对应销售属性
  let result1: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id);
  // console.log(result1, "result");
  //获取照片墙的数据
  let result2: SpuHasImg = await reqSpuImageList(spu.id);
  // console.log(result2);

  //获取平台属性
  attrArr.value = result.data;
  //获取销售属性
  saleArr.value = result1.data;
  //获取照片墙的数据
  imgList.value = result2.data;
};
//取消按钮的回调
const cancel = () => {
  $emits("changeScene", { flag: 0, params: "" });
};

//设置默认图片
const handler = (row: any) => {
  //点击的时候，全部图片的复选框不够炫
  imgList.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false);
  });
  //选中的图片才去勾选
  table.value.toggleRowSelection(row, true);
  //收集图片的地址
  skuParams.skuDefaultImg = row.imgUrl;
  console.log();
};

//保存按钮
const save = async () => {
  //最终想要的格式是一个数组,里面的值是由不同对象组成的[{},{}]
  //平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    // next是一个对象
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(":");
      console.log(attrId, valueId);
      prev.push({
        attrId,
        valueId,
      });
    }
    return prev;
  }, []);
  //销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":");
        prev.push({
          saleAttrId,
          saleAttrValueId,
        });
      }
      return prev;
    },
    []
  );
  let result: any = await reqAddSku(skuParams);
  console.log(result, "resu1lt");
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "添加SKU成功",
    });
    //通知父组件切换场景0
    $emits("changeScene", { flag: 0, params: "" });
  } else {
    ElMessage({
      type: "success",
      message: "添加SKU失败",
    });
  }
};
//对外暴露
defineExpose({
  initSkuData,
});
</script>

<style lang="scss" scoped></style>
