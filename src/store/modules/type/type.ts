/*
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-08 22:46:16
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-10 20:42:45
 */
//定义小仓库数据state类型
import { RouteRecordRaw } from "vue-router"; //路由对象的ts类型
//引入分类ts类型
import { CategoryObj } from "@/api/product/attr/type";
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}
//定义分类仓库state对象的ts类型

export interface CategoryState {
  c1Id: string | number;
  c1Arr: CategoryObj[];
  c2Arr: CategoryObj[];
  c2Id: string | number;
  c3Arr: CategoryObj[];
  c3Id: string | number;
}
