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
            <el-button type="primary" size="small" icon="User"
              >分配权限</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
              >编辑</el-button
            >
            <el-button type="primary" size="small" icon="Delete"
              >删除</el-button
            >
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
    <el-dialog v-model="dialogVisible" title="添加职位">
      <el-form>
        <el-form-item label="职位名称">
          <el-input placeholder="请你输入职位的名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//请求方法
import { reqAllRoleList } from "@/api/acl/role";
import type { RoleResponseData, Records, RoleData } from "@/api/acl/role/type";
//引入骨架仓库
import useLayoutSettingStore from "@/store/modules/setting";
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
};

//更新已有职位的回调
const updateRole = (row: RoleData) => {
  dialogVisible.value = true;
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
