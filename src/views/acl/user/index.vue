<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="primary">批量删除</el-button>
      <!-- table展示用户信息 -->
      <el-table border style="margin: 10px" :data="userArr">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="Id" prop="id"></el-table-column>
        <el-table-column label="用户名字" prop="username"></el-table-column>
        <el-table-column
          label="用户名称"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="{ row, $index }">
            <el-button type="primary" icon="User" size="small"
              >分配角色</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateUser(row)"
              >编辑</el-button
            >
            <el-button type="primary" icon="Delete" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        background="background"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @current-change="getHasUser"
        @size-change="handleSizeChange"
      />
    </el-card>
    <!-- 抽屉结构：完成添加新的用户账号｜更新已有的账号信息 -->
    <el-drawer v-model="drawer">
      <!-- 头部标题：将来文字内容应该是动态的 -->
      <template #header>
        <h4>添加用户</h4>
      </template>
      <!-- 身体部分 -->
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="输入用户姓名"
              v-model.trim="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              placeholder="输入用户昵称"
              v-model.trim="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input
              placeholder="输入用户密码"
              v-model.trim="userParams.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqUserInfo } from "@/api/acl/user";
import { ref, onMounted, reactive, nextTick } from "vue";
import type { userInfoResponseData, User } from "@/api/acl/user/type";
import { redAddOrUpdateUser } from "@/api/acl/user";
import { ElMessage } from "element-plus";
//默认第一页
let pageNo = ref<number>(1);
//一页展示多少条数据
let pageSize = ref<number>(5);
//用户的整个数量
let userArr = ref<User[]>([]);
let total = ref<number>(0);
//控制抽屉显示与隐藏
let drawer = ref<boolean>(false);

//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: "",
  name: "",
  password: "",
});
//获取form组件实例
let formRef = ref<any>();
//存储全部用户的数据
onMounted(() => {
  getHasUser();
});

//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
  let result: userInfoResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    userArr.value = result.data.records;
  }
};
//每一页显示的条数
// cosnt handleSizeChange = (num:number) =>{
//   pageSize.value=num
// }

const handleSizeChange = () => {
  getHasUser();
};

//添加用户按钮的回调
const addUser = () => {
  //nextTick 获取更新之后的Dom
  // 或者问号
  //清空一下数据
  Object.assign(userParams, {
    username: "",
    name: "",
    password: "",
  });

  //抽屉显示出来
  drawer.value = true;
  nextTick(() => {
    // log
    formRef.value.clearValidate("password", "username", "name");
  });
};

//更新已有的按钮的回调(row即为已有的用户信息)
const updateUser = (row: User) => {
  //抽屉显示出来
  drawer.value = true;
};
//保存按钮的回调｜编辑
const save = async () => {
  //务必需要保证表单全部符合条件再去发请求
  console.log(formRef.value.validate());
  await formRef.value.validate();
  let result: any = await redAddOrUpdateUser(userParams);
  //添加或者更新成功
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false;
    //提示消息
    ElMessage({
      type: "success",
      message: userParams.id ? "更新成功" : "添加成功",
    });
    //获取全部已有的信息
    getHasUser();
  } else {
    //关闭抽屉
    //提示消息
    ElMessage({
      type: "error",
      message: userParams.id ? "更新失败" : "添加失败",
    });
  }
};
//取消按钮的回调
const cancel = () => {
  drawer.value = false;
};

//校验用户名字回调函数
const validatorUserName = (rule: any, value: any, callBack: any) => {
  // 用户名称、长度 至少5位
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户名字｜昵称至少五位"));
  }
};
//密码
const validatorPassword = (rule: any, value: any, callBack: any) => {
  // 用户名称、长度 至少5位
  if (value.trim().length >= 6) {
    callBack();
  } else {
    callBack(new Error("密码至少五位"));
  }
};
//表单校验规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: "blur", validator: validatorUserName }],
  //用户名字
  name: [{ required: true, trigger: "blur", validator: validatorUserName }],
  //用户的密码
  password: [{ required: true, trigger: "blur", validator: validatorPassword }],
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between; //主轴
  align-items: center; //侧轴
}
</style>
