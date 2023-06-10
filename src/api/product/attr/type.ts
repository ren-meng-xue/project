/*
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-10 18:10:12
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-10 18:51:53
 */
//分类相关的数据ts类型
export interface reqResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//分类ts类型

export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

//相应的分类接口返回数据的类型
export interface CategoryResponseData extends reqResponseData {
  data: CategoryObj[];
}
