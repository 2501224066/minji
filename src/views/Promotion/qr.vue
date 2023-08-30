<template>
  <div class="qr">
    <van-swipe class="my-swipe" :loop="false" indicator-color="blue">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <van-image style="width: 100%" :src="item" />
      </van-swipe-item>
    </van-swipe>
    <div style="color: #999; text-align: center">
      <div>长按保存图片</div>
      <div>新用户仅能通过推广码成为下一级推广人</div>
    </div>
  </div>
</template>

<script>
import { agentHaibao } from "@/Api/activity/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await agentHaibao();
      this.list = res.data.data.list;
    },
  },
};
</script>

<style lang="less" scoped>
.qr {
  width: 100%;
  height: 100%;
  background: #f0f4f7;
  position: absolute;
  z-index: 99;

  .my-swipe {
    width: 70%;
    margin: 0.5rem auto;
  }

  /deep/.van-image {
    border-radius: 0.2rem;
    overflow: hidden;
    margin-bottom: 0.8rem;
  }
}
</style>
