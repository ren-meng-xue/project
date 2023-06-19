//账号信息的 ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//代表一个账号信息的ts类型(新增)
export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  username?: string;
  password?: string;
  name?: string;
  phone?: string;
  roleName?: string;
}

//数组包含全部的用户信息

export type Records = User[];
//获取全部用户信息接口返回的数据ts类型
export interface userInfoResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}
