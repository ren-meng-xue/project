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
  tmId: number | string;
  spuSaleAttrList: null | SaleAttr[]; //SPU销售属性目前是null
  spuImageList: null | SpuImg[]; //照片墙
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
//品牌数据的ts类型
export interface TradeMark {
  id: number;
  tmName: string;
  logoUrl: string;
}

// 品牌接口返回的数据ts类型
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]; //TradeMark是一个数组
}

//商品图片的ts类型
export interface SpuImg {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  name?: string;
  url?: string;
}
// 已有的spu照片墙数据的类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}

//已有的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrValueName: string;
  saleAttrName?: string;
  createTime?: string;
  updateTime?: string;
  isChecked?: null;
}

//存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];
//销售属性对象的ts类型

export interface SaleAttr {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SpuSaleAttrValueList;
  flag?: boolean;
  saleAttrValue?: string;
  saleIdAndValueId?: string;
}

//Spu已有销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

//已有的全部SPU的返回数据ts类型

export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}

export interface Attr {
  attrId: number | string; //平台属性的ID
  valueId: number | string; //属性值的ID
}
export interface saleArr {
  saleAttrId: number | string; //属性id
  saleAttrValueId: number | string; //属性值的id
}
export interface SkuData {
  category3Id: number | string; //三级分类的id
  spuId: number | string; //已有的SPU的ID
  tmId: number | string; //SPU品牌的id
  skuName: string; //SKU名字
  price: string | number; //价格
  weight: number | string; //重量
  skuDesc: string; //sku描述
  skuAttrValueList?: Attr[]; //平台属性的收集
  skuSaleAttrValueList?: saleArr[];
  //销售属性
  skuDefaultImg: string; //sku图片地址
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}
