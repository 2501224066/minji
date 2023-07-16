<template>
  <div class="main_page">
    <div class="main_content">
      <!-- 立即进入-->
      <img src="@/assets/img/39.png" alt class="go_card" @click="go_card" />

      <!-- 名称 -->
      <div class="user_box">
        <img :src="info.head_img_url" alt class="user_img" />
        <span class="user_nmae">{{ info.nnickname }}</span>
      </div>

      <!-- 订单状态 -->
      <div class="order_box">
        <span class="order_tip">商城订单</span>
        <van-grid clickable :column-num="5" :border="false">
          <van-grid-item :icon="require('@/assets/img/40.png')" text="全部订单" to="/order?active=0&status=0" />
          <van-grid-item :icon="require('@/assets/img/41.png')" text="已支付" to="/order?active=1&status=2" />
          <van-grid-item :icon="require('@/assets/img/42.png')" text="待收货" to="/order?active=2&status=3" />
          <van-grid-item :icon="require('@/assets/img/44.png')" text="已完成" to="/order?active=3&status=4" />
          <van-grid-item :icon="require('@/assets/img/43.png')" text="已取消" to="/order?active=4&status=-1" />
        </van-grid>
      </div>

      <!-- 功能列表 -->
      <div class="feature_list">
        <van-cell :icon="require('@/assets/img/45.png')" title="地址管理" is-link value to="/address" />
        <van-cell :icon="require('@/assets/img/46.png')" title="会员信息" is-link value to="/user" />
        <van-cell :icon="require('@/assets/img/48.png')" title="医生订单" is-link value to="/doctor_order" />
        <van-cell :icon="require('@/assets/img/47.png')" title="添加卡包" is-link value to="/add_card" />
        <van-cell :icon="require('@/assets/img/81.png')" title="报告查询" is-link value to="/expert_list" />
        <van-cell :icon="require('@/assets/img/82.png')" title="服务协议" is-link value to="/agreement?id=1" />
        <van-cell :icon="require('@/assets/img/83.png')" title="隐私政策" is-link value to="/agreement?id=2" />
        <van-cell :icon="require('@/assets/img/84.png')" title="我要代理" is-link value to="/promotion" />
        <van-cell :icon="require('@/assets/img/85.png')" title="分配卡片" is-link value to="/promotion_zy" />
        <van-cell :icon="require('@/assets/img/49.png')" title="联系我们" is-link value to="/contact" />
        <!-- <van-cell :icon="require('@/assets/img/50.png')" title="关于我们" is-link value /> -->
      </div>

      <!-- 备案号 -->
      <span class="Record_num">粤ICP备2022149698号</span>
    </div>
  </div>
</template>

<script>
import { get_info } from "@/Api/main/user_info";

export default {
  props: {},
  components: {},
  data() {
    return {
      info: {},
    };
  },
  created() {
    this.get_info();
    if (this.$router.history.current.fullPath == "/main") {
      this.$store.commit("changeActive", 3);
    }
  },
  methods: {
    go_card() {
      this.$router.push("/card");
    },
    async get_info() {
      const { data: res } = await get_info();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.info = res.data;
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.main_page {
  width: 100%;
  height: 130%;
  /* padding-bottom: 4.8rem; */
  background: #eff4f5;
}

.main_content {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/38.png");
  background-size: 100%;
  background-repeat: no-repeat;
  /* padding-bottom: 3.2rem; */
  position: relative;
  /* overflow: hidden; */
}

.go_card {
  width: 1.6rem;
  position: absolute;
  right: 0.8rem;
  top: 3.7333rem;
}

.user_box {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50px;
  top: 35px;
}

.user_img {
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user_nmae {
  font-size: 16px;
  color: #f2e9df;
  font-weight: 600;
  letter-spacing: 2px;
}

/* 我的订单 */
.order_box {
  width: 95%;
  border-radius: 0.32rem;
  position: relative;
  top: 5.3333rem;
  background: #fff;
  left: 50%;
  transform: translate(-50%);
}

.order_tip {
  font-weight: 600;
  padding: 0.1333rem 0.4533rem;
  display: inline-block;
}

.feature_list {
  width: 95%;
  padding: 10px 0;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  top: 5.7333rem;
  border-radius: 0.32rem;
  background: #fff;
}

/* 备案号 */
.Record_num {
  display: block;
  width: 100%;
  font-size: 0.3467rem;
  text-align: center;
  margin-top: 0.2667rem;
  color: #c0c1c1;
  position: relative;
  top: 6.1333rem;
}
/deep/.van-grid-item__text {
  font-size: 0.32rem;
}

/deep/.van-grid-item__icon {
  font-size: 0.7467rem;
}

/deep/.van-grid-item__content {
  padding: 0.4267rem 0.2133rem;
}

/deep/.van-cell__left-icon {
  height: 0.64rem;
  font-size: 0.64rem;
  line-height: 0.64rem;
}

/deep/.van-cell__left-icon {
  margin-right: 0.2667rem;
}

/deep/.van-cell__right-icon {
  color: #6ecec4;
}

/deep/.van-cell {
  font-size: 0.3467rem;
  font-weight: 600;
  padding: 0.4rem 0.4267rem;
}
</style>
