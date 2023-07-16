<template>
  <div class="order">
    <div
      style="background: #51aff6; display: flex; justify-content: space-between; align-items: center; padding: 0.5rem"
    >
      <div style="display: flex; flex-direction: column; justify-content: center; color: #fff">
        <div>累计推广订单</div>
        <div>
          <span style="font-size: 1rem">{{ detail.promote_order_num }}</span> 单
        </div>
      </div>

      <div style="width: 1.5rem"><img src="../../assets/img/b1.png" style="width: 100%" /></div>
    </div>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div style="background: #fff">
        <div
          style="padding: 0.2rem 0.8rem; border-top: 1px solid #f0f4f7; color: #999"
          v-for="(item, index) in list"
          :key="index"
        >
          <div style="display: flex; justify-content: space-between; align-items: center">
            <div>订单编号: {{ item.order.order_no }}</div>
            <div style="color: green">{{ item.order.status_name }}</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin: 0.2rem 0">
            <div style="width: 30%; border-radius: 0.2rem; overflow: hidden; display: inline-flex">
              <img :src="item.order.goods_img" style="width: 100%" />
            </div>

            <div>
              <div style="color: #333; font-size: 0.4rem; font-weight: bold">{{ item.order.goods_title }}</div>
              <div>{{ item.nickname }}</div>
            </div>
            <div>
              <div>¥{{ item.order.goods_price }}</div>
              <div>x{{ item.order.num }}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; font-size: 0.3rem">
            <div>下单时间: {{ item.order.created_at }}</div>

            <div>
              <span>共{{ item.order.num }}件商品</span>
              实付 <span style="color: #333; font-size: 0.5rem; font-weight: bold">¥{{ item.order.pay_price }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { agentUser, agentSpreadOrder } from "@/Api/activity/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      page: 1,
      detail: {},
      list: [],
      finished: false,
      loading: true,
      total: 0,
    };
  },
  created() {
    this.getData();
    this.getList();
  },
  methods: {
    async getData() {
      const res = await agentUser();
      this.detail = res.data.data;
    },

    async getList() {
      const res = await agentSpreadOrder({
        params: {
          page: this.page,
        },
      });
      this.list = this.list.concat(res.data.data.list);
      this.total = res.data.data.total;
      this.loading = false;
      if (this.page * 10 >= this.total) this.finished = true;
    },

    // 下拉
    onLoad() {
      if (this.finished) return;
      this.page = this.page + 1;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 100%;
  height: 100%;
  background: #f0f4f7;
  position: absolute;
  z-index: 99;
  /deep/.van-list {
    background: #f0f4f7;
  }
  /deep/.van-tabs__line {
    background-color: #51aff6;
  }
}
</style>
