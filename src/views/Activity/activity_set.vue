<template>
  <div class="add_card">
    <div class="user_name">
      <span class="labe">姓名</span>
      <input type="text" placeholder="姓名" class="name_input" v-model="user_name" />
    </div>

    <div class="user_card">
      <span class="labe">年龄</span>
      <input type="text" maxlength="2" placeholder="年龄" class="name_input" v-model="age" />
    </div>
    <div class="user_card">
      <span class="labe">性别</span>
      <van-radio-group v-model="sex" direction="horizontal">
        <van-radio icon-size="0.5rem" name="男">男</van-radio>
        <van-radio icon-size="0.5rem" name="女">女</van-radio>
      </van-radio-group>
    </div>

    <div class="user_phone">
      <span class="labe">手机号</span>
      <input type="text" maxlength="11" v-model="tel" placeholder="手机号" class="name_input" />
    </div>

    <div class="user_card">
      <span class="labe">公司名称</span>
      <input type="text" v-model="compony" placeholder="公司名称" class="name_input" />
    </div>

    <div class="user_card" v-if="status.id_card_status === 1">
      <span class="labe">身份证号</span>
      <input type="text" v-model="id_card" maxlength="18" placeholder="身份证号" class="name_input" />
    </div>

    <div class="user_card" v-if="status.occu_status === 1">
      <span class="labe">职业</span>
      <input type="text" v-model="occu" placeholder="职业" class="name_input" />
    </div>

    <div class="user_card" v-if="status.address_status === 1">
      <span class="labe">居住地址</span>
      <input type="text" v-model="address" placeholder="居住地址" class="name_input" />
    </div>

    <div class="t">既往史</div>

    <div class="user_phone">
      <span class="labe">乳腺手术或活检史</span>
      <div>
        <van-radio-group v-model="zl1" direction="horizontal">
          <van-radio icon-size="0.5rem" name="无">无</van-radio>
          <van-radio icon-size="0.5rem" :name="4">有</van-radio>
        </van-radio-group>
        <van-radio-group v-if="zl1 === 4" v-model="zl11" direction="horizontal" style="margin-top: 0.1rem">
          <van-radio icon-size="0.5rem" name="良性">良性</van-radio>
          <van-radio icon-size="0.5rem" name="恶性">恶性</van-radio>
        </van-radio-group>
      </div>
    </div>

    <div class="user_phone">
      <span class="labe">甲状腺手术或活检史</span>
      <div>
        <van-radio-group v-model="zl2" direction="horizontal">
          <van-radio icon-size="0.5rem" name="无">无</van-radio>
          <van-radio icon-size="0.5rem" :name="4">有</van-radio>
        </van-radio-group>
        <van-radio-group v-if="zl2 === 4" v-model="zl22" direction="horizontal" style="margin-top: 0.1rem">
          <van-radio icon-size="0.5rem" name="良性">良性</van-radio>
          <van-radio icon-size="0.5rem" name="恶性">恶性</van-radio>
        </van-radio-group>
      </div>
    </div>

    <div class="user_phone">
      <span class="labe">激素替代治疗</span>
      <div>
        <van-radio-group
          v-model="zl3"
          direction="horizontal"
          @change="
            () => {
              open_cardTime;
            }
          "
        >
          <van-radio icon-size="0.5rem" name="无">无</van-radio>
          <van-radio icon-size="0.5rem" :name="4">有</van-radio>
        </van-radio-group>
        <input
          type="text"
          v-if="zl3 === 4"
          v-model="zl33"
          placeholder="治疗时间"
          class="name_input"
          @focus="open_cardTime"
          style="margin-top: 0.1rem"
        />
      </div>
    </div>

    <div class="t">家族史</div>

    <div class="user_card">
      <span class="labe">乳腺癌家族史</span>
      <div>
        <van-radio-group v-model="jz1" direction="horizontal">
          <van-radio icon-size="0.5rem" name="无">无</van-radio>
          <van-radio icon-size="0.5rem" :name="4">有</van-radio>
        </van-radio-group>
        <input
          v-if="jz1 === 4"
          type="text"
          v-model="jz11"
          placeholder="请填写患者与本人关系"
          class="name_input"
          style="margin-top: 0.1rem"
        />
      </div>
    </div>

    <div class="user_card">
      <span class="labe">甲状腺家族史</span>
      <div>
        <van-radio-group v-model="jz2" direction="horizontal">
          <van-radio icon-size="0.5rem" name="无">无</van-radio>
          <van-radio icon-size="0.5rem" :name="4">有</van-radio>
        </van-radio-group>
        <input
          v-if="jz2 === 4"
          type="text"
          v-model="jz22"
          placeholder="请填写患者与本人关系"
          class="name_input"
          style="margin-top: 0.1rem"
        />
      </div>
    </div>

    <div class="t">现病史</div>

    <div class="user_card">
      <span class="labe">现病史</span>
      <textarea type="text" rows="5" v-model="xbs" placeholder="请填写现病史" class="name_input" />
    </div>

    <div class="add_btn">
      <van-button round type="info" @click="add">提交</van-button>
    </div>

    <!-- 时间 -->
    <van-action-sheet v-model="show_time">
      <div class="content">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="治疗时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm_time"
          @cancel="cancel_time"
          :formatter="formatter"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { activity_set, report_my, get_info } from "@/Api/activity/index";

export default {
  props: {},
  components: {},
  data() {
    return {
      show: false,
      show_time: false,
      age: "",
      xbs: "",
      tel: "",
      user_name: "",
      sex: "",
      compony: "",
      zl1: "",
      zl11: "",
      zl2: "",
      zl22: "",
      zl3: "",
      zl33: "",
      jz1: "",
      jz11: "",
      jz2: "",
      jz22: "",
      id_card: "",
      address: "",
      occu: "",
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 5, 1),
      status: {},
    };
  },
  created() {
    this.getDetail();
    this.getInfo();
  },
  methods: {
    async getDetail() {
      const res = await report_my({ params: { active_id: this.$route.query.active_id || 1 } });
      if (res.data.data) this.$router.push("/activity_show?active_id=" + this.$route.query.active_id || 1);
    },

    async getInfo() {
      const res = await get_info({ active_id: this.$route.query.active_id || 1 });
      this.status = res.data.data;
    },

    open_cardTime() {
      this.show_time = true;
    },

    // 确定有效期
    confirm_time(val) {
      this.zl33 = this.timeFormat(val);
      this.show_time = false;
    },

    // 取消有效期
    cancel_time() {
      this.show_time = false;
    },

    // 时间过滤
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },

    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      return year + "-" + month;
    },

    async add() {
      if (this.user_name === "") {
        this.$toast("请填写姓名");
        return;
      } else if (this.tel === "") {
        this.$toast("请填写手机号");
        return;
      } else if (this.sex === "") {
        this.$toast("请选择性别");
        return;
      } else if (this.age === "") {
        this.$toast("请填写年龄");
        return;
      } else if (this.compony === "") {
        this.$toast("请填写公司名称");
        return;
      } else if (this.status.id_card_status === 1 && this.id_card === "") {
        this.$toast("请填写身份证号");
        return;
      } else if (this.status.occu_status === 1 && this.occu === "") {
        this.$toast("请填写职业");
        return;
      } else if (this.status.address_status === 1 && this.address === "") {
        this.$toast("请填写居住地址");
        return;
      } else if (
        this.zl1 === "" ||
        (this.zl1 === 4 && this.zl11 === "") ||
        this.zl2 === "" ||
        (this.zl2 === 4 && this.zl22 === "") ||
        this.zl3 === "" ||
        (this.zl3 === 4 && this.zl33 === "")
      ) {
        this.$toast("请完整填写既往史");
        return;
      } else if (
        this.jz1 === "" ||
        (this.jz1 === 4 && this.jz11 === "") ||
        this.jz2 === "" ||
        (this.jz2 === 4 && this.jz22 === "")
      ) {
        this.$toast("请完整填写家族史");
        return;
      } else if (this.xbs === "") {
        this.$toast("请填写现病史");
        return;
      } else {
        let obj = {
          user_name: this.user_name,
          active_id: this.$route.query.active_id || 1,
          age: this.age,
          sex: this.sex,
          tel: this.tel,
          compony: this.compony,
          breast: this.zl1 !== "无" ? this.zl11 : this.zl1,
          thyroid: this.zl2 !== "无" ? this.zl22 : this.zl2,
          hormone: this.zl3 !== "无" ? this.zl33 : this.zl3,
          breast_cancer: this.jz1 !== "无" ? this.jz11 : this.jz1,
          thyroid_cancer: this.jz2 !== "无" ? this.jz22 : this.jz2,
          id_card: this.id_card,
          address: this.address,
          occu: this.occu,
          xbs: this.xbs,
        };
        let res = await activity_set(obj);
        if (res.data.code !== 200) return;

        this.$router.push("/activity_show?active_id=" + (this.$route.query.active_id || 1));
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
