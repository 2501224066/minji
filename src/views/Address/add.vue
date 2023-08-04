<template>
    <!-- 地址编辑 -->
    <div class="add_address">
        <div class="content_address">
            <div class="user_name">
                <span>姓名</span>
                <input type="text" placeholder="请输入姓名" v-model="onsignee" />
            </div>

            <div class="user_phobe">
                <span>手机号</span>
                <input type="Number" placeholder="请输入手机号" v-model="phone" />
            </div>

            <div class="user_region" @click="show_area">
                <span>所属区域</span>
                <input type="text" placeholder="请选择所属区域" v-model="area" disabled />
            </div>

            <div class="user_address">
                <span>详细地址</span>
                <input type="text" placeholder="请输入详细地址" v-model="address" />
            </div>

            <!--默认地址  -->
            <div class="default_address">
                <van-checkbox v-model="checked" @change="change_checked" label-position="left"
                    checked-color="#d48f3f">设置默认地址</van-checkbox>
            </div>
        </div>

        <span class="asve_btn" @click="save_message">保存</span>
        <span class="del_btn" v-if="type == 2" @click="del_address">删除</span>

        <!-- 区域 -->
        <van-popup v-model="show" round position="bottom">
            <van-area title="选择区域" :area-list="areaList" @confirm="confirm" />
        </van-popup>
    </div>
</template>
  
<script>
import { areaList } from '@vant/area-data';

import { add_address } from '@/Api/address/add_address'

import { del } from "@/Api/address/del"

import { Dialog } from 'vant';

export default {
    props: {},
    components: {},
    data() {
        return {
            // 姓名
            onsignee: '',
            phone: '',
            //  省id
            province_id: '',
            //  市id
            city_id: '',
            //  区id
            area_id: '',

            // 默认
            is_default: 0,

            // id 0是新增带id就是修改
            id: 0,

            area: '',
            address: '',
            checked: false,
            areaList,
            show: false,

            type: 1,  //1是新增  2是编辑
        };
    },
    created() {
        if (this.$router.history.current.query.type == 2) {
            this.onsignee = JSON.parse(localStorage.getItem('address')).name
            this.phone = JSON.parse(localStorage.getItem('address')).tel
            this.province_id = JSON.parse(localStorage.getItem('address')).province_id
            this.city_id = JSON.parse(localStorage.getItem('address')).city_id
            this.area_id = JSON.parse(localStorage.getItem('address')).area_id
            this.area = JSON.parse(localStorage.getItem('address')).province_name + JSON.parse(localStorage.getItem('address')).city_name + JSON.parse(localStorage.getItem('address')).area_name
            this.address = JSON.parse(localStorage.getItem('address')).address_name
            this.id = JSON.parse(localStorage.getItem('address')).id


            console.log(JSON.parse(localStorage.getItem('address')))
        }
        this.type = this.$router.history.current.query.type
    },

    methods: {
        show_area() {
            this.show = true
        },

        // 确认区域
        confirm(val) {
            console.log(val)
            this.show = false
            this.province_id = val[0].code
            this.city_id = val[1].code
            this.area_id = val[2].code
            this.area = val[0].name + val[1].name + val[2].name
        },

        // 默认地址
        change_checked(val) {
            console.log(val)
            val ? this.is_default = 1 : this.is_default = 0
        },

        // 保存地址
        save_message() {
            if (this.onsignee == '') {
                this.$toast('请输入收货人姓名')
                return
            } else if (this.phone == '') {
                this.$toast('请输入手机号')
                return
            } else if (this.area == '') {
                this.$toast('请选择区域')
                return
            } else if (this.address == '') {
                this.$toast('请填写详细地址')
                return
            } else if (!/^1[34578]\d{9}$/.test(this.phone)) {
                this.$toast('请输入正确的手机号')
                return
            } else {
                console.log('添加')
                this.add_address(this.address, this.province_id, this.city_id, this.area_id, this.onsignee, this.phone, this.is_default, this.id)
            }
        },

        async add_address(address, province_id, city_id, area_id, consignee, phone, is_default, id) {
            const { data: res } = await add_address(address, province_id, city_id, area_id, consignee, phone, is_default, id)
            if (res.code != 200) {

                this.$toast(res.message)
                return
            }
            this.$toast('添加成功')
            this.$router.back(-1)
            console.log(res)
        },

        // 删除地址
        del_address() {
            Dialog.confirm({
                title: '',
                message: '确定是否要删除该地址',
            })
                .then(() => {
                    // on confirm
                    this.del(this.id)
                })
                .catch(() => {
                    // on cancel
                });
        },

        async del(id) {
            const { data: res } = await del(id)
            if (res.code != 200) {
                this.$toast(res.message)
                return
            }
            this.$toast('删除成功')
            this.$router.back(-1)
        },

    }
};
</script>
  
<style lang = "less" scoped>
.add_address {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99;
    background: #eff5f5;

}

.content_address {
    width: 380px;
    height: 8.2667rem;
    background: #ffffff;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 2.4rem;
    border-radius: .2667rem;
}

.user_name,
.user_phobe,
.user_region,
.user_address {
    height: 1.3333rem;
    font-size: .3733rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .4rem;
}

.user_name span,
.user_phobe span,
.user_region span,
.user_address span {
    font-weight: 600;
    width: 1.8667rem;
    text-align: right;
}

.user_name input,
.user_phobe input,
.user_region input,
.user_address input {
    width: 5.3333rem;
    height: .9333rem;
    border-radius: .1333rem;
    background: #dbdbdb;
    border: none;
    margin-left: .2667rem;
    padding-left: .2667rem;
}

/* 默认地址 */
.default_address {
    font-size: .32rem;
    margin-top: .2667rem;
    display: flex;
    justify-content: space-between;
    padding: 0 1.5467rem;
}

/* 保存 */
.asve_btn,
.del_btn {
    display: inline-block;
    width: 8.8rem;
    height: 1.0667rem;
    border-radius: .6667rem;
    position: absolute;
    background: #2bc2cd;
    left: 50%;
    transform: translate(-50%);
    top: 13.0667rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
}


.del_btn {
    background: red;
    top: 14.6667rem;
}
</style>