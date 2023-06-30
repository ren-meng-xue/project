// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/robocoach/Desktop/vue3_admin_template/project/node_modules/.pnpm/registry.npmmirror.com+vite@4.3.9_@types+node@20.2.5_sass@1.61.0/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/robocoach/Desktop/vue3_admin_template/project/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.1.0_vite@4.3.9_vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///Users/robocoach/Desktop/vue3_admin_template/project/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@4.3.9/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///Users/robocoach/Desktop/vue3_admin_template/project/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@4.3.9/node_modules/vite-plugin-mock/dist/index.js";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === "serve"
        //保证开发阶段可以使用mock接口
      }),
      //配置icon
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
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
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcm9ib2NvYWNoL0Rlc2t0b3AvdnVlM19hZG1pbl90ZW1wbGF0ZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcm9ib2NvYWNoL0Rlc2t0b3AvdnVlM19hZG1pbl90ZW1wbGF0ZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9yb2JvY29hY2gvRGVza3RvcC92dWUzX2FkbWluX3RlbXBsYXRlL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjsvKlxuICogQERlc2NyaXB0aW9uOiBcdTYzQ0ZcdThGRjBcdTRGRTFcdTYwNkZcbiAqIEBWZXJzaW9uOiBcdTcyNDhcdTY3MkNcdTUzRjdcbiAqIEBBdXRob3I6IHh1ZWJhb1xuICogQERhdGU6IDIwMjMtMDYtMDggMjI6NDY6MTZcbiAqIEBMYXN0RWRpdG9yczogcmVubWVuZ3h1ZVxuICogQExhc3RFZGl0VGltZTogMjAyMy0wNi0wOCAyMzoxMzo1MVxuICovXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7XG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2tcIjtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG4vLyBjb21tYW5kIFx1NzUyOFx1NEU4RVx1NjhDMFx1NkQ0Qlx1NUY1M1x1NTI0RFx1NUYwMFx1NTNEMVx1OTYzNlx1NkJCNVx1NzY4NFx1NzNBRlx1NTg4M1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICAvL1x1ODNCN1x1NTNENlx1NTQwNFx1NzlDRFx1NzNBRlx1NTg4M1x1NEUwQlx1NUJGOVx1NUU5NFx1NzY4NFx1NTNEOFx1OTFDRlxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpOyAvLyhcdTUyQTBcdThGN0RcdTU0RUFcdTRFMDBcdTRFMkFcdTczQUZcdTU4ODNcdTc2ODRcdTY4MzlcdTY1ODdcdTRFRjYpXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcbiAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSBcInNlcnZlXCIsIC8vXHU0RkREXHU4QkMxXHU1RjAwXHU1M0QxXHU5NjM2XHU2QkI1XHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4bW9ja1x1NjNBNVx1NTNFM1xuICAgICAgfSksXG4gICAgICAvL1x1OTE0RFx1N0Y2RWljb25cbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL2ljb25zXCIpXSxcbiAgICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIixcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShcIi4vc3JjXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vc2Nzc1x1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1NEUwMFx1NEUyQVx1OTE0RFx1N0Y2RVxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL3ZhcmlhYmxlLnNjc3NcIjsnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXG4gICAgc2VydmVyOiB7XG4gICAgICBwcm94eToge1xuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xuICAgICAgICAgIC8vXHU4M0I3XHU1M0Q2XHU2NTcwXHU2MzZFXHU3Njg0XHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXHU4QkJFXHU3RjZFXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9TRVJWRSxcbiAgICAgICAgICAvL1x1OTcwMFx1ODk4MVx1NEVFM1x1NzQwNlx1OERFOFx1NTdERlxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAvL1x1OERFRlx1NUY4NFx1OTFDRFx1NTE5OVxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQVFBLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxxQkFBcUI7QUFHOUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUVqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLGNBQWM7QUFBQSxRQUNaLGNBQWMsWUFBWTtBQUFBO0FBQUEsTUFDNUIsQ0FBQztBQUFBO0FBQUEsTUFFRCxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osbUJBQW1CO0FBQUEsVUFDbkIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxDQUFDLElBQUksaUJBQWlCLEdBQUc7QUFBQTtBQUFBLFVBRXZCLFFBQVEsSUFBSTtBQUFBO0FBQUEsVUFFWixjQUFjO0FBQUE7QUFBQSxVQUVkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzlDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
