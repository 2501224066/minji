    <template>
  <div class="headlth_list" ref="page">
    <!-- 搜索框 -->
    <!-- <Search :bgc="'#eff4f5'" :bg="'#fff'"></Search> -->

    <!-- 分类 -->
    <!-- <div class="price_list">
      <LyTab @change_list="change_list" :yTabList="yTabList" :activeColor="'#ed8e1d'"></LyTab>
    </div>-->

    <!-- 内容 -->
    <div class="video_content" v-if="headlth_list.length != 0">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          class="headlth_item"
          @click="go_detail(item.id, item.type)"
          v-for="item in headlth_list"
          :key="item.id"
        >
          <div class="headlth_left">
            <p class="work_title">{{ item.title }}</p>
            <p class="work_where">{{ item.desc }}</p>
          </div>
          <div class="headlth_right">
            <img :src="'https://www.minjisd.com/storage/' + item.thumb" alt class="work_cover" />
          </div>
        </div>
      </van-list>
    </div>

    <Nothing v-if="headlth_list.length == 0"></Nothing>

    <!-- TAB -->
    <!-- <div class="tab_box">
      <van-tabs v-model="active" title-active-color="#ed9329" color="#ed9329">
        <van-tab title="科普小视频">
          <div class="video_content">
            <div class="headlth_item" @click="go_detail">
              <div class="headlth_left">
                <p class="work_title">4个习惯改善口腔溃疡</p>
                <p class="work_where">口腔溃疡大作战</p>
              </div>
              <div class="headlth_right">
                <img src="@/assets/img/29.png" alt class="work_cover" />
              </div>
            </div>
            <div class="headlth_item">
              <div class="headlth_left">
                <p class="work_title">4个习惯改善口腔溃疡</p>
                <p class="work_where">口腔溃疡大作战</p>
              </div>
              <div class="headlth_right">
                <img src="@/assets/img/29.png" alt class="work_cover" />
              </div>
            </div>
            <div class="headlth_item">
              <div class="headlth_left">
                <p class="work_title">4个习惯改善口腔溃疡</p>
                <p class="work_where">口腔溃疡大作战</p>
              </div>
              <div class="headlth_right">
                <img src="@/assets/img/29.png" alt class="work_cover" />
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="科普小文章">
          <div class="essay_content">
            <div class="headlth_item">
              <div class="headlth_left">
                <p class="work_title">4个习惯改善口腔溃疡</p>
                <p class="work_where">口腔溃疡大作战</p>
              </div>
              <div class="headlth_right">
                <img src="@/assets/img/29.png" alt class="work_cover" />
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>-->
  </div>
</template>

<script>
import Search from "@/components/Search/search";
import Nothing from "@/components/Nothing/noting";
import LyTab from "@/components/ly_tab/ly_tab";

import { get_cate } from "@/Api/health/get_cate";

import { get_catelist } from "@/Api/health/get_catelist";

export default {
  props: {},
  components: { Search, LyTab, Nothing },
  data() {
    return {
      yTabList: [],

      headlth_list: [],

      page: 1,

      pages: 0,

      loading: true,

      finished: false,

      isrequest: false,

      id: ""
    };
  },
  created() {
    // this.get_cate();
    this.get_catelist(3, 1);
  },
  mounted() {},
  methods: {
    // 前往详情
    go_detail(id, type) {
      //   if (type == 1) {
      //     this.$router.push("/headlth_detail?id=" + id);
      //   } else {
      //     this.$router.push("/video_detail?id=" + id);
      //   }
      this.$router.push("/headlth_detail?id=" + id);
    },

    // 获取文章分类
    // async get_cate() {
    //   const { data: res } = await get_cate();
    //   if (res.code != 200) {
    //     this.$toast(res.message);
    //     return;
    //   }
    //   res.data.forEach((element, index) => {
    //     element.name = index;
    //     this.yTabList.push(element);
    //   });
    //   this.id = res.data[0].id;
    //   this.get_catelist(3, 1);
    // },

    // 获取分下文章
    async get_catelist(id, page) {
      this.isrequest = true;
      const { data: res } = await get_catelist(id, page);
      this.isrequest = false;
      this.loading = false;
      if (res.code != 200) {
        this.$toast(res.message);
        return;
      }
      console.log(res);
      this.headlth_list = [...this.headlth_list, ...res.data.list];
      this.pages = res.data.pages;
    },

    // 下拉加载
    onLoad() {
      if (this.isrequest) {
        return;
      }
      if (this.page >= this.pages) {
        this.finished = true;
        return;
      }
      this.page = this.page + 1;
      this.get_catelist(3, this.page);
    }
    // 点击切换
    // change_list(val) {
    //   console.log(val);
    //   this.headlth_list = [];
    //   this.page = 1;
    //   this.id = val;
    //   this.get_catelist(val, this.page);
    // }
  }
};
</script>

<style lang = "less" scoped>
.headlth_list {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  background: #eff4f5;
  z-index: 99;
}

.video_content,
.essay_content {
  padding: 0.2667rem;
}

.headlth_item {
  display: flex;
  padding: 0.4rem 0.2667rem;
  border-bottom: 1px solid #d4d4d4;
  background: #fff;
}

.headlth_left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.work_title {
  font-size: 0.4rem;
  font-weight: 600;
  letter-spacing: 0.0267rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.work_where {
  font-size: 0.32rem;
  color: #898989;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.work_cover {
  width: 3.2rem;
}

.headlth_right {
  padding: 0 0.2667rem;
}
</style>