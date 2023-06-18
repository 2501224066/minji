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
            性别 <span class="name_input">{{ info.sex }}</span>
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
          <van-radio-group v-model="breast_result">
            <van-radio icon-size="0.5rem" name="未见明显占位性病灶">未见明显占位性病灶</van-radio>
            <van-radio icon-size="0.5rem" name="左侧">左侧</van-radio>
            <van-radio icon-size="0.5rem" name="右侧">右侧</van-radio>
            <van-radio icon-size="0.5rem" name="左右两侧">左右两侧</van-radio>
          </van-radio-group>
        </div>

        <div v-if="breast_result === '左侧' || breast_result === '左右两侧'" class="card">
          <div class="user_card">
            <span class="labe">左侧</span>
            <van-radio-group v-model="breast_left_num" direction="horizontal">
              <van-radio icon-size="0.5rem" name="单发">单发</van-radio>
              <van-radio icon-size="0.5rem" name="多发">多发</van-radio>
            </van-radio-group>
          </div>
          <div class="user_card">
            <span class="labe">较大者</span>
            <input type="number" v-model="rxl2" class="name_input_x" style="width: 1rem; text-align: center" />mmX
            <input type="number" v-model="rxl3" class="name_input_x" style="width: 1rem; text-align: center" />mmX
            <input type="number" v-model="rxl4" class="name_input_x" style="width: 1rem; text-align: center" />mm
          </div>
          <div class="user_card">
            <span class="labe">位置</span>
            <input type="text" v-model="breast_left_position" class="name_input_x" />
          </div>
          <div class="user_card">
            <span class="labe">囊实性</span>
            <van-radio-group v-model="breast_left_cystic" direction="horizontal">
              <van-radio icon-size="0.5rem" name="囊性">囊性</van-radio>
              <van-radio icon-size="0.5rem" name="实性">实性</van-radio>
              <van-radio icon-size="0.5rem" name="囊实混合型">囊实混合型</van-radio>
            </van-radio-group>
          </div>
          <div class="user_card">
            <span class="labe">BI-RADS分级</span>
            <van-radio-group v-model="breast_left_level" direction="horizontal">
              <van-radio icon-size="0.5rem" name="1类">1类</van-radio>
              <van-radio icon-size="0.5rem" name="2类">2类</van-radio>
              <van-radio icon-size="0.5rem" name="3类">3类</van-radio>
              <van-radio icon-size="0.5rem" name="4a类">4a类</van-radio>
              <van-radio icon-size="0.5rem" name="4b类">4b类</van-radio>
              <van-radio icon-size="0.5rem" name="4c类">4c类</van-radio>
              <van-radio icon-size="0.5rem" name="5类">5类</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div v-if="breast_result === '右侧' || breast_result === '左右两侧'" class="card">
          <div class="user_card">
            <span class="labe">右侧</span>
            <van-radio-group v-model="breast_right_num" direction="horizontal">
              <van-radio icon-size="0.5rem" name="单发">单发</van-radio>
              <van-radio icon-size="0.5rem" name="多发">多发</van-radio>
            </van-radio-group>
          </div>
          <div class="user_card">
            <span class="labe">较大者</span>
            <input type="number" v-model="rxr2" class="name_input_x" style="width: 1rem; text-align: center" />mmX
            <input type="number" v-model="rxr3" class="name_input_x" style="width: 1rem; text-align: center" />mmX
            <input type="number" v-model="rxr4" class="name_input_x" style="width: 1rem; text-align: center" />mm
          </div>
          <div class="user_card">
            <span class="labe">位置</span>
            <input type="text" v-model="breast_right_position" class="name_input_x" />
          </div>
          <div class="user_card">
            <span class="labe">囊实性</span>
            <van-radio-group v-model="breast_right_cystic" direction="horizontal">
              <van-radio icon-size="0.5rem" name="囊性">囊性</van-radio>
              <van-radio icon-size="0.5rem" name="实性">实性</van-radio>
              <van-radio icon-size="0.5rem" name="囊实混合型">囊实混合型</van-radio>
            </van-radio-group>
          </div>
          <div class="user_card">
            <span class="labe">BI-RADS分级</span>
            <van-radio-group v-model="breast_right_level" direction="horizontal">
              <van-radio icon-size="0.5rem" name="1类">1类</van-radio>
              <van-radio icon-size="0.5rem" name="2类">2类</van-radio>
              <van-radio icon-size="0.5rem" name="3类">3类</van-radio>
              <van-radio icon-size="0.5rem" name="4a类">4a类</van-radio>
              <van-radio icon-size="0.5rem" name="4b类">4b类</van-radio>
              <van-radio icon-size="0.5rem" name="4c类">4c类</van-radio>
              <van-radio icon-size="0.5rem" name="5类">5类</van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="user_card">
          <span class="labe">甲状腺彩超结果</span>
          <van-radio-group v-model="thyroid_result">
            <van-radio icon-size="0.5rem" name="正常">正常</van-radio>
            <van-radio icon-size="0.5rem" name="弥漫性病变甲亢">弥漫性病变甲亢</van-radio>
            <van-radio icon-size="0.5rem" name="弥漫性病变甲状腺炎">弥漫性病变甲状腺炎</van-radio>
          </van-radio-group>
        </div>

        <div class="user_card" v-if="thyroid_result === '弥漫性病变甲亢' || thyroid_result === '弥漫性病变甲状腺炎'">
          <span class="labe">位置</span>
          <van-radio-group v-model="thyroid_result_position">
            <van-radio icon-size="0.5rem" name="左侧叶">左侧叶</van-radio>
            <van-radio icon-size="0.5rem" name="右侧叶">右侧叶</van-radio>
            <van-radio icon-size="0.5rem" name="双侧叶结节">双侧叶结节</van-radio>
          </van-radio-group>
        </div>

        <div v-if="thyroid_result_position === '左侧叶' || thyroid_result_position === '双侧叶结节'" class="card">
          <div class="user_card">
            <span class="labe">左侧</span>
            <van-radio-group v-model="thyroid_left_num" direction="horizontal">
              <van-radio icon-size="0.5rem" name="单发">单发</van-radio>
              <van-radio icon-size="0.5rem" name="多发">多发</van-radio>
            </van-radio-group>
          </div>
          <div class="user_card">
            <span class="labe">较大者</span>
            <input type="number" v-model="jzxl2" class="name_input_x" style="width: 1rem; text-align: center" />mmX
            <input type="number" v-model="jzxl3" class="name_input_x" style="width: 1rem; text-align: center" />mmX
            <input type="number" v-model="jzxl4" class="name_input_x" style="width: 1rem; text-align: center" />mm
          </div>
          <div class="user_card">
            <span class="labe">位置</span>
            <input type="text" v-model="thyroid_left_position" class="name_input_x" />
          </div>
          <div class="user_card">
            <span class="labe">囊实性</span>
            <van-radio-group v-model="thyroid_left_cystic" direction="horizontal">
              <van-radio icon-size="0.5rem" name="囊性">囊性</van-radio>
              <van-radio icon-size="0.5rem" name="实性">实性</van-radio>
              <van-radio icon-size="0.5rem" name="囊实混合型">囊实混合型</van-radio>
            </van-radio-group>
          </div>
          <div class="user_card">
            <span class="labe">BI-RADS分级</span>
            <van-radio-group v-model="thyroid_left_level" direction="horizontal">
              <van-radio icon-size="0.5rem" name="1类">1类</van-radio>
              <van-radio icon-size="0.5rem" name="2类">2类</van-radio>
              <van-radio icon-size="0.5rem" name="3类">3类</van-radio>
              <van-radio icon-size="0.5rem" name="4a类">4a类</van-radio>
              <van-radio icon-size="0.5rem" name="4b类">4b类</van-radio>
              <van-radio icon-size="0.5rem" name="4c类">4c类</van-radio>
              <van-radio icon-size="0.5rem" name="5类">5类</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div v-if="thyroid_result_position === '右侧叶' || thyroid_result_position === '双侧叶结节'" class="card">
          <div class="user_card">
            <span class="labe">右侧</span>
            <van-radio-group v-model="thyroid_right_num" direction="horizontal">
              <van-radio icon-size="0.5rem" name="单发">单发</van-radio>
              <van-radio icon-size="0.5rem" name="多发">多发</van-radio>
            </van-radio-group>
          </div>
          <div class="user_card">
            <span class="labe">较大者</span>
            <input type="number" v-model="jzxr2" class="name_input_x" style="width: 1rem; text-align: center" />mmX
            <input type="number" v-model="jzxr3" class="name_input_x" style="width: 1rem; text-align: center" />mmX
            <input type="number" v-model="jzxr4" class="name_input_x" style="width: 1rem; text-align: center" />mm
          </div>
          <div class="user_card">
            <span class="labe">位置</span>
            <input type="text" v-model="thyroid_right_position" class="name_input_x" />
          </div>
          <div class="user_card">
            <span class="labe">囊实性</span>
            <van-radio-group v-model="thyroid_right_cystic" direction="horizontal">
              <van-radio icon-size="0.5rem" name="囊性">囊性</van-radio>
              <van-radio icon-size="0.5rem" name="实性">实性</van-radio>
              <van-radio icon-size="0.5rem" name="囊实混合型">囊实混合型</van-radio>
            </van-radio-group>
          </div>
          <div class="user_card">
            <span class="labe">BI-RADS分级</span>
            <van-radio-group v-model="thyroid_right_level" direction="horizontal">
              <van-radio icon-size="0.5rem" name="1类">1类</van-radio>
              <van-radio icon-size="0.5rem" name="2类">2类</van-radio>
              <van-radio icon-size="0.5rem" name="3类">3类</van-radio>
              <van-radio icon-size="0.5rem" name="4a类">4a类</van-radio>
              <van-radio icon-size="0.5rem" name="4b类">4b类</van-radio>
              <van-radio icon-size="0.5rem" name="4c类">4c类</van-radio>
              <van-radio icon-size="0.5rem" name="5类">5类</van-radio>
            </van-radio-group>
          </div>
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
import { color_doppler_set, report_info } from "@/Api/activity/index";
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
      breast_result: "",
      breast_left_num: "",
      rxl2: "",
      rxl3: "",
      rxl4: "",
      breast_left_position: "",
      breast_left_cystic: "",
      breast_left_level: "",
      breast_right_num: "",
      rxr2: "",
      rxr3: "",
      rxr4: "",
      breast_right_position: "",
      breast_right_cystic: "",
      breast_right_level: "",
      thyroid_result: "",
      thyroid_result_position: "",
      thyroid_left_num: "",
      jzxl2: "",
      jzxl3: "",
      jzxl4: "",
      thyroid_left_position: "",
      thyroid_left_cystic: "",
      thyroid_left_level: "",
      thyroid_right_num: "",
      jzxr2: "",
      jzxr3: "",
      jzxr4: "",
      thyroid_right_position: "",
      thyroid_right_cystic: "",
      thyroid_right_level: "",
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const res = await report_info({ report_id: this.$route.query.report_id || 1 });
      this.info = res.data.data;
      if (this.info.audit_sign) this.show = true;
    },

    handleReset() {
      this.$refs.esign.reset();
    },

    async add() {
      this.$refs.esign
        .generate()
        .then(async (img) => {
          if (this.breast_result === "") {
            this.$toast("乳腺彩超结果未选择");
            return;
          } else if (this.breast_result === "左侧" || this.breast_result === "左右两侧") {
            if (
              this.breast_left_num === null ||
              this.breast_left_position === null ||
              this.breast_left_cystic === null ||
              this.breast_left_level === null ||
              this.rxl2 === null ||
              this.rxl3 === null ||
              this.rxl4 === null
            ) {
              this.$toast("乳腺彩超结果左侧未填写完整");
              return;
            }
          } else if (this.breast_result === "右侧" || this.breast_result === "左右两侧") {
            if (
              this.breast_right_num === null ||
              this.breast_right_position === null ||
              this.breast_right_cystic === null ||
              this.breast_right_level === null ||
              this.rxr2 === null ||
              this.rxr3 === null ||
              this.rxr4 === null
            ) {
              this.$toast("乳腺彩超结果右侧未填写完整");
              return;
            }
          }
          if (this.thyroid_result === "") {
            this.$toast("甲状腺彩超结果未选择");
            return;
          } else if (this.thyroid_result === "弥漫性病变甲亢" || this.thyroid_result === "弥漫性病变甲状腺炎") {
            if (this.thyroid_result_position === "左侧叶" || this.thyroid_result_position === "双侧叶结节") {
              if (
                this.thyroid_left_num === null ||
                this.thyroid_left_position === null ||
                this.thyroid_left_cystic === null ||
                this.thyroid_left_level === null ||
                this.jzxl2 === null ||
                this.jzxl3 === null ||
                this.jzxl4 === null
              ) {
                this.$toast("甲状腺彩超结果左侧未填写完整");
                return;
              }
            } else if (this.thyroid_result_position === "右侧叶" || this.thyroid_result_position === "双侧叶结节") {
              if (
                this.thyroid_right_num === null ||
                this.thyroid_right_position === null ||
                this.thyroid_right_cystic === null ||
                this.thyroid_right_level === null ||
                this.jzxr2 === null ||
                this.jzxr3 === null ||
                this.jzxr4 === null
              ) {
                this.$toast("甲状腺彩超结果右侧未填写完整");
                return;
              }
            }
          }

          let obj = {
            report_id: this.$route.query.report_id || 1,
            breast_result: this.breast_result,
            breast_left_num: this.breast_left_num,
            breast_left_position: this.breast_left_position,
            breast_left_cystic: this.breast_left_cystic,
            breast_left_level: this.breast_left_level,
            breast_right_num: this.breast_right_num,
            breast_right_position: this.breast_right_position,
            breast_right_cystic: this.breast_right_cystic,
            breast_right_level: this.breast_right_level,
            thyroid_result: this.thyroid_result,
            thyroid_result_position: this.thyroid_result_position,
            thyroid_left_num: this.thyroid_left_num,
            thyroid_left_position: this.thyroid_left_position,
            thyroid_left_cystic: this.thyroid_left_cystic,
            thyroid_left_level: this.thyroid_left_level,
            thyroid_right_num: this.thyroid_right_num,
            thyroid_right_position: this.thyroid_right_position,
            thyroid_right_cystic: this.thyroid_right_cystic,
            thyroid_right_level: this.thyroid_right_level,
            breast_left_larger: `${this.rxl2}mmX${this.rxl3}mmX${this.rxl4}mm`,
            breast_right_larger: `${this.rxr2}mmX${this.rxr3}mmX${this.rxr4}mm`,
            thyroid_left_larger: `${this.jzxl2}mmX${this.jzxl3}mmX${this.jzxl4}mm`,
            thyroid_right_larger: `${this.jzxr2}mmX${this.jzxr3}mmX${this.jzxr4}mm`,
            audit_sign: img,
          };

          let res = await color_doppler_set(obj);
          if (res.data.code !== 200) return;
          this.show = true;
        })
        .catch((err) => {
          console.log(err);
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
