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
    redirect: "/home",
    children: [
      {
        path: "/home",
        meta: {
          title: "首页", //菜单需要的标题
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
    path: "/screen",
    name: "Screen",
    component: () => import("@/views/screen/index.vue"),
    meta: { title: "数据大屏", icon: "Platform" },
  },
];
//异步路由(权限管理三个子路由，商品管理四个子路由)
export const asyncRoute = [
  {
    path: "/acl",
    name: "Acl",
    component: () => import("@/layout/index.vue"),
    meta: { title: "权限管理", icon: "Lock" },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        name: "User",
        component: () => import("@/views/acl/user/index.vue"),
        meta: { title: "用户管理", icon: "User" },
      },
      {
        path: "/acl/role",
        name: "Role",
        component: () => import("@/views/acl/role/index.vue"),
        meta: { title: "角色管理", icon: "UserFilled" },
      },
      {
        path: "/acl/permission",
        name: "Permission",
        component: () => import("@/views/acl/permission/index.vue"),
        meta: { title: "菜单管理", icon: "Monitor" },
      },
    ],
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("@/layout/index.vue"),
    meta: { title: "商品管理", icon: "Goods" },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        name: "Trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        meta: { title: "品牌管理", icon: "ShoppingCartFull" },
      },
      {
        path: "/product/attr",
        name: "Attr",
        component: () => import("@/views/product/attr/index.vue"),
        meta: { title: "属性管理", icon: "ChromeFilled" },
      },
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "SPU管理",
          icon: "Calendar",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "SKU管理",
          icon: "Orange",
        },
      },
    ],
  },
];
//任意路由
export const anyRoute = [
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
