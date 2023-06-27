import request from "@/utils/request";
import type { PermissionResponseData } from "./type";
enum API {
  //获取全部菜单与按钮的标识数据
  ALLPERMISSITION = "/admin/acl/permission",
}

//获取菜单数据
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSITION);
