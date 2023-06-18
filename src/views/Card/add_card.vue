<template>
  <div class="add_card">
    <div class="user_name">
      <span class="labe">姓名</span>
      <input type="text" placeholder="姓名" class="name_input" v-model="name" />
    </div>

    <div class="user_card" @click="open_cardType">
      <span class="labe">卡类别</span>
      <input
        type="text"
        class="name_input card_input"
        placeholder="卡类别"
        disabled
        v-model="card_type"
      />
    </div>

    <div class="user_card" @click="open_cardTime">
      <span class="labe">有效期</span>
      <input
        type="text"
        class="name_input card_input"
        :placeholder="time==''?`选择有效期`:`至${time}`"
        disabled
        v-model="time"
      />
    </div>

    <div class="user_phone">
      <span class="labe">使用次数</span>
      <input type="number" v-model="frequency" placeholder="请填写次数" class="name_input" />
    </div>

    <div class="user_phone">
      <span class="labe">手机号</span>
      <input type="number" v-model="phone" placeholder="手机号" class="name_input" />
    </div>

    <div class="add_btn">
      <van-button round type="info" @click="add">提交电子卡</van-button>
    </div>

    <!-- 卡类别 -->
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" style="height:8rem" />

    <!-- 时间 -->
    <van-action-sheet v-model="show_time">
      <div class="content">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="有效期"
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
// 添加卡包
import { add_card } from "@/Api/card/add_card";

// 获取卡类别
import { get_cardtype } from "@/Api/card/get_cardtype";

export default {
  props: {},
  components: {},
  data() {
    return {
      show: false,
      show_time: false,
      actions: [],
      card_type: "",
      card_id: "",
      phone: "",
      frequency: "",
      name: "",
      time: "",

      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2025, 11, 31),
      currentDate: new Date(2022, 11, 21)
    };
  },
  created() {
    this.get_cardtype();
  },
  methods: {
    // 获取类别
    async get_cardtype() {
      const { data: res } = await get_cardtype();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      res.data.list.forEach(element => {
        var obj = {};
        obj.name = element.title;
        obj.id = element.id;
        this.actions.push(obj);
      });
    },

    // 添加卡包
    async add_card(username, goods_id, expir_time, tel, num) {
      const { data: res } = await add_card(
        username,
        goods_id,
        expir_time,
        tel,
        num
      );
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.$toast("添加成功");
      this.$router.back(-1);
    },

    onSelect(val) {
      this.show = false;
      this.card_type = val.name;
      this.card_id = val.id;
    },

    // 卡包类型
    open_cardType() {
      console.log(11);
      this.show = true;
    },

    // 有效期
    open_cardTime() {
      this.show_time = true;
    },

    // 确定有效期
    confirm_time(val) {
      this.time = this.timeFormat(val);
      console.log(val);
      this.show_time = false;
    },

    // 取消有效期
    cancel_time() {
      this.show_time = false;
    },

    // 时间过滤
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "⽉";
      }
      if (type === "day") {
        return val + "⽇";
      }
      return val;
      console.log(val);
    },

    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day + "";
    },

    add() {
      if (this.name == "") {
        console.log(111);
        this.$toast("请填写姓名");
        return;
      } else if (this.phone == "") {
        this.$toast("请填写手机号");
        return;
      } else if (this.card_type == "") {
        this.$toast("请选择卡包类型");
        return;
      } else if (this.frequency == "") {
        this.$toast("请填写使用次数");
        return;
      } else if (this.time == "") {
        this.$toast("请选择有效期");
        return;
      } else if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$toast("请选择填写正确的手机号");
        return;
      } else {
        this.add_card(
          this.name,
          this.card_id,
          this.time + " " + "23:59:59",
          this.phone,
          this.frequency
        );
        console.log("提交");
      }
    }
  }
};
</script>

<style lang = "less" scoped>
.add_card {
  width: 100%;
  height: 100%;
  background: #eff4f5;
  position: absolute;
  z-index: 99;
}

.user_name,
.user_card,
.user_phone {
  display: flex;
  padding: 0.3733rem 0.5333rem;
  background: #fff;
  border: 0.0267rem solid #eff4f5;
}
.labe {
  font-size: 0.3733rem;
  font-weight: 600;
  display: inline-block;
  width: 70%;
}

.name_input {
  flex: 1;
  font-size: 0.3467rem;
  color: #7e7e7e;
  border: none;
  background: #fff;
}

.card_input {
  color: #1e1e1e !important;
}

.add_btn {
  display: flex;
  justify-content: center;
  margin-top: 1.6rem;
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
</style>