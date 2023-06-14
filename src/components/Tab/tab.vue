<template>
  <div class="tab_box">
    <van-tabbar v-model="isActive" active-color="#1cb4bf" @change="change" :placeholder="true">
      <van-tabbar-item replace :to="item.link" v-for="(item,index) in icon" :key="index">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      active: 0,
      icon: [
        {
          active: require("@/assets/img/9.png"),
          inactive: require("@/assets/img/10.png"),
          title: "首页",
          link: "/index"
        },
        {
          active: require("@/assets/img/12.png"),
          inactive: require("@/assets/img/11.png"),
          title: "名医问诊",
          link: "/doctor_list"
        },
        {
          active: require("@/assets/img/14.png"),
          inactive: require("@/assets/img/13.png"),
          title: "健康心理",
          link: "/psychology"
        },
        {
          active: require("@/assets/img/16.png"),
          inactive: require("@/assets/img/15.png"),
          title: "我的",
          link: "/main"
        }
      ]
    };
  },
  created() {},
  computed: {
    isActive() {
      return this.$store.state.tab.active;
    }
  },
  methods: {
    // 切换tab
    change(val) {
      console.log(this.$store.state.tab.active);
      console.log(this.$route)
      this.$store.commit("changeActive", val);
    }
  }
};
</script>

<style lang = "less" scoped>
</style>