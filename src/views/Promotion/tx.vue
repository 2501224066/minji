<template>
  <div class="tx">
    <div class="card" style="padding: 1rem; margin-top: 0.2rem">
      <div
        style="
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid #ddd;
          align-items: center;
        "
      >
        <div>
          <span style="font-size: 0.6rem; margin-right: 0.5rem">¥</span>
          <input style="border: none" type="number" v-model="money" placeholder="提现金额" />
        </div>
        <div @click="money = detail.balance">全部提现</div>
      </div>
      <div style="color: #999; margin: 0.2rem 0 1rem 0">当前最多体现{{ detail.balance }}元</div>
      <div style="text-align: center">
        <span
          style="padding: 0.3rem 1rem; background: #1daefd; border-radius: 1rem; display: inline-block; color: #fff"
          @click="tx()"
        >
          立即体现
        </span>
      </div>
    </div>

    <div style="color: #666; margin: 0.2rem 5vw">提现记录</div>
    <div class="card">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div style="background: #fff; border-bottom: 1px solid #f0f4f7" v-for="(item, index) in list" :key="index">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0.5rem">
            <div style="color: #999">
              <div>用户提现</div>
              <div>{{ item.updated_at }}</div>
            </div>
            <div style="color: #666">
              <div>+{{ item.money }}元</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { agentTx, agentUser, agentTxLog } from "@/Api/activity/index";
export default {
  data() {
    return {
      money: "",
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

    async tx() {
      if (this.money > this.detail.balance) {
        this.$toast("提现金额超出余额");
        return;
      }
      await agentTx({ money: this.money });
      if (res.data.code === 200) {
        this.$toast("提现成功");
        this.money = "";
        this.getData();
        this.getList();
      }
    },

    async getList() {
      const res = await agentTxLog({
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
.tx {
  width: 100%;
  height: 100%;
  background: #f0f4f7;
  position: absolute;
  z-index: 99;
  .card {
    background: #fff;
    width: 90vw;
    margin: 0 5vw 1rem 5vw;
    box-sizing: border-box;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  /deep/.van-list {
    background: #f0f4f7;
  }
}
</style>
