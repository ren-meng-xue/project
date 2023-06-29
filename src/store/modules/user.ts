/*
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-08 22:46:16
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-08 23:38:48
 */
//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";

import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";
//引入数据类型
import type UserState from "./type/type";
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import router from "@/router";
//引入路由（常量路由）
import { constantRoute, anyRoute, asyncRoute } from "@/router/routes";

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}
//创建小仓库
const useUserStore = defineStore("User", {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      username: "", //用户名字
      avatar: "", //头像
    };
  },
  //异步｜逻辑的地方
  actions: {
    //用户登陆的方法
    async userLogin(data: loginFormData) {
      //登陆请求（成功｜失败）
      const result: loginResponseData = await reqLogin(data);
      //登陆成功-200获取token
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia｜vuex存储数据其实利用js对象
        this.token = result.data as string;
        SET_TOKEN(result.data as string);
        // localStorage.setItem("TOKEN", result.data.token as string);
        return "ok";
      } else {
        // 登陆失败- 201-登陆失败错误信息
        return Promise.reject(new Error(result.data));
      }
    },
    //获取用户信息
    async userInfo() {
      //获取用户信息进行存储仓库当中【用户头像、名字】
      const result: userInfoResponseData = await reqUserInfo();
      if (result.code == 200) {
        console.log(result.data.routes, "999");

        this.username = result.data.name;
        this.avatar = result.data.avatar;
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(asyncRoute, result.data.routes);
        //菜单需要的数据整理完毕，
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute];
        //目前路由器管理的只有常量路由：用户计算完毕异步路由、任意路由动态追加
        [...userAsyncRoute, ...anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });
        // console.log(router.getRoutes());//查看所有路由

        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登陆
    async userLogout() {
      const result: any = await reqLogout();
      if (result.code == 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});
//对外暴露小仓库
export default useUserStore;
