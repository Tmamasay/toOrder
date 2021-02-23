<template>
  <div class="my_box " :style="{height:screenHeight+'px',paddingBottom:navBarHeight+'px'}">
    <div class="head_bj fenlei_box supermarket_fenlei_box">
      <img src="/static/images/my_bj.jpg" alt="">
    </div>
    <div class="msg_box"  >
      <p class="tx">
        <img v-if="info&&info.avatarUrl" :src="info.avatarUrl" alt="">
        <img v-else src="/static/images/no_login.png" alt="">
      </p>
      <div v-if="!info" @click="getInfo">立即登录</div>
      <div v-else class="user_msg">
        <p class="user">{{info.nickName}}</p>
        <!-- <p class="text">在获得400个成长值可以升级</p> -->
      </div>
      
      <!-- <p class="ewm"><img src="/static/images/my_icon3.png" alt=""></p> -->
    </div>
    <div class="my_zc">
      <p class="title">我的资产</p>
      <div class="zc_content">
        <div class="content" @click="toIntegral">
          <p class="label"><img src="/static/images/jf.png" alt="">积分</p>
          <p class="text"><span>{{jifenNum}}</span>积分</p>
        </div>
        <div class="content" @click="coupon">
          <p class="label"><img src="/static/images/yhq.png" alt="">优惠卷</p>
          <p class="text"><span>{{userHbNum}}</span>个未使用</p>
        </div>
        <div class="content">
          <p class="label"><img src="/static/images/zh.png" alt="">余额</p>
          <p class="text"><span>0</span>个未使用</p>
        </div>
      </div>
    </div>
    <div class="my_zc my_order">
      <p class="title">我的会员</p>
      <div class="order_content">
        <div class="content" @click="Noyanf">
          <img src="/static/images/hyk.png" alt="">
          <p>会员码</p>
        </div>
        <!-- <div class="content">
          <img src="/static/images/bill.png" alt="">
          <p>买单订单</p>
        </div> -->
        <!-- <div class="content" @click="goOrder">
          <img src="/static/images/pt.png" alt="">
          <p>拼团订单</p>
        </div> -->
        <!-- <div class="content">
          <img src="/static/images/ms.png" alt="">
          <p>秒杀订单</p>
        </div> -->
        <div class="content" @click="Noyanf">
          <img src="/static/images/bill.png" alt="">
          <p>会员储蓄</p>
        </div>
      </div>
    </div>
    <div class="my_zc my_order">
      <p class="title">我的功能</p>
      <div class="order_content">
        <div class="content" @click="goAdress">
          <img src="/static/images/dz.png" alt="">
          <p>我的地址</p>
        </div>
        
        <div>
        <button class="content" open-type="contact">
          <img src="/static/images/kf.png" alt="">
          <p>联系客服</p>
        </button>
        </div>
      </div>
    </div>
    <div class="technical_support">
      <p class="getTK" @click="getContact">我也要一个门店小程序</p>
     <p></p>
      <p class="text">乐赐科技提供技术支持 V1.0.9</p>
    </div>
    <teawithmilktabBar :tabBarindex='index'></teawithmilktabBar>
  </div>
</template>

<script>
import {getUserinfo,setUserinfo} from '@/utils/auth'
import teawithmilktabBar from '@/components/teawithmilktabBar'
export default {
  components: {
    teawithmilktabBar
  },
  data() {
    return {
      index:3,
      info:getUserinfo(),
      screenHeight:"",//屏幕高度
      jifenNum:0,//积分
      userHbNum:0,//用户红包个数
      statusBarHeight: "", // 状态栏高度
      titleBarHeight: "", // 标题栏高度
      navBarHeight: "", // 导航栏总高度
    };
  },
  beforeMount() {
    const self = this;
    wx.getSystemInfo({
      success(system) {
        console.log(`system:`, system);
        self.statusBarHeight = system.statusBarHeight;
        self.platform = system.platform;
        self.model = system.model;
        self.brand = system.brand;
        self.system = system.system;

        let platformReg = /ios/i;
        if (platformReg.test(system.platform)) {
            self.titleBarHeight = 44;
        } else {
            self.titleBarHeight = 48;
        }

        self.navBarHeight = self.statusBarHeight + self.titleBarHeight;
      }
    });
  },
  created() {},
  onShow(){
    this.info=getUserinfo()?getUserinfo():null
    if(getUserinfo()){
      this.getJifen()
      this.getHbNum()
    }
    
    // this.info=getUserinfo()?getUserinfo():null
    // if(getUserinfo()){
    //   this.getJifen()
    //   this.getHbNum()
    // }

    // wx.setNavigationBarColor({
    //   frontColor: '#000000',
    //   backgroundColor: '#ffffff'
    // });
  },
  mounted(){
  
  },
  methods: {
    getContact(){
      wx.navigateTo({
          url: "/pages/my/contactUs/main"
      }); 

    },
    Noyanf(){
       wx.showToast({
        title: '亲，该功能还未上线哦~', 
        icon: 'none', 
        duration: 2000
      });

    },
    getInfo() {
    wx.navigateTo({
          url: "../authorize/main"
      }); 
  },
  goAdress(){
    if(!this.info){
      this.getInfo()
      return
    }
     wx.navigateTo({
          url: "../my/address/main"
      }); 
    
    

  },
  goOrder(){
     if(!this.info){
      this.getInfo()
      return
    }
     wx.navigateTo({
          url: "../my/order/main"
      }); 
    
    

  },
    /*
    *功能：获取用户基本信息
    *开发人员：LRS
    *日期：2020.9.30
    * */
    // getUserInfo(){
    //   let _this = this;
    //   _this.$api.user.getUserProfile().then(res=>{
    //     console.log(res)
    //     if(+res.statusCode === 0){
    //       _this.nickName = res.data.nickname
    //       _this.avatarUrl = res.data.avatarUrl
    //     }
    //   })
    // },

    /*
    *功能：跳转至优惠卷页面
    *开发人员：LRS
    *日期：2020.9.30
    * */
    coupon(){
      if(!this.info){
      this.getInfo()
      return
    }
     wx.navigateTo({
        url: "../my/coupon/main?store="+0
      });
        
    },

    /*
    *功能：跳转至积分商城页面
    *开发人员：LRS
    *日期：2020.9.30
    * */
    toIntegral(){
       if(!this.info){
      this.getInfo()
      return
    }
     wx.navigateTo({
          url: "../my/integral/main?jifen="+this.jifenNum
      });
  } ,
    //获取用户积分
    getJifen(){
      var options = {
        storeId:this.$store.state.user.storeId,
      }
      this.$api.user.getUserIntegral(options).then(res=>{
        console.log(res)
        if(res.status){
          this.jifenNum = res.data.integral
        }
      })
    },
    //获取用户优惠卷数量
    getHbNum(){
      var options = {
        storeId:this.$store.state.user.storeId,
      }
      this.$api.user.selectVoucherNum(options).then(res=>{
        console.log(res)
        if(res.status){
          this.userHbNum = res.data.userNum
        }
      })
    }
  },
  onLoad() {
    /*
    *功能：获取用户基本信息
    *开发人员：LRS
    *日期：2020.10.13
    * */
    // this.getUserInfo()

    /*
    *功能：获取屏幕高度
    *开发人员：LRS
    *日期：2020.10.13
    * */
     
    wx.getSystemInfo({
      success:(res)=>{
        this.screenHeight = res.screenHeight-70
      }
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff'
    });
    

   
  },
};
</script>

<style scoped>
/* 去除button默认样式 */
page{
  height:100%;
}
button {
background-color: transparent;
padding-left: 0;
padding-right: 0;
line-height:inherit;
}
button {
border-radius:0;
}
button::after {
border: none;
}
.getTK{
  width: 280rpx;
  margin:0 auto;
   font-size:28rpx;
  color:#8a8a8a;
  border:1px solid #d1d1d1;
  border-radius: 18px;
  padding: 5px 8px;

}
.my_box{
  height:100%;
  background: #f7f7f7;
}
/*我的*/
.my_box{
  /* padding-bottom:60rpx; */
}
.my_box .head_bj{
  width:100%;
  height:450rpx;
  /* background: #02b6fd; */
}
.my_box .head_bj image{
  width:100%;
  height:450rpx
}
.my_box .msg_box{
  width:92%;
  margin:0 auto;
  display: flex;
  margin-top:-300rpx;
  color:#fff;
  align-items:center;
  padding-top:40rpx;
}
.my_box .msg_box .tx image{
  width:120rpx;
  height:120rpx;
  /* border:1px solid #fff; */
  border-radius: 50%;
  margin-right:26rpx;
}
.my_box .msg_box .ewm{
  margin-left:auto;
}
.my_box .msg_box .ewm image{
  width:34rpx;
  height:34rpx;
}
.my_box .msg_box .user_msg{
  font-size:24rpx;
  line-height: 50rpx;
}
.my_box .msg_box .user_msg .user{
  font-size:30rpx;
  font-weight: 400;
}
.my_box .msg_box .user_msg .user label{
  display: inline-block;
  height:30rpx;
  line-height: 30rpx;
  padding:4rpx 10rpx;
  background: #fff;
  color:#02b6fd;
  font-size:24rpx;
  border-radius: 10rpx;
  margin-left:16rpx
}
.my_box .msg_box .user_msg .sj label{
  display: inline-block;
  width:200rpx;
  height:10rpx;
  background: #fff;
  border-radius: 10rpx;
  margin-right:16rpx
}
.my_box .my_zc{
  width:92%;
  padding:36rpx 0;
  background: #fff;
  margin:0 auto;
  border-radius: 20rpx;
  margin-top:46rpx;
  margin-bottom:16rpx;
  position: relative;
  z-index: 100;
}
.my_box .my_zc .title{
  font-size:30rpx;
  margin-left:34rpx;
  color:#000;
  margin-bottom:40rpx;
}
.my_box .my_zc .zc_content{
  display: flex;
  justify-content:space-around;
  align-items: center;
}
.my_box .my_zc .zc_content .label{
  font-size:30rpx;
  margin-bottom:10rpx;
  
  
}
.my_box .my_zc .zc_content .content{
  text-align: center;

}
.my_box .my_zc .zc_content .content:nth-of-type(4),
.my_box .my_zc .zc_content .content:nth-of-type(5){
  margin-bottom:0;
  /* justify-content:flex-start; */
}
.my_box .my_zc .zc_content .label image{
  width:40rpx;
  height:40rpx;
  margin-right:12rpx;
 vertical-align: top;
}
.my_box .my_zc .zc_content .text{
  font-size:24rpx;
  color:#8a8a8a;
}
.my_box .my_zc .zc_content .text label{
  color:red;
  margin-top:-10rpx;
  font-size:30rpx;
  margin-right:10rpx;
}
.my_box .my_order{
  margin-top:0;
}
.my_box .my_order .order_content{
  display: flex;
  justify-content:space-around;
}
.my_box .my_order .order_content .content{
  text-align: center;
  font-size:26rpx;
  color:#000
} 
.my_box .my_order .order_content image{
  width:54rpx;
  height:54rpx;
  margin-bottom:15rpx;
}
.my_box .technical_support{
  text-align: center;
  margin-top:46rpx;
  color:#a0a0a0;
  font-size:22rpx;
  line-height: 20px;
}

/*超市、奶茶 我的*/
.my_box .user_msg_box{
  position: relative;
  width:100%;
  margin:0 auto 0 auto;
  z-index: 200;
  display: flex;
  background: #fff;
}
.my_box .user_msg_box .tx{
  width:95rpx;
  height:95rpx;
  background:#aaa;
  border-radius: 50%;
  margin:0 26rpx 0 30rpx;
  overflow: hidden;
}
.my_box .user_msg_box .tx image{
  width:100%;
  height:100%;
}
.my_box .user_msg_box .user_msg .user{
  color:#000;
  font-size:28rpx;
  margin:20rpx 0 10rpx 0;
}
.my_box .user_msg_box .user_msg .dz{
  font-size:24rpx;
  color:#3d3d3d;
}
.back_box{
  position: fixed;
  top:0;
  width:100%;
  display: flex;
  align-items: center;
}
.back_box .back{
  width:94%;
  margin:0 auto;
}
</style>
