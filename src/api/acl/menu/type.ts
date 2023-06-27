export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//菜单数据与按钮数据的ts类型
export interface Permission {
  id?: number;
  createTime?: string;
  updateTime: string;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  children?: PermissionList;
  select: boolean;
}

export type PermissionList = Permission[];
//定义接口返回数据的ts类型
export interface PermissionResponseData extends ResponseData {
  data: PermissionList;
}
