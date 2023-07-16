<template>
  <div class="people">
    <div
      style="background: #51aff6; display: flex; justify-content: space-between; align-items: center; padding: 0.5rem"
    >
      <div style="display: flex; flex-direction: column; justify-content: center; color: #fff">
        <div>佣金明细</div>
        <div>
          <span style="font-size: 1rem">{{ detail.balance }}</span> ¥
        </div>
      </div>

      <div style="width: 1.5rem"><img src="../../assets/img/b3.png" style="width: 100%" /></div>
    </div>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div
        style="background: #fff; border-top: 1px solid #f0f4f7; padding: 0.2rem 0.5rem; color: #999"
        v-for="(item, index) in list"
        :key="index"
      >
        <div>{{ item.created_at }}</div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #eee;
            padding: 0.2rem 0.4rem;
          "
        >
          <div>
            <div>{{ item.goods_title }}</div>
            <div>{{ item.nickname }}</div>
          </div>
          <div style="color: #666">
            <div>+{{ item.price }}元</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { agentUser, agentCommission } from "@/Api/activity/index";
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
      const res = await agentCommission({
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
.people {
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
