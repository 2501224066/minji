<template>
  <div class="index_page" ref="page">
    <!-- 搜索 -->
    <!-- <div @click="go_doctor">
      <Search class="search_box" :bgc="'#fff'" :disabled="true"></Search>
    </div>-->

    <!-- 轮播图 -->
    <div class="swipe_box">
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
        <van-swipe-item v-for="item in swipe_list" :key="item.img">
          <img :src="'https://www.minjisd.com/storage/' + item.img" alt class="swipe_img" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 任务栏 -->
    <div class="nav_box">
      <div class="nav_content">
        <div class="nav_item">
          <img src="@/assets/img/4.png" alt @click="more_doctor" />
        </div>
        <div class="nav_item">
          <img src="@/assets/img/5.png" alt @click="go_psychology" />
        </div>
        <div class="nav_item">
          <img src="@/assets/img/3.png" alt @click="go_shop" />
        </div>

        <!-- <div class="nav_item">
          <img src="@/assets/img/65.png" alt @click="more_popular" />
        </div>-->
      </div>
    </div>

    <!-- 精选名医 -->
    <div class="famous_doctor">
      <div class="title_box">
        <img src="@/assets/img/22.png" alt class="famousdoctor_title" />
        <!-- 更多图标 -->
        <img src="@/assets/img/18.png" alt class="more_btn" @click="more_doctor" />
      </div>
      <div class="doctor_box">
        <div class="doctor_item" @click="doctor_detail(t.id)" v-for="t in doctor_list" :key="t.id">
          <div class="doctor_img">
            <img :src="'https://www.minjisd.com/storage/' + t.img" alt />
          </div>
          <div class="doctor_content">
            <div class="content_one">
              <span class="doctor_name">{{ t.username }}</span>
              <div class="label_box">
                <i
                  class="label"
                  v-for="(label, index) in t.hospital.tag"
                  :key="index"
                  v-if="index <= 0"
                >{{ label }}</i>
                <i class="label_hospital">{{ t.hospital.name }}</i>
              </div>
            </div>

            <p class="content_tow">
              <span class="doctor_school" v-if="t.pro_title!=null">{{ t.pro_title }}</span>
              <span class="doctor_title" v-if="t.docter_level.name!=null">{{ t.docter_level.name }}</span>
              <span class="doctor_school" v-if="t.title!=null">{{ t.title }}</span>
            </p>

            <p class="content_four">
              <span v-for="(b,index) in t.bright" :key="index">{{b}}</span>
            </p>

            <p class="content_three">擅长:&nbsp;&nbsp;{{ t.be_good }}</p>
            <div class="doctor_score">
              <div class="score_left">
                <!-- <i>医师星评</i> -->
                <img
                  src="@/assets/img/21.png"
                  alt
                  class="stars"
                  v-for="(stars, index) in t.star"
                  :key="index"
                />
              </div>
              <div class="score_right">
                <img src="@/assets/img/20.png" alt class="Challenge_Now" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 热门健康套餐 -->
    <div class="popular_package">
      <div class="popularpackage_title">
        <img src="@/assets/img/72.png" alt class="popularpackagetitle_img" />
        <!-- 更多图标 -->
        <img src="@/assets/img/73.png" alt class="more_btn" @click="go_shop" />
      </div>
      <div class="popularpackage_content">
        <div
          class="popular_item"
          v-for="good in goods_list"
          :key="good.id"
          @click="go_gooddetail(good.id)"
        >
          <div class="popular_left">
            <div class="popularleft_one">
              <img src="@/assets/img/74.png" alt />
              <span class="shop_name">{{ good.goods_title }}</span>
            </div>
            <div class="popularleft_tow">
              <p>{{ good.goods_desc }}</p>
            </div>

            <div class="popularleft_three">
              <div class="three_left">
                <span class="now_price">
                  ￥
                  <i>{{ good.price }}</i>
                </span>
                <span class="old_price">
                  <i>￥{{ good.price_cost }}</i>
                </span>
              </div>
              <div class="three_right">
                <span>已售{{good.sales}}份</span>
              </div>
            </div>
          </div>
          <div class="popular_right">
            <img :src="'https://www.minjisd.com/storage/' + good.thumb" alt />
          </div>
        </div>
      </div>
    </div>

    <!-- 健康大讲堂 -->
    <div class="health_class">
      <div class="health_title">
        <img src="@/assets/img/76.png" alt class="headlth_img" />
        <!-- 更多图标 -->
        <img src="@/assets/img/77.png" alt class="more_btn" @click="more_popular" />
      </div>
      <div class="health_content">
        <div
          class="headlth_item"
          v-for="article in article_list"
          :key="article.id"
          @click="headlth_detail(article.id, article.type)"
        >
          <div class="headlth_left">
            <p class="work_title">{{ article.title }}</p>
            <p class="work_where">{{ article.desc }}</p>
          </div>
          <div class="headlth_right">
            <img :src="'https://www.minjisd.com/storage/' + article.thumb" alt class="work_cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search/search";
// 轮播图
import { get_banner } from "@/Api/index/get_banner";
// 获取推荐医师
import { get_doctor } from "@/Api/index/get_doctor";

// 获取推荐产品
import { get_goods } from "@/Api/index/get_goods";

// 推荐文章
import { get_article } from "@/Api/index/get_article";

import { GetQueryString } from "@/assets/js/mixin";
export default {
  props: {},
  components: {
    Search
  },
  data() {
    return {
      swipe_list: [],

      doctor_list: [],

      goods_list: [],

      article_list: [],

      scrollTop: 0
    };
  },
  created() {
    // this.$nextTick(() => {
    //   // console.log(this.$homeScroll);
    //   window.scrollTo(0, this.scrollTop);
    // });

    if (localStorage.getItem("token") == null) {
      var url = window.location.href;
      var dz_url = url.split("#")[0]; //获取#/之前的字符串
      var cs = dz_url.split("?")[1];
      var cs_arr = cs.split("&"); //参数字符串分割为数组
      var cs = {};
      for (var i = 0; i < cs_arr.length; i++) {
        //遍历数组，拿到json对象
        cs[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
      }
      localStorage.setItem("token", cs.token);
      localStorage.setItem("is_reg", cs.is_reg);
      if (cs.is_reg == 1) {
        this.$router.replace("/register");
      }
    } else {
      if (localStorage.getItem("is_reg") == 1) {
        this.$router.replace("/register");
      }
    }
    if (this.$router.history.current.fullPath == "/index") {
      this.$store.commit("changeActive", 0);
    }
    this.get_banner();
    this.get_doctor();
    this.get_goods();
    this.get_article();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 获取轮播图
    async get_banner() {
      const { data: res } = await get_banner();
      if (res.code != 200) {
        this.$toast("请求失败");
        return;
      }
      this.swipe_list = res.data;
    },

    // 获取首页推荐医师
    async get_doctor() {
      const { data: res } = await get_doctor();
      if (res.code != 200) {
        this.$toast("");
        return;
      }
      this.doctor_list = res.data.list;
    },

    // 获取首页推荐产品
    async get_goods() {
      const { data: res } = await get_goods();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.goods_list = res.data.list;
    },

    // 获取推荐文章
    async get_article() {
      const { data: res } = await get_article();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.article_list = res.data.list;
      console.log(res);
    },

    // 更多名医、名医问诊、专家咨询
    more_doctor() {
      this.$router.push("/doctor_list");
      this.$store.commit("changeActive", 1);
    },
    // 更多课堂
    more_popular() {
      this.$router.push("/health_list");
    },

    // 民济商城、更多套餐
    go_shop() {
      this.$router.push("/shop");
    },

    // 医生详情
    doctor_detail(val) {
      this.$router.push("/doctor_detail?id=" + val);
    },

    go_psychology() {
      this.$router.push("/psychology");
    },

    // 文章详情
    headlth_detail(val, type) {
      if (type == 1) {
        this.$router.push("/headlth_detail?id=" + val + "&type=" + type);
      } else {
        this.$router.push("/video_detail?id=" + val + "&type=" + type);
      }
    },

    go_gooddetail(val) {
      this.$router.push("/good_detail?id=" + val);
    },

    go_doctor() {
      this.$router.push("/doctor_list");
    },

    handleScroll() {
      this.scroll =
        document.documentElement && document.documentElement.scrollTop;
      console.log(this.scroll);
    }
  },
  activated() {
    if (this.scroll > 0) {
      window.scrollTo(0, this.scroll);
      this.scroll = 0;
      window.addEventListener("scroll", this.handleScroll);
    }
  },

  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  //离开路由时
  beforeRouteLeave(to, from, next) {
    console.log(to);
    //全局变量homeScroll默认为0 离开页面时 记录当前的页面滚动值
    // this.scrollTop =
    //   document.documentElement.scrollTop ||
    //   document.body.scrollTop ||
    //   this.$refs.page.scrollTop;

    this.scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop
    //需要执行next函数 否则不起作用
    next();
  }
};
</script>

<style lang = "less" scoped>
.index_page {
  width: 100%;
  height: auto;
  background: linear-gradient(#3bc3d7 2%, #eff4f5 10%);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding-bottom: 50px;
  position: absolute;
  // overflow: auto;
}

.search_box {
  margin-top: 5vh;
}

/* 轮播图 */

.swipe_box {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
}

.my-swipe {
  width: 100%;
}

.swipe_img {
  width: 9.0667rem;
  padding: 0 0.2667rem;
}

.van-swipe-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 任务栏 */
.nav_box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
}

.nav_content {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.nav_item {
  display: flex;
  justify-content: center;
}

.nav_item img {
  width: 1.7333rem;
}

/* 服务列表 */
.service_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vh;
  padding: 0 0.2667rem;
}

.service_content img {
  width: 100%;
  margin-bottom: 1.5vh;
}

/* 精选名医 */
.famous_doctor {
  width: 9.7333rem;
  /* height: 16.2667rem; */
  background: #ffffff;
  border-radius: 0.2667rem;
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 0.5333rem;
  margin-bottom: 0.5333rem;
  /* overflow: hidden; */
}

.title_box {
  height: 1.7333rem;
  position: relative;
  background: #f0ffff;
}

.more_btn {
  width: 1.3333rem;
  position: absolute;
  right: 0.4rem;
  top: 0.6133rem;
}

.famousdoctor_title {
  width: 4rem;
  position: absolute;
  top: 0;
  left: 0.4rem;
}

.doctor_box {
  width: 100%;
}

.doctor_item {
  /* width: 9.3333rem; */
  padding: 0.2667rem 0;
  display: flex;
  border-bottom: 1px solid #cfd2d2;
}

.doctor_item:last-child {
  border: none;
}

/* 头像 */
.doctor_img {
  width: 1.6rem;
  padding: 0 0.2667rem;
}

.doctor_img img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
}

.doctor_content {
  flex: 1;
}

.content_one {
  /* height: 32px; */
  display: flex;
  align-items: center;
  display: flex;
}

.label_box {
  flex: 1;
  display: flex;
  overflow-wrap: break-word;
}

.doctor_name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* width: 2.0267rem;
  white-space: nowrap; */
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.0267rem;
  margin-right: 0.1333rem;
  text-align: left;
}

.label {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  width: 1.1733rem;
  font-size: 0.2933rem;
  color: #ae7b49;
  font-weight: 600;
  border-radius: 0.1333rem;
  padding: 1px 0.1333rem;
  border: 1px solid #e0cbb5;
  margin-right: 0.1333rem;
  /* display: inline-block; */
  margin-top: 0.0533rem;
  text-align: center;
  background: #fef9f3;
  font-weight: 600;
}

.label_hospital {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* width: 3.3333rem; */
  font-size: 0.2933rem;
  color: #2a9e88;
  font-weight: 600;
  border-radius: 0.1333rem;
  padding: 1px 0.1333rem;
  border: 1px solid #9bd4cb;
  margin-right: 0.1333rem;
  /* display: inline-block; */
  margin-top: 0.0533rem;
  text-align: center;
  background: #eeffff;
  font-weight: 600;
}

.content_tow {
  font-size: 0.3467rem;
  margin-top: 0.2667rem;
  display: flex;
}

.content_tow span {
  display: inline-block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-weight: 600;
  /* margin-right: 5px; */
  padding: 0px 0.1333rem;
  overflow: hidden;
}

.content_three {
  /* // height: .8533rem; */
  font-size: 0.3467rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-top: 0.2667rem;
}

.content_four {
  font-size: 0.3467rem;
  margin-top: 0.2667rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
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

.doctor_score {
  height: 1.0667rem;
  margin-top: 0.2667rem;
  display: flex;
  justify-content: space-between;
}

.score_right {
  width: 2.6667rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Challenge_Now {
  width: 1.8667rem;
}

.score_left {
  flex: 1;
  font-size: 0.32rem;
  color: #3fbea5;
  display: flex;
  align-items: center;
}

.score_left i {
  margin-right: 0.1333rem;
}

.stars {
  width: 0.4rem;
  margin-right: 0.1333rem;
}

/* 热门套餐 */
.popular_package {
  width: 9.7333rem;
  background: #ffffff;
  border-radius: 0.2667rem;
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 0.5333rem;
  margin-bottom: 0.5333rem;
  /* overflow: hidden; */
}

.popularpackage_title {
  height: 1.7333rem;
  position: relative;
  background: #fff8e6;
}

.popularpackagetitle_img {
  width: 4.8rem;
  position: absolute;
  left: 0.4rem;
  top: 0.2667rem;
}

.popularpackage_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.1333rem 0.5333rem 0.1333rem;
}

.popular_item {
  width: 9.3333rem;
  padding: 0.6667rem 0.1333rem;
  display: flex;
  background-image: url("@/assets/img/75.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 0.2667rem;
  border: 0.0267rem solid #f3f3f3;
  margin-top: 0.2667rem;
}

.popular_left {
  flex: 1;
  padding: 0 0.1333rem;
}

.popular_right img {
  width: 2.9333rem;
  height: 2.1867rem;
  border-radius: 0.1333rem;
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
  font-size: 0.3733rem;
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
  color: #ddaf66;
  font-weight: 600;
  margin-right: 0.1333rem;
}

.old_price {
  color: #ddaf66;
  text-decoration: line-through;
  font-size: 0.32rem;
}

.now_price i {
  font-size: 0.56rem;
}

.three_right span {
  font-size: 0.2933rem;
  margin-top: 0.1333rem;
  display: inline-block;
  color: #a9a9a9;
}

/* 健康大讲堂 */
.health_class {
  width: 9.7333rem;
  background: #ffffff;
  border-radius: 0.2667rem;
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 0.5333rem;
  margin-bottom: 2rem;
  /* overflow: hidden; */
}

.health_title {
  height: 1.7333rem;
  position: relative;
  background: #e9ffef;
}

.headlth_img {
  width: 4.4rem;
  position: absolute;
  left: 0.4rem;
  top: 0.2667rem;
}

.headlth_item {
  width: 9.3333rem;
  display: flex;
  padding: 0.4rem 0.2667rem;
  border-bottom: 1px solid #d4d4d4;
}

.headlth_left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.work_title {
  font-size: 0.4rem;
  font-weight: 600;
  letter-spacing: 0.0267rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.work_where {
  font-size: 0.32rem;
  color: #898989;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.work_cover {
  width: 3.2rem;
  height: 2rem;
  border-radius: 0.1333rem;
}

.headlth_right {
  padding: 0 0.2667rem;
}
</style>