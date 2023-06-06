<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">
        <!-- 当屏幕宽度小于760的时候，让其不占位 -->
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到雪宝的后台管理系统</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_btn" @click="login"
              >登陆</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive } from "vue";
//引入用户相关的小仓库
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();

//收集账号和密码的数据
let loginForm = reactive({ username: "admin", password: "111111" });

//登陆按钮的回调
const login = () => {
  //点击登录以后干什么？
  //通知仓库发登陆请求
  useStore.userLogin(loginForm);
  //请求成功->首页展示数据的地方
  //请求失败->弹出登陆失败信息
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh; //视口
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
