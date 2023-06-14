<template>
    <div class="guanzhuBox">
        <img src="@/assets/img/68.png" alt="">
    </div>
</template>

<script>
export default {
    props: {},
    components: {},
    data() {
        return {

        }
    },
    created() { },
    methods: {
    }
}
</script>

<style lang = "less" scoped>
.guanzhuBox{
    width: 100%;
    height: 100%;
    background: #34a6e6;
    position: relative;
    z-index: 99;
}

.guanzhuBox img{
    width: 100%;
}
.content{
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/68.png');
    background-size: 100%;
    background-repeat: no-repeat;
}
    
</style>