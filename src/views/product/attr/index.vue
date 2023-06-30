<!--
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-08 22:46:16
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-11 20:24:23
-->
<template>
  <div class="">
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0">
      <!-- 场景切换，通过条件判断到底谁显示 -->
      <div v-show="scene == 0">
        <el-button
          style="margin-bottom: 10px"
          icon="Plus"
          type="primary"
          :disabled="CategoryStore.c3Id ? false : true"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrArr" border>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称 "
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <!-- row代表的是已有的属性对象 -->
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.attrName}属性么`"
                width="200px"
                icon="Delete"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称：">
            <el-input
              placeholder="输入属性名称"
              v-model.trim="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          icon="Plus"
          type="primary"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px" :data="attrParams.attrValueList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          >
          </el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input
                :ref="(vc: any) => inputArr[$index] = vc"
                v-if="row.flag"
                placeholder="输入属性值"
                v-model="row.valueName"
                @blur="look(row, $index)"
                size="small"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//获取分类的仓库
import useCategoryStore from "@/store/modules/category";
//引入组合式API函数watch
import { watch, ref, reactive, nextTick, onBeforeUnmount } from "vue";
//引入获取属性与属性值接口
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from "@/api/product/attr";
import { AttrResponseData, Attr, AttrValue } from "@/api/product/attr/type";
import { ElMessage } from "element-plus";
let CategoryStore = useCategoryStore();
//存储已有属性与属性值
let attrArr = ref<Attr[]>([]);
//定义卡片组件内容切换变量与查看模式的切换
let scene = ref<number>(0); //rough是0显示table 如果是1展示添加
//定义一个响应式数据控制编辑模式
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: "", //属性值的名字
  attrValueList: [], //新增的属性值数组
  categoryId: "", //三级分类的Id
  categoryLevel: 3, //代表的是三级分类
});
//准备一个数组：将来存储对应的组件实例el-input
let inputArr = ref<any>([]);
//监听仓库三级分类ID变化
watch(
  () => CategoryStore.c3Id,
  () => {
    attrArr.value = [];
    if (!CategoryStore.c3Id) return;
    getAttr();
  }
);
//获取已有属性与属性值方法
const getAttr = async () => {
  //从仓库对象当中解构出来参数，给接口
  const { c1Id, c2Id, c3Id } = CategoryStore;
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code == 200) {
    attrArr.value = result.data;
  }
};
//table表格修改已有属性按钮的回调
const updateAttr = (row: Attr) => {
  scene.value = 1; //修改属性
  //将已有的属性对象赋值给attrParams
  console.log(row, "9");
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  // attrParams.attrValueList = row.attrValueList
  // console.log(attrParams.attrValueList, '999')
};

//取消
const cancel = () => {
  scene.value = 0; //修改属性
};
//添加属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true, //编辑模式与查看模式的切换
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};
//点击属性按钮的回调
const addAttr = () => {
  //每一次点击的时候，先清空一下数据，在收集数据
  Object.assign(attrParams, {
    attrName: "", //属性值的名字
    attrValueList: [], //点击这个按钮的时候收集新增属性的三级分类的ID
    categoryId: CategoryStore.c3Id, //三级分类的Id
    categoryLevel: 3, //代表的是三级分类
  });
  //切换为添加与修改属性的结构
  scene.value = 1;
};
//保存按钮，收集参数发送请求
const save = async () => {
  let result = await reqAddOrUpdateAttr(attrParams);
  //添加属性｜修改已有的属性已经成功
  if (result.code == 200) {
    scene.value = 0; //切换场景
    ElMessage({
      type: "success",
      message: attrParams.id ? "修改成功" : "添加成功",
    });
    //获取全部已有属性与属性值
    getAttr();
  } else {
    ElMessage({
      type: "error",
      message: attrParams.id ? "修改失败" : "添加失败",
    });
  }
};
//属性值表单元素失去焦点时触发
const look = (row: AttrValue, index: number) => {
  if (row.valueName.trim() == "") {
    //删除掉对应属性值为空的元素
    attrParams.attrValueList.splice(index, 1);
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
    return;
  }
  //非法情况2，不能出现重复的
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName == row.valueName;
    }
  });
  if (repeat) {
    attrParams.attrValueList.splice(index, 1);
    ElMessage({
      type: "error",
      message: "属性值不能重复",
    });
    return;
  }
  row.flag = false;
};
//点击
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true;
  nextTick(() => {
    //响应式数据发生变化，获取更新的Dom组件实例
    inputArr.value[index].focus();
  });
};

//删除某一个已有的属性方法回调
const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getAttr();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  //把分类仓库的数据都清空掉
  CategoryStore.$reset();
});
</script>

<style lang="scss" scoped></style>
