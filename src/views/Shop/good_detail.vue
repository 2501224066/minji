<template>
  <div class="good_detail">
    <div class="swiper_box">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in obj.goods_img" :key="index">
          <img :src="'https://www.minjisd.com/storage/' + image" class="item_img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="good_message">
      <span class="good_title active">￥{{ obj.price }}</span>
      <!-- <span class="num">已销数量29</span> -->
    </div>
    <div class="good_message">
      <span class="good_title">{{ obj.goods_title }}</span>
      <span class="num">已销数量{{ obj.sales }}</span>
    </div>

    <div class="good_address" v-if="obj.type == 1">
      <span class="address_title">送至</span>
      <span
        class="address_message"
        @click="go_address"
      >{{ address == '' ? '请选择配送地址' : address.address }}</span>
    </div>

    <div class="good_content" v-html="obj.good_detail"></div>

    <div class="bottom_btn">
      <div class="bottom_left">
        <img src="@/assets/img/9.png" alt @click="go_home" />
        <i>首页</i>
      </div>
      <div class="bottom_right" @click="show_popup">
        <i>立即购买</i>
      </div>
    </div>

    <van-popup v-model="show" position="bottom" :style="{ height: '32%' }">
      <div class="content_box">
        <div class="box_1">
          <img :src="'https://www.minjisd.com/storage/'+obj.goods_img[0]" alt />
          <div class="box_right">
            <p class="title">{{ obj.goods_title }}</p>
            <p class="price">{{ obj.price }}</p>
          </div>
        </div>
        <div class="box_2">
          <i>兑换数量</i>
          <van-stepper
            v-model="value"
            theme="round"
            button-size="22"
            disable-input
            min="1"
            max="99"
          />
        </div>

        <div class="box_3">
          <i class="buy_btn" @click="creat_order">立即购买</i>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from "vant";

import { editorImgs } from "@/util/showImage/showimage";

import { get_detail } from "@/Api/shop/good_detail";

import { good_order } from "@/Api/shop/good_order";

import { get_pay } from "@/Api/pay/get_pay";

export default {
  props: {},
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      obj: {},

      show: false,

      value: 1,

      address: "",

      order: {},

      wx_pay: ""
    };
  },
  created() {
    console.log(this.$router);
    this.get_detail(this.$router.history.current.query.id);
    console.log(localStorage.getItem("address_item"));
    this.address =
      localStorage.getItem("address_item") == null
        ? ""
        : JSON.parse(localStorage.getItem("address_item"));
  },
  methods: {
    async get_detail(id) {
      const { data: res } = await get_detail(id);
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.obj = res.data.list;
      this.$nextTick(() => {
        this.imgList = document
          .getElementsByClassName("good_content")[0]
          .getElementsByTagName("img");
        console.log(this.imgList);
        editorImgs(this.imgList);
      });
      console.log(res);
    },

    show_popup() {
      this.show = true;
    },

    // 创建订单
    async good_order(goods_id, address_id, num) {
      const { data: res } = await good_order(goods_id, address_id, num);
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.order = res.data;
      console.log(res);
      this.get_pay(this.order.order_no, this.obj.type);
    },

    // 支付参数
    async get_pay(order_no, type) {
      const { data: res } = await get_pay(order_no, type);
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      console.log(res);
      this.wx_pay = res.data;
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
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
        this.onBridgeReady(
          this.wx_pay.timeStamp,
          this.wx_pay.nonceStr,
          this.wx_pay.package,
          this.wx_pay.paySign
        );
      }
    },

    // 购买
    creat_order() {
      if (this.obj.type == 1) {
        if (this.address == "") {
          this.$toast("请选择配送地址");
          return;
        }
      }
      this.good_order(
        this.obj.id,
        this.obj.type == 1 ? (this.address != "" ? this.address.id : "") : "",
        this.value
      );
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
            vm.$router.push("/wechat?type=" + vm.obj.type);
          } else {
            vm.$toast("支付失败");
          }
        }
      );
    },

    go_home() {
      this.$router.push("/index");
    },

    go_address() {
      this.$router.push("/address");
    }

    // 图片放大
    // editorImgs() {
    //   this.imgList = document
    //     .getElementsByClassName("good_content")[0]
    //     .getElementsByTagName("img");
    //   console.log(this.imgList.length);
    //   let arr = [];
    //   let that = this;
    //   for (let i = 0; i < this.imgList.length; i++) {
    //     arr.push(this.imgList[i].src);
    //     this.imgList[i].setAttribute("class", "preview-img");
    //     this.imgList[i].addEventListener("click", e => {
    //       console.log(arr);
    //       // console.log(that);
    //       // this.show(arr, i);
    //       ImagePreview({
    //         images: arr,
    //         startPosition: i
    //       });
    //     });
    //   }
    // }
  }
};
</script>

<style scoped lang = "less">
.good_detail {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  z-index: 99;
  position: relative;
}

.item_img {
  width: 100%;
}

.good_message {
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5333rem;
  margin-top: 0.2667rem;
}

.num {
  font-size: 0.32rem;
  flex: 1;
}

.good_title {
  width: 7.0667rem;
  font-size: 0.48rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-weight: 600;
}

.good_address {
  height: 1.0667rem;
  background: #fff;
  margin-top: 0.2667rem;
  display: flex;
  align-items: center;
  padding: 0 0.5333rem;
  font-size: 0.3733rem;
}

.address_title {
  display: inline-block;
  margin-right: 0.2667rem;
  width: 1.3333rem;
}

.address_message {
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.active {
  color: red;
}

.good_content {
  margin-top: 0.5333rem;
  padding-bottom: 1.3333rem;
  padding: 0 0.5333rem 1.3333rem 0.5333rem;
}

::v-deep img,
::v-deep table,
::v-deep p,
::v-deep span {
  width: 100%;
}

.bottom_btn {
  position: fixed;
  width: 100%;
  z-index: 99;
  bottom: 0;
  background: #fff;
  display: flex;
}

.bottom_left,
.bottom_right {
  width: 50%;
  height: 1.8667rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bottom_left img {
  width: 30px;
}

.bottom_right i {
  background: #1fb4bf;
  padding: 0.16rem 1.2rem;
  border-radius: 0.6667rem;
  color: #fff;
}

.box_1 {
  display: flex;
  padding: 0.2667rem;
}

.box_1 img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  margin-right: 0.2667rem;
}

.box_right {
  flex: 1;
}

.title {
  font-size: 0.48rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-weight: 600;
  margin-bottom: 0.2667rem;
}

.price {
  font-size: 0.4267rem;
  font-weight: 600;
  color: red;
}

.box_2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2667rem;
}

/deep/.van-stepper--round .van-stepper__plus {
  background: #1fb4bf;
}

/deep/.van-stepper--round .van-stepper__minus {
  border: 1px solid #1fb4bf;
  color: #1fb4bf;
}

.box_3 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2667rem;
}

.buy_btn {
  padding: 0.2133rem 2.6667rem;
  border-radius: 0.6667rem;
  background: #1fb4bf;
  text-align: center;
  color: #fff;
}
</style>