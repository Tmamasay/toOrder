<template>
  <div class="car_box">
    <!-- <navigation-bar 
    :title="navTitle"
    ></navigation-bar> -->
   <div class="car">
     <div class="box" v-for="(item,index) in carList" :key="index">
       <i-swipeout  i-class="i-swipeout-demo-item" :actions="actions" @change="removeCar(item)">
          <view slot="content" class="content">
              <div class="storeName_box">
                <img src="/static/images/ts_img.png" alt="">
                重庆北城天街店
              </div>


              <div class="sp_msg">
                <div class="radio">
                  <i-radio :disabled="disabled" color="#ee4133" :checked="item.checked" @change="radioCarChange(item,index)"></i-radio>
                </div>
                <div class="img">
                  <img :src="item.goods.imgOne" alt="">
                </div>
                <div class="msg">
                  <p class="title">{{item.goods.goodsName}}</p>
                  <p class="label">
                    <span v-for="(skuItem,skuIndex) in item.sku.specsList" :key="skuIndex" >{{skuIndex>0?',':""}}{{skuItem.valueName}}</span>
                  </p>
                  <div class="price_box">
                    <p class="price"><span class="priSP">￥</span>{{item.sku.discountPrice/100}}</p>
                    <div class="addNum">
                      <p :class="{'jian':1,'noneJi':item.goodsNum==1}" @click="reduce(index,item)">-</p>
                      <p class="num1">{{item.goodsNum}}</p>
                      <p class="add" @click="add(index,item)">+</p>
                    </div>
                  </div>
                </div>
              </div>
          </view>
        </i-swipeout>
     </div>
     <div class="noData" v-if="carList.length === 0">
       <img src="/static/images/noCar.png" alt="">
       <p>购物车是空的</p>
     </div>
     
   </div>
    <!-- 结算 -->
    <div :class="isIphoneX?'jiesuan_box isIphoneX-jiesuan_box':'jiesuan_box'" v-if="carList.length !== 0">
      <div class="box">
        <div class="radio">
          <i-radio :checked="checked" color="#ee4133" @change="selectAllChange"></i-radio>
          <p>全部</p>
        </div>
        <div class="msg">
          <div>
            <p class="price">总计：<span>￥{{totalPriceNum}}</span></p>
            <p class="text">不含运费</p>
          </div>
          <div class="jiesuan"  @click="settlement">去结算({{checkNum}})</div>
          <!-- <div class="jiesuan" v-else :disabled="disableBtn">去结算({{checkNum}})</div> -->
        </div>
      </div>
    </div>
    <!-- <supermarkettabBar :tabBarindex="tabIndex"></supermarkettabBar> -->
  </div>
</template>
 
<script>
import navigationBar from '@/components/navigationBar'
// import supermarkettabBar from '@/components/supermarkettabBar'
export default {
  components: {
    navigationBar,
    // supermarkettabBar
  },
  data() {
    return{
      tabIndex:2,
      isIphoneX: false,
      actions : [
        {
            name : '删除',
            color : '#fff',
            fontsize : '20',
            width : 70,
            background : '#ed3f14'
        }
      ],
      animal: '熊猫',
      checked: true,
      disabled: false,
      carList:[],
      skuIdList:[],
      num:1,//加减数量
      totalPriceNum:0,//总价
      borderId:"",//订单id
      checkNum:0,
      disableBtn:false,
      navTitle:"购物车",//导航标题
    }
  },
  onShow() {
    this.getCarList()
  },
  methods: {
    getTabIndex(){
      this.tabIndex = 2
    },
    //购物车单选
    radioCarChange(item,index){
      if(this.carList[index].checked){
        this.carList[index].checked = false
        this.checkNum--
        this.totalPrice()
        
      }else{
        this.carList[index].checked = true
        this.checkNum++
        this.totalPrice()
        
      }
      if(this.totalPriceNum == 0.00){
        this.checked = false
      }else{
        this.checked = true
      }
    },
    //全选
    selectAllChange(e){
      this.checked = e.target.current
      
      if(!this.checked){
        this.carList.forEach(res=>{
          res.checked = false
        })
        this.checkNum=0
        this.totalPrice()
      }else{
        this.carList.forEach(res=>{
          res.checked = true
        })
        this.checkNum=this.carList.length
        this.totalPrice()
      }
    },
    //购物车列表
    getCarList(){
      this.carList = []
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
            this.carList.push(res.data.skuList[key])
          });
          this.checkNum=this.carList.length
          this.disableBtn=false
          console.log(this.carList)
          this.$store.commit('SET_CARNUM', this.carList.length);
          this.totalPrice()
        }
      })
    },
    //算总价
    totalPrice(){
      var num = 0
      this.carList.forEach(res=>{
        if(!res.checked){
          return
        }else{
          console.log(res)
          num += (res.sku.discountPrice*res.goodsNum)/100
        }
      })
      this.totalPriceNum = num.toFixed(2)
    },
    //减商品
    reduce(index,item){
      let _this = this;
      if(_this.carList[index].goodsNum <= 1){
        return
      }else{
        _this.carList[index].goodsNum--
        let options = {
          goodsNum:_this.num,
          skuId:item.sku.id,
          storeId:_this.$store.state.user.storeId,
        }
        _this.$api.user.reduceShopCart(options).then(res=>{
          console.log(res)
          _this.totalPrice()
        })
      }
    },
    //加商品
    add(index,item){
      let _this = this;
      _this.carList[index].goodsNum++
      let options = {
        goodsNum:_this.num,
        skuId:item.sku.id,
        storeId:_this.$store.state.user.storeId,
      }
      _this.$api.user.addShopCart(options).then(res=>{
        console.log(res)
        _this.totalPrice()
      })
    },
    //删除购物车
    removeCar(item){
      let _this = this;
      let options = {
        skuId:item.sku.id,
        storeId:_this.$store.state.user.storeId,
      }
      wx.showModal({
        title: '提示',
        content: '确认删除该商品？',
        success(res) {
          console.log(res)
          if(res.confirm){
            _this.$api.user.delShopCartOneSku(options).then(res=>{
              if(res.status){
                wx.showToast({
                  title: '删除成功',  
                  icon: 'success',   
                  duration: 1000 
                })
                _this.getCarList()
              }
            }).catch(err=>{
              console.log(err)
            })
          }else{
            wx.showToast({
              title: '已取消删除',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    },
    //结算
    settlement(){
      if(this.checkNum<1){
        wx.showToast({
        title: '还未勾选结算商品哦~', 
        icon: 'none', 
        duration: 10000
      });
      return
      }
      const _this = this;
      wx.showToast({
        title: '加载中', 
        icon: 'loading', 
        duration: 10000
      });
      var skuIdList = []
      this.carList.forEach(res=>{
        if(res.checked){
          skuIdList.push(res.sku.id)
        }
      })
      console.log(skuIdList)
      this.disableBtn=true
      let options = {
        skuIds:skuIdList,
        storeId:this.$store.state.user.storeId
      }
      _this.$api.user.addOrder(options).then(res=>{
        console.log(res)
        if(+res.statusCode === 0){
          _this.borderId = res.data
          wx.hideToast()
          wx.navigateTo({
              url: "../qr_order/main?orderId="+_this.borderId
          });
          this.$store.commit('SET_CARNONE', true);
        }else{
           this.disableBtn=false
          wx.showToast({
            title: res.statusMessage, 
            icon: 'none', 
            duration: 1500
          });
        }
      })
    }
  },
  computed:{
      carNone(){
        if(this.$store.getters.carNone){
          this.getCarList()
        }
      }
  },
  onHide() {
    //购物车列表
    // this.getCarList()
  },
  onLoad() {
    //购物车列表
    // this.getCarList()
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })

    /*
    *功能：判断手机机型，动态给底部添加样式
    *开发人员：LRS
    *日期：2020.10.14
    * */
    wx.getSystemInfo({
      success: res => {
        console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search("iPhone 11") != -1) {
          this.isIphoneX = true
        }
        if (modelmes.search("iPhone X") != -1) {
          this.isIphoneX = true
        }
        if (modelmes.search("iPhone XR") != -1) {
          this.isIphoneX = true
        }
        if (modelmes.search("iPhone XS") != -1) {
          this.isIphoneX = true
        }
      }
    });
  },
  onUnload() {},
  created() {}
};
</script>

<style>
page{
  height:100%
}
/*购物车*/
.car_box{
  width:100%;
  height:100%;
  background: #f8f8f8;
}
.car_box .car{
  width:92%;
  margin:0 auto;
  overflow: hidden;
}
.car_box .car .box{
  background: #fff;
  margin-top:20rpx;
  width:100%;
  border-radius: 15rpx;
}
.car_box .car .box .content{
  width:100%;
  height:100%;
  /* display: flex; */
  border-radius: 15rpx;
  padding:30rpx;
}
.car_box .car .box .content .storeName_box{
  display: flex;
  font-size:32rpx;
  color:#171a20;
  font-weight: 500;
  align-items: center;
}

.car_box .car .box .content .storeName_box img{
  width:32rpx;
  height:33rpx;
  margin-right:12rpx;
}
.car_box .car .box .content .sp_msg{
  display: flex;
}
.car_box .car .box .content .radio{
  margin-top:30rpx;
  height:160rpx;
  display: flex;
  align-items: center;
  width:10%;
}
.car_box .car .box .content .img{
  width:160rpx;
  height:160rpx;
  margin-top:30rpx;
}
.car_box .car .box .content .img image{
  width:100%;
  height:100%;
  border: 2rpx solid #edf1f4;
  border-radius: 10rpx;
}
.car_box .car .box .content .msg{
  width:56%;
  margin-left:25rpx;
  margin-top:30rpx;
}
.car_box .car .box .content .msg .title{
  color:#171a20;
  margin-bottom:15rpx;
  margin-top:6rpx;
  margin-right:12rpx;
  display:block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size:30rpx;
  font-weight: 500;
}
.car_box .car .box .content .msg .label{
  display: inline-block;
  background: #fbf8f1;
  padding:5rpx 20rpx;
  color:#9e7b48;
  font-size:22rpx;
  margin-bottom:15rpx;
  border-radius: 6rpx;
}
.car_box .car .box .content .msg .price_box{
  display: flex;
  align-items: center;
}
.car_box .car .box .content .msg .price_box .price{
  font-size:35rpx;
  font-weight: 500;
  color:#eb5435;
}
.priSP{
   font-size:25rpx;
}
.car_box .car .box .content .msg .price_box .num{
  margin-left:auto;
  margin-right:20rpx;
}
.car_box .car .box .content .msg .price_box .addNum{
  display: flex;
  align-items: center;
  margin-left:auto;
  font-size:30rpx;
  width:180rpx;
  height:40rpx;
  /* border:1px solid #dadada; */
  /* border-radius: 30rpx; */
  color:#000;
}
.noneJi{
  color: #f0f0f0;
}
.car_box .car .box .content .msg .price_box .addNum .num1{
  width:100rpx;
  height:40rpx;
  /* border:1px solid #dadada; */
  background-color: #f0f0f0;
  border-radius: 5px;
  border-top:none;
  border-bottom:none;
  display: flex;
  justify-content:center;
  align-items: center;
  font-size: 28rpx;
  line-height: 40rpx;
  margin-top: 3px;
}
.car_box .car .box .content .msg .price_box .addNum .jian{
  width:60rpx;
  height:40rpx;
  display: flex;
  justify-content:center;
  align-items: center;
  font-size: 40rpx;
  font-weight: 600;
  line-height: 40rpx;
}
.car_box .car .box .content .msg .price_box .addNum .add{
  width:60rpx;
  height:40rpx;
  display: flex;
  justify-content:center;
  align-items: center;
    font-size: 40rpx;
  font-weight: 600;
  line-height: 40rpx;
}
/*暂无数据*/
.noData{
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  color: #999;
  margin-top: 100rpx;
}
.noData image{
  width:350rpx;
  height:350rpx;
  margin-bottom:50rpx;
}
.jiesuan_box{
  position: fixed;
  bottom:112rpx;
  left:0;
  width:100%;
  height:130rpx;
  /* border-top:1px solid #eaeaea; */
  background: #fff;
}
.isIphoneX-jiesuan_box{
  bottom:0;
}
.jiesuan_box .box{
  height:100%;
  display: flex;
  align-items: center;
  margin:0 auto;
  padding:0 30rpx; 
}
.jiesuan_box .box .radio{
  display: flex;
  align-items: center;
  font-weight: 500;
}
.jiesuan_box .box .radio p{
  font-size:28rpx;
  margin-left:10rpx;
}
.jiesuan_box .box .msg{
  margin-left:auto;
  display: flex;
  height: 110rpx;
  align-items: center;
  border: none !important;
}
.jiesuan_box .box .msg .price{
  display: flex;
  align-items: center;
  font-size:30rpx;
  font-weight: 500;
}
.jiesuan_box .box .msg .price span{
  color:#ee4133;
  font-size:34rpx;
}
.jiesuan_box .box .msg .text{
  font-size:24rpx;
  color:#a2a3a5;
  text-align: left;
  margin-top:8rpx;
}
.jiesuan_box .box .msg .jiesuan{
  width:200rpx;
  height:80rpx;
  line-height: 80rpx;
  background: #ee4133;
  color:#fff;
  font-size:32rpx;
  font-weight: 500;
  text-align: center;
  border-radius:70rpx;
  margin-left:34rpx;
}

</style>