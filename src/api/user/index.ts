//统一管理咱们项目用户相关的接口
import request from "@/utils/request";
import type { LoginForm, LoginResponseData, userResponseData } from "./type";
//统一管理接口
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

//暴露请求函数
export default API;

//登陆接口方法
export const reqLogin = (data: LoginForm) => {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data);
};

//获取用户信息
export const reqUserInfo = () => {
  request.get<any, userResponseData>(API.USERINFO_URL);
};
