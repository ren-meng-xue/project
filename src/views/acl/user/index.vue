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
      <el-button
        type="primary"
        :disabled="selectIdArr.length ? false : true"
        @click="deleteSelectUser"
        >批量删除</el-button
      >
      <!-- table展示用户信息 -->
      <el-table
        border
        style="margin: 10px"
        :data="userArr"
        @selection-change="selectChange"
      >
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
            <el-button
              type="primary"
              icon="User"
              size="small"
              @click="setRole(row)"
              >分配角色</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateUser(row)"
              >编辑</el-button
            >

            <el-popconfirm
              :title="`你确定要删除${row.username}么?`"
              icon="Delete"
              width="260px"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button type="primary" icon="Delete" size="small"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
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
        <h4>{{ userParams.id ? "修改用户" : "新增用户" }}</h4>
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
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
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
    <!-- 抽屉结构：用户某一个已有的账号进行职位分配 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色（职位）</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <!-- 显示职位的复选框 -->
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >全 选</el-checkbox
            >
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="(role, index) in allRole"
                :key="index"
                :label="role"
                >{{ role.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer1 = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqUserInfo } from "@/api/acl/user";
import { ref, onMounted, reactive, nextTick } from "vue";
import type {
  userInfoResponseData,
  User,
  AllRoleResponseData,
  ALLRole,
  SetRoleData,
} from "@/api/acl/user/type";
import {
  redAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from "@/api/acl/user";
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
//控制分配角色抽屉显示与隐藏
let drawer1 = ref<boolean>(false);

//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: "",
  name: "",
  password: "",
});

//准备一个数组存储批量删除的用户ID
let selectIdArr = ref<User[]>([]);
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
    id: "",
  });

  //抽屉显示出来
  drawer.value = true;
  nextTick(() => {
    // log
    formRef.value.clearValidate("password");
    formRef.value.clearValidate("username");
    formRef.value.clearValidate("name");
  });
};

//更新已有的按钮的回调(row即为已有的用户信息)
const updateUser = (row: User) => {
  //抽屉显示出来
  drawer.value = true;
  //存储收集已有的账号信息
  Object.assign(userParams, row);
  nextTick(() => {
    formRef.value.clearValidate("username");
    formRef.value.clearValidate("name");
  });
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
    // 如果有id，停留在当前页面，否则是回到第一页
    // getHasUser(userParams.id ? pageNo.value : 1);
    //改了用户名，admin1，如果右上角还是admin，就不对，应该刷新浏览器就会自动跳转到登陆页面，在登陆
    // 所以需要浏览器自动刷新一次
    window.location.reload();
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
// 如果校验规则用change，然后在清楚表单验证，清楚不掉，因为首先清空了
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

//分配角色按钮回调
const setRole = async (row: User) => {
  //存储已有用户信息
  Object.assign(userParams, row);
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number);
  console.log(result, "result");
  if (result.code == 200) {
    //存储全部的职位
    allRole.value = result.data.allRolesList;
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles;
    //抽屉i显示出
    drawer1.value = true;
  }

  //发请求获取全部职位的数据，以及当前用户已有职位的数据
};
//全选复选框收集数据：是否全选
let checkAll = ref(false);
//设置不确定状态，仅负责样式控制
let isIndeterminate = ref(true);
let userRole = ref<ALLRole>([]);
let allRole = ref<ALLRole>([]);
//全选复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : [];
  isIndeterminate.value = false;
};
//底部复选框change
const handleCheckedCitiesChange = (value: string[]) => {
  //已经够选的这些项目的长度
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRole.value.length;
  //顶部的复选框不确定的样式
  isIndeterminate.value = !(checkedCount === allRole.value.length);
};
//分配职位确定按钮回调

const confirmClick = async () => {
  //收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number;
    }),
  };
  //分配用户的职位
  let result: any = await reqSetUserRole(data);
  console.log(result, "89");
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "分配职务成功",
    });
    //关闭抽屉
    drawer1.value = false;
    //更新完毕留在当前页
    getHasUser(pageNo.value);
  }
};

//删除某一个用户
const deleteUser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};

//table复选框勾选的时候触发的事件
const selectChange = (val: any) => {
  selectIdArr.value = val;
};

//批量删除按钮的回调
const deleteSelectUser = async () => {
  //整理批量删除的参数
  let idList = selectIdArr.value.map((item) => {
    return item.id as number;
  });
  let result: any = await reqSelectUser(idList);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: "error",
      message: result.data,
    });
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between; //主轴
  align-items: center; //侧轴
}
</style>
