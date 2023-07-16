<template>
  <div class="zy">
    <div class="card" style="padding: 0.2rem 0; margin-top: 0.2rem">
      <van-form>
        <van-cell-group inset>
          <van-field v-model="tel" type="text" label="赠予人手机号" placeholder="请输入手机号" />
          <van-field
            :value="index !== null ? card[index].goods_title : ''"
            is-link
            readonly
            name="picker"
            label="卡片名称"
            placeholder="点击选择"
            @click="showPicker = true"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="
                card.reduce((init, val) => {
                  init.push(val.goods_title);
                  return init;
                }, [])
              "
              @confirm="confirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field v-model="num" type="number" label="赠予数量" placeholder="请输入数量" />
        </van-cell-group>
      </van-form>

      <div style="text-align: center">
        <span
          style="
            margin-top: 1rem;
            padding: 0.3rem 1rem;
            background: #1daefd;
            border-radius: 1rem;
            display: inline-block;
            color: #fff;
          "
          @click="zy()"
        >
          立即赠予
        </span>
      </div>
    </div>

    <div style="color: #666; margin: 0.2rem 5vw">赠予记录</div>
    <div class="card">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          style="background: #fff; border-bottom: 1px solid #f0f4f7; padding: 0.2rem"
          v-for="(item, index) in list"
          :key="index"
        >
          <div style="color: #999">{{ item.created_at }}</div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0.2rem;
              background: #eee;
              color: #333;
            "
          >
            <div>{{ item.goods_title }}</div>
            <div>{{ item.num }} 张</div>
            <div>
              <div>{{ item.nickname }}</div>
              <div>{{ item.mobile }}</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { cardGifts, cardGiftsLog, cardList } from "@/Api/activity/index";
export default {
  data() {
    return {
      showPicker: false,
      tel: null,
      num: null,
      index: null,
      page: 1,
      card: [],
      list: [],
      finished: false,
      loading: true,
      total: 0,
    };
  },
  created() {
    this.getCard();
    this.getList();
  },
  methods: {
    confirm(val, index) {
      this.index = index;
      this.showPicker = false;
    },

    async getCard() {
      let res = await cardList();
      this.card = res.data.data;
    },

    async zy() {
      if (/^\d{11}$/.test(this.tel) === false) {
        this.$toast("手机号不符合规范");
        return;
      }
      if (this.index === null) {
        this.$toast("请选择卡片");
        return;
      }
      if (!this.num) {
        this.$toast("请输入数量");
        return;
      }
      const res = await cardGifts({ goods_id: this.card[this.index].id, tel: this.tel, num: this.num });
      if (res.data.code === 200) {
        this.$toast("操作成功");
        this.getData();
        this.getList();
      }
    },

    async getList() {
      const res = await cardGiftsLog({
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
.zy {
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
