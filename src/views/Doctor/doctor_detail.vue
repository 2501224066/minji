<template>
  <div class="doctor_details">
    <div class="Specific_information">
      <div class="information_one">
        <div class="doctor_img">
          <img :src="'https://www.minjisd.com/storage/' + obj.img" alt />
        </div>

        <div class="doctor_content">
          <div class="content_box1">
            <div class="content_1">
              <span class="name">{{ obj.username }}</span>
            </div>
            <div class="content_2">
              <span v-for="(t, index) in obj.hospital.tag" :key="index" v-if="index<=0">{{ t }}</span>
              <span class="hospital_span">{{obj.hospital.name }}</span>
            </div>
          </div>

          <div class="content_box2">
            <span class="doctor_school" v-if='obj.pro_title!=null'>{{ obj.pro_title }}</span>
            <span class="doctor_title" v-if='obj.docter_level.name!=null'>{{ obj.docter_level.name }}</span>
            <span class="doctor_school" v-if=' obj.title!=null'>{{ obj.title }}</span>
          </div>
        </div>
      </div>
      <p class="content_four">
        <span v-for="(b,index) in obj.bright" :key="index">{{b}}</span>
      </p>
      <!-- 擅长 -->
      <div class="good_message">
        <span>擅长:&nbsp;&nbsp;{{ obj.be_good }}</span>
      </div>

      <!-- 评价 -->
      <!-- <div class="doctor_appraise">
        <span>医师星评</span>
        <div class="star_box">
          <img src="@/assets/img/21.png" alt v-for="star in obj.star" :key="star" />
        </div>
      </div>-->

      <!-- 查看更多 -->
      <span class="red_more" @click="show_more">查看更多</span>
    </div>

    <!-- 套餐选择 -->
    <div class="package_box">
      <div class="packge_content">
        <div
          :class="['item', active == 1 ? 'item_active' : '']"
          @click="choose_item(1, '电话咨询', obj.tel_price)"
        >
          <img src="@/assets/img/30.png" alt />
          <span class="packge_name">电话咨询</span>
          <span class="packge_price">{{ obj.tel_price }}/次</span>
          <img src="@/assets/img/35.png" alt class="active_img" v-if="active == 1" />
        </div>
        <div
          :class="['item', active == 2 ? 'item_active' : '']"
          @click="choose_item(2, '线下问诊', obj.face_price)"
        >
          <img src="@/assets/img/31.png" alt class="offline_img" />
          <span class="packge_name">线下问诊</span>
          <span class="packge_price">{{ obj.face_price }}/次</span>
          <img src="@/assets/img/35.png" alt class="active_img" v-if="active == 2" />
        </div>
      </div>

      <div class="packge_introduce">
        <img src="@/assets/img/33.png" alt v-if="active == 1" />
        <img src="@/assets/img/32.png" alt v-else />
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="foot">
      <div class="foot_left" @click="dial_number">
        <img src="@/assets/img/34.png" alt />
        <span>专家助手</span>
      </div>
      <div class="foot_right" @click="go_interrogation">
        <span>{{ text }}</span>
        <span>￥{{ price }}</span>
      </div>
    </div>

    <van-action-sheet v-model="show" title="医师简介">
      <div class="content">
        <div class="more_1">
          <img :src="'https://www.minjisd.com/storage/' + obj.img" alt />
          <div class="more_left">
            <p class="more_p1">
              <span class="more1_name">{{obj.username}}</span>
              <span
                class="more1_tag"
                v-for="(m,index) in obj.hospital.tag"
                :key="index"
                v-if="index<=0"
              >{{m}}</span>
              <span class="more1_htag">{{obj.hospital.name}}</span>
            </p>
            <p class="more_p2">
              <span>{{ obj.pro_title }}</span>
              <span>{{ obj.docter_level.name }}</span>
              <span>{{ obj.title }}</span>
            </p>
          </div>
        </div>

        <p class="content_four more_p3">
          <span v-for="(b,index) in obj.bright" :key="index">{{b}}</span>
        </p>

        <div class="more_2">
          <span class="more2_title">专业擅长</span>
          <span>{{ obj.be_good }}</span>
        </div>

        <div class="more_2">
          <span class="more2_title">个人简介</span>
          <span>{{ obj.other }}</span>
        </div>
      </div>
    </van-action-sheet>

    <van-overlay :show="show_wrapper" @click="show_wrapper = false">
      <div class="wrapper" @click.stop>
        <div class="wrapper_content">
          <p class="wrapper_title">请准确填写相应的信息,支付成功后专家会根据此信息主动联系您,谢谢!</p>
          <div class="wrapper_name">
            <span class="name_title">姓名:</span>
            <input type="text" placeholder="请输入姓名" v-model="order_name" />
          </div>
          <div class="wrapper_name">
            <span class="name_title">电话:</span>
            <input type="number" placeholder="请输入电话" v-model="phone" />
          </div>
          <p class="wrapper_tip">本平台专家只提供健康管理咨询服务,不提供医疗诊治类服务.</p>

          <div class="btn_box">
            <span class="canle" @click="canle_btn">取消</span>
            <span class="comfi" @click="create_order">确定</span>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
// 医生详情
import { doctor_detail } from "@/Api/doctor/doctor_detail";
import { make_order } from "@/Api/doctor/create_order";
import { get_pay } from "@/Api/pay/get_pay";

import wx from "weixin-js-sdk";

import { Dialog } from "vant";

export default {
  props: {},
  components: {},
  data() {
    return {
      text: "电话咨询",
      active: 1,
      price: "",
      obj: {},
      show: false,
      show_wrapper: false,

      phone: "",
      order_name: "",
      buy_type: 2, // 1是问诊  2是电话

      // 订单id
      order_no: "",

      type: 3,

      wx_pay: "",

      appid: "wx13ab299182632eee"
    };
  },
  created(val) {
    this.order_name =
      localStorage.getItem("order_name") == null
        ? ""
        : localStorage.getItem("order_name");
    this.phone =
      localStorage.getItem("phone") == null
        ? ""
        : localStorage.getItem("phone");
    this.doctor_detail(this.$router.history.current.query.id);
  },
  methods: {
    // 详情
    async doctor_detail(id) {
      const { data: res } = await doctor_detail(id);
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      console.log(res);
      this.obj = res.data;
      this.price = res.data.tel_price;
    },

    // 选择套餐
    choose_item(active, text, price) {
      console.log(active);
      this.active = active;
      this.text = text;
      this.price = price;
    },

    // 查看更多
    show_more() {
      this.show = true;
    },

    go_interrogation() {
      this.show_wrapper = true;
    },

    create_order() {
      if (this.phone == "") {
        this.$toast("请输入手机号");
        return;
      }
      if (this.username == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$toast("请选择填写正确的手机号");
        return;
      }

      console.log(this.order_name);
      localStorage.setItem("order_name", this.order_name);
      localStorage.setItem("phone", this.phone);
      this.make_order(
        this.order_name,
        this.phone,
        this.active == 1 ? 2 : 1,
        this.obj.id
      );
    },

    // 创建订单
    async make_order(username, tel, buy_type, docter_id) {
      const { data: res } = await make_order(
        username,
        tel,
        buy_type,
        docter_id
      );
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.get_pay(res.data.order_no, this.type);
      console.log(res);
    },

    // 获取支付参数
    async get_pay(order_no, type) {
      var timestampn = new Date().getTime().toString();
      var timestamp = timestampn.substring(0, 10); //生成签名的时间戳
      // var nonceStr = Math.random().toString(36).substr(2);	//生成签名的随机串
      console.log(timestamp);
      const { data: res } = await get_pay(order_no, type);
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      console.log(res);
      this.wx_pay = res.data;
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          console.log(this.appid);
          console.log(timestamp);
          console.log(this.wx_pay.nonce_str);
          console.log(this.wx_pay.prepay_id);
          console.log(this.wx_pay.trade_type);
          console.log(this.wx_pay.sign);
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.onBridgeReady(
              this.wx_pay.timeStamp,
              this.wx_pay.nonceStr,
              this.wx_pay.package,
              this.wx_pay.paySign
            ),
            false
          );
        } else if (document.attachEvent) {
          console.log(this.appid);
          console.log(timestamp);
          console.log(this.wx_pay.nonce_str);
          console.log(this.wx_pay.prepay_id);
          console.log(this.wx_pay.trade_type);
          console.log(this.wx_pay.sign);
          document.attachEvent(
            "WeixinJSBridgeReady",
            this.onBridgeReady(
              this.wx_pay.timeStamp,
              this.wx_pay.nonceStr,
              this.wx_pay.package,
              this.wx_pay.paySign
            )
          );
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.onBridgeReady(
              this.wx_pay.timeStamp,
              this.wx_pay.nonceStr,
              this.wx_pay.package,
              this.wx_pay.paySign
            )
          );
        }
      } else {
        console.log(this.appid);
        console.log(timestamp);
        console.log(this.wx_pay.nonce_str);
        console.log(this.wx_pay.prepay_id);
        console.log(this.wx_pay.trade_type);
        console.log(this.wx_pay.sign);
        this.onBridgeReady(
          this.wx_pay.timeStamp,
          this.wx_pay.nonceStr,
          this.wx_pay.package,
          this.wx_pay.paySign
        );
      }
    },
    onBridgeReady(timestamp, noncestr, packages, paySign) {
      console.log(packages);
      var vm = this;
      window.WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: "wx13ab299182632eee",
          timeStamp: timestamp,
          nonceStr: noncestr,
          package: packages,
          signType: "MD5",
          paySign: paySign
        },
        function(res) {
          console.log(res);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            vm.$router.push("/guanzhu");
          } else {
            vm.$toast("支付失败");
          }
        }
      );
    },

    canle_btn() {
      this.show_wrapper = false;
    },

    dial_number() {
      window.location.href = "tel://18028712476";
      // Dialog.confirm({
      //   message: '是否拨打专家电话',
      // })
      //   .then(() => {
      //     // on confirm
      //     window.location.href = 'tel://18028712476'
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
    }
  }
};
</script>

<style lang = "less" scoped>
.doctor_details {
  width: 96%;
  height: 100%;
  background: #ecf8f6;
  position: absolute;
  z-index: 999;
  padding: 0 2%;
  overflow: auto;
}
.Specific_information {
  padding: 0.8rem 0;
  background: #fff;
  border-radius: 0.2667rem;
  margin-top: 0.5333rem;
  position: relative;
}

.information_one {
  display: flex;
  align-items: center;
  padding: 0px 0.2667rem 0 0.2667rem;
}
.doctor_img {
  margin-right: 0.2667rem;
}
.doctor_img img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
}

.doctor_content {
  flex: 1;
}

.content_box1 {
  display: flex;
}
.name {
  font-size: 0.5333rem;
  font-weight: 600;
  margin-right: 0.1333rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* white-space: nowrap; */
}

.content_2 {
  display: flex;
  align-items: center;
  flex: 1;
}

.content_2 .hospital_span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* width: 3.3333rem; */
  font-size: 0.2933rem;
  color: #2a9e88;
  font-weight: 600;
  border-radius: 0.1333rem;
  padding: 1px 0.0533rem;
  border: 1px solid #9bd4cb;
  margin-right: 0.1333rem;
  text-align: center;
  background: #eeffff;
  font-weight: 600;
}

.content_2 span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding: 1px 0.0533rem;
  background: #fef9f3;
  color: #ae7b49;
  border-radius: 0.1333rem;
  font-size: 0.2933rem;
  margin-right: 0.1333rem;
  border: 1px solid #e0cbb5;
  font-weight: 600;
  /* white-space: nowrap; */
}

.content_box2 {
  font-size: 0.32rem;
  margin-top: 0.2667rem;
  display: flex;
}

.content_box2 span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  padding: 0px 0.1333rem;
}

.content_four {
  font-size: 0.3467rem;
  margin-top: 0.2667rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.1333rem;
}

.content_four span {
  color: #915014;
  display: inline-block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-weight: 600;
  margin-right: 5px;
  padding: 0px 0.5333rem;
  overflow: hidden;
  background: #fcf3e6;
  position: relative;
  margin-bottom: 0.2667rem;
}

.content_four span::after {
  content: "";
  width: 0.1867rem;
  height: 0.4267rem;
  position: absolute;
  background-image: url("@/assets/img/71.png");
  background-size: 100%;
  background-repeat: no-repeat;
  right: 0.1333rem;
  top: 0.05rem;
}

.content_four span::before {
  content: "";
  width: 0.1867rem;
  height: 0.4267rem;
  position: absolute;
  background-image: url("@/assets/img/70.png");
  background-size: 100%;
  background-repeat: no-repeat;
  left: 0.1333rem;
  top: 0.05rem;
}

.title {
  display: inline-block;
}

.school {
  display: inline-block;
  flex: 1;
}

.where_title {
  display: inline-block;
  font-size: 0.2933rem;
  color: #69c2b0;
  padding: 0 0.2667rem;
  border: 1px solid #69c2b0;
  border-radius: 0.6667rem;
  font-weight: 600;
  letter-spacing: 0.0533rem;
  margin-left: 0.2667rem;
  margin-top: 0.2667rem;
}

.good_message {
  font-size: 0.3467rem;
  padding: 0 0.2667rem;
  margin-top: 0.2667rem;
}
.good_message span {
  line-break: anywhere;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.doctor_appraise {
  display: flex;
  font-size: 0.32rem;
  align-items: center;
  padding: 0 0.2667rem;
  color: #51c8ad;
  margin-top: 0.2667rem;
}
.doctor_appraise span {
  display: inline-block;
  margin-right: 0.2667rem;
}

.star_box img {
  width: 0.4533rem;
  margin-top: 0.0533rem;
  margin-right: 0.1333rem;
}

.package_box {
  height: 9.3333rem;
  background: #fff;
  margin-top: 0.5333rem;
  margin-bottom: 0.5333rem;
}

.packge_content {
  display: flex;
  justify-content: space-between;
  padding: 0.5333rem 1.0667rem 0 1.0667rem;
}

.item {
  width: 3.4667rem;
  height: 3.2rem;
  border: 0.0267rem solid #848484;
  border-radius: 0.2667rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.item_active {
  border: 0.0267rem solid #3fbfa6;
}

.item img {
  width: 0.5333rem;
}
.active_img {
  position: absolute;
  width: 0.5333rem;
  top: -0.0133rem;
  right: 0;
}

.offline_img {
  width: 0.8rem !important;
}
.packge_name {
  font-size: 0.3733rem;
  font-weight: 600;
  margin-top: 0.2667rem;
}

.packge_price {
  font-size: 0.2933rem;
  color: #a46670;
  margin-top: 0.0533rem;
}

.packge_introduce {
  padding: 0 0.2667rem;
  margin-top: 0.2667rem;
}

.packge_introduce img {
  width: 100%;
}

.foot {
  width: 100%;
  height: 1.3333rem;
  background: red;
  position: fixed;
  bottom: 0;
  display: flex;
}

.foot_left {
  width: 4rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #009679;
}

.foot_left img {
  width: 0.5333rem;
  margin-right: 0.1333rem;
}

.foot_right {
  flex: 1;
  background: #3dbda4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.4267rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.0267rem;
}

.red_more {
  color: #fff;
  font-size: 0.2667rem;
  padding: 2px 0.2667rem;
  border-radius: 0.6667rem;
  background: #3dbda4;
  position: absolute;
  right: 0.5333rem;
  bottom: 0.1067rem;
}

.more_1 {
  font-size: 0.3467rem;
  display: flex;
  align-items: center;
  padding: 0.2667rem;
}

.more_1 img {
  width: 1.0667rem;
  height: 1.0667rem;
  border-radius: 50%;
  margin-right: 0.2667rem;
}

.more_left {
  flex: 1;
}

.more_p1 {
  display: flex;
  align-items: center;
}
.more1_name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-right: 0.1333rem;
  font-size: 0.48rem;
  font-weight: 600;
}

.more1_tag {
  /* width: 1.1467rem; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding: 0px 0.1333rem;
  background: #fef9f3;
  color: #ae7b49;
  border-radius: 0.1333rem;
  font-size: 0.2933rem;
  margin-right: 0.1333rem;
  border: 1px solid #e0cbb5;
  font-weight: 600;
  /* white-space: nowrap; */
}

.more1_htag {
  padding: 0px 0.1333rem;
  background: #eeffff;
  color: #48ad9a;
  border-radius: 0.1333rem;
  font-size: 0.2933rem;
  margin-right: 0.1333rem;
  border: 1px solid #9ad5cb;
  font-weight: 600;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.more_p2 {
  display: flex;
  align-items: center;
  font-size: 0.3467rem;
  margin-top: 0.1333rem;
}

.more_p3 {
  padding: 0 0.3467rem;
}

.more_p2 span {
  margin-right: 0.1333rem;
}

.more_2 {
  font-size: 0.3467rem;
  text-align: justify;
  padding: 0.2667rem 0.8rem;
}

.more2_title {
  font-weight: 600;
  display: block;
  margin: 0.2667rem 0;
  position: relative;
}

.more2_title::before {
  content: "";
  width: 0.1333rem;
  height: 0.5333rem;
  background: #3dbda4;
  position: absolute;
  left: -0.4rem;
}

.wrapper_content {
  width: 8.4rem;
  height: 8.5333rem;
  background: #fff;
  border-radius: 0.2667rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 18vh;
  position: relative;
}

.wrapper_content input {
  border: none;
  width: 2.6667rem;
  padding-left: 0.2667rem;
}

.wrapper_title {
  font-size: 0.3733rem;
  font-weight: 600;
  padding: 0.8rem 0.6667rem;
}

.name_title {
  display: inline-block;
  margin-right: 0.5333rem;
}
.wrapper_name {
  padding: 0.2667rem 0.6667rem;
}

.wrapper_tip {
  font-size: 0.2667rem;
  color: #3dbda4;
  padding: 0.2667rem 0.6667rem;
  font-weight: 600;
}

.btn_box {
  width: 100%;
  display: flex;
  height: 1.3333rem;
  border-top: 1px solid #e0e0e0;
  position: absolute;
  bottom: 0;
}

.btn_box span {
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}

.canle {
  border-right: 1px solid #e0e0e0;
}

.comfi {
  color: #3dbda4;
}
</style>