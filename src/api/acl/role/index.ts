// 角色管理模块的接口
import request from "@/utils/request";
import { RoleResponseData, RoleData } from "./type";
//枚举地址、
enum API {
  //获取全部职位的接口
  ALLROLE_URL = "/admin/acl/role/",
  //新增岗位的接口地址
  ADDROLE_URL = "/admin/acl/role/save",
  // 更新已有的职位
  UPDATE_URL = "/admin/acl/role/update",
}

//获取全部的角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`
  );

//添加｜更新

export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
};
