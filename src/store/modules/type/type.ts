//定义小仓库数据state类型
import { RouteRecordRaw } from "vue-router"; //路由对象的ts类型
interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
}

export default UserState;
