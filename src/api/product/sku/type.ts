export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//定义sku对象ts类型

export interface Attr {
  attrId: number | string; //平台属性的ID
  valueId: number | string; //属性值的ID
  id?: number | string;
  valueName?: string;
}
export interface saleArr {
  id?: number | string;
  saleAttrId: number | string; //属性id
  saleAttrValueId: number | string; //属性值的id
  saleAttrValueName: string;
}
export interface SkuData {
  category3Id?: number | string; //三级分类的id
  spuId?: number | string; //已有的SPU的ID
  tmId?: number | string; //SPU品牌的id
  skuName?: string; //SKU名字
  price?: string | number; //价格
  weight?: number | string; //重量
  skuDesc?: string; //sku描述
  skuAttrValueList?: Attr[]; //平台属性的收集
  skuSaleAttrValueList?: saleArr[];
  //销售属性
  skuDefaultImg?: string; //sku图片地址
  isSale?: number; //控制商品的上架与下架
  id?: number;
}

//获取sku接口返回的数据ts类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    orders: [];
    optmizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}
//获取sku商品详情接口ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData;
}
