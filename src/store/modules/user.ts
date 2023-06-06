//创建用户相关的小仓库
import { defineStore } from "pinia";
//引入接口
import { reqLogin } from "@/api/user";
import type { LoginResponseData } from "@/api/user/type";
//引入数据类型
import type { LoginForm } from "@/api/user/type";

//创建小仓库
const useUserStore = defineStore("User", {
  //小仓库存储数据的地方
  state: () => {
    return {
      token: "", //用户唯一标识token
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
        this.token = result.data.token;
        localStorage.setItem("TOKEN", result.data.token);
      }
      // 登陆失败- 201-登陆失败错误信息
    },
  },
  getters: {},
});
//对外暴露小仓库
export default useUserStore;
