import request from "@/utils/request";
import type { PermissionResponseData, MenuParams } from "./type";
enum API {
  //获取全部菜单与按钮的标识数据
  ALLPERMISSITION = "/admin/acl/permission",

  //给某一级菜单新增一个子菜单
  ADDMENU_URL = "/admin/acl/permission/save",
  //更新某一个已有的菜单
  UPDATE_URL = "/admin/acl/permission/update",

  //删除已有的菜单
  DELETEMENU_URL = "/admin/acl/permission/remove/",
}

//获取菜单数据
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSITION);

//添加与更新菜单的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    //更新
    return request.put<any, any>(API.UPDATE_URL, data);
  } else {
    //删除
    return request.post<any, any>(API.ADDMENU_URL, data);
    //因为是添加｜更新接口，服务器只会告诉我成功还是失败，不回告诉我返回的具体的数据，所以返回的数据类型是any
  }
};
//删除某一个已有的菜单
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id);
