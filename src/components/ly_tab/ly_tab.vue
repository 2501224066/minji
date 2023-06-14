<template>
  <div class="ly_content">
    <ly-tabs v-model="active" :activeColor="activeColor" @change="change_list">
      <ly-tab-item :name="item.name" :title="item.title" v-for="item in yTabList" :key="item.id" />
    </ly-tabs>
  </div>
</template>

<script>
import { LyTabs, LyTabBar, LyTabItem } from "ly-tab";
import { nextTick } from "vue";
export default {
  props: {
    yTabList: {
      default: []
    },
    activeColor: {
      default: "#1c9b6f"
    }
  },
  components: {
    LyTabs,
    LyTabBar,
    LyTabItem
  },
  data() {
    return {
      active: 0
    };
  },
  created() {
    this.active = 0;
  },
  mounted() {},
  methods: {
    change_list(val) {
      console.log(this.yTabList[val]);
      this.$emit("change_list", this.yTabList[val].id);
    }
  }
};
</script>

<style lang = "less" scoped>
</style>