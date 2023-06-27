// 角色管理模块的接口
import request from "@/utils/request";
import { RoleResponseData, RoleData, MenuResponseData } from "./type";
//枚举地址、
enum API {
  //获取全部职位的接口
  ALLROLE_URL = "/admin/acl/role/",
  //新增岗位的接口地址
  ADDROLE_URL = "/admin/acl/role/save",
  // 更新已有的职位
  UPDATE_URL = "/admin/acl/role/update",
  //获取全部的菜单与按钮的数据
  ALLPERMISSITION = "/admin/acl/permission/toAssign/",

  //给相应职位分配权限
  SETPERMISSITION = "/admin/acl/permission/doAssign/",
  //删除已有职位
  REMOVEROLE_URL = "/admin/acl/role/remove/",
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
//获取全部菜单与按钮的全部数据
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSITION + roleId);

//给相应的职位下发权限

export const reqSetPermissions = (roleId: number, permissionId: number[]) =>
  // query的方式传递参数
  request.post<any, any>(
    API.SETPERMISSITION + `/?roleId=${roleId}&permissionId=${permissionId}`
  );

//删除已有职位
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId);
