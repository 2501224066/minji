import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
    meta: {
      title: "民济健康",
    },
  },
  {
    path: "/index",
    name: "index",
    meta: {
      title: "民济健康",
      keepAlive: true,
    },
    component: () => import("@/views/Index/index.vue"),
  },
  {
    path: "/health",
    name: "health",
    meta: {
      title: "健康管理",
    },
    component: () => import("@/views/Health/health.vue"),
  },
  {
    path: "/psychology",
    name: "psychology",
    meta: {
      title: "健康心理",
    },
    component: () => import("@/views/Psychology/psychology.vue"),
  },
  {
    path: "/main",
    name: "mian",
    meta: {
      title: "我的",
    },
    component: () => import("@/views/Main/main.vue"),
  },
  {
    path: "/health_list",
    name: "health_list",
    meta: {
      title: "健康大讲堂",
    },
    component: () => import("@/views/HealthList/headlth_list.vue"),
  },
  {
    path: "/pyc_articles",
    name: "pyc_articles",
    meta: {
      title: "健康心理",
    },
    component: () => import("@/views/HealthList/pyc_articles.vue"),
  },
  {
    path: "/headlth_detail",
    name: "headlth_detail",
    meta: {
      title: "科普小文章",
    },
    component: () => import("@/views/HealthList/headlth_detail.vue"),
  },
  {
    path: "/video_detail",
    name: "video_detail",
    meta: {
      title: "科普小视频",
    },
    component: () => import("@/views/HealthList/video_detail.vue"),
  },
  {
    path: "/doctor_list",
    name: "doctor_list",
    meta: {
      title: "名医问诊",
    },
    component: () => import("@/views/Doctor/doctor_list.vue"),
  },
  {
    path: "/doctor_detail",
    name: "doctor_detail",
    meta: {
      title: "医生详情",
    },
    component: () => import("@/views/Doctor/doctor_detail.vue"),
  },
  {
    path: "/doctor_order",
    name: "doctor_order",
    meta: {
      title: "医生订单",
    },
    component: () => import("@/views/Doctor/doctor_order.vue"),
  },
  {
    path: "/psychiatrist",
    name: "psychiatrist",
    meta: {
      title: "心理咨询",
    },
    component: () => import("@/views/Doctor/psychiatrist.vue"),
  },
  {
    path: "/card",
    name: "card",
    meta: {
      title: "我的卡包",
    },
    component: () => import("@/views/Card/card.vue"),
  },

  {
    path: "/add_card",
    name: "add_card",
    meta: {
      title: "我的卡包",
    },
    component: () => import("@/views/Card/add_card.vue"),
  },

  {
    path: "/card_detail",
    name: "card_detail",
    meta: {
      title: "会员卡",
    },
    component: () => import("@/views/Card/card_detail.vue"),
  },

  {
    path: "/order",
    name: "order",
    meta: {
      title: "订单列表",
    },
    component: () => import("@/views/Order/order.vue"),
  },
  {
    path: "/address",
    name: "address",
    meta: {
      title: "收货地址",
    },
    component: () => import("@/views/Address/address.vue"),
  },
  {
    path: "/add",
    name: "add",
    meta: {
      title: "收货地址",
    },
    component: () => import("@/views/Address/add.vue"),
  },
  {
    path: "/shop",
    name: "shop",
    meta: {
      title: "民济商城",
    },
    component: () => import("@/views/Shop/shop.vue"),
  },
  {
    path: "/good_detail",
    name: "good_detail",
    meta: {
      title: "商品详情",
    },
    component: () => import("@/views/Shop/good_detail.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "注册",
    },
    component: () => import("@/views/Register/register.vue"),
  },
  {
    path: "/wechat",
    name: "wechat",
    meta: {
      title: "支付成功",
    },
    component: () => import("@/views/wechat/wechat.vue"),
  },

  {
    path: "/guanzhu",
    name: "guanzhu",
    meta: {
      title: "关注专家助手",
    },
    component: () => import("@/views/wechat/guanzhu.vue"),
  },

  {
    path: "/contact",
    name: "contact",
    meta: {
      title: "联系我们",
    },
    component: () => import("@/views/Main/contact.vue"),
  },
  {
    path: "/agreement",
    name: "agreement",
    meta: {
      title: "用户协议、隐私政策",
    },
    component: () => import("@/views/Main/agreement.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: {
      title: "会员信息",
    },
    component: () => import("@/views/user/user.vue"),
  },
  {
    path: "/activity_set",
    name: "activity_set",
    meta: {
      title: "报名",
    },
    component: () => import("@/views/Activity/activity_set.vue"),
  },
  {
    path: "/activity_show",
    name: "activity_show",
    meta: {
      title: "报名详情",
    },
    component: () => import("@/views/Activity/activity_show.vue"),
  },
  {
    path: "/activity_list",
    name: "activity_list",
    meta: {
      title: "审核列表",
    },
    component: () => import("@/views/Activity/activity_list.vue"),
  },
  {
    path: "/color_set",
    name: "color_set",
    meta: {
      title: "彩超结果",
    },
    component: () => import("@/views/Activity/color_set.vue"),
  },
  {
    path: "/expert_set",
    name: "expert_set",
    meta: {
      title: "专家建议",
    },
    component: () => import("@/views/Activity/expert_set.vue"),
  },
  {
    path: "/expert_list",
    name: "expert_list",
    meta: {
      title: "报告列表",
    },
    component: () => import("@/views/Activity/expert_list.vue"),
  },
  {
    path: "/expert_show",
    name: "expert_show",
    meta: {
      title: "报告详情",
    },
    component: () => import("@/views/Activity/expert_show.vue"),
  },
  {
    path: "/promotion",
    name: "promotion",
    meta: {
      title: "我的推广",
    },
    component: () => import("@/views/Promotion/index.vue"),
  },
  {
    path: "/promotion_qr",
    name: "promotion_qr",
    meta: {
      title: "推广名片",
    },
    component: () => import("@/views/Promotion/qr.vue"),
  },
  {
    path: "/promotion_people",
    name: "promotion_people",
    meta: {
      title: "推广人数",
    },
    component: () => import("@/views/Promotion/people.vue"),
  },
  {
    path: "/promotion_order",
    name: "promotion_order",
    meta: {
      title: "推广订单",
    },
    component: () => import("@/views/Promotion/order.vue"),
  },
  {
    path: "/promotion_money",
    name: "promotion_money",
    meta: {
      title: "佣金明细",
    },
    component: () => import("@/views/Promotion/money.vue"),
  },
  {
    path: "/promotion_tx",
    name: "promotion_tx",
    meta: {
      title: "提现",
    },
    component: () => import("@/views/Promotion/tx.vue"),
  },
  {
    path: "/promotion_zy",
    name: "promotion_zy",
    meta: {
      title: "卡片赠予",
    },
    component: () => import("@/views/Promotion/zy.vue"),
  },
  {
    path: "/promotion_readme",
    name: "promotion_readme",
    meta: {
      title: "分销协议",
    },
    component: () => import("@/views/Promotion/readme.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (token == null) {
    if (window.location.href.indexOf("token") != -1) {
      next();
    } else {
      localStorage.setItem("wxRedirectUrl", to.path);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13ab299182632eee&redirect_uri=https://www.minjisd.com/wechat/wxback&response_type=code&scope=snsapi_userinfo&state=${GetQueryString(
        "superior_id"
      ) || 0}#wechat_redirect&`;
    }
  } else {
    next();
  }
});

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  var context = "";
  if (r != null) context = decodeURIComponent(r[2]);
  reg = null;
  r = null;
  return context == null || context == "" || context == "undefined" ? "" : context;
}

export default router;
