<template>
    <div class="carNum_box" @click="toCar">
        <img src="/static/images/car.png" alt="">
        <p class="num">{{carNum}}</p>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        carNum(){
            return this.$store.getters.carNum
        }
    },
    methods:{
        //跳转购物车
        toCar(){
            wx.navigateTo({
                url: `/pages/supermarket/public/main?indexTab=2`
            });
            // this.$store.commit('SET_TAB', 2);
        },
        //购物车列表
        getCarListLength(){
            var arr = []
            let options = {
                storeId:this.$store.state.user.storeId,
            }
            this.$api.user.selectShopCart(options).then(res=>{
                console.log(res)
                if(+res.status){
                    //组成新的数组
                    Object.keys(res.data.skuList).forEach(key => {
                        res.data.skuList[key].checked = true
                        arr.push(res.data.skuList[key])
                    });
                    this.$store.commit('SET_CARNUM', arr.length);
                }
            })
        },
    },
    mounted(){
        this.getCarListLength()
    }
}
</script>

<style scoped>
.carNum_box{
    width:100rpx;
    height:70rpx;
    background: #6C8AF8;
    border-top-right-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
    position: fixed;
    bottom:400rpx;
    left:0;
    display: flex;
    align-items: center;
    justify-content:center
    /* position: relative; */
}
.carNum_box image{
    width:56rpx;
    height: 56rpx;
}
.carNum_box .num{
    position: absolute;
    right:10rpx;
    top:10rpx;
    width:30rpx;
    height:30rpx;
    line-height: 30rpx;
    background: red;
    border-radius: 50%;
    text-align: center;
    color:#fff;
    font-size:28rpx
}
</style>