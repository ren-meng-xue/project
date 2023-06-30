//创建自定义指令
// import pinna from "@/store";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();

export const isHasButton = (app: any) => {
  // console.log(11111111, app);
  //获取对应的用户的仓库
  //全局自定义指令实现按钮的权限
  app.directive("hasButton", {
    //代表使用这个全局自定义指令的Dom｜组件挂载完毕的时候会执行一次
    mounted(el: any, options: any) {
      // console.log(el, "当前使用指令的dom");
      // console.log(option,'当前使用指令所绑定的值');
      // console.log(userStore.buttons, "99");
      if (!userStore.buttons.includes(options.value)) {
        //如果仓库里面的值包含当前绑定全局指令的值
        el.parentNode.removeChild(el);
      }
    },
  });
};
