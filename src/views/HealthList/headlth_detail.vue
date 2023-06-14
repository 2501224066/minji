<template>
  <div class="headlth_detail">
    <div class="content">
      <p class="title">{{ obj.title }}</p>
      <div class="detail_content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { headlth_detail } from "@/Api/health/headlth_detail";
import { editorImgs } from "@/util/showImage/showimage";
export default {
  props: {},
  components: {},
  data() {
    return {
      obj: {},
      content: ""
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
      this.content = res.data.content;
      this.$nextTick(() => {
        this.imgList = document
          .getElementsByClassName("detail_content")[0]
          .getElementsByTagName("img");
        console.log(this.imgList);
        editorImgs(this.imgList);
      });
      // 这是如果匹配的正则img
      // var imgReg = /<img.*?(?:>|\/>)/gi;
      // var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      // var arr = res.data.content.match(imgReg);
      // var imgs = "";
      // console.log(arr);
      // if (arr != null) {
      //   console.log(111);
      //   arr.forEach((item3, index) => {
      //     console.log(item3.match(srcReg)[1]);
      //     imgs += `<img style="width:100%;" src="${item3.match(srcReg)[1]}">`;
      //     console.log(imgs);
      //     // this.content = imgs;
      //   });
      // } else {
      //   this.content = res.data.content;
      // }
    }
  }
};
</script>

<style scoped lang="less">
.headlth_detail {
  width: 100%;
  height: auto;
  background: #ecf8f6;
  position: relative;
  z-index: 2000;
  overflow-y: scroll;
  overflow-x: hidden;
}

.content {
  height: 100%;
  padding: 0 0.5333rem;
  background: #fff;
  z-index: 2000;
}

.title {
  font-size: 0.5333rem;
  font-weight: 600;
  padding: 0.5333rem 0;
}

.detail_content {
  font-size: 0.3467rem;
}

/deep/.van-image-preview {
  z-index: 9999 !important;
}
/deep/.van-overlay {
  z-index: 9999 !important;
}
::v-deep img,
::v-deep table,
::v-deep p,
::v-deep span {
  width: 100%;
}
</style>