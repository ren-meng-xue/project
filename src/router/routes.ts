//对外暴露配置路由
export const constantRoute = [
  {
    path: "/login",
    name: "login", //命名路由，权限会用到，必须有一个name菜单权限
    component: () => import("@/views/login/index.vue"),
  },
  //登陆成功以后展示数据的路由
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    //任意路由，以上三种路由都不匹配的时候
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];
