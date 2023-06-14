<template>
  <div class="nothing">
    <van-empty
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂未有数据"
    />
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
/deep/.van-empty__image {
  width: 2.6667rem;
  height: 2.6667rem;
}

/deep/.van-empty {
  padding: 2.6667rem 0;
}
</style>