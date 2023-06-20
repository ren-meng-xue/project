// 用户管理模块接口
import request from "@/utils/request";
import type {
  userInfoResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from "./type";
//枚举地址
enum API {
  //获取全部已有用户账号信息
  ALLUSER_URL = "/admin/acl/user/",

  //添加一个新的用户账号
  ADDUSER_URL = "/admin/acl/user/save",

  //编辑一个已有的用户账号
  UPDATEUSER_URL = "/admin/acl/user/update",
  //获取全部职位，当前账号拥有的职位名称

  ALLROLE_URL = "admin/acl/user/toAssign/",

  // 给已有的用户分配角色接口
  SETROLE_URL = "/admin/acl/user/doAssignRole",

  //删除某一个账号
  DELTUSER_URL = "/admin/acl/user/remove/",

  //批量删除的接口
  DELETEALL_URL = "/admin/acl/user/batchRemove/",
}

//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, userInfoResponseData>(
    API.ALLUSER_URL + `${page}/${limit}?username=${username}`
  );

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

//获取全部职位以及包含当前用户的已有的职位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId);
//分配职务
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data);

//删除某一个账号信息
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELTUSER_URL + userId);

//批量删除的接口
export const reqSelectUser = (idList: number[]) =>
  request.delete(API.DELETEALL_URL, {
    data: idList,
  });
