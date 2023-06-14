<template>
  <div class="search_box" :style="{ backgroundColor: bg }">
    <div class="search_content" :style="{ backgroundColor: bgc }">
      <van-icon name="search" class="search_icon" />
      <form @submit.prevent='' action=''>
        <van-field
          v-model="keywork"
          clearable
          placeholder="请输入要搜索的医院、医生"
          type="text"
          :style="{ backgroundColor: bgc }"
          class="search_input"
          @input="Oninput($event)"
          @clear="input_clear"
          @keyup="keypress($event)"
        />

        <!-- <input
        class="search_input"
        type="text"
        placeholder="请输入要搜索的医院、医生"
        :disabled="disabled"
        v-model="keywork"
        @input="Oninput($event)"
        :style="{ backgroundColor: bgc }"
        />-->
      </form>
      <span class="search_text" @click="search">搜索</span>
    </div>
  </div>
</template>

<script>
import { doctor_list } from "@/Api/doctor/doctor_list";
export default {
  props: {
    bgc: {
      type: String,
      default: "#fff"
    },
    bg: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      keywork: ""
    };
  },
  created() {},
  methods: {
    search() {
      this.$emit("search", this.keywork);
    },
    Oninput(e) {
      if (e == "") {
        this.$emit("change", "");
      }
      // if (e.target.value == "") {
      //   console.log(11);
      //   this.$emit("change", "");
      // }
    },
    input_clear(val) {
      // console.log(val);
    },

    keypress(e) {
      console.log(e);
      if (e.keyCode == 13) {
        this.$emit("search", e.target.value);
      }
      console.log("键盘按钮", e.keyCode);
    }
  }
};
</script>

<style lang = "less" scoped>
/deep/.van-cell {
  padding: 0;
}

/deep/.van-field__body {
  height: 100%;
}

.search_box {
  width: 9.4667rem;
  height: 1.0667rem;
  padding: 0 0.2667rem;
  display: flex;
  align-items: center;
}

.search_content {
  width: 100%;
  height: 0.9333rem;
  border-radius: 0.6667rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search_input {
  border: none;
  width: 5.8667rem;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  color: #727272;
  font-size: 0.3467rem;
  top: 0;
}

.search_icon {
  position: absolute;
  left: 0.5867rem;
  font-weight: 600;
  color: #c2c1c2;
  z-index: 999;
}

.search_text {
  position: absolute;
  right: 0.5333rem;
  color: #4f9ec9;
  font-weight: 600;
  letter-spacing: 0.0533rem;
  font-size: 0.32rem;
  z-index: 999;
}

.search_text::before {
  content: "";
  position: absolute;
  width: 0.0533rem;
  height: 0.4rem;
  left: -0.4rem;
  top: 0.0533rem;
  background: #c2c1c1;
}
</style>