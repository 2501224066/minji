<template>
  <div class="add_card">
    <div class="tt">用户信息</div>

    <div class="card">
      <div class="user_name">
        <span class="labe">
          姓名 <span class="name_input">{{ detail.user_name }}</span>
        </span>
        <span class="labe">
          年龄 <span class="name_input">{{ detail.age }}</span>
        </span>
        <span class="labe">
          性别
          <span class="name_input">{{ detail.sex }}</span>
        </span>
      </div>
      <div class="user_card">
        <span class="labe">手机号</span>
        <div class="name_input">{{ detail.tel }}</div>
      </div>
      <div class="user_card">
        <span class="labe">公司名称</span>
        <div class="name_input">{{ detail.compony }}</div>
      </div>
      <div class="user_card" v-if="detail.id_card">
        <span class="labe">身份证号</span>
        <div class="name_input">{{ detail.id_card }}</div>
      </div>
      <div class="user_card" v-if="detail.occu">
        <span class="labe">职业</span>
        <div class="name_input">{{ detail.occu }}</div>
      </div>
      <div class="user_card" v-if="detail.address">
        <span class="labe">居住地址</span>
        <div class="name_input">{{ detail.address }}</div>
      </div>

      <div class="t">既往史</div>

      <div class="user_phone">
        <span class="labe">乳腺手术或活检史</span>
        <div class="name_input">
          {{ detail.breast }}
        </div>
      </div>

      <div class="user_phone">
        <span class="labe">甲状腺手术或活检史</span>
        <div class="name_input">
          {{ detail.thyroid }}
        </div>
      </div>

      <div class="user_phone">
        <span class="labe">激素替代治疗</span>
        <div class="name_input">{{ detail.hormone }}</div>
      </div>

      <div class="t">家族史</div>

      <div class="user_card">
        <span class="labe">乳腺癌家族史</span>
        <div class="name_input">{{ detail.breast_cancer }}</div>
      </div>
      <div class="user_card">
        <span class="labe">甲状腺家族史</span>
        <div class="name_input">{{ detail.thyroid_cancer }}</div>
      </div>
      <div class="t">现病史</div>
      <div class="user_card">
        <span class="labe">现病史</span>
        <div class="name_input">{{ detail.xbs }}</div>
      </div>
    </div>

    <div style="text-align: center; margin: 1rem 0">
      <img v-if="detail.result_status !== 2" :src="detail.base64_img" style="width: 5rem; height: 5rem" />
      <div v-if="detail.result_status === 0">请将二维码给彩超老师填写结果</div>
      <div v-if="detail.result_status === 1">请将二维码给专家填写建议</div>
      <div v-if="detail.result_status === 2">报告已完成，请联系业务经理打印</div>
      <van-button v-if="detail.result_status !== 2" round type="info" @click="getDetail" style="margin: 0.5rem 0">
        刷新
      </van-button>
    </div>
  </div>
</template>

<script>
import { report_my } from "@/Api/activity/index";

export default {
  props: {},
  components: {},
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const res = await report_my({ params: { active_id: this.$route.query.active_id || 1 } });
      this.detail = res.data.data;
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
  margin: 0 2%;
  border-radius: 0.3733rem;
  background: #fff;
  overflow: hidden;
  border: 0.1rem solid #eee;
  margin-bottom: 0.6rem;
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
}

.labe {
  font-size: 0.3733rem;
  font-weight: 600;
  display: inline-block;
  width: 40%;
}

.name_input {
  font-size: 0.3467rem;
  color: #7e7e7e;
  border: none;
  background: #fff;
}

.name_input_x {
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
  height: 1.0667rem;
  width: 9.3333rem;
  background: #2bc2cd;
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
