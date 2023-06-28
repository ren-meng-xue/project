<template>
  <div class="">
    <!-- 首页
    {{ useStore.username }}
    {{ useStore.avatar }} -->
    <el-card>
      <div class="box">
        <img :src="useStore.avatar" alt="" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getTime() }}好呀！{{ useStore.username }}</h3>
          <p class="subtitle">雪宝运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">
      <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入用户相关的仓库，获取当前用户的头像还有昵称
import useUserStore from "@/store/modules/user";
import { getTime } from "@/utils/time";
//获取存储用户信息的仓库对象
let useStore = useUserStore();
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .subtitle {
      font-style: italic; //让文字倾斜;
      color: lightblue;
    }
  }
}
.bottoms {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
