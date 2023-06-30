/*
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-08 22:46:16
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-08 23:40:45
 */
//路由鉴权，项目当中的路由能不能被受权限的设置（某一个路由什么条件下可以访问，什么条件下不可以访问）
import router from "@/router";
//全局前置守卫
import nprogress from "nprogress";
import setting from "./setting";
//引入nprogress的css样式
import "nprogress/nprogress.css"; //可以修改下载包依赖的源码修改进度条的样式
nprogress.configure({ showSpinner: false }); //去掉加载的小球
//获取用户相关的小仓库内部token数据，去爬断用户是否登陆成功
import pinia from "./store";
import useUserStore from "./store/modules/user";
const userStore = useUserStore(pinia);

// 项目当中任意路由切换都会触发的钩子
router.beforeEach(async (to: any, _from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`;
  //访问某一个路由之前守卫
  //to:将要访问那个路由
  //from:从那个路由过来
  //next()是放行函数
  nprogress.start();
  //获取token 判断用户登陆还是未登陆
  const token = userStore.token;
  //获取用户名字
  const username = userStore.username;
  if (token) {
    //登陆成功，想访问login
    if (to.path == "/login") {
      //想访问login，让你跳转到首页
      next({ path: "/" });
    } else {
      //登陆成功，访问其余6个路由
      //如果有用户信息，放行
      if (username) {
        next();
      } else {
        //如果没有信息，就发起请求，获取到了再放行
        try {
          await userStore.userInfo(); //获取用户信息成功以后再放行
          //万一：刷新的时候是异步路由，有可能获取到用户信息、异步路由还没加载完毕，一刷新就会出现空白的现象
          next({ ...to });
        } catch (error) {
          //token失效
          //用户手动更改了我们本地存储的数据
          await userStore.userLogout();
          next({
            path: "/login",
            query: {
              redirect: to.path,
            },
          });
        }
      }
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      //如果没有登陆，访问的是其他路由，不允许，并且把之前想看的重定向
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

//全局后置守卫

// router.afterEach((to: any, from: any) => {
//   nprogress.done();
// });
router.afterEach(() => {
  nprogress.done();
});
//一、任意路由切换实现进度条业务 使用的是插件nprogress

// 二、路由鉴权（路由组件访问权限的设置）

//全部路由组件 登陆｜404｜任意路由｜首页｜数据大屏｜权限管理（三个字路由）｜商品管理（四个字路由）
//用户没有登陆：可以访问login，其余六个路由不能访问，执向login
// 用户登陆成功：不可以访问login，其余路由都可以访问
