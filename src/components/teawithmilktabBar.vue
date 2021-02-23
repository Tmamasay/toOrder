<template>
  <div class="tabbar_box">
    <!-- 奶茶 -->
    <div class="footer_box">
      <div :class="isIphoneX?'footer isIphoneX-footer':'footer'">
        <div
        :class="tabIndex==index ? 'text on' : 'text'" 
        v-for="(item,index) in list"
        :key="index"
        @click="switchTab(index,item)">
          <img :src="tabIndex==index ? item.selectedIconPath : item.iconPath" alt="">
          <p class="wenzi">{{item.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>

export default {
  props:['tabBarindex'],
  data() {
    return{
      isIphoneX: false,
      tabIndex:0,
      list: [
        {
          pagePath: '/pages/index/main',
          text: '首页',
          iconPath: '/static/tabs/home.png',
          selectedIconPath:'/static/tabs/home_hover.png',
        }, 
        {
          pagePath: '/pages/fenlei/main',
          text: '商品',
          iconPath: '/static/tabs/fenlei.png',
          selectedIconPath:'/static/tabs/fenlei_hover.png',
        }, 
        {
          pagePath: '/pages/order/main',
          text: '订单',
          iconPath: '/static/tabs/gwc.png',
          selectedIconPath:'/static/tabs/gwc_hover.png',
        },
        {
          pagePath: '/pages/my/main',
          text: '我的',
          iconPath: '/static/tabs/wd.png',
          selectedIconPath:'/static/tabs/wd_hover.png',
        }
      ]
    }
  },
  onShow() {
    this.tabIndex = this.tabBarindex
  },
  methods: {
    /*
    *功能：底部栏目切换
    *开发人员：LRS
    *日期：2020.10.14
    * */
    switchTab(index,item){
      console.log(index)
      // this.tabIndex = e
 
        wx.switchTab({ url: item.pagePath })
      
      
      // if(+e === 0){//首页
      //   wx.reLaunch({
      //     url: "/pages/teawithmilk/index/main"
      //   });
      // }
      // if(+e === 1){//分类
      //   wx.navigateTo({
      //     url: "/pages/teawithmilk/fenlei/main"
      //   });
      // }
      // if(+e === 2){//订单
      //   wx.navigateTo({
      //     url: "/pages/teawithmilk/order/main"
      //   });
      // }
      // if(+e === 3){//我的
      //   wx.navigateTo({
      //     url: "/pages/teawithmilk/my/main"
      //   });
      // }
    },
  },
  onHide() {},
  onLoad() {
    this.tabIndex = this.tabBarindex
    /*
    *功能：判断手机机型，动态给底部添加样式
    *开发人员：LRS
    *日期：2020.10.14
    * */
    wx.getSystemInfo({
      success: res => {
        console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search("iPhone 12") != -1) {
          this.isIphoneX = true
        }
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

<style  scoped>
.tabbar_box{
  width:100%;
  position: fixed;
   z-index: 99999;
   bottom:0
}
.footer_box{
  width:100%;
  background: #fff;
}
.footer_box .footer{
  width:100%;
  display: flex;
  height:110rpx;
  justify-content: space-between;
  align-items:center;
  border-top:1px solid #eee;
  /* box-shadow: 10rpx 10rpx 10rpx 16rpx #f2f3f7; */
  z-index: 99999;
}
.footer_box .footer .text image{
  margin-bottom:6rpx;
}
.footer_box .footer .text:first-child image{
  width:47rpx;
  height:43rpx;
}
.footer_box .footer .text:nth-of-type(2) image{
  width:37rpx;
  height:43rpx;
}
.footer_box .footer .text:nth-of-type(3) image{
  width:42rpx;
  height:45rpx;
}
.footer_box .footer .text:nth-of-type(4) image{
  width:37rpx;
  height:43rpx;
}
.footer_box .footer .text{
  width:25%;
  text-align: center;
  font-size:20rpx;
  color:#919aa7
}
.on{
  pointer-events:none;
}
.on .wenzi{
  color:#ee4133;
}
.isIphoneX-footer {
  padding-bottom: 40rpx;
}
.isIphoneX-nav {
  padding-top: 80rpx !important;
}
/*导航*/
.nav_box{
  width:94%;
  height:100rpx;
  background: #fff;
  display: flex;
  justify-content:space-between;
  align-items: center;
  position: fixed;
  top:0;
  left:0;
  padding:0 20rpx;
  z-index: 100;
  font-weight: 600;
  font-size:30rpx;
}
</style>
