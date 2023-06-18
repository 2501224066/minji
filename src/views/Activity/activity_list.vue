<template>
  <div class="add_card">
    <div v-if="!list.length" style="text-align: center; padding: 2rem 0">暂无待审核活动请求</div>
    <div v-else>
      <div class="card" v-for="(item, index) in list" :key="index">
        <div class="user_name">
          <span class="labe" style="display: flex">
            <van-checkbox
              @change="count()"
              shape
              v-model="item.checked"
              :disabled="item.status_name !== '待审核'"
            ></van-checkbox>
            &nbsp; &nbsp; &nbsp;{{ item.user_name }} ({{ item.sex }} {{ item.age }})
          </span>
          <span class="labe" style="text-align: right; color: #999">{{ item.created_at }}</span>
        </div>
        <div class="user_name">
          <span class="labe">{{ item.tel }} </span>
          <span class="labe">{{ item.compony }}</span>
          <span class="labe" style="color: green; text-align: right">{{ item.status_name }}</span>
        </div>
        <div style="color: green; text-align: right; padding: 0.1rem" v-if="item.status_name === '待审核'">
          <van-button round @click="audit(item.id, 2)" style="margin-right: 0.2rem">拒绝</van-button>
          <van-button round type="info" @click="audit(item.id, 1)">通过</van-button>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>已选中{{ checkoutList.length }}个</span>
      <div>
        <van-button round @click="botch(2)" style="margin-right: 0.2rem; width: 3rem">批量拒绝</van-button>
        <van-button round type="info" @click="botch(1)" style="width: 3rem">批量审核</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { report_lists, report_audit } from "@/Api/activity/index";

export default {
  props: {},
  components: {},
  data() {
    return {
      list: {},
      checkoutList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await report_lists({ params: { active_id: this.$route.query.active_id || 1 } });
      if (res.data.data.length) {
        res.data.data.forEach((element) => {
          element.checked = false;
        });
      }
      this.list = res.data.data;
    },

    async audit(id, type) {
      await report_audit({
        report_id: id,
        report_option: type,
      });
      await this.getList();
    },

    count() {
      this.checkoutList = this.list.reduce((init, val) => {
        if (val.checked) init.push(val.id);
        return init;
      }, []);
    },

    async botch(type) {
      if (!this.checkoutList.length) {
        this.$toast("未选择数据");
        return;
      }
      await report_audit({
        report_id: this.checkoutList.join(),
        report_option: type,
      });
      await this.getList();
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

.user_name > div {
  max-width: 33%;
}

.labe {
  font-size: 0.3733rem;
  font-weight: 600;
  display: inline-block;
}

.name_input {
  flex: 1;
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

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.5rem;
  background: #fff;
  padding: 0.2rem 0.2rem 0.5rem 0.2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/deep/.van-button {
  height: 0.8rem;
  width: 1.8rem;
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
