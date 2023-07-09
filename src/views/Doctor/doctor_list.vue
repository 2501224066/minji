<template>
  <div class="doctor_list" ref="page">
    <!-- 搜索框 -->
    <Search
      :bgc="'#eff4f5'"
      :bg="'#fff'"
      :price_active="this.price_active"
      :city_right="this.city_right"
      :m_active="this.m_active"
      :department_right="this.department_right"
      @search="search"
      @change="change"
    ></Search>
    <!-- 筛选 -->
    <div class="select_box">
      <van-dropdown-menu active-color="#4f9ec9">
        <van-dropdown-item :title="city_text" ref="city" id="city">
          <van-tree-select
            :items="city_arry"
            :active-id.sync="city_right"
            :main-active-index.sync="city_left"
            :height="500"
            @click-item="city_code"
          />
        </van-dropdown-item>
        <van-dropdown-item :title="department_text" ref="department">
          <van-tree-select
            :items="department_arry"
            :active-id.sync="department_right"
            :main-active-index.sync="department_left"
            :height="500"
            @click-item="department_code"
          />
        </van-dropdown-item>
        <van-dropdown-item :title="mechanism_text" ref="mechanism">
          <div class="mechanism_list">
            <div
              :class="['mechanism_item', m_active == item.id ? 'mechanism_active' : '']"
              v-for="(item) in mechanism_list"
              :key="item.id"
              @click="choose_mechanism(item)"
            >
              <span class="mechanism_name">{{ item.name }}</span>
              <span class="iconfont icon-duigou choose" v-if="m_active == item.id"></span>
            </div>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="screen">
          <div class="screen_box">
            <div class="screen_price">
              <span class="price_title">价格区间</span>
              <div class="price_box">
                <span
                  :class="['price_item', price_active == item.id ? 'price_active' : '']"
                  @click="choose_price(item)"
                  v-for="item in price_list"
                  :key="item.id"
                >{{ item.text }}</span>
              </div>
            </div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <!-- 内容 -->
    <div class="content_box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="doctor_arry.length != 0"
      >
        <div
          class="doctor_item"
          @click="go_detail(item.id)"
          v-for="item in doctor_arry"
          :key="item.id"
        >
          <div class="doctor_img">
            <img :src="'https://www.minjisd.com/storage/' + item.img" alt />
          </div>
          <div class="doctor_content">
            <div class="content_one">
              <span class="doctor_name">{{ item.username }}</span>
              <div class="label_box">
                <i
                  class="label"
                  v-if="index <= 0"
                  v-for="(label, index) in item.hospital.tag"
                  :key="label"
                >
                  {{
                  label
                  }}
                </i>
                <i class="label_hospital">{{ item.hospital.name }}</i>
              </div>
            </div>
            <p class="content_tow">
              <span class="doctor_school" v-if="item.pro_title!=null">{{ item.pro_title }}</span>
              <span class="doctor_title"  v-if="item.docter_level.name!=null">{{ item.docter_level.name }}</span>
              <span class="doctor_school" v-if="item.title!=null">{{ item.title }}</span>
            </p>

            <p class="content_four">
              <span v-for="(b,index) in item.bright" :key="index">{{b}}</span>
            </p>

            <p class="content_three">擅长:{{ item.be_good }}</p>
            <div class="doctor_score">
              <div class="score_left">
                <!-- <i>医师星评</i> -->
                <img src="@/assets/img/21.png" alt class="stars" v-for="t in item.star" :key="t" />
              </div>
              <div class="score_right">
                <img src="@/assets/img/20.png" alt class="Challenge_Now" />
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <Nothing v-if="doctor_arry.length == 0"></Nothing>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search/search";
import Nothing from "@/components/Nothing/noting";
import { areaList } from "@vant/area-data";

// 医师列表
import { doctor_list } from "@/Api/doctor/doctor_list";

// 科室分类
import { doctor_select } from "@/Api/doctor/doctor_select";

// 医院分类
import { get_hospitalList } from "@/Api/doctor/get_hospitalList";

export default {
  props: {},
  components: {
    Search,
    Nothing
  },
  data() {
    return {
      page: 1,
      total: 0,
      limit: 0,
      pages: 0,
      keywords: "",
      loading: true,
      finished: false,
      doctor_arry: [],
      isrequest: false,

      // 城市默认选中左边
      city_left: 0,
      // 城市默认选中右边（id）
      city_right: "",
      // 城市的数据数组
      city_arry: [{ text: "全国", children: [{ text: "全国", id: "" }] }],
      city_text: "全国",

      // 科室默认选中左边
      department_left: 0,
      // 科室id
      department_right: "",
      department_arry: [
        { text: "全部科室", children: [{ text: "全部科室", id: 0 }] }
      ],
      department_text: "全部科室",

      //机构数据
      mechanism_list: [
        {
          name: "不限",
          id: ""
        }
      ],
      // 机构id
      m_active: "",
      mechanism_text: "不限",

      // 筛选（价格）
      price_list: [
        {
          text: "0-499",
          id: 1
        },
        {
          text: "500-999",
          id: 2
        },
        {
          text: "1000-2000",
          id: 3
        },
        {
          text: "2000以上",
          id: 4
        }
      ],
      // 价格id
      price_active: ""
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.page.scrollTop = 0;
    });
    if (this.$router.history.current.fullPath == "/doctor_list") {
      this.$store.commit("changeActive", 1);
    }

    this.doctor_list(
      this.page,
      this.keywords,
      this.price_active,
      this.city_right,
      this.m_active,
      this.department_right
    );
    this.doctor_select();
    this.get_hospitalList();
  },
  mounted() {
    // 处理城市数据
    console.log(areaList);
    for (let i in areaList.province_list) {
      var obj = {};
      var children = [];
      obj.text = areaList.province_list[i];
      this.city_arry.push(obj);
      for (let t in areaList.city_list) {
        var childrenobj = {};
        if (t.substring(0, 2) == i.substring(0, 2)) {
          childrenobj.text = areaList.city_list[t];
          childrenobj.id = t;
          children.push(childrenobj);
          obj.children = children;
        }
      }
    }
  },
  methods: {
    // 医师列表
    async doctor_list(
      page,
      keywords,
      price_active,
      city_right,
      m_active,
      department_right
    ) {
      this.isrequest = true;
      const { data: res } = await doctor_list(
        page,
        keywords,
        price_active,
        city_right,
        m_active,
        department_right
      );
      this.isrequest = false;
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      this.loading = false;
      this.total = res.data.total;
      this.limit = res.data.limit;
      this.doctor_arry = [...this.doctor_arry, ...res.data.list];
      console.log(res);
    },

    // 科室数据
    async doctor_select() {
      const { data: res } = await doctor_select();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      res.data.forEach(element => {
        this.department_arry.push(element);
      });
    },

    // 医院数据
    async get_hospitalList() {
      const { data: res } = await get_hospitalList();
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      res.data.forEach(element => {
        this.mechanism_list.push(element);
      });
      console.log(res);
    },

    // 加载
    onLoad() {
      if (this.isrequest) {
        return;
      }
      if (this.page*10 >= this.total) {
        this.finished = true;
        return;
      }

      this.page = this.page + 1;
      this.doctor_list(
        this.page,
        this.keywords,
        this.price_active,
        this.city_right,
        this.m_active,
        this.department_right
      );
    },

    // 搜索
    search(val) {
      this.keywords = val;
      this.doctor_arry = [];
      this.page = 1;
      this.total = 0;
      this.limit = 0;
      this.pages = 0;
      this.loading = true;
      this.finished = false;
      this.doctor_list(
        this.page,
        this.keywords,
        this.price_active,
        this.city_right,
        this.m_active,
        this.department_right
      );
    },

    change(val) {
      this.keywords = val;
      this.doctor_arry = [];
      this.page = 1;
      this.total = 0;
      this.limit = 0;
      this.pages = 0;
      this.loading = true;
      this.finished = false;
      this.doctor_list(
        this.page,
        this.keywords,
        this.price_active,
        this.city_right,
        this.m_active,
        this.department_right
      );
    },

    // 选择区域筛选时触发
    city_code(val) {
      this.city_right = val.id;
      this.city_text = val.text;
      this.$refs.city.toggle(false);
      this.doctor_arry = [];
      this.page = 1;
      this.total = 0;
      this.limit = 0;
      this.pages = 0;
      this.loading = true;
      this.finished = false;
      this.doctor_list(
        this.page,
        this.keywords,
        this.price_active,
        this.city_right,
        this.m_active,
        this.department_right
      );
    },

    // 科室筛选时触发
    department_code(val) {
      this.$refs.department.toggle(false);
      this.department_text = val.text;
      this.department_right = val.id;
      this.doctor_arry = [];
      this.page = 1;
      this.total = 0;
      this.limit = 0;
      this.pages = 0;
      this.loading = true;
      this.finished = false;
      this.doctor_list(
        this.page,
        this.keywords,
        this.price_active,
        this.city_right,
        this.m_active,
        this.department_right
      );
    },

    // 机构筛选
    choose_mechanism(val) {
      this.m_active = val.id;
      this.mechanism_text = val.name;
      this.$refs.mechanism.toggle(false);
      this.doctor_arry = [];
      this.page = 1;
      this.total = 0;
      this.limit = 0;
      this.pages = 0;
      this.loading = true;
      this.finished = false;
      this.doctor_list(
        this.page,
        this.keywords,
        this.price_active,
        this.city_right,
        this.m_active,
        this.department_right
      );
    },

    // 价格筛选
    choose_price(val) {
      console.log(val);
      this.price_active = val.id;
      this.$refs.screen.toggle(false);
      this.doctor_arry = [];
      this.page = 1;
      this.total = 0;
      this.limit = 0;
      this.pages = 0;
      this.loading = true;
      this.finished = false;
      this.doctor_list(
        this.page,
        this.keywords,
        this.price_active,
        this.city_right,
        this.m_active,
        this.department_right
      );
    },

    // 进入医生详情
    go_detail(val) {
      this.$router.push("/doctor_detail?id=" + val);
    }
  }
};
</script>

<style lang = "less" scoped>
.doctor_list {
  width: 100%;
  height: 100%;
  overflow: auto;
  /* height: 100%; */
  /* padding-bottom: 1.3333rem; */
  background: #eff4f5;
  position: relative;
}

/deep/.van-sidebar-item--select::before {
  background-color: #4f9ec9;
}

/deep/.van-sidebar-item {
  font-size: 0.3467rem;
}

/deep/.van-tree-select__item--active {
  color: #4f9ec9;
}

/deep/.van-tree-select__item {
  position: relative;
  padding: 0 0.8533rem 0 0.4267rem;
  font-weight: 500;
  line-height: 1.28rem;
  cursor: pointer;
}

/deep/.van-tree-select__nav-item {
  padding: 0.3733rem 0.32rem;
}

/deep/.van-dropdown-item__content {
  max-height: 90%;
}

/* 机构 */
.mechanism_list {
  width: 100%;
  background: #ffffff;
}

.mechanism_item {
  position: relative;
}

.mechanism_name {
  display: inline-block;
  font-size: 0.3467rem;
  padding: 0.2667rem 0 0.2667rem 0.5333rem;
}

.mechanism_active {
  color: #6eade8;
}

.choose {
  position: absolute;
  right: 0.5333rem;
  top: 0.32rem;
}

/* 筛选 */
.screen_box {
  width: 100%;
  height: 13.3333rem;
  background: #ffffff;
}

.price_title {
  font-size: 0.32rem;
  display: block;
  padding: 0.2933rem 0.7733rem;
}

.price_box {
  overflow-wrap: break-word;
  padding: 0 0.5867rem;
}

.price_item {
  font-size: 0.32rem;
  padding: 0.1067rem 0.4rem;
  border-radius: 0.6667rem;
  background: #f6f7fb;
  text-align: center;
  color: #5c5d5f;
  display: inline-block;
  margin-right: 0.1333rem;
  margin-bottom: 0.2667rem;
}

.price_active {
  background: #72b1d4;
  color: #ffffff;
}

/* 名医 */
.content_box {
  padding: 0 0.1333rem 2.2667rem 0.1333rem;
}

.doctor_item {
  padding: 0.2667rem 0;
  background: #ffffff;
  display: flex;
  border-radius: 0.6667rem;
  border-bottom: 1px solid #cfd2d2;
  margin-top: 0.2667rem;
}

.doctor_item:last-child {
  border: none;
}

/* 头像 */
.doctor_img {
  width: 1.6rem;
  padding: 0 0.2667rem;
}

.doctor_img img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
}

.doctor_content {
  flex: 1;
}

.content_one {
  /* height: 32px; */
  display: flex;
  align-items: center;
  display: flex;
}

.label_box {
  flex: 1;
  overflow-wrap: break-word;
  display: flex;
}

.doctor_name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* width: 2.0267rem; */
  /* white-space: nowrap; */
  font-size: 0.48rem;
  font-weight: 600;
  letter-spacing: 0.0267rem;
  margin-right: 0.1333rem;
  text-align: left;
}

.label {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  width: 1.1733rem;
  font-size: 0.2933rem;
  color: #ae7b49;
  font-weight: 600;
  border-radius: 0.1333rem;
  padding: 1px 0.1333rem;
  border: 1px solid #e0cbb5;
  margin-right: 0.1333rem;
  /* display: inline-block; */
  margin-top: 0.0533rem;
  text-align: center;
  background: #fef9f3;
  font-weight: 600;
}

.label_hospital {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /* width: 3.3333rem; */
  font-size: 0.2933rem;
  color: #2a9e88;
  font-weight: 600;
  border-radius: 0.1333rem;
  padding: 1px 0.1333rem;
  border: 1px solid #9bd4cb;
  margin-right: 0.1333rem;
  /* display: inline-block; */
  margin-top: 0.0533rem;
  text-align: center;
  background: #eeffff;
  font-weight: 600;
}

.content_tow {
  font-size: 0.3467rem;
  margin-top: 0.2667rem;
  display: flex;
}

.content_tow span {
  display: inline-block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-weight: 600;
  padding: 0px 0.1333rem;
  overflow: hidden;
}

.content_three {
  /* // height: 0.88rem; */
  font-size: 0.3467rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-top: 0.2667rem;
}

.content_four {
  font-size: 0.3467rem;
  margin-top: 0.2667rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.content_four span {
  color: #915014;
  display: inline-block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-weight: 600;
  margin-right: 5px;
  padding: 0px 0.5333rem;
  overflow: hidden;
  background: #fcf3e6;
  position: relative;
  margin-bottom: 0.2667rem;
}

.content_four span::after {
  content: "";
  width: 0.1867rem;
  height: 0.4267rem;
  position: absolute;
  background-image: url("@/assets/img/71.png");
  background-size: 100%;
  background-repeat: no-repeat;
  right: 0.1333rem;
  top: 0.05rem;
}

.content_four span::before {
  content: "";
  width: 0.1867rem;
  height: 0.4267rem;
  position: absolute;
  background-image: url("@/assets/img/70.png");
  background-size: 100%;
  background-repeat: no-repeat;
  left: 0.1333rem;
  top: 0.05rem;
}

.doctor_score {
  height: 1.0667rem;
  margin-top: 0.2667rem;
  display: flex;
  justify-content: space-between;
}

.score_right {
  width: 2.6667rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Challenge_Now {
  width: 1.8667rem;
}

.score_left {
  flex: 1;
  font-size: 0.32rem;
  color: #3fbea5;
  display: flex;
  align-items: center;
}

.score_left i {
  margin-right: 0.1333rem;
}

.stars {
  width: 0.4rem;
  margin-right: 0.1333rem;
}
</style>