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
      <!-- v-model:fileList 展示默认图片 
           action:上传图片的接口地址
           list-type:文件列表的类型
      -->
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '无'
        "
      >
        <el-option
          :label="item.name"
          :value="`${item.id}:${item.name}`"
          v-for="item in unSelectSaleAttr"
          :key="item.id"
        ></el-option>
      </el-select>
      <el-button
        icon="Plus"
        type="primary"
        style="margin-left: 10px"
        @click="addSaleAttr"
        :disabled="saleAttrIdAndValueName ? false : true"
      >
        添加属性值
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0px" :data="saleAttr">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <!-- row为当前Spu已有的销售属性对象 -->
          <template #default="{ row, $index }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="index"
              style="margin: 0 10px"
              class="mx-1"
              closable
              :type="tag.type"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              :ref="(vc: any) => inputArr[$index] = vc"
              v-model="row.saleAttrValue"
              placeholder="请你输入属性值"
              size="small"
              style="width: 100px"
              @blur="toLook(row)"
              v-if="row.flag == true"
            ></el-input>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="Plus"
              @click="toEdilt(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #default="{ row, $index }">
            <el-button
              type="primary"
              icon="Delete"
              size="small"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="save"
        :disabled="saleAttr.length ? false : true"
        >保存</el-button
      >
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  SpuData,
  AllTradeMark,
  SaleAttrValue,
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
  reqAddOrUpdateSpu,
} from "@/api/product/spu";
let $emits = defineEmits(["changeScene"]);
import { nextTick, ref, computed } from "vue";
import { ElMessage } from "element-plus";
//子组件点击取消按钮，通知父组件切换场景为1，去展示已有spu数据
const cancel = () => {
  $emits("changeScene", {
    flag: 0,
    params: SpuParams.value.id ? "update" : "add",
  });
};

//存储已有spu这些数据
let AllTradeMarks = ref<TradeMark[]>([]);
//商品图片
let imgList = ref<SpuImg[]>([]);
//已有SPU销售属性
let saleAttr = ref<SaleAttr[]>([]);
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
//存储预览图片的地址
let dialogImageUrl = ref<string>("");
//存储已有的SPU对象 添加没有id，修改有id
let SpuParams = ref<SpuData>({
  category3Id: "", //收集三级分类的id
  spuName: "", //SPU的名字
  description: "",
  tmId: "",
  spuImageList: [],
  spuSaleAttrList: [],
});
//准备一个数组：将来存储对应的组件实例el-inputs
let inputArr = ref<any>([]);
//将来收集还未选择的销售属性的Id与属性值名字
let saleAttrIdAndValueName = ref<string>("");
//子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象，将来在模版中展示
  SpuParams.value = spu;
  //spu即为父组件传递过来的已有spu对象【不完整】
  // console.log("spu", spu);
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
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
  //已有SPU销售属性
  saleAttr.value = result2.data;
  //获取全部销售属性
  allSaleAttr.value = result3.data;
};
//照片墙点击预览的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true;
  dialogImageUrl.value = file.url;
};
//照片墙删除的时候执行的钩子
const handleRemove = () => {};
//照片墙上传之前限制类型 上传文件的大小和类型
const handlerUpload = (file: any) => {
  if (
    file.type == "image/png" ||
    file.type == "image/jpeg" ||
    file.type == "image/gif"
  ) {
    if (file.size / 1024 / 1024 < 3) {
      //多少M
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传的文件不能大于3M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传的文件是png|jpeg|gif",
    });
    return false;
  }
};
//属性值按钮的备案
const toEdilt = (row: SaleAttr, index: number) => {
  //点击按钮的时候input组件不就出来了吗
  row.flag = true;
  row.saleAttrValue = ""; //给这个添加一个名字
  nextTick(() => {
    //点击input的时候自动获取焦点
    inputArr.value[index].focus();
  });
};
//表单元素失去焦点事件的回调
const toLook = (row: SaleAttr) => {
  //整理收集的属性的Id与属性值名字
  const { baseSaleAttrId, saleAttrValue } = row;
  //整理成服务器需要的属性值形式
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  };
  //非法情况的判断
  if (saleAttrValue?.trim() == "") {
    //如果收集的输入的内容是空，就不能在push了
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
    return;
  }
  //判断输入的属性值是否在远数组中存在，如果存在了，就是重复了，不能push了
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue;
  });
  if (repeat) {
    ElMessage.error("属性值已经存在");
    return;
  }
  //追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue);
  //失去焦点的时候切换为查看模式
  row.flag = false;
};
//计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  //全部销售属性一共三个：颜色｜版本｜尺码
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      //如果全部销售属性的每一个name 不等于  已有销售属性的name
      return item.name != item1.saleAttrName;
    });
  });
  return unSelectArr;
});
//添加销售属性
const addSaleAttr = () => {
  //     baseSaleAttrId: number;
  //   saleAttrName: string;
  //   spuSaleAttrValueList: SpuSaleAttrValueList;
  const [baseSaleAttrId, saleAttrName] =
    saleAttrIdAndValueName.value.split(":");

  //准备一个新的销售属性对象，将来带给服务器
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  // console.log(newSaleAttr);
  //追加到数组当中
  saleAttr.value.push(newSaleAttr);
  //清空数据
  saleAttrIdAndValueName.value = "";
};
//保存按钮的回调
const save = async () => {
  //整理参数
  // 1照片墙的数据
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });
  // 2整理销售属性的数据
  SpuParams.value.spuSaleAttrList = saleAttr.value;
  let result = await reqAddOrUpdateSpu(SpuParams.value);
  console.log(result, "result");
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: SpuParams.value.id ? "修改成功" : "添加成功",
    });
    // 如果是添加，列表刷新返回第一页，如果是编辑，返回的是编辑的当前页
    $emits("changeScene", {
      flag: 0,
      params: SpuParams.value.id ? "update" : "add",
    }); //切换场景触发父组件
    //更新成功以后，再次获取已有的spu
  } else {
    ElMessage({
      type: "success",
      message: SpuParams.value.id ? "修改失败" : "添加失败",
    });
  }
};

//添加一个新的SPU初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
  //清空数据
  // SpuParams.value?.id = "";
  Object.assign(SpuParams.value, {
    category3Id: "", //收集三级分类的id
    spuName: "", //SPU的名字
    description: "",
    tmId: "",
    spuImageList: [],
    spuSaleAttrList: [],
    id: "",
  });
  //照片墙数据清空
  imgList.value = [];
  saleAttrIdAndValueName.value = "";
  //清空销售属性
  saleAttr.value = [];
  console.log("添加spu");
  // 存储三级分类的id
  SpuParams.value.category3Id = c3Id;
  //获取全部品牌的数据
  let result1: AllTradeMark = await reqAllTradeMark();
  //获取整个项目全部SPU的销售属性
  let result2: HasSaleAttrResponseData = await reqAllSaleAttr();

  //存储全部品牌数据
  AllTradeMarks.value = result1.data;
  //获取全部销售属性
  allSaleAttr.value = result2.data;
};
//想让父组件用，需要对外暴露
defineExpose({ initHasSpuData, initAddSpu });
</script>

<style lang="scss" scoped></style>
