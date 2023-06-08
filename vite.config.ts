/*
 * @Description: 描述信息
 * @Version: 版本号
 * @Author: xuebao
 * @Date: 2023-06-08 22:46:16
 * @LastEditors: renmengxue
 * @LastEditTime: 2023-06-08 23:13:51
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
// command 用于检测当前开发阶段的环境
export default defineConfig(({ command, mode }) => {
  //获取各种环境下对应的变量
  const env = loadEnv(mode, process.cwd()); //(加载哪一个环境的根文件)
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === "serve", //保证开发阶段可以使用mock接口
      }),
      //配置icon
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
