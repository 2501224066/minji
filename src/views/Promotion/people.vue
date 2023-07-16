<template>
  <div class="people">
    <div
      style="background: #51aff6; display: flex; justify-content: space-between; align-items: center; padding: 0.5rem"
    >
      <div style="display: flex; flex-direction: column; justify-content: center; color: #fff">
        <div>推广人数</div>
        <div>
          <span style="font-size: 1rem">{{ detail.spread_people }}</span> 人
        </div>
      </div>

      <div style="width: 1.5rem"><img src="../../assets/img/b2.png" style="width: 100%" /></div>
    </div>

    <van-tabs v-model="level" @click="getList(true)">
      <van-tab title="一级" name="1"></van-tab>
      <van-tab title="二级" name="2"></van-tab>
    </van-tabs>

    <div
      style="
        border-top: 0.05rem solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0.2rem;
      "
    >
      <div
        style="
          width: 45%;
          display: flex;
          align-items: center;
          background: #f5f5f5;
          border-radius: 1rem;
          overflow: hidden;
        "
      >
        <input
          v-model="keyword"
          style="width: 60%; border: none; padding: 0.2rem; background: #f5f5f5; text-align: center"
          placeholder="会员名称"
        />
        <div
          style="flex: 1; text-align: center; padding: 0.2rem; background: #51aff6; color: #fff"
          @click="getList(true)"
        >
          搜索
        </div>
      </div>
      <div @click="(spreadCount = spreadCount === 0 ? 1 : 0), getList(true)">
        团队排序
        <van-icon v-if="spreadCount === 0" name="arrow-up" />
        <van-icon v-else name="arrow-down" />
      </div>
      <div @click="(balanceOrder = balanceOrder === 0 ? 1 : 0), getList(true)">
        金额排序
        <van-icon v-if="balanceOrder === 0" name="arrow-up" />
        <van-icon v-else name="arrow-down" />
      </div>
    </div>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div style="background: #fff">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.2rem 0.8rem;
            border-top: 1px solid #f0f4f7;
          "
          v-for="(item, index) in list"
          :key="index"
        >
          <div style="display: flex; justify-content: space-between; align-items: center">
            <div style="width: 1.4rem; height: 1.4rem; border-radius: 5rem; overflow: hidden">
              <img :src="item.head_img_url" style="width: 100%" />
            </div>
            <div style="margin-left: 0.2rem; font-size: 0.4rem">{{ item.nickname }}</div>
          </div>
          <div>{{ item.spreadCount }} 人</div>
          <div>{{ item.balance }} 元</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { agentUser, agentSpread } from "@/Api/activity/index";
export default {
  props: {},
  components: {},
  data() {
    return {
      page: 1,
      detail: {},
      list: [],
      level: "1",
      keyword: null,
      balanceOrder: 0,
      spreadCount: 0,
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

    async getList(reset) {
      if (reset) this.list = [];
      const res = await agentSpread({
        params: {
          page: this.page,
          level: this.level,
          keyword: this.keyword,
          order: encodeURIComponent(`{balanceOrder: ${this.balanceOrder},spreadCount:${this.spreadCount}}`),
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
