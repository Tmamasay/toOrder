<template>
  <div class="index_box">
    <div class='banner_warp'>
      <swiper class='banner' :autoplay='true' :circular='true' @change="bannerIndex">
        <block>
          <swiper-item v-for="(item,index) in bannerList" :key="index">
            <view class='li'>
              <img :src="item.img" alt="">
            </view>
          </swiper-item>
        </block>
      </swiper>
      <div class="dots">
        <p :class="banner_i === i?'on dot':'dot'" v-for="(item,i) in bannerList" :key="i"></p>
      </div>
    </div>
    <div class="index_content_box">
      <div class="dd" @click="tofenlei">
        <img src="/static/images/index_dd.jpg" alt="">
        <div class="text_box">
          <p class="title">开始点单</p>
          <p class="text">无需等待·快速点单</p>
        </div>
      </div>
      <div class="jfHy_box">
        <div class="box" @click="toJifen">
          <img src="/static/images/index_jj.jpg" alt="">
          <div class="text_box">
            <p class="title">积分商城</p>
            <p class="text">优享派劵·兑换</p>
          </div>
        </div>
        <div class="box" @click="Noyanf">
          <img src="/static/images/index_hy.jpg" alt="">
          <div class="text_box">
            <p class="title">会员码</p>
            <p class="text">我的会员码</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tj_content_box">
      <div class="title_box">
        <div class="title">
          <p class="line"></p>推荐商品
          <p class="icon">
            <i-icon type="enter"/>
          </p>
        </div>
      </div>
      <div class="content">
        <p class="img"><img src="/static/images/index_hy.jpg" alt=""></p>
        <p class="img"><img src="/static/images/index_hy.jpg" alt=""></p>
      </div>
    </div>
    <teawithmilktabBar :tabBarindex='index'></teawithmilktabBar>
  </div>
</template>

<script>
import {
  getToken,
  setToken,
  getUserinfo
} from '@/utils/auth'
import teawithmilktabBar from '@/components/teawithmilktabBar'
export default {
  components: {
    teawithmilktabBar
  },
  data() {
    return {
      info:getUserinfo(),
      index:0,
      banner_i:0,//banner轮播下标
      bannerList:[],//banner轮播
    };
  },
  methods: {
    Noyanf(){
       wx.showToast({
        title: '亲，该功能还未上线哦~', 
        icon: 'none', 
        duration: 2000
      });

    },
    getInfo() {
    wx.navigateTo({
          url: `/pages/authorize/main`
      }); 
  },
    //获取banner下标
    bannerIndex(e){
      console.log(e)
      this.banner_i = +e.target.current
    },
    //获取轮播图
    getLunbo(){
      this.bannerBj = []
      this.$api.user.getStoreChart({
        storeId:this.$store.state.user.storeId,
      }).then(res=>{
        if(res.status){
          console.log(res)
          this.bannerList = res.data
        }
      }).catch(err=>{
        console.log(err)
      })
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
          url: "/pages/integral/main"
      });
    },
    //开始点单
    tofenlei(){
      wx.switchTab({
          url: "/pages/fenlei/main"
      });
    },
    //积分商城
    
    toJifen(){
      if(!this.info){
      this.getInfo()
      return
    }
      wx.navigateTo({
          url: "/pages/my/integral/main"
      });
    }
  },
  onShow(){
    
   this.info=getUserinfo()?getUserinfo():null
    
    //轮播图
    this.getLunbo()
    if (wx.canIUse('getUpdateManager')) {
      console.log('进去版本检测------->')
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }else{
          console.log('最新版本-------》')
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onShareAppMessage: function (ops) {
    const that=this
    console.log('storeId---->'+that.$store.state.user.storeId)
    return {
        title: '宝贝，快来下单吧~',
        path: `/pages/loading/main?storeId=${that.$store.state.user.storeId}`,
        imageUrl:''
    }

},
  onLoad() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ffffff'
    })
    
  },
};
</script>

<style scoped>
page{
  height:100%;
}
.index_box{
  height:100%;
  /* padding-bottom:250rpx; */
  background: #f7f8fa;
}
.plate_box{
  width:92%;
  height:auto;
  box-shadow: 0 2rpx 10rpx 0rpx #ccc;
  margin:0 auto;
  padding-top:20rpx;
  margin-top:30rpx;
  border-radius: 25rpx;
  padding-bottom:30rpx;
}
/*首页-轮播*/
.banner_warp{
  width:100%;
  height:734rpx;
  margin:0 auto;
  border-radius: 20rpx;
  position: relative;
}
.banner_warp .banner{
  height:734rpx;
  overflow: visible;
}
.banner_warp .li{
  border-radius: 20rpx;
  width: 100%;
  height:734rpx;
  text-align: center;
}
.banner_warp image{
  display: inline-block;
  width:100%;
  height:734rpx;
  margin:0 auto;
  text-align: center;
}
.start_Order{
  width:94%;
  height:200rpx;
  line-height: 200rpx;
  text-align: center;
  border-radius: 10rpx;
  background: #aaa;
  margin:0 auto;
  margin-top:20rpx;
  color:#fff;
}
.start_Order image{
  width:100%;
  height:100%;
  border-radius: 10rpx;
}
.index_content_box{
  width:86%;
  margin:0 auto;
  padding:20rpx 20rpx 12rpx 20rpx;
  background: #fff;
  margin-top:-50rpx;
  position: relative;
  z-index: 100;
  border-radius: 14rpx;
}
.index_content_box .dd{
  position: relative;
}
.index_content_box .dd image{
  width:100%;
  height:168rpx;
  margin-bottom:12rpx;
}
.index_content_box .text_box{
  position: absolute;
  top:30rpx;
  left:30rpx;
  font-size:46rpx;
  color:#171a20;
  font-weight: 600;
}
.index_content_box .text_box .text{
  font-size:26rpx;
  color:#171a20;
  margin-top:15rpx;
  font-weight: 400;
}
.index_content_box .jfHy_box{
  display: flex;
  justify-content:space-between;
  width:100%;
}
.index_content_box .jfHy_box .box{
  width:48%;
  position: relative;
}
.index_content_box .jfHy_box .box image{
  width:100%;
  height:150rpx;
}
.index_content_box .jfHy_box .text_box{
  position: absolute;
  top:30rpx;
  left:30rpx;
  font-size:32rpx;
  color:#171a20;
  font-weight: 600;
}
.index_content_box .jfHy_box .text_box .text{
  font-size:26rpx;
  color:#171a20;
  margin-top:15rpx;
  font-weight: 400;
}
/*推荐*/
.tj_content_box{
  width:86%;
  margin:0 auto;
  padding:20rpx;
  background: #fff;
  margin-top:20rpx;
  position: relative;
  z-index: 100;
  border-radius: 14rpx;
}
.tj_content_box .title_box{
  display: flex;
}
.tj_content_box .title_box .title{
  width:100%;
  font-size:32rpx;
  color:#171a20;
  display: flex;
  align-items: center;
}
.tj_content_box .title_box .title .line{
  width:6rpx;
  height:26rpx;
  background: #ee4133;
  border-radius: 20rpx;
  margin-right:16rpx;
  font-weight: 600;
}
.tj_content_box .title_box .title .icon{
  margin-left:auto;
}
.tj_content_box .content{
  width:100%;
  display: flex;
  margin-top:20rpx;
}
.tj_content_box .content .img{
  width:48%;
  height:238rpx;
}
.tj_content_box .content .img image{
  width:100%;
  height:100%;
  border-radius: 14rpx;
}
.tj_content_box .content .img:last-child{
  margin-left:auto;
}

 .banner_warp .dots{
  position: absolute;
  bottom:80rpx;
  left:0rpx;
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
}
.banner_warp .dots .dot{
  width:36rpx;
  height:6rpx;
  background: rgba(216, 216, 216, 0.5);
  margin-right: 12rpx;
  border-radius: 40rpx;
}
.banner_warp .dots .on{
  background: #fff;
}

</style>
