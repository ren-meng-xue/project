//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin } from "@/api/user";
//引入数据类型
import type { LoginForm, LoginResponseData } from "@/api/user/type";
import type UserState from "./type/type";
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";
//引入路由（常量路由）
import { constantRoute } from "@/router/routes";
//创建小仓库
const useUserStore = defineStore("User", {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
    };
  },
  //异步｜逻辑的地方
  actions: {
    //用户登陆的方法
    async userLogin(data: LoginForm) {
      //登陆请求（成功｜失败）
      const result: LoginResponseData = await reqLogin(data);
      //登陆成功-200获取token
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia｜vuex存储数据其实利用js对象
        this.token = result.data.token as string;
        SET_TOKEN(result.data.token as string);
        // localStorage.setItem("TOKEN", result.data.token as string);
        return "ok";
      } else {
        // 登陆失败- 201-登陆失败错误信息
        return Promise.reject(new Error(result.data.message));
      }
    },
  },
  getters: {},
});
//对外暴露小仓库
export default useUserStore;
