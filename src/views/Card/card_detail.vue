<template>
  <div class="card_detail">
    <div class="detail_top">
      <img
        :src="obj.status==3?require('@/assets/img/66.png'):require('@/assets/img/64.png')"
        alt
        class="card_img"
      />
      <div class="card_message">
        <img src="@/assets/img/51.png" alt class />
        <span class="card_name">民济时代</span>
      </div>
      <span class="card_title">{{obj.good.goods_title}}</span>
      <span class="card_num">{{obj.order_no}}</span>
      <!-- <span class="card_info">
        会员信息
        <i>查看</i>
      </span>-->
      <!-- <span class="pay_type">微信付款</span> -->
    </div>
    <div class="detail_bttom">
      <span class="tip">会员说明</span>
      <div class="card_content">
        <div class="content_left">
          <span>剩余次数</span>
          <span class="good_num">{{obj.num==0?`已使用完`:`剩余${obj.num}次`}}</span>
        </div>
        <div class="content_right">
          <span>有效期(一年)</span>
          <span class="time">{{obj.status==3?`已过期`:`${obj.expir_time}到期`}}</span>
        </div>
      </div>
      <span class="tip">会员卡详情</span>
      <div class="detail_content">
        <div class="card_time">
          <span class="titme_title">有效期</span>
          <div>
            <p>{{obj.expir_time}}</p>
          </div>
        </div>

        <div class="notice">
          <span class="notice_title">使用须知</span>
          <div>
            <!-- <p>每人限领1张</p>
            <p>1.会员卡仅限申请者本人使用,会员卡会籍不可转让或出售</p>
            <p>2.收银台下单前向店员出示小程序会员码或使用小程序点单,可享受会员权益和积分;</p>
            <p class="active_p">3.积分有效期为次年12月31日</p>
            <p>会员卡的资料更改及挂失:</p>
            <p>1.如您的个人资料需要更改,请联系客服进行更改</p>
            <p>2.如您的会员卡存在异常使用等情况需要挂失的,请持本人会员卡联系服务台办理挂失,异常使用造成的积分丢失等责任由会员自行承担</p>
            <p>3.挂失或更新卡后,原卡同时作废</p>-->
            <p>详见商品详情使用说明</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { card_detail } from "@/Api/card/card_detail";

export default {
  props: {},
  components: {},
  data() {
    return {
      id: "",
      type: "",

      obj: {}
    };
  },
  created() {
    console.log(this.$router);
    this.id = this.$router.history.current.query.id;
    this.type = this.$router.history.current.query.type;
    this.card_detail(this.$router.history.current.query.id);
  },
  methods: {
    // 卡片详情
    async card_detail(id) {
      const { data: res } = await card_detail(id);
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.obj = res.data;
      console.log(res);
    }
  }
};
</script>

<style lang = "less" scoped>
.card_detail {
  width: 100%;
  height: 100%;
  background: #eff4f5;
  position: relative;
  z-index: 99;
}

.detail_top {
  height: 31vh;
  background: #fff;
  position: relative;
}

.card_img {
  width: 9.6rem;
  height: 30vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.card_message {
  display: flex;
  align-items: center;
  position: absolute;
  font-size: 0.3467rem;
  color: #ffffff;
  left: 0.9333rem;
  top: 2vh;
}

.card_message img {
  width: 0.9333rem;
  margin-right: 0.1333rem;
}

.card_title {
  font-size: 0.5333rem;
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  letter-spacing: 0.1333rem;
  font-weight: 600;
  top: 12vh;
  white-space: nowrap;
}

.card_num {
  font-size: 12px;
  color: #fff;
  font-weight: 600;
  position: absolute;
  left: 0.9333rem;
  top: 25vh;
}

.card_info {
  font-size: 0.3733rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 31vh;
}

.card_info i {
  color: #85d6da;
  margin-left: 0.1333rem;
}

.pay_type {
  padding: 0.24rem 0.9333rem;
  border-radius: 0.1333rem;
  background: #f2f9f9;
  color: #009ea7;
  font-weight: 600;
  position: absolute;
  left: 50%;
  font-size: 0.3733rem;
  transform: translate(-50%);
  top: 37vh;
}

.detail_bttom {
  background: #fff;
  margin-top: 0.2667rem;
}

.tip {
  font-size: 0.4267rem;
  font-weight: 600;
  display: inline-block;
  color: #3f3f3f;
  padding: 0.2667rem 0 0.2667rem 0.5333rem;
}
.card_content {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.content_left,
.content_right {
  width: 4rem;
  height: 2.6667rem;
  background: #f2f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.2667rem;
  color: #76c6d7;
}

.good_num,
.time {
  font-size: 0.3733rem !important;
  color: #009ea7;
  font-weight: 600;
}

.detail_content {
  font-size: 0.3467rem;
  padding: 0 0.5333rem;
}

.card_time,
.notice {
  padding: 0.2667rem 0;
  display: flex;
}

.card_time div,
.notice div {
  flex: 1;
}

.card_time p,
.notice p {
  text-align: left;
}

.notice p {
  margin-bottom: 5px;
}

.active_p {
  margin-bottom: 20px !important;
}

.titme_title,
.notice_title {
  display: block;
  width: 1.7333rem;
  color: #8c8c8c;
}
</style>