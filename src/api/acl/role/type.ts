export interface ResponseData {
  code: number;
  msg: string;
  ok: boolean;
}

//职位的数据类型
export interface RoleData {
  id?: number;
  crateTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
}

//全部职位的数组的ts类型

export type Records = RoleData[];
//全部职位数据响应的ts类型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    optmizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: number;
    searchCount: boolean;
    pages: number;
  };
}
