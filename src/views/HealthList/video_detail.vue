<template>
  <div class="video_detail">
    <div class="video_content">
      <div class="video_box">
        <video
          :controls="true"
          :poster="poster"
          :show-center-play-btn="true"
          webkit-playsinline="true"
          x-webkit-airplay="true"
          playsinline="true"
          x5-video-orientation="h5"
          x5-video-player-fullscreen="true"
          preload="auto"
          :src="video"
        ></video>
      </div>
      <div class="video_message">
        <div class="message_1">
          <img src="@/assets/img/36.png" alt />
          <span class="video_name">{{obj.title}}</span>
        </div>
        <p class="up_data">更新与{{obj.created_at}}</p>
      </div>
    </div>
    <!-- 相关视频 -->
    <!-- <div class="orther_video">
      <span class="tip">相关视频</span>
      <div class="oter_content">
        <div class="headlth_item">
          <div class="headlth_left">
            <p class="work_title">4个习惯改善口腔溃疡</p>
            <p class="work_where">口腔溃疡大作战</p>
          </div>
          <div class="headlth_right">
            <img src="@/assets/img/29.png" alt class="work_cover" />
          </div>
        </div>
        <div class="headlth_item">
          <div class="headlth_left">
            <p class="work_title">4个习惯改善口腔溃疡</p>
            <p class="work_where">口腔溃疡大作战</p>
          </div>
          <div class="headlth_right">
            <img src="@/assets/img/29.png" alt class="work_cover" />
          </div>
        </div>
        <div class="headlth_item">
          <div class="headlth_left">
            <p class="work_title">4个习惯改善口腔溃疡</p>
            <p class="work_where">口腔溃疡大作战</p>
          </div>
          <div class="headlth_right">
            <img src="@/assets/img/29.png" alt class="work_cover" />
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { headlth_detail } from "@/Api/health/headlth_detail";
export default {
  props: {},
  components: {},
  data() {
    return {
      // 封面
      poster: "",
      video: "",

      obj: {}
    };
  },
  created() {
    this.headlth_detail(this.$router.history.current.query.id);
  },
  methods: {
    //  获取详情
    async headlth_detail(id) {
      const { data: res } = await headlth_detail(id);
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      console.log(res);
      this.obj = res.data;
      this.video = "https://www.minjisd.com/storage/" + res.data.content_video;
      this.poster = "https://www.minjisd.com/storage/" + res.data.thumb;
    }
  }
};
</script>

<style lang = "less" scoped>
.video_detail {
  width: 100%;
  height: 100%;
  background: #eff4f5;
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}
.video_content {
  display: flex;
  flex-direction: column;
  background: #fff;
}
.video_box {
  height: 5.3333rem;
}
.video_box video {
  width: 100%;
  height: 100%;
}

.video_message {
  flex: 1;
}
.message_1 {
  display: flex;
  align-items: center;
  padding: 0.2667rem;
}
.message_1 img {
  width: 0.8rem;
  margin-right: 0.1333rem;
}
.video_name {
  font-size: 0.48rem;
  font-weight: 600;
}

.up_data {
  font-size: 0.2667rem;
  color: #7b7b7b;
  text-align: right;
  padding: 0.1333rem 0.2667rem;
}

.orther_video {
  flex: 1;
  background: #fff;
  margin-top: 0.5333rem;
}

.tip {
  font-size: 0.3733rem;
  color: #8c8c8c;
  width: 100%;
  display: inline-block;
  text-align: center;
  padding: 0.2667rem 0;
  position: relative;
}
.tip::after {
  content: "";
  position: absolute;
  left: 2.8rem;
  top: 0.64rem;
  width: 1.3333rem;
  height: 0.0533rem;
  background: #e0e0e0;
}
.tip::before {
  content: "";
  position: absolute;
  right: 2.8rem;
  top: 0.64rem;
  width: 1.3333rem;
  height: 0.0533rem;
  background: #e0e0e0;
}

.headlth_item {
  display: flex;
  padding: 0.4rem 0.2667rem;
  border-bottom: 0.0267rem solid #d4d4d4;
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
}

.headlth_right {
  padding: 0 0.2667rem;
}
</style>