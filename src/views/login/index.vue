<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">
        <!-- 当屏幕宽度小于760的时候，让其不占位 -->
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到雪宝的后台管理系统</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              class="login_btn"
              @click="login"
              >登陆</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入获取当前时间的函数
import { getTime } from '@/utils/time'
//获取组件实例
let loginForms = ref()
let useStore = useUserStore()
//获取路由器
let $router = useRouter()
//获取路由对象
let $route = useRoute()
//收集账号和密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
//定义变量控制按钮加载效果
let loading = ref(false)
//登陆按钮的回调
const login = async () => {
  //保证全部表单相校验通过在发请求
  await loginForms.value.validate()
  loading.value = true
  //点击登录以后干什么？
  //通知仓库发登陆请求
  //请求失败->弹出登陆失败信息
  //登陆失败加载效果消息
  try {
    //请求成功->首页展示数据的地方
    //可以书写.then的写法 保证登陆 成功，以后跳转到数据页面
    await useStore.userLogin(loginForm)
    //编程式导航跳转到展示数据首页
    //判断登陆的时候，路由路径当中是否有query参数，如果有query，就往query参数跳转，没有跳转到首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })

    //登陆成功的提示信息
    ElNotification({
      type: 'success',
      message: '登陆成功',
      title: `Hi!${getTime()}好`
    })
    //登陆成功加载效果也消失
    loading.value = false
  } catch (error) {
    loading.value = false
    //登陆失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
      title: `Hi!${getTime()}好`
    })
  }
}
//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule即为校验规则对象
  //value即为表单元素文本内容
  //函数：如果符合条件callBack放行通过即可
  //如何不符合条件callBack方法，注入错误提示信息
  if (value.length >= 5) {
    // /^\d{5,10}$/.test(value)
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
//定义表单校验需要配置对象
const rules = {
  username: [
    //规则对象属性
    //message:错误的提示信息
    //trigger:触发校验表单的时机：change->文本发生变化触发校验,blur->失去焦点的时候触发校验规则
    {
      trigger: 'change',
      validator: validatorUserName
    }
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword
    }
  ]
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh; //视口
    background: url('@/assets/images/login_form.png') no-repeat;
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
