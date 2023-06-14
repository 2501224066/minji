<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title" ref="page"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title" ref="page"></router-view>
    <!-- tab栏 -->
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "@/components/Tab/tab";
export default {
  props: {},
  components: {
    Tab
  },
  data() {
    return {};
  },
  created() {
    console.log(this.$router);
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  font-size: 0.3733rem;
  font-family: medium;
}
</style>
