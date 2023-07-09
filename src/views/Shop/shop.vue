<template>
  <div class="shop">
    <!-- 商城轮播图 -->
    <div class="swiper_box">
      <div class="swiper_content">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#018859">
          <van-swipe-item>
            <img src="@/assets/img/55.png" alt class="item_img" />
          </van-swipe-item>
          <van-swipe-item>
            <img src="@/assets/img/55.png" alt class="item_img" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <!-- 商品内容 -->
    <div class="shop_content">
      <div class="content">
        <!-- 价格选择 -->
        <div class="price_list">
          <LyTab @change_list="change_list" :yTabList="yTabList" :activeColor="'#1c9b6f'"></LyTab>
        </div>
        <!-- 内容 实物类-->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="good_content" v-if="type == 1">
            <div class="good_item" v-for="item in good_list" :key="item.id" @click="go_detail(item.id)">
              <img :src="'https://www.minjisd.com/storage/' + item.thumb" alt class="good_img" />
              <span class="good_title">{{ item.goods_title }}</span>
              <div class="good_price">
                <span class="price">￥{{ item.price }}</span>
                <span class="num">已售{{ item.sales }}</span>
              </div>
            </div>
          </div>
        </van-list>

        <Nothing v-if="good_list.length == 0"></Nothing>

        <!-- 卡片类 -->
        <div class="card_content" v-if="type == 2">
          <div class="popular_item">
            <div class="popular_left">
              <div class="popularleft_one">
                <!-- <img src="@/assets/img/26.png" alt /> -->
                <span class="shop_name">推拿会员套餐慧明版</span>
              </div>
              <div class="popularleft_tow">
                <p>专业推拿,专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿</p>
              </div>

              <div class="popularleft_three">
                <div class="three_left">
                  <span class="now_price">
                    ￥
                    <i>5000</i>
                  </span>
                  <span class="old_price">
                    <i>￥890</i>
                  </span>
                </div>
                <div class="three_right">
                  <span>已售5042份</span>
                </div>
              </div>
            </div>
            <div class="popular_right">
              <img src="@/assets/img/25.png" alt />
            </div>
          </div>
          <div class="popular_item">
            <div class="popular_left">
              <div class="popularleft_one">
                <!-- <img src="@/assets/img/26.png" alt /> -->
                <span class="shop_name">推拿会员套餐慧明版</span>
              </div>
              <div class="popularleft_tow">
                <p>专业推拿,专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿</p>
              </div>

              <div class="popularleft_three">
                <div class="three_left">
                  <span class="now_price">
                    ￥
                    <i>5000</i>
                  </span>
                  <span class="old_price">
                    <i>￥890</i>
                  </span>
                </div>
                <div class="three_right">
                  <span>已售5042份</span>
                </div>
              </div>
            </div>
            <div class="popular_right">
              <img src="@/assets/img/25.png" alt />
            </div>
          </div>
          <div class="popular_item">
            <div class="popular_left">
              <div class="popularleft_one">
                <!-- <img src="@/assets/img/26.png" alt /> -->
                <span class="shop_name">推拿会员套餐慧明版</span>
              </div>
              <div class="popularleft_tow">
                <p>专业推拿,专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿专业推拿</p>
              </div>

              <div class="popularleft_three">
                <div class="three_left">
                  <span class="now_price">
                    ￥
                    <i>5000</i>
                  </span>
                  <span class="old_price">
                    <i>￥890</i>
                  </span>
                </div>
                <div class="three_right">
                  <span>已售5042份</span>
                </div>
              </div>
            </div>
            <div class="popular_right">
              <img src="@/assets/img/25.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LyTab from "@/components/ly_tab/ly_tab";

import { shop_cate } from "@/Api/shop/shop_cate";

import { shop_list } from "@/Api/shop/shop_list";

import Nothing from "@/components/Nothing/noting";

export default {
  props: {},
  components: {
    LyTab,
    Nothing
  },
  data() {
    return {
      // yTab数据
      yTabList: [],

      type: 1,

      good_list: [],

      id: "",

      page: 1,

      pages: 0,

      loading: true,

      finished: false,

      isrequest: false
    };
  },
  created() {
    this.shop_cate();
  },
  methods: {
    // 商品分类
    async shop_cate() {
      const { data: res } = await shop_cate();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      res.data.list.forEach((element, index) => {
        element.name = index;
        this.yTabList.push(element);
      });

      this.shop_list(res.data.list[0].id, 1);
    },

    // 产品
    async shop_list(id) {
      this.isrequest = true;
      const { data: res } = await shop_list(id);
      this.isrequest = false;
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      console.log(res);
      this.loading = false;
      this.pages = res.data.pages;
      this.good_list = [...this.good_list, ...res.data.list];
    },

    // 切换
    change_list(val) {
      console.log(val);
      this.id = val;
      this.good_list = [];
      this.page = 1;
      this.shop_list(val, this.page);
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
      this.shop_list(this.id, this.page);
    },

    go_detail(val) {
      this.$router.push('/good_detail?id=' + val)
    }
  }
};
</script>

<style lang = "less" scoped>
.shop {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("@/assets/img/56.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 99;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.swiper_box {
  width: 100%;
  height: 33vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shop_content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper_content {
  width: 9.3333rem;
  height: auto;
}

.my-swipe {
  width: 100%;
  height: 100%;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 0.5333rem;
  height: 100%;
}

.item_img {
  width: 100%;
}

.content {
  width: 9.3333rem;
  height: 100%;
  background: #fff;
  border-top-right-radius: 0.2667rem;
  border-top-left-radius: 0.2667rem;
}

.good_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.1333rem;
}

.good_item {
  width: 4.2667rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #d5d6d5;
  border-radius: 0.1333rem;
  margin-bottom: 0.2667rem;
}

.good_img {
  width: 3.6rem;
  height: 2.6667rem;
  border-radius: 0.1333rem;
  margin-top: 0.2667rem;
}

.good_title {
  font-size: 0.4rem;
  font-weight: 600;
  margin-top: 0.2667rem;
  padding: 0 0.1333rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.good_price {
  width: 4rem;
  height: 0.6667rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.2667rem;
  padding: 0 0.1333rem;
}

.price {
  font-size: 0.4267rem;
  color: #eb4449;
}

.num {
  font-size: 0.32rem;
  color: #b5b5b5;
}

/* 卡片类 */

.card_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.1333rem;
}

.popular_item {
  width: 8.8rem;
  padding: 0.6667rem 0.1333rem;
  display: flex;
  background-image: url("@/assets/img/24.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 0.2667rem;
  border: 0.0267rem solid #f3f3f3;
}

.popular_left {
  flex: 1;
}

.popular_right img {
  width: 2.9333rem;
  margin-top: 0.5333rem;
}

.popularleft_one {
  display: flex;
  align-items: center;
}

.popularleft_one img {
  width: 1.2rem;
  margin-right: 0.2667rem;
}

.shop_name {
  flex: 1;
  font-size: 0.4533rem;
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.popularleft_tow {
  /* height: 1.0133rem; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-top: 0.2667rem;
  font-size: 0.3467rem;
  letter-spacing: 0.0267rem;
}

.popularleft_three {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.3733rem;
  margin-top: 0.2667rem;
}

.now_price {
  color: #4ab33e;
  font-weight: 600;
  margin-right: 0.1333rem;
}

.old_price {
  color: #a9a9a9;
  text-decoration: line-through;
  font-size: 0.32rem;
}

.now_price i {
  font-size: 0.56rem;
}

.three_right span {
  font-size: 0.32rem;
  color: #a9a9a9;
}
</style>