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
      <el-select>
        <el-option label="华为" value="huawei"></el-option>
        <el-option label="oppo" value="oppo"></el-option>
        <el-option label="vivo" value="vivo"></el-option>
      </el-select>
      <el-button icon="Plus" type="primary" style="margin-left: 10px">
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
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
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
  HasSaleAttr
} from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr
} from '@/api/product/spu'
let $emits = defineEmits(['changeScene'])
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
//子组件点击取消按钮，通知父组件切换场景为1，去展示已有spu数据
const cancel = () => {
  $emits('changeScene', 0)
}

//存储已有spu这些数据
let AllTradeMarks = ref<TradeMark[]>([])
//商品图片
let imgList = ref<SpuImg[]>([])
//已有SPU销售属性
let saleAttr = ref<SaleAttr[]>([])
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//存储预览图片的地址
let dialogImageUrl = ref<string>('')
//存储已有的SPU对象 添加没有id，修改有id
let SpuParams = ref<SpuData>({
  category3Id: '', //收集三级分类的id
  spuName: '', //SPU的名字
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: []
})
//子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象，将来在模版中展示
  SpuParams.value = spu
  //spu即为父组件传递过来的已有spu对象【不完整】
  console.log('spu', spu)
  //获取全部品牌的数据
  let result: AllTradeMark = await reqAllTradeMark()
  //获取某一个品牌旗下全部售卖商品的图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  //获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  //获取整个项目全部SPU的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  //存储全部品牌数据
  AllTradeMarks.value = result.data
  //SPU对应商品图片
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  //已有SPU销售属性
  saleAttr.value = result2.data
  //获取全部销售属性
  allSaleAttr.value = result3.data
}
//照片墙点击预览的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}
//照片墙删除的时候执行的钩子
const handleRemove = () => {}
//照片墙上传之前限制类型 上传文件的大小和类型
const handlerUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      //多少M
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传的文件不能大于3M'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传的文件是png|jpeg|gif'
    })
    return false
  }
  // console.log(file);
}
//想让父组件用，需要对外暴露
defineExpose({ initHasSpuData })
</script>

<style lang="scss" scoped></style>
