<template>
  <div class="contact_box">
    <div class="content">
      <img src="@/assets/img/78.jpg" alt />
      <p>我们聚焦高端健康管理咨询，致力于打造一个解决疑难杂症的综合服务平台，以推动解决人们找好医生难的问题。</p>
      <p>如您有任何意见或建议，欢迎随时联系我们。</p>
      <p>联系电话:18979751068</p>
      <p>邮箱:minjisd@163.com</p>
      <p>收件地址:深圳市南山区南头街道红花园社区深南大道12069号海岸时代公寓东座1920</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang = "less" scoped>
.contact_box {
  width: 90%;
  height: 100%;
  position: relative;
  background: #f5f7f9;
  z-index: 99;
  padding: 0 5%;
  font-size: 0.3733rem;
  overflow: hidden;
}

.contact_box img {
  width: 8.4rem;
  margin-left: 50%;
  transform: translate(-50%);
  margin-bottom: 0.2667rem;
}

.content {
  background: #fff;
  padding: 0.2667rem;
  margin-top: 1.6rem;
  border-radius: 0.1333rem;
}
p {
  margin-bottom: 0.2667rem;
}
</style>