<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="输入用户名" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="keyword ? false : true"
            @click="search"
            >搜索</el-button
          >
          <el-button type="primary" @click="hanReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addRule"
        >添加职位</el-button
      >
      <el-table border style="margin: 10px 0" :data="allRole">
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column label="Id" align="center" prop="id"></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="280px" align="center">
          <template #default="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermission(row)"
              >分配权限</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
              >编辑</el-button
            >

            <el-popconfirm
              :title="`你确定删除${row.roleName}么？`"
              width="260px"
              icon="Delete"
              @confirm="deleteRole(row)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 因为自定义事件会给回调注入当前的页码，所以更改当前页的时候在调用一次这个获取列表的方法 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="  prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getHasRole"
        @size-change="sizeChange"
      />
    </el-card>
    <!-- 添加职位与更新已有职位的结构：对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="RoleParams.id ? '编辑职位' : '添加职位'"
    >
      <el-form :model="RoleParams" :rules="rules" ref="form">
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            placeholder="请你输入职位的名称"
            v-model="RoleParams.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saves"> 确定 </el-button>
      </template>
    </el-dialog>
    <!-- 抽屉组件：分配职位的菜单权限与按钮的权限 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配菜单与按钮的权限</h4>
      </template>
      <template #default>
        <!-- 树形控件 -->
        <el-tree
          :data="menuArr"
          ref="tree"
          show-checkbox
          node-key="id"
          :default-checked-keys="selectArr"
          :props="defaultProps"
          default-expand-all
        />
        <!-- default-checked-keys="[5] 存储四级select为true的id 它的父级自动会够选 -->
        <!--默认展开 :default-expanded-keys="[2, 3]"-->
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
//请求方法
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermissions,
  reqRemoveRole,
} from "@/api/acl/role";
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from "@/api/acl/role/type";
//引入骨架仓库
import useLayoutSettingStore from "@/store/modules/setting";
import { ElMessage } from "element-plus";
let settingStore = useLayoutSettingStore();
//当前页码
let pageNo = ref<number>(1);
//一页显示多少条数据
let pageSize = ref<number>(10);
//职位总个数
let total = ref<number>(0);
//搜索职位的关键字
let keyword = ref<string>("");
//存储全部已有职位
let allRole = ref<Records>([]);
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
//获取form组件实例
let form = ref<any>("");
//控制抽屉显示与隐藏
let drawer = ref<boolean>(false);
//收集新增岗位数据
let RoleParams = reactive<RoleData>({
  roleName: "",
  id: 0,
});

//准备一个数组 数组用于存储够选第四层节点的id
let selectArr = ref<number[]>([]);
//定义数组存储用户权限的数据
let menuArr = ref<MenuList>([]);
//获取tree组件实例
let tree = ref<any>();
//组件挂载完毕
onMounted(() => {
  //获取职位的请求
  getHasRole();
});

//获取职位的请求
const getHasRole = async (pager = 1) => {
  //修改当前页码
  pageNo.value = pager;
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    allRole.value = result.data.records;
  }
};
//只要当前的条数发生变化
const sizeChange = () => {
  getHasRole();
};
//点击搜索按钮的回调
const search = () => {
  //再次发起请求
  getHasRole();
};

//重置
const hanReset = () => {
  keyword.value = "";
  settingStore.refresh = !settingStore.refresh;
};

//添加职位按钮的回调
const addRule = () => {
  //对话框
  dialogVisible.value = true;
  //清空数据
  Object.assign(RoleParams, {
    ruleName: "",
    id: 0,
  });
  //清空上一次表单错误返回的结果
  nextTick(() => {
    form.value.clearValidate("roleName");
  });
};

//更新已有职位的回调
const updateRole = (row: RoleData) => {
  dialogVisible.value = true;
  Object.assign(RoleParams, row);
  nextTick(() => {
    form.value.clearValidate("roleName");
  });
};
//自定义校验规则的回调
const validatorRoleName = (value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error("职位名称至少两位"));
  }
};
//职位相关的校验规则
const rules = {
  roleName: [
    {
      required: true,
      trigger: "blur",
      validator: validatorRoleName,
    },
  ],
};

//确定按钮的回调
const saves = async () => {
  //表单校验结果通过，发请求

  await form.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      console.log("submit!");
      //添加｜更新职位的请求
      let result: any = await reqAddOrUpdateRole(RoleParams);
      console.log(result, "result");
      if (result.code == 200) {
        ElMessage({
          type: "success",
          message: RoleParams.id ? "编辑成功" : "添加成功",
        });
        //关闭对话框
        dialogVisible.value = false;
        //再次获取所有的列表
        //如果是添加应该返回第一页，如果是更新，应该停留在当前页面
        getHasRole(RoleParams.id ? pageNo.value : 1);
      } else {
        ElMessage({
          type: "success",
          message: RoleParams.id ? "编辑失败" : "添加失败",
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

//分配权限按钮的回调
const setPermission = async (row: RoleData) => {
  //抽屉显示出来
  drawer.value = true;
  //收集当前分类权限的职位的数据
  Object.assign(RoleParams, row);
  //根据职位获取权限的数据
  let result: MenuResponseData = await reqAllMenuList(RoleParams.id as number);
  console.log(result, "result");
  if (result.code == 200) {
    menuArr.value = result.data;
    selectArr.value = filterSelect(menuArr.value, []);
  }
};
//树形控件
const defaultProps = {
  children: "children",
  label: "name",
};
const filterSelect = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id);
    }
    //必须保证菜单的下一级有一个，如果是一个空的就没有必要添加了
    if (item.children && item.children.length > 0) {
      filterSelect(item.children, initArr);
    }
  });
  return initArr;
};

//抽屉确定按钮的回调
const confirmClick = async () => {
  //职位的id
  const roleId = RoleParams.id as number;
  //选中节点的id
  let arr = tree.value.getCheckedKeys(); //当前选中的id
  //半选id
  let arr1 = tree.value.getHalfCheckedKeys();
  let permissionId = arr.concat(arr1);
  //下发请求
  // console.log(arr);
  let result: any = await reqSetPermissions(roleId, permissionId);
  console.log(result, "8");
  if (result.code == 200) {
    drawer.value = false;
    ElMessage({
      type: "success",
      message: "分配权限成功",
    });
    //页面刷新
    window.location.reload(); //页面刷新 角色分配的菜单发生变化，立马对此进行更新
  }
};
//删除角色
const deleteRole = async (row: RoleData) => {
  let result: any = await reqRemoveRole(row.id as number);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //如果当前数组长度小于1，回到他的前一页，否则停留在当前页面
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
