//引入项目中全部的全局组件
import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// console.log(
//   ElementPlusIconsVue,
//   "ElementPlusIconsVueElementPlusIconsVueElementPlusIconsVue"
// );

// console.log(SvgIcon, "SortIcon"); //它是一个对象

const allGlobalComponent: any = {
  SvgIcon,
  Pagination,
};

// Object.keys(allGlobalComponent)把对象变成数组
// console.log(Object.keys(allGlobalComponent), "Object.keys(allGlobalComponent)");

//对外暴露插件对象
export default {
  //务必叫做install方法
  install(app: any) {
    // console.log(123, app);
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGlobalComponent[key]);
      // console.log(key, "key");
    });
    //将element-plus提供图标注册为全局组件
    // console.log(Object.entries(ElementPlusIconsVue));

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};