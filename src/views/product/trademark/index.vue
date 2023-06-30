<template>
  <div>
    <el-card class="box-card">
      <el-button
        icon="plus"
        type="primary"
        @click="addTradeMark"
        v-hasButton="'btn.Trademark.add'"
      >
        <!-- v-if="useStore.buttons.includes('btn.Trademark.add')" -->
        添加品牌</el-button
      >
      <!-- 表格 -->
      <el-table border style="margin: 10px 0px" :data="trademarkArr">
        <el-table-column
          label="序号"
          align="center"
          width="80px"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" align="center">
          <!-- prop="tmName" -->
          <template #default="{ row }">
            {{ row.tmName }}
          </template>
        </el-table-column>
        <el-table-column label="品牌Logo" align="center">
          <template #default="{ row }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              icon="Edit"
              @click="updateTradeMark(row)"
            ></el-button>

            <el-popconfirm
              :title="`你确定删除${row.tmName}品牌么？`"
              width="200px"
              icon="Delete"
              @confirm="removeTradeMark(row)"
            >
              <template #reference>
                <el-button
                  size="small"
                  type="primary"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件
                pagination
                   v-model:current-page:设置分页器当前页码
                   v-model:page-size:设置每一个展示数据条数
                   page-sizes:用于设置下拉菜单数据
                   background:设置分页器按钮的背景颜色
                   layout:可以设置分页器六个子组件布局调整
                   pager-count:可以设置连续的页码数 默认7
            -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes,"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="changePageSize"
      />
    </el-card>
    <!-- 对话框组件：在添加品牌与修改已有品牌的业务的时候使用 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="110px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="110px" prop="logoUrl">
          <!-- upload组件属性：
              action：上传图片的接口地址,需要带上api，不带api，代理服务器不发送这次post请求
              show-file-list 展示上传进度条
          -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽：footer -->
      <template #footer>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
//引入组合式API函数ref
import { ref, onMounted, reactive, nextTick } from "vue";
import type { UploadProps, FormRules } from "element-plus";
//按钮权限的实现
import useUserStore from "@/store/modules/user";
//获取用户相关的仓库
let useStore = useUserStore();
//获取品牌全部接口
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark/index";
import type {
  Records,
  TrademarkResponseData,
  Trademark,
} from "@/api/product/trademark/type";
import { ElMessage } from "element-plus";
//当前页码
let pageNo = ref<number>(1);
//每一页展示多少条数据
let pageSize = ref<number>(3);
//存储已有数据品牌总数
let total = ref<number>(0);
//存储已有品牌数组
let trademarkArr = ref<Records>([]);
//控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false);
//定义收集新增品牌数据
let trademarkParams = reactive<Trademark>({
  tmName: "",
  logoUrl: "",
});
//获取el-form组件实例
let formRef = ref();
//获取已有品牌的接口封装为一个函数，在任何情况下想获取数据，调用此函数即可
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let result: TrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};
//组件挂载完毕钩子，发一次请求，获取第一页，一页三个已有品牌数据
onMounted(() => {
  getHasTrademark();
});
//改变页数的时候
//对于当前页码发生变化自定义事件，组件pagination父组件回传了数据（当前的页码）
const changePageNo = () => {
  //当前页码发生变化的时候再次发请求
  getHasTrademark(); //也可以直接把获取所有品牌数据的接口作为事件的回调，效果是一样的
};
const changePageSize = () => {
  getHasTrademark();
};
//添加品牌按钮
const addTradeMark = () => {
  dialogFormVisible.value = true;

  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
  trademarkParams.id = 0;
  //清楚红色的提示，并且初始化默认值

  // formRef.value?.resetFields();
  nextTick(() => {
    //获取到更新之后的dom
    formRef.value.resetFields();
  });
};

const updateTradeMark = (row: Trademark) => {
  //清空校验规则错误提示信息
  nextTick(() => {
    formRef.value.resetFields();
  });
  // ES6
  Object.assign(trademarkParams, row);
  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
  // trademarkParams.id = row.id;
  dialogFormVisible.value = true;
};

//对话框底部取消按钮
const cancel = () => {
  dialogFormVisible.value = false;
};
//品牌自定义校验规则方法
const validatorTmName = (value: any, callBack: any) => {
  //是当表单元素触发blur时候,会触发此方法
  //自定义校验规则
  if (value.trim().length >= 2) {
    callBack();
  } else {
    //校验未通过返回的错误的提示信息
    callBack(new Error("品牌名称位数大于等于两位"));
  }
};
//品牌LOGO图片的自定义校验规则方法
const validatorLogoUrl = (value: any, callBack: any) => {
  //如果图片上传
  if (value) {
    callBack();
  } else {
    callBack(new Error("LOGO图片务必上传"));
  }
};
//表单校验规则对象
const rules = {
  tmName: [
    //required:这个字段务必校验,表单项前面出来五角星
    //trigger:代表触发校验规则时机[blur、change]
    { required: true, trigger: "blur", validator: validatorTmName },
  ],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
};
const confirm = async () => {
  // console.log(formRef.value, "formRef.value");
  await formRef.value.validate();
  // 添加｜修改
  let result: any = await reqAddOrUpdateTrademark(trademarkParams);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
    });
    dialogFormVisible.value = false;
    //再次发起请求，获取已有全部品牌 修改品牌的话建议停留在当前页面
    getHasTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
    });
    dialogFormVisible.value = false;
  }
  formRef.value.resetFields();
};
//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile: any) => {
  //钩子是在图片上传成功之前触发，上传文件之前可以约束文件类型与大小
  // 要求：上传文件格式png｜jpg｜gif 4M
  if (
    rawFile.type == "image/png" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({ type: "error", message: "上传的文件的大小应小于4M" });
    }
  } else {
    ElMessage({ type: "error", message: "上传的文件的格式支持PNG｜JPG｜GIF" });
    return false;
  }
};
//上传图片组件->上传成功的钩子
const handleAvatarSuccess: UploadProps["onSuccess"] = (response: any) => {
  // response为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址
  trademarkParams.logoUrl = response.data;
  //图片上传成功，清除掉图片的字段校验信息
  formRef.value.clearValidate("logoUrl");
};

//删除数据
//气泡确认框确定按钮的回调
const removeTradeMark = async (id: number) => {
  //点击确定按钮删除已有品牌请求
  let result = await reqDeleteTrademark(id);
  if (result.code == 200) {
    //删除成功提示信息
    ElMessage({
      type: "success",
      message: "删除品牌成功",
    });
    //再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1
    );
  } else {
    ElMessage({
      type: "error",
      message: "删除品牌失败",
    });
  }
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
