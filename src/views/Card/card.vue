<template>
  <div class="card_box">
    <div class="tab_box">
      <van-tabs
        v-model="active"
        title-active-color="#7cc3c4"
        color="#13c2c5"
        @click="change_tab(active)"
      >
        <van-tab title="使用中">
          <div class="in_use">
            <Nothing v-if="card_arry.length==0"></Nothing>
            <div v-if="card_arry.length!=0">
              <div
                class="card_item"
                @click="go_detail(item.id,1)"
                v-for="item in card_arry"
                :key="item.id"
              >
                <img src="@/assets/img/53.png" alt class="item_bg" />
                <img src="@/assets/img/51.png" alt class="card_img" />
                <div class="card_message">
                  <span class="card_name">民济时代</span>
                  <span class="card_type">{{item.good.goods_title}}</span>
                </div>
                <span class="card_state">有效期至:{{item.expir_time}}</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已使用">
          <div class="used">
            <Nothing v-if="card_arry.length==0"></Nothing>
            <div v-if="card_arry.length!=0">
              <div
                class="card_item"
                @click="go_detail(item.id,2)"
                v-for="item in card_arry"
                :key="item.id"
              >
                <img src="@/assets/img/52.png" alt class="item_bg" />
                <img src="@/assets/img/51.png" alt class="card_img" />
                <div class="card_message">
                  <span class="card_name">民济时代</span>
                  <span class="card_type">{{item.good.goods_title}}</span>
                </div>
                <span class="card_state card_other">已使用</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已失效">
          <div class="invalid">
            <Nothing v-if="card_arry.length==0"></Nothing>
            <div v-if="card_arry.length!=0">
              <div
                class="card_item"
                @click="go_detail(item.id,3)"
                v-for="item in card_arry"
                :key="item.id"
              >
                <img src="@/assets/img/54.png" alt class="item_bg" />
                <img src="@/assets/img/51.png" alt class="card_img" />
                <div class="card_message">
                  <span class="card_name">民济时代</span>
                  <span class="card_type">{{item.good.goods_title}}</span>
                </div>
                <span class="card_state card_other">已失效</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { card_list } from "@/Api/card/card_list";
import Nothing from "@/components/Nothing/noting";
export default {
  props: {},
  components: {
    Nothing
  },
  data() {
    return {
      active: 0,
      //1-使用中 2-已使用 3-已过期
      status: 1,

      card_arry: []
    };
  },
  created() {
    this.card_list(this.status);
  },
  methods: {
    // 卡包列表
    async card_list(status) {
      const { data: res } = await card_list(status);
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.card_arry = res.data;
      console.log(res);
    },

    // 点击切换
    change_tab(val) {
      console.log(val);
      this.card_arry = [];
      if (val == 0) {
        this.status == 1;
        this.card_list(1);
      } else if (val == 1) {
        this.status == 2;
        this.card_list(2);
      } else {
        this.status == 3;
        this.card_list(3);
      }

      console.log(val);
    },
    go_detail(val, type) {
      this.$router.push("/card_detail?id=" + val + "&type=" + type);
    }
  }
};
</script>

<style lang = "less" scoped>
.card_box {
  width: 100%;
  height: 100%;
  background: #eff4f5;
  position: relative;
  z-index: 99;
}

.in_use,
.used,
.invalid {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.card_item {
  width: 9.3333rem;
  height: 2.6667rem;
  margin-top: 0.2667rem;
  position: relative;
}

.item_bg {
  position: absolute;
  width: 100%;
  height: 100%;
}

.card_img {
  width: 1.3333rem;
  position: absolute;
  left: 0.4rem;
  top: 50%;
  transform: translateY(-50%);
}

.card_message {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  left: 2.2667rem;
}

.card_name {
  font-size: 0.4267rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.0533rem;
}

.card_type {
  font-size: 0.32rem;
  color: #e6e7e7;
  letter-spacing: 0.0533rem;
}

.card_state {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
  right: 0.2667rem;
}

.card_other {
  right: 50px !important;
}

/deep/.van-empty {
  padding: 3.2rem 0;
}
</style>