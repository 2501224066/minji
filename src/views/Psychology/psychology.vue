<template>
  <div class="psychology_page">
    <img src="@/assets/img/58.png" alt class="title_img" />
    <!-- 临床心理诊所 -->
    <img src="@/assets/img/61.png" alt class="work_img" @click="go_clinic" />

    <!-- 健康文章 -->
    <img src="@/assets/img/60.png" alt class="clinic_img" @click="go_article" />

    <!-- 心理咨询 -->
    <img src="@/assets/img/62.png" alt class="service_img" @click="go_psychiatrist" />
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  created() {
    if (this.$router.history.current.fullPath == "/psychology") {
      this.$store.commit("changeActive", 2);
    }
  },
  methods: {
    go_psychiatrist() {
      this.$router.push("/psychiatrist");
    },
    go_article() {
      this.$router.push("/pyc_articles");
    },

    go_clinic() {
      this.$toast("正在紧锣密鼓搭建中，敬请期待");
    }
  }
};
</script>

<style lang = "less" scoped>
.psychology_page {
  width: 100%;
  height: 100%;
  background: #eff4f5;
  position: relative;
}

.title_img {
  width: 100%;
  height: 6.6667rem;
}

.work_img,
.clinic_img,
.service_img {
  width: 8rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}

.service_img {
  top: 5.5733rem;
}

.clinic_img {
  top: 7.7333rem;
}

.work_img {
  top: 9.9733rem;
}
</style>