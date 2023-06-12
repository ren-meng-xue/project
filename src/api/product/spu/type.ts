//服务器全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//SPU数据的ts类型 需要修改

export interface SpuData {
  id?: number; //新增｜编辑
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number;
  spuSaleAttrList: null; //SPU销售属性目前是null
  spuImageList: null; //照片墙
}

//数组：元素都是已有SPU数据类型
export type Records = SpuData[];

//定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}
