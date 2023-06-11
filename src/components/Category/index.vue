<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { onMounted, defineProps } from 'vue'

//引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
//接收父组件传递过来的值
defineProps(['scene'])
//分类全局组件挂载完毕，通知仓库发起请求，获取一级分类的数据
onMounted(() => {
  // CategoryStore.
  getC1()
})
//通知仓库获取一级分类的方法
const getC1 = () => {
  //通知分类仓库发请求获取数据
  categoryStore.getC1()
}
//一级分类change事件
const handler = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''

  //通知仓库去获取二级分类方法
  categoryStore.getC2()
}

//二级分类change事件
const handler1 = () => {
  categoryStore.c3Id = ''
  //通知仓库去获取二级分类方法
  categoryStore.getC3()
}
</script>

<style scoped></style>
