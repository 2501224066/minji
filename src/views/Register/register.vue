<template>
  <div class="register">
    <img src="@/assets/img/63.png" alt class="title_img" />

    <div class="phone_box">
      <input type="number" placeholder="请输入手机号" v-model="phone" />
    </div>

    <div class="phone_code">
      <input type="number" placeholder="请输入验证码" v-model="code" />
      <span class="get_code" @click="get_code">{{ message }}</span>
    </div>

    <span class="reg_btn" @click="mobileLogin">注册</span>
  </div>
</template>

<script>
import { set_sms } from '@/Api/register/set_sms'

import { mobileLogin } from '@/Api/register/mobileLogin'
export default {
  props: {},
  components: {},
  data() {
    return {
      time: 60,
      timeID: '',
      message: '获取验证码',
      isrequset: false,
      login: false,
      phone: '',
      code: ''
    };
  },
  created() { },
  methods: {
    // 获取验证码
    get_code() {
      if (this.phone == '') {
        this.$toast('请输入手机号')
        return
      }

      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$toast('请输入正确的手机号')
        return
      }
      if (this.isrequset) {
        this.$toast('请勿重复获取验证码')
        return
      }
      this.isrequset = true
      this.set_sms(this.phone)
    },

    async set_sms(phone) {
      const { data: res } = await set_sms(phone)
      if (res.code != 200) {
        this.$toast(res.message)
        this.isrequset = false
        return
      }
      this.timeID = setInterval(() => {
        if (this.time <= 0) {
          clearInterval(this.timeID)
          this.message = '获取验证码'
          this.isrequset = false
          this.time = 60
        } else {
          this.time--
          this.message = this.time
        }

      }, 1000);
      console.log(res)
    },

    async mobileLogin() {
      if (this.login) {
        return
      }
      if (this.phone == '') {
        this.$toast('请输入手机号')
        return
      }

      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$toast('请输入正确的手机号')
        return
      }

      if (this.code == '') {
        this.$toast('请输入验证码')
        return
      }
      this.login = true
      const { data: res } = await mobileLogin(this.code, this.phone)
      this.login = false
      if (res.code != 200) {
        this.$toast(res.message)
        return
      }
      localStorage.setItem('is_reg', 0)
      this.$router.replace('/index')
    }
  }
};
</script>

<style lang = "less" scoped>
.register {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fbfffc;
  z-index: 99;
}

.title_img {
  width: 2.6667rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 10vh;
}

.phone_box {
  width: 7.4667rem;
  height: 1.0667rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 30vh;
}

.phone_box input {
  width: 90%;
  height: 100%;
  border: none;
  background: #e7f2f2;
  border-radius: 0.6667rem;
  padding-left: 10%;
}

.phone_code {
  width: 7.4667rem;
  height: 1.0667rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border-radius: 0.6667rem;
  background: #e7f2f2;
  top: 40vh;
  display: flex;
  align-items: center;
}

.phone_code input {
  width: 60%;
  height: 100%;
  border: none;
  background: #e7f2f2;
  border-radius: 0.6667rem;
  padding-left: 10%;
}

.get_code {
  color: #2bc2cd;
  flex: 1;
  text-align: center;
}

.reg_btn {
  position: absolute;
  width: 8rem;
  height: 1.0667rem;
  background: #2bc2cd;
  border-radius: 0.2667rem;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.4267rem;
  color: #fff;
  letter-spacing: 0.0533rem;
  top: 55vh;
}
</style>