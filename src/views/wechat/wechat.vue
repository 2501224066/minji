<template>
    <div class="wechat">
        <div class="success_box">
            <img src="@/assets/img/67.png" alt="">
            <span>支付成功</span>
        </div>

        <span class="order_btn" @click="go_order">查看订单</span>
    </div>
</template>

<script>
export default {
    props: {},
    components: {},
    data() {
        return {
            type: ''
        }
    },
    created() {
        this.type = this.$router.history.current.query.type
    },
    methods: {
        go_order(val) {
            if (this.type == 1) {
                // 去实物
                this.$router.push('/order?active=0&status=0')
            } else if (this.type == 2) {
                // 去虚拟
                this.$router.push('/card')
            } else {
                // 去医生
                this.$router.push('/doctor_order')
            }
        }
    }
}
</script>

<style lang = "less" scoped>
.wechat{
    width: 100%;
    height: 100%;
    background: #ecf8f6;
    position: absolute;
    z-index: 99;
}

.success_box{
    width: 8rem;
    height: 4.5333rem;
    background: #fff;
    border-radius: .1333rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 10vh;
    font-size: .3467rem;
}

.success_box img{
    width: 1.6rem;
    margin-bottom: .4rem;
}

.order_btn{
    width: 2.6667rem;
    height: .8rem;
    background: #fff;
    border-radius: .1333rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 42vh;
    font-size: .32rem;
}
    
</style>