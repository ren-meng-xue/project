//通过vue-router插件实现模版路由配置
import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
} from "vue-router";
import { constantRoute } from "./routes";
//创建路由器
const router = createRouter({
  //路由模式默认是hash

  history: createWebHashHistory(), //createWebHistory
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
export default router;
