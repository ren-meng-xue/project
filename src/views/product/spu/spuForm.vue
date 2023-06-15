<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="输入SPU名称"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌" placeholder="SPU品牌名称">
      <el-select v-model="SpuParams.tmId">
        <el-option
          v-for="item in AllTradeMarks"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="输入SPU描述"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select>
        <el-option label="华为" value="huawei"></el-option>
        <el-option label="oppo" value="oppo"></el-option>
        <el-option label="vivo" value="vivo"></el-option>
      </el-select>
      <el-button icon="Plus" type="primary" style="margin-left: 10px">
        添加属性值
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0px">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="销售属性名字" width="120px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  SpuData,
  AllTradeMark,
  SaleAttrResponseData,
  SpuHasImg,
  HasSaleAttrResponseData,
  TradeMark,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
} from "@/api/product/spu/type";
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from "@/api/product/spu";
let $emits = defineEmits(["changeScene"]);
import { ref } from "vue";
//子组件点击取消按钮，通知父组件切换场景为1，去展示已有spu数据
const cancel = () => {
  $emits("changeScene", 0);
};

//存储已有spu这些数据
let AllTradeMarks = ref<TradeMark[]>([]);
//商品图片
let imgList = ref<SpuImg[]>([]);
//已有SPU销售属性
let saleAttr = ref<SaleAttr[]>([]);
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
//存储已有的SPU对象 添加没有id，修改有id
let SpuParams = ref<SpuData>({
  category3Id: "", //收集三级分类的id
  spuName: "", //SPU的名字
  description: "",
  tmId: "",
  spuImageList: [],
  spuSaleAttrList: [],
});
//子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象，将来在模版中展示
  SpuParams.value = spu;
  //spu即为父组件传递过来的已有spu对象【不完整】
  console.log("spu", spu);
  //获取全部品牌的数据
  let result: AllTradeMark = await reqAllTradeMark();
  //获取某一个品牌旗下全部售卖商品的图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number);
  //获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number);
  //获取整个项目全部SPU的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
  //存储全部品牌数据
  AllTradeMarks.value = result.data;
  //SPU对应商品图片
  imgList.value = result1.data;
  //已有SPU销售属性
  saleAttr.value = result2.data;
  //获取全部销售属性
  allSaleAttr.value = result3.data;
};
//想让父组件用，需要对外暴露
defineExpose({ initHasSpuData });
</script>

<style lang="scss" scoped></style>
