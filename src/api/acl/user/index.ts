// 用户管理模块接口
import request from "@/utils/request";
import type { userInfoResponseData, User } from "./type";
//枚举地址
enum API {
  //获取全部已有用户账号信息
  ALLUSER_URL = "/admin/acl/user/",

  //添加一个新的用户账号
  ADDUSER_URL = "/admin/acl/user/save",

  //编辑一个已有的用户账号
  UPDATEUSER_URL = "/admin/acl/user/update",
}

//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) =>
  request.get<any, userInfoResponseData>(API.ALLUSER_URL + `${page}/${limit}`);

//添加｜编辑
export const redAddOrUpdateUser = (data: User) => {
  if (data.id) {
    //更新
    return request.put(API.UPDATEUSER_URL, data);
  } else {
    //添加
    return request.post(API.ADDUSER_URL, data);
  }
};
