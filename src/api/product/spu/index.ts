//SPU管理模块的接口
import request from "@/utils/request";
import {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
} from "./type";
enum API {
  //获取已有SPU的数据
  HASSPU_URL = "/admin/product/",

  //获取全部品牌的数据
  ALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",

  //获取某一个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = "/admin/product/spuImageList/",

  //获取某一个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_AURL = "/admin/product/spuSaleAttrList/",

  //获取整个项目全部的销售属性【颜色｜版本｜尺码】
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList",

  //追加一个新的spu
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  //编辑一个spu
  UPDATESPU_URL = "/admin/product/updateSpuInfo",
}
//获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );
//获取全部的SPU品牌的数据
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL);

//获取某一个已有的SPU下的全部的售卖商品的接口
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId);

//获取某一个已有的spu拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_AURL + spuId);
//获取全部的销售属性
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);

//添加一个新的SPU
//更新一个新的SPU
// data即为新增的SPU｜或者已有的SPU对象
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    //修改spu
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    //添加spu
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};
