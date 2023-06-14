<template>
  <div class="address_list">
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
      v-if="list.length!=0" @select="go_item" />

    <Nothing v-if="list.length == 0"></Nothing>
    <span class="add_span" v-if="list.length == 0" @click="onAdd">新增地址</span>
  </div>
</template>

<script>
import { address_list } from '@/Api/address/address_list';
import Nothing from "@/components/Nothing/noting";
export default {
  props: {},
  components: {
    Nothing
  },
  data() {
    return {
      list: [

      ],
      chosenAddressId: 0
    };
  },
  created() {
    this.address_list()
  },
  methods: {

    async address_list() {
      const { data: res } = await address_list()
      if (res.code != 200) {
        this.$toast(res.message)
        return
      }
      res.data.list.forEach(element => {
        var obj = {}
        obj.id = element.id
        obj.name = element.consignee
        obj.tel = element.phone
        obj.address = element.province_name + element.city_name + element.area_name + element.address
        obj.province_name = element.province_name
        obj.city_name = element.city_name
        obj.area_name = element.area_name
        obj.address_name = element.address
        obj.province_id = element.province_id
        obj.city_id = element.city_id
        obj.area_id = element.area_id
        obj.isDefault = element.is_default == 1 ? true : false
        this.list.push(obj)
        console.log(obj)
      });
      console.log(res)
      // this.list = res.data.list
    },


    onAdd() {
      console.log("新增地址");
      this.$router.push('/add?type=1')
    },
    onEdit(item, index) {
      console.log(item)
      // JSON.stringify(localStorage.setItem('address', item))
      localStorage.setItem('address', JSON.stringify(item))
      this.$router.push('/add?type=2')
    },

    go_item(val) {
      console.log(val)
      localStorage.setItem('address_item', JSON.stringify(val))
      this.$router.back(-1)
    }
  }
};
</script>

<style lang = "less" scoped>
.address_list {
  width: 100%;
  height: 100%;
  background: #eff4f5;
  position: relative;
  z-index: 99;
  overflow: auto;
}

.add_span {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: .5333rem;
  width: 8rem;
  height: .9333rem;
  border-radius: .6667rem;
  background: #2bc2cd;
  color: #fff;
}

/deep/.van-address-list {
  height: auto;
}

/deep/.van-button--danger {
  background: #2bc2cd;
  border: none;
}

/deep/.van-address-item .van-radio__icon--checked .van-icon {
  color: #fff;
  background-color: #2bc2cd;
  border-color: #2bc2cd;
}
</style>