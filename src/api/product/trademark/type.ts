export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//已有品牌的数据类型

export interface Trademark {
  id?: number; //id可有可没有
  tmName: string;
  logoUrl: string;
}

//包含全部品牌数据ts的数据类型
export type Records = Trademark[];

//获取已有全部品牌的数据ts类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
