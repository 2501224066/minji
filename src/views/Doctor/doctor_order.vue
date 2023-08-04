<template>
    <div class="doctor_order">
        <van-tabs v-model="active" @click="onClick" color="#15c2c5" title-active-color="#15c2c5">
            <van-tab title="全部">
                <div class="all">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                        v-if="order_arry.length != 0">
                        <div class="item" v-for="order_item in order_arry" :key="order_item.id">
                            <div class="item_one">
                                <span class="order_nub">订单编号:{{ order_item.order_no }}</span>
                                <span class="order_type">{{ order_item.status_name }}</span>
                            </div>
                            <div class="item_two">
                                <img :src="'https://www.minjisd.com/storage/' + order_item.docter.img" alt />
                                <div class="order_name">
                                    <div class="name">
                                        <span class="good_name">{{ order_item.docter.username
                                        }}</span>
                                        <span class="good_price">{{ order_item.type_name }}</span>
                                    </div>
                                    <!-- <span class="good_num">×{{ order_item.orderitem.num }}</span> -->
                                </div>
                            </div>
                            <div class="item_three">
                                <span class="order_time">下单时间:{{ order_item.created_at }}</span>
                                <span class="good_totle">
                                    <i class="totle">共{{ 1 }}件商品</i>
                                    <i class="pay">
                                        金额:<i class="score">￥{{ order_item.pay_score }}</i>
                                    </i>
                                </span>
                            </div>
                        </div>
                    </van-list>
                    <Nothing v-if="order_arry.length == 0"></Nothing>
                </div>
            </van-tab>
            <van-tab title="待支付">
                <div class="all">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                        v-if="order_arry.length != 0">
                        <div class="item" v-for="order_item in order_arry" :key="order_item.id">
                            <div class="item_one">
                                <span class="order_nub">订单编号:{{ order_item.order_no }}</span>
                                <span class="order_type">{{ order_item.status_name }}</span>
                            </div>
                            <div class="item_two">
                                <img :src="'https://www.minjisd.com/storage/' + order_item.docter.img" alt />
                                <div class="order_name">
                                    <div class="name">
                                        <span class="good_name">{{ order_item.docter.username
                                        }}</span>
                                        <span class="good_price">{{ order_item.type_name }}</span>
                                    </div>
                                    <!-- <span class="good_num">×{{ order_item.orderitem.num }}</span> -->
                                </div>
                            </div>
                            <div class="item_three">
                                <span class="order_time">下单时间:{{ order_item.created_at }}</span>
                                <span class="good_totle">
                                    <i class="totle">共{{ 1 }}件商品</i>
                                    <i class="pay">
                                        金额:<i class="score">￥{{ order_item.pay_score }}</i>
                                    </i>
                                </span>
                            </div>
                        </div>
                    </van-list>
                    <Nothing v-if="order_arry.length == 0"></Nothing>
                </div>
            </van-tab>
            <van-tab title="已支付">
                <div class="all">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                        v-if="order_arry.length != 0">
                        <div class="item" v-for="order_item in order_arry" :key="order_item.id">
                            <div class="item_one">
                                <span class="order_nub">订单编号:{{ order_item.order_no }}</span>
                                <span class="order_type">{{ order_item.status_name }}</span>
                            </div>
                            <div class="item_two">
                                <img :src="'https://www.minjisd.com/storage/' + order_item.docter.img" alt />
                                <div class="order_name">
                                    <div class="name">
                                        <span class="good_name">{{ order_item.docter.username
                                        }}</span>
                                        <span class="good_price">{{ order_item.type_name }}</span>
                                    </div>
                                    <!-- <span class="good_num">×{{ order_item.orderitem.num }}</span> -->
                                </div>
                            </div>
                            <div class="item_three">
                                <span class="order_time">下单时间:{{ order_item.created_at }}</span>
                                <span class="good_totle">
                                    <i class="totle">共{{ 1 }}件商品</i>
                                    <i class="pay">
                                        金额:<i class="score">￥{{ order_item.pay_score }}</i>
                                    </i>
                                </span>
                            </div>
                        </div>
                    </van-list>
                    <Nothing v-if="order_arry.length == 0"></Nothing>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { doctor_order } from '@/Api/order/doctor_order'
import Nothing from "@/components/Nothing/noting";
export default {
    props: {},
    components: {
        Nothing
    },
    data() {
        return {
            order_arry: [],
            page: 1,
            active: 0,
            loading: true,
            finished: false,
            isrequest: false
        }
    },
    created() {
        let dom = document.querySelector('.all')

        console.log(dom)
        if (dom !== null) {
            dom.scrollTop = 0;
        }
        this.doctor_order(this.active, this.page)
    },
    methods: {
        async doctor_order(status, page) {
            this.isrequest = true
            const { data: res } = await doctor_order(status, page)
            this.isrequest = false
            if (res.code != 200) {
                this.$toast(res.message)
                return
            }
            this.loading = false
            this.order_arry = [...this.order_arry, ...res.data.list]
            this.pages = res.data.pages

            console.log(res)
        },
        onLoad() {
            if (this.isrequest) {
                return;
            }
            if (this.page >= this.pages) {
                this.finished = true;
                return;
            }
            this.page = this.page + 1;
            this.doctor_order(this.active, this.page)
        },

        onClick() {
            this.order_arry = []
            this.pages = 0
            this.page = 1
            this.isrequest = false
            this.finished = false
            this.doctor_order(this.active, this.page)
        }
    }
}
</script>

<style lang = "less" scoped>
.doctor_order{
    width: 100%;
    height: 100%;
    position: absolute;
    padding-bottom: 50px;
    background: #eff4f5;
    padding-bottom: 50px;
    z-index: 99;
}

.all{
    width: 100%;
    height: auto;
    position: relative;
    padding-bottom: 50px;
    background: #eff4f5;
    padding-bottom: 50px;
    z-index: 99;
}

.item {
  background: #fff;
  padding: 0 0.4333rem;
  margin-top: 0.5333rem;
}

.item_one {
  font-size: 0.3467rem;
  display: flex;
  justify-content: space-between;
  padding: 0.2667rem 0;
}

.order_type {
  color: #42ced0;
}

.item_two {
  display: flex;
}

.order_name {
  flex: 1;
}

.name {
  font-size: 0.4533rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.2667rem;
}

.good_name {
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.good_price {
  color: #7c7b7b;
}

.item_two img {
  width: 2.4rem;
  border-radius: 0.2667rem;
  margin-right: 0.2667rem;
}

.good_num {
  display: block;
  text-align: right;
  color: #989797;
  font-size: 0.2933rem;
  margin-top: 0.1333rem;
}

.item_three {
  display: flex;
  font-size: 0.2667rem;
  color: #666666;
  height: 1.0667rem;
  justify-content: space-between;
  align-items: center;
}

.order_time {
  height: 100%;
  line-height: 1.2533rem;
  white-space: nowrap;
}

.good_totle {
  height: 100%;
  line-height: 1.0667rem;
  white-space: nowrap;
}

.totle {
  margin-right: 0.1333rem;
}

.score {
  font-size: 0.48rem;
  font-weight: 600;
}

/deep/.van-empty__image {
  width: 3.4667rem;
  height: 3.4667rem;
}

/deep/.van-empty {
  padding: 2rem 0;
}
</style>