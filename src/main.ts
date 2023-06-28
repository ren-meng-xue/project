import { createApp } from "vue";
import App from "@/App.vue";
//引入模版的全局的样式
import "@/styles/index.scss";
//引入element-plus插件与样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// main.ts引入svg需要引入的配置代码
import "virtual:svg-icons-register";
// import SvgIcon from "@/components/SvgIcon/index.vue";
// app.component("SvgIcon", SvgIcon);
//配置Element-plus国际化
// 引入国际化大包的时候会报错，因为不支持ts ,可以直接让ts去忽略
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
//引入自定义插件对象，注册整个项目全局组件
import GlobalComponent from "@/components";
// console.log(GlobalComponent, "GlobalComponent");
//安装自定义插件（会触发components/index.ts里面的install方法）
//引入路由
import router from "./router";
//引入路由鉴权
import "./permission";
//引入大仓库
import pinia from "./store";
//暗黑模式需要的样式
import "element-plus/theme-chalk/dark/css-vars.css";
//获取应用实例对象
const app = createApp(App);
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
});
app.use(GlobalComponent);
app.use(router);
app.use(pinia);
// console.log(import.meta.env);

//将应用挂载到挂载点上
app.mount("#app");
