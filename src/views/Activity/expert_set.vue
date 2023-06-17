<template>
  <div class="add_card">
    <div class="show" v-if="show">
      <img src="@/assets/img/67.png" alt="" style="width: 2rem; height: 2rem" />
      <div style="margin-top: 0.4rem">提交成功</div>
    </div>

    <div v-else>
      <div class="tt">用户信息</div>

      <div class="card">
        <div class="user_name">
          <span class="labe">
            姓名 <span class="name_input">{{ info.user_name }}</span>
          </span>
          <span class="labe">
            年龄 <span class="name_input">{{ info.age }}</span>
          </span>
          <span class="labe">
            性别
            <span class="name_input">{{ info.sex }}</span>
          </span>
        </div>
        <div class="user_card">
          <span class="labe">手机号</span>
          <div class="name_input">{{ info.tel }}</div>
        </div>
        <div class="user_card">
          <span class="labe">公司名称</span>
          <div class="name_input">{{ info.compony }}</div>
        </div>
        <div class="user_card" v-if="info.id_card">
          <span class="labe">身份证号</span>
          <div class="name_input">{{ info.id_card }}</div>
        </div>
        <div class="user_card" v-if="info.occu">
          <span class="labe">职业</span>
          <div class="name_input">{{ info.occu }}</div>
        </div>
        <div class="user_card" v-if="info.address">
          <span class="labe">居住地址</span>
          <div class="name_input">{{ info.address }}</div>
        </div>

        <div class="t">既往史</div>

        <div class="user_phone">
          <span class="labe">乳腺手术或活检史</span>
          <div class="name_input">
            {{ info.breast }}
          </div>
        </div>

        <div class="user_phone">
          <span class="labe">甲状腺手术或活检史</span>
          <div class="name_input">
            {{ info.thyroid }}
          </div>
        </div>

        <div class="user_phone">
          <span class="labe">激素替代治疗</span>
          <div class="name_input">{{ info.hormone }}</div>
        </div>

        <div class="t">家族史</div>

        <div class="user_card">
          <span class="labe">乳腺癌家族史</span>
          <div class="name_input">{{ info.breast_cancer }}</div>
        </div>

        <div class="user_card">
          <span class="labe">甲状腺家族史</span>
          <div class="name_input">{{ info.thyroid_cancer }}</div>
        </div>
        <div class="t">现病史</div>
        <div class="user_card">
          <span class="labe">现病史</span>
          <div class="name_input">{{ info.xbs }}</div>
        </div>
      </div>

      <div class="tt">彩超结果</div>

      <div class="card">
        <div class="user_card">
          <span class="labe">乳腺彩超结果</span>
          {{ info.breast_result }}
        </div>

        <div v-if="info.breast_result === '左侧' || info.breast_result === '左右两侧'" class="card">
          <div class="user_card">
            <span class="labe">左侧</span>
            {{ info.breast_left_num }}
          </div>
          <div class="user_card">
            <span class="labe">较大者</span>
            {{ info.breast_left_larger }}
          </div>
          <div class="user_card">
            <span class="labe">位置</span>
            {{ info.breast_left_position }}
          </div>
          <div class="user_card">
            <span class="labe">囊实性</span>
            {{ info.breast_left_cystic }}
          </div>
          <div class="user_card">
            <span class="labe">BI-RADS分级</span>
            {{ info.breast_left_level }}
          </div>
        </div>
        <div v-if="info.breast_result === '右侧' || info.breast_result === '左右两侧'" class="card">
          <div class="user_card">
            <span class="labe">右侧</span>
            {{ info.breast_right_num }}
          </div>
          <div class="user_card">
            <span class="labe">较大者</span>
            {{ info.breast_right_larger }}
          </div>
          <div class="user_card">
            <span class="labe">位置</span>
            {{ info.breast_right_position }}
          </div>
          <div class="user_card">
            <span class="labe">囊实性</span>
            {{ info.breast_right_cystic }}
          </div>
          <div class="user_card">
            <span class="labe">BI-RADS分级</span>
            {{ info.breast_right_level }}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="user_card">
          <span class="labe">甲状腺彩超结果</span>
          {{ info.thyroid_result }}
        </div>

        <div
          class="user_card"
          v-if="info.thyroid_result === '弥漫性病变甲亢' || info.thyroid_result === '弥漫性病变甲状腺炎'"
        >
          <span class="labe">位置</span>
          {{ info.thyroid_result_position }}
        </div>

        <div
          v-if="info.thyroid_result_position === '左侧叶' || info.thyroid_result_position === '双侧叶结节'"
          class="card"
        >
          <div class="user_card">
            <span class="labe">左侧</span>
            {{ info.thyroid_left_num }}
          </div>
          <div class="user_card">
            <span class="labe">较大者</span>
            {{ info.thyroid_left_larger }}
          </div>
          <div class="user_card">
            <span class="labe">位置</span>
            {{ info.thyroid_left_position }}
          </div>
          <div class="user_card">
            <span class="labe">囊实性</span>
            {{ info.thyroid_left_cystic }}
          </div>
          <div class="user_card">
            <span class="labe">BI-RADS分级</span>
            {{ info.thyroid_left_level }}
          </div>
        </div>
        <div
          v-if="info.thyroid_result_position === '右侧叶' || info.thyroid_result_position === '双侧叶结节'"
          class="card"
        >
          <div class="user_card">
            <span class="labe">右侧</span>
            {{ info.thyroid_right_num }}
          </div>
          <div class="user_card">
            <span class="labe">较大者</span>
            {{ info.thyroid_right_larger }}
          </div>
          <div class="user_card">
            <span class="labe">位置</span>
            <input type="text" v-model="info.thyroid_right_position" class="name_input_x" />
          </div>
          <div class="user_card">
            <span class="labe">囊实性</span>
            {{ info.thyroid_right_cystic }}
          </div>
          <div class="user_card">
            <span class="labe">BI-RADS分级</span>
            {{ info.thyroid_right_level }}
          </div>
        </div>
      </div>

      <div class="card">
        <img :src="info.audit_sign" style="width: 100%" />
      </div>

      <div class="tt">专家意见</div>
      <div class="card">
        <div class="user_card">
          <span class="labe">乳腺建议</span>
          <van-radio-group v-model="rxjy">
            <van-radio icon-size="0.5rem" name="定期彩超随访">定期彩超随访</van-radio>
            <van-radio icon-size="0.5rem" name="乳腺钼靶治疗">乳腺钼靶治疗</van-radio>
            <van-radio icon-size="0.5rem" name="磁共振(MRI)检查">磁共振(MRI)检查</van-radio>
            <van-radio icon-size="0.5rem" name="穿刺活检或手术活检">穿刺活检或手术活检</van-radio>
            <van-radio icon-size="0.5rem" :name="5">其他</van-radio>
          </van-radio-group>
        </div>
        <div class="card" v-if="rxjy === 5" style="padding: 0.1rem; box-sizing: border-box">
          <textarea type="text" rows="5" v-model="rxjy1" placeholder="请填写其他建议" class="name_input" />
        </div>
      </div>
      <div class="card">
        <div class="user_card">
          <span class="labe">甲状腺建议</span>
          <van-radio-group v-model="jzxjy">
            <van-radio icon-size="0.5rem" name="定期彩超随访">定期彩超随访</van-radio>
            <van-radio icon-size="0.5rem" name="甲状腺超声造影检查">甲状腺超声造影检查</van-radio>
            <van-radio icon-size="0.5rem" name="甲状腺细针穿刺活检(FNA)">甲状腺细针穿刺活检(FNA)</van-radio>
            <van-radio icon-size="0.5rem" name="手术治疗">手术治疗</van-radio>
            <van-radio icon-size="0.5rem" :name="5">其他</van-radio>
          </van-radio-group>
        </div>
        <div class="card" v-if="jzxjy === 5" style="padding: 0.1rem; box-sizing: border-box">
          <textarea type="text" rows="5" v-model="jzxjy1" placeholder="请填写其他建议" class="name_input" />
        </div>
      </div>

      <div class="tt">签名</div>
      <div class="card">
        <div class="clear" @click="handleReset">清空</div>
        <vue-esign
          ref="esign"
          class="mySign"
          :width="800"
          :height="300"
          :isCrop="ve.isCrop"
          :lineWidth="ve.lineWidth"
          :lineColor="ve.lineColor"
          :bgColor.sync="ve.bgColor"
        />
      </div>

      <div class="add_btn">
        <van-button round type="info" @click="add">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { report_info, expert_advice } from "@/Api/activity/index";
import Vue from "vue";
import vueEsign from "vue-esign";
Vue.use(vueEsign);

export default {
  props: {},
  components: {},
  data() {
    return {
      show: false,
      ve: {
        lineWidth: 6,
        lineColor: "#000000",
        bgColor: "#fff",
        resultImg: "",
        isCrop: false,
      },
      info: {},
      rxjy: "",
      rxjy1: "",
      jzxjy: "",
      jzxjy1: "",
    };
  },
  created() {
    this.getColor();
  },
  methods: {
    async getColor() {
      const res = await report_info({ report_id: this.$route.query.report_id || 1 });
      this.info = res.data.data;
      if (this.info.expert_sign) this.show = true;
    },

    handleReset() {
      this.$refs.esign.reset();
    },

    add() {
      if (this.rxjy === "" || (this.rxjy === 5 && this.rxjy1 === "")) {
        this.$toast("请填写乳腺建议");
        return;
      }
      if (this.jzxjy === "" || (this.jzxjy === 5 && this.jzxjy1 === "")) {
        this.$toast("请填写甲状腺建议");
        return;
      }
      this.$refs.esign
        .generate()
        .then(async (img) => {
          let res = await expert_advice({
            report_id: this.$route.query.report_id || 1,
            breast_advice: this.rxjy === 5 ? this.rxjy1 : this.rxjy,
            thyroid_advice: this.jzxjy === 5 ? this.jzxjy1 : this.jzxjy,
            expert_sign: img,
          });
          if (res.data.code !== 200) return;
          this.show = true;
        })
        .catch((err) => {
          if (err === "Warning: Not Signned!") this.$toast("未签名，请在签名板上签名");
        });
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
  padding: 1.6rem 0;
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
