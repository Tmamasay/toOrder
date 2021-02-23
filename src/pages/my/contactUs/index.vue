<template>
  <div class="login_box">
    
    <img class="bj" src="/static/images/login_bj.jpg" alt="">
    <div class="contain">
      <div class="text_box">
        <p>Join us</p>
        <p>希望能够更多了解</p>
      </div>
     <div class="loginForm">
        <!-- <img class="logo" src="/static/images/logo.jpg" alt=""> -->
        <div class="zz">
          <img src="/static/images/zh1.png" alt="">
          <input class="login" v-model="loginForm.username" type="text" placeholder="请输入姓名">
        </div>
        <div  class="zz">
          <img src="/static/images/mm.png" alt="">
          <input class="login" v-model="loginForm.phone"  placeholder="请输入手机号">
        </div>
        <div  class="zz">
          <img src="/static/images/hy.png" alt="">
          <input class="login" v-model="loginForm.remarks"  placeholder="请备注行业">
        </div>
        <div class="loginIn" @click="submit">立即提交</div>
     </div>
    </div>
    <p class="bottom_text">@乐赐科技提供技术支持</p>
  </div>
</template>

<script>
import {setToken} from "@/utils/auth";
export default {
  data() {
    return {
      loginForm:{
        username:'',
        phone:'',
        remarks:''
      }
    };
  },
  onShow(){
    wx.hideHomeButton()
    this.loginForm={
        username:'',
        phone:'',
        remarks:''
      }
  },
  methods: {
    submit(){
      let _this = this;
      var openId = _this.$root.$mp.query.openId
      if(!_this.loginForm.username){
        wx.showToast({
          title: '请输入姓名~', 
          icon: 'none', 
          duration: 1000
        });
        return
      }
       if(!_this.loginForm.phone){
        wx.showToast({
          title: '请输入电话~', 
          icon: 'none', 
          duration: 1000
        });
        return
      }
       if(!/^1[3-9]\d{9}$/.test(_this.loginForm.phone)){
        wx.showToast({
          title: '请输入正确的电话号码~',
          icon: 'none', 
          duration: 1000
        });
        return
      }
        let options = {
          address: "未获取",
          trade:_this.loginForm.remarks,
          userName: _this.loginForm.username,
          userPhone: _this.loginForm.phone
        }
        _this.$api.user.addRecruitStore(options).then(res=>{
          console.log(res)
          if(res.status){
            wx.showToast({
              title: '提交成功', 
              icon: 'success', 
              duration: 1000
            });

            setTimeout(() => {
               wx.navigateBack({
              delta: 1  // 返回上一级页面。
          })
            }, 1000);
           
            
          }else{
            _this.loginForm.username = ''
            _this.loginForm.password = ''
            wx.showToast({
              title: res.statusMessage, 
              icon: 'none', 
              duration: 1000
            });
          }
        })
      
    }
  },
  created() {
    // let key_token=this.$store.getters.user.token
  }
};
</script>

<style>
.contain{
width: 90%;
  margin: 0 auto;
}
.title{
  font-size:25px;
font-family:Noto Sans S Chinese;
font-weight:600;
color:rgba(34,34,34,1);
}
.login{

}
.loginIn{
 width: 95%;
 margin: 40px auto 30px auto;
 height: 44px;
 border-radius:22px;
 font-size:16px;
font-family:Noto Sans S Chinese;
font-weight:400;
color:rgba(255,255,255,1);
line-height: 44px;
text-align: center;
background-color: #ee4133;
box-shadow:0px 4px 10px 0px rgba(141, 141, 141, 0.4);
}
.bj{
  width: 100%;
  position: fixed;
  top:0;
  left:0
}
page{
  height:100%;
}
.login_box{
  height:100vh;
  background: #f7f7f7;
}
.text_box{
  width:92%;
  margin:20px auto;
  color:#fff;
  font-size:30px;
  font-weight: 600;
  position: relative;
  z-index: 100;
}
.text_box p:last-child{
  font-size:24px;
  margin-top:10px;
  font-weight: 300;
}
.loginForm{
  background: #fff;
  position: relative;
  z-index: 100;
  border-radius: 10px;
  margin-top:30px;
  padding-bottom: 1px;
  box-shadow:0px 10px 10px 0px #ffe3e1;
  overflow: hidden;
}
.loginForm .logo{
  display: block;
  width:80px;
  height:80px;
  border-radius: 50%;
  margin:20px auto 10px auto;
  box-shadow:0px 10px 10px 0px #ffe3e1;
}
.loginForm .zz{
  width: 90%;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 30rpx;
  color: #999999;
  font-family: Noto Sans S Chinese;
  font-weight: normal;
  border-bottom: 2rpx solid rgba(237,241,244,1);
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.loginForm .zz img{
  width:16px;
  height:16px;
  margin-right:10px;
}
.loginForm .zz input{
  width:80%;
}
.bottom_text{
  text-align: center;
  margin-top:60px;
  color:#999;
  font-size:12px;
}
</style>