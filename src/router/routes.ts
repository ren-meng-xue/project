//对外暴露配置路由
export const constantRoute = [
  {
    path: "/login",
    name: "login", //命名路由，权限会用到，必须有一个name菜单权限
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登陆", //菜单需要的标题
      hidden: true, //代表路由标题在菜单中是否隐藏 true表示隐藏
      icon: "User", //菜单左侧图标，支持element-plus所有图标
    },
  },
  //登陆成功以后展示数据的路由
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "layout", //菜单需要的标题
      hidden: false,
      icon: "CircleCheck",
    },
    children: [
      {
        path: "/home",
        meta: {
          title: "首页", //菜单需要的标题
          hidden: false,
          icon: "Operation",
        },
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "404", //菜单需要的标题
      hidden: true,
      icon: "Edit",
    },
    component: () => import("@/views/404/index.vue"),
  },
  {
    //任意路由，以上三种路由都不匹配的时候
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "任意路由", //菜单需要的标题
      hidden: true,
      icon: "More",
    },
  },
];
