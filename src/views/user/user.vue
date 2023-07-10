<template>
  <div class="user_box">
    <div class="message_box">
      <div class="user_header">
        <span>头像</span>
        <van-uploader :after-read="afterRead">
          <img v-if="head_img_url" :src="head_img_url" alt="" class="user_img" />
        </van-uploader>
      </div>
      <div class="user_header">
        <span>用户姓名</span>
        <input type="text" v-model="nnickname" style="border: none;flex:1;text-align: right;" />
      </div>

      <van-cell style="color:#969799" is-link title="生日" :value="birthday_data" @click="birthday"></van-cell>
      
      <div class="user_header">
        <span>手机号</span>
        <span>{{ mobile }}</span>
      </div>
    </div>

    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        :columns-order="['year', 'month', 'day']"
        @confirm="confirm_data"
      />
    </van-popup>

    <span class="qd_btn" @click="go_main">确定</span>
  </div>
</template>

<script>
import { get_user } from "@/Api/user/user";
import { upload, userEdit } from "@/Api/activity/index";

export default {
  props: {},
  components: {},
  data() {
    return {
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,
      birthday_data: "",
      head_img_url: "",
      nnickname: "",
      mobile: "",
    };
  },
  created() {
    this.get_user();
  },
  methods: {
    async afterRead(file) {
      let res = await upload({ head_img_url: file.content });
      this.head_img_url = res.data.data.path;
    },

    birthday() {
      this.show = true;
    },
    confirm_data(data) {
      this.birthday_data = this.timeFormat(data);
      this.show = false;
    },

    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      console.log(val);
      return val;
    },

    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day + "";
    },

    async get_user() {
      const { data: res } = await get_user();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.head_img_url = res.data.head_img_url;
      this.nnickname = res.data.nnickname;
      this.mobile = res.data.mobile;
      this.birthday_data = res.data.birthday;
    },

    async go_main() {
      await userEdit({
        nickname: this.nnickname,
        head_img_url: this.head_img_url,
        birthday: this.birthday_data,
      });
      this.$toast("操作成功");
    },
  },
  filters: {
    //加密手机号
    filterTel(val) {
      if (val) {
        return val.substring(3, 0) + "****" + val.substring(7);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user_box {
  width: 100%;
  height: 100%;
  background: #f0f4f7;
  position: absolute;
  z-index: 99;
}

.message_box {
  width: 100%;
  height: 240px;
  background: #fff;
}

.user_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  color: #969799;
}

.user_img {
  width: 40px;
  border-radius: 50%;
}

.qd_btn {
  width: 270px;
  height: 35px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  background: #60c0ce;
  left: 50%;
  transform: translate(-50%);
  margin-top: 50px;
}
</style>
