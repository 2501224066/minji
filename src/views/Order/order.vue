<template>
  <div class="order">
    <div class="order_tab">
      <van-tabs
        v-model="index"
        color="#15c2c5"
        title-active-color="#15c2c5"
        @click="onClick"
      >
        <van-tab title="全部订单">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            v-if="order_arry.length != 0"
          >
            <div class="order_box">
              <div
                class="item"
                v-for="order_item in order_arry"
                :key="order_item.id"
              >
                <div class="item_one">
                  <span class="order_nub"
                    >订单编号:{{ order_item.order_no }}</span
                  >
                  <span class="order_type">{{ order_item.status_name }}</span>
                </div>
                <div class="item_two">
                  <img
                    :src="
                      'https://www.minjisd.com/storage/' +
                      order_item.orderitem.goods_img
                    "
                    alt
                  />
                  <div class="order_name">
                    <div class="name">
                      <span class="good_name">{{
                        order_item.orderitem.goods_title
                      }}</span>
                      <span class="good_price"
                        >￥{{ order_item.orderitem.price }}</span
                      >
                    </div>
                    <span class="good_num"
                      >×{{ order_item.orderitem.num }}</span
                    >
                  </div>
                </div>
                <div class="item_three">
                  <span class="order_time"
                    >下单时间:{{ order_item.created_at }}</span
                  >
                  <span class="good_totle">
                    <i class="totle">共{{ order_item.orderitem.num }}件商品</i>
                    <i class="pay">
                      实付:
                      <i class="score">￥{{ order_item.pay_price }}</i>
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </van-list>
          <Nothing v-if="order_arry.length == 0"></Nothing>
        </van-tab>

        <van-tab title="已支付">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            v-if="order_arry.length != 0"
          >
            <div class="order_box">
              <div
                class="item"
                v-for="order_item in order_arry"
                :key="order_item.id"
              >
                <div class="item_one">
                  <span class="order_nub"
                    >订单编号:{{ order_item.order_no }}</span
                  >
                  <span class="order_type">{{ order_item.status_name }}</span>
                </div>
                <div class="item_two">
                  <img
                    :src="
                      'https://www.minjisd.com/storage/' +
                      order_item.orderitem.goods_img
                    "
                    alt
                  />
                  <div class="order_name">
                    <div class="name">
                      <span class="good_name">{{
                        order_item.orderitem.goods_title
                      }}</span>
                      <span class="good_price"
                        >￥{{ order_item.orderitem.price }}</span
                      >
                    </div>
                    <span class="good_num"
                      >×{{ order_item.orderitem.num }}</span
                    >
                  </div>
                </div>
                <div class="item_three">
                  <span class="order_time"
                    >下单时间:{{ order_item.created_at }}</span
                  >
                  <span class="good_totle">
                    <i class="totle">共{{ order_item.orderitem.num }}件商品</i>
                    <i class="pay">
                      实付:
                      <i class="score">￥{{ order_item.pay_price }}</i>
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </van-list>
          <Nothing v-if="order_arry.length == 0"></Nothing>
        </van-tab>

        <van-tab title="待收货">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            v-if="order_arry.length != 0"
          >
            <div class="order_box">
              <div
                class="item"
                v-for="order_item in order_arry"
                :key="order_item.id"
              >
                <div class="item_one">
                  <span class="order_nub"
                    >订单编号:{{ order_item.order_no }}</span
                  >
                  <span class="order_type">{{ order_item.status_name }}</span>
                </div>
                <div class="item_two">
                  <img
                    :src="
                      'https://www.minjisd.com/storage/' +
                      order_item.orderitem.goods_img
                    "
                    alt
                  />
                  <div class="order_name">
                    <div class="name">
                      <span class="good_name">{{
                        order_item.orderitem.goods_title
                      }}</span>
                      <span class="good_price"
                        >￥{{ order_item.orderitem.price }}</span
                      >
                    </div>
                    <span class="good_num"
                      >×{{ order_item.orderitem.num }}</span
                    >
                  </div>
                </div>
                <div class="item_three">
                  <span class="order_time"
                    >下单时间:{{ order_item.created_at }}</span
                  >
                  <span class="good_totle">
                    <i class="totle">共{{ order_item.orderitem.num }}件商品</i>
                    <i class="pay">
                      实付:
                      <i class="score">￥{{ order_item.pay_price }}</i>
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </van-list>
          <Nothing v-if="order_arry.length == 0"></Nothing>
        </van-tab>

        <van-tab title="已完成">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            v-if="order_arry.length != 0"
          >
            <div class="order_box">
              <div
                class="item"
                v-for="order_item in order_arry"
                :key="order_item.id"
              >
                <div class="item_one">
                  <span class="order_nub"
                    >订单编号:{{ order_item.order_no }}</span
                  >
                  <span class="order_type">{{ order_item.status_name }}</span>
                </div>
                <div class="item_two">
                  <img
                    :src="
                      'https://www.minjisd.com/storage/' +
                      order_item.orderitem.goods_img
                    "
                    alt
                  />
                  <div class="order_name">
                    <div class="name">
                      <span class="good_name">{{
                        order_item.orderitem.goods_title
                      }}</span>
                      <span class="good_price"
                        >￥{{ order_item.orderitem.price }}</span
                      >
                    </div>
                    <span class="good_num"
                      >×{{ order_item.orderitem.num }}</span
                    >
                  </div>
                </div>
                <div class="item_three">
                  <span class="order_time"
                    >下单时间:{{ order_item.created_at }}</span
                  >
                  <span class="good_totle">
                    <i class="totle">共{{ order_item.orderitem.num }}件商品</i>
                    <i class="pay">
                      实付:
                      <i class="score">￥{{ order_item.pay_price }}</i>
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </van-list>
          <Nothing v-if="order_arry.length == 0"></Nothing>
        </van-tab>

        <van-tab title="已取消">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            v-if="order_arry.length != 0"
          >
            <div class="order_box">
              <div
                class="item"
                v-for="order_item in order_arry"
                :key="order_item.id"
              >
                <div class="item_one">
                  <span class="order_nub"
                    >订单编号:{{ order_item.order_no }}</span
                  >
                  <span class="order_type">{{ order_item.status_name }}</span>
                </div>
                <div class="item_two">
                  <img
                    :src="
                      'https://www.minjisd.com/storage/' +
                      order_item.orderitem.goods_img
                    "
                    alt
                  />
                  <div class="order_name">
                    <div class="name">
                      <span class="good_name">{{
                        order_item.orderitem.goods_title
                      }}</span>
                      <span class="good_price"
                        >￥{{ order_item.orderitem.price }}</span
                      >
                    </div>
                    <span class="good_num"
                      >×{{ order_item.orderitem.num }}</span
                    >
                  </div>
                </div>
                <div class="item_three">
                  <span class="order_time"
                    >下单时间:{{ order_item.created_at }}</span
                  >
                  <span class="good_totle">
                    <i class="totle">共{{ order_item.orderitem.num }}件商品</i>
                    <i class="pay">
                      实付:
                      <i class="score">￥{{ order_item.pay_price }}</i>
                    </i>
                  </span>
                </div>
              </div>
            </div>
          </van-list>
          <Nothing v-if="order_arry.length == 0"></Nothing>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { order_list } from "@/Api/order/order_list";
import Nothing from "@/components/Nothing/noting";
export default {
  props: {},
  components: {
    Nothing,
  },
  data() {
    return {
      index: 0,

      order_arry: [],

      isrequest: false,

      page: 1,

      pages: 0,

      loading: true,

      finished: false,

      status: "",
    };
  },
  created(val) {
    if (this.$route.query.active == 0) {
      this.index = 0;
      this.status = 0;
    } else if (this.$route.query.active == 1) {
      this.index = 1;
      this.status = 2;
    } else if (this.$route.query.active == 2) {
      this.index = 2;
      this.status = 3;
    } else if (this.$route.query.active == 3) {
      this.index = 3;
      this.status = 4;
    } else if (this.$route.query.active == 4) {
      this.index = 4;
      this.status = -1;
    }

    this.order_list(this.$route.query.status, this.page);
  },
  mounted(val) {},
  methods: {
    // 获取列表
    async order_list(status, page) {
      this.isrequest = true;
      const { data: res } = await order_list(status, page);
      this.isrequest = false;
      this.loading = false;
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      console.log(res);
      this.order_arry = [...this.order_arry, ...res.data.list];
      // this.pages = res.data.pages
    },

    // 下拉
    onLoad() {
      if (this.isrequest) {
        return;
      }
      if (this.page >= this.pages) {
        this.finished = true;
        return;
      }
      this.page = this.page + 1;
      this.order_list(this.status, this.page);
    },

    // 点击
    onClick(val) {
      console.log(val);
      this.page = 1;
      this.pages = 0;
      this.finished = false;
      this.loading = true;
      this.order_arry = [];
      if (val == 0) {
        this.status = 0;
      } else if (val == 1) {
        this.status = 2;
      } else if (val == 2) {
        this.status = 3;
      } else if (val == 3) {
        this.status = 4;
      } else if (val == 4) {
        this.status = -1;
      }
      this.order_list(this.status, this.page);
    },
  },
};
</script>

<style lang = "less" scoped>
.order {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #eff4f5;
  position: relative;
  z-index: 99;
}

.item {
  background: #fff;
  padding: 0 0.5333rem;
  margin-top: 0.5333rem;
}

.item_one {
  font-size: 0.3467rem;
  display: flex;
  justify-content: space-between;
  padding: 0.2667rem 0;
}

.order_type {
  color: #42ced0;
}

.item_two {
  display: flex;
}

.order_name {
  flex: 1;
}

.name {
  font-size: 0.4533rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.2667rem;
}

.good_name {
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.good_price {
  color: #7c7b7b;
}

.item_two img {
  width: 2.4rem;
  border-radius: 0.2667rem;
  margin-right: 0.2667rem;
}

.good_num {
  display: block;
  text-align: right;
  color: #989797;
  font-size: 0.2933rem;
  margin-top: 0.1333rem;
}

.item_three {
  display: flex;
  font-size: 0.2667rem;
  color: #666666;
  height: 1.0667rem;
  justify-content: space-between;
  align-items: center;
}

.order_time {
  height: 100%;
  line-height: 1.2533rem;
  white-space: nowrap;
}

.good_totle {
  height: 100%;
  line-height: 1.0667rem;
  white-space: nowrap;
}

.totle {
  margin-right: 0.1333rem;
}

.score {
  font-size: 0.48rem;
  font-weight: 600;
}

/deep/.van-empty__image {
  width: 3.4667rem;
  height: 3.4667rem;
}

/deep/.van-empty {
  padding: 2rem 0;
}
</style>