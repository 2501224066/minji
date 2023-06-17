<template>
  <div class="add_card">
    <div v-if="!list.length" style="text-align: center; padding: 2rem 0">暂无可操作活动请求</div>
    <div v-else>
      <div class="card" v-for="(item, index) in list" :key="index">
        <div class="user_name">
          <div class="labe">{{ item.user_name }} ({{ item.sex }} {{ item.age }})</div>
          <div class="labe" style="text-align: right; color: #999">{{ item.created_at }}</div>
        </div>
        <div class="user_name">
          <div class="labe">{{ item.tel }} </div>
          <div class="labe">{{ item.compony }}</div>
          <div class="labe" style="color: green; text-align: right">{{ item.report_status_name }}</div>
        </div>
        <div style="color: #666; display: flex; justify-content: space-between; align-items: center; padding: 0.2rem">
          <div>{{ item.title }}</div>
          <van-button round type="info" @click="op(item)">{{
            { 1: "填写彩超", 2: "填写建议", 3: "查看详情" }[item.report_status]
          }}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_expier_list } from "@/Api/activity/index";

export default {
  props: {},
  components: {},
  data() {
    return {
      list: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await get_expier_list();
      this.list = res.data.data;
    },

    op(item) {
      if (item.report_status === 1) {
        this.$router.push("/color_set?report_id=" + item.id);
      } else if (item.report_status === 2) {
        this.$router.push("/expert_set?report_id=" + item.id);
      } else {
        this.$router.push("/expert_show?report_id=" + item.id);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.add_card {
  width: 100%;
  min-height: 100%;
  background: #eff4f5;
  position: absolute;
  z-index: 99;
}

.show {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  z-index: 999;
}

.t {
  font-size: 0.3733rem;
  font-weight: 600;
  padding: 0.3733rem;
  background: #eff4f5;
}

.tt {
  font-size: 0.4rem;
  font-weight: 600;
  padding: 0.3rem;
}

.card {
  margin: 0.3rem 2%;
  border-radius: 0.3733rem;
  background: #fff;
  overflow: hidden;
  border: 0.1rem solid #eee;
}

.t::before {
  content: "";
  display: inline-block;
  width: 0.1rem;
  height: 0.3733rem;
  background: #2bc2cd;
  margin-right: 0.2rem;
  position: relative;
  top: 0.03rem;
  border-radius: 0.3733rem;
}

.user_name,
.user_card,
.user_phone {
  display: flex;
  padding: 0.4rem 0.3rem;
  background: #fff;
  border: 0.0267rem solid #eff4f5;
  justify-content: space-between;
}

.user_name>div{
  max-width: 33%;
}

.labe {
  font-size: 0.3733rem;
  font-weight: 600;
  display: inline-block;
}

.name_input {
  font-size: 0.3467rem;
  color: #7e7e7e;
  border: none;
  background: #fff;
}

.name_input_x {
  width: 100%;
  font-size: 0.3467rem;
  color: #7e7e7e;
  border: none;
  border-bottom: 0.0267rem solid #999;
  background: #fff;
}

.clear {
  position: absolute;
  right: 0.3rem;
  width: 1.3rem;
  height: 1rem;
  background: #999;
  color: #fff;
  border-radius: 0.3467rem;
  text-align: center;
  line-height: 1rem;
}

.add_btn {
  display: flex;
  justify-content: center;
  padding-top: 1.6rem;
  background: #fff;
}

/deep/.van-button {
  height: 0.8rem;
  width: 2.8rem;
  padding: 0;
}
/deep/.van-toast {
  z-index: 9999 !important;
  position: absolute !important;
}
/deep/.van-radio {
  margin-bottom: 0.1rem;
}
/deep/.van-radio--horizontal {
  margin-bottom: 0.2rem;
}
</style>
