<template>
  <div class="pr">
    <div class="top">
      <img v-if="head_img_url" :src="head_img_url" />
      <span style="font-size: 0.4rem">{{ nnickname }}</span>
      <div><span class="dj">分销等级</span></div>
      <div style="font-size: 0.8rem">{{ detail.total_commission }}</div>
      <div class="num">
        <div>
          <div>昨日收益</div>
          <div>{{ detail.yesterday_commission }}</div>
        </div>
        <div>
          <div>累计已提</div>
          <div>{{ detail.withdrawal_total }}</div>
        </div>
      </div>

      <div class="sq">代理商申请</div>
    </div>

    <div class="tx"><span>立即体现</span></div>

    <div class="box">
      <div><img src="../../assets/img/p1.jpg" /> <span>推广名片</span></div>
      <div><img src="../../assets/img/p2.jpg" /> <span>推广人统计</span></div>
      <div><img src="../../assets/img/p3.jpg" /> <span>佣金明细</span></div>
      <div><img src="../../assets/img/p4.jpg" /> <span>推广人订单</span></div>
      <div><img src="../../assets/img/p5.jpg" /> <span>推广人排行</span></div>
      <div><img src="../../assets/img/p6.jpg" /> <span>佣金排行</span></div>
    </div>
  </div>
</template>

<script>
import { get_user } from "@/Api/user/user";
import { agentUser } from "@/Api/activity/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      head_img_url: "",
      nnickname: "",
      detail: {},
    };
  },
  created() {
    this.get_user();
    this.getData();
  },
  methods: {
    async get_user() {
      const { data: res } = await get_user();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.head_img_url = res.data.head_img_url;
      this.nnickname = res.data.nnickname;
    },

    async getData() {
      const res = await agentUser();
      this.detail = res.data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.pr {
  width: 100%;
  height: 100%;
  background: #f0f4f7;
  position: absolute;
  z-index: 99;
  .top {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: rgb(29, 174, 253);
    padding: 0.5rem 1rem;
    color: #fff;
    img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      background: #fff;
    }
    .dj {
      font-size: 0.2rem;
      padding: 0.1rem;
      background: rgb(30, 194, 251);
      border-radius: 0.1rem;
    }
    .num {
      margin-top: 0.4rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 0.3rem;
    }
    .sq {
      position: absolute;
      right: 0;
      top: 1rem;
      background: rgb(255, 241, 222);
      color: rgb(255, 159, 25);
      padding: 0.1rem 0.2rem;
      border-radius: 0.5rem 0 0 0.5rem;
    }
  }
  .tx {
    text-align: center;
    position: relative;
    top: -0.3rem;
    span {
      padding: 0.2rem 0.5rem;
      color: #fff;
      background: rgb(29, 174, 253);
      border-radius: 2rem;
      border: 0.2rem solid #f0f4f7;
    }
  }
  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 0.5rem 0;
    > div {
      width: 46%;
      background: #fff;
      text-align: center;
      padding: 0.5rem 0;
      border-radius: 0.2rem;
      margin-bottom: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > img {
        width: 0.8rem;
        margin: 0 auto 0.2rem auto;
      }
    }
  }
}
</style>
