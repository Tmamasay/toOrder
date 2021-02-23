<template>
  <div>
    <div class="contain">
      <div class="ueraver">
        <img src="../../../static/images/aver.jpg" mode="aspectFill" alt srcset />
      </div>
      <div class="text">
        <p class="t1">易点单</p>
        <p class="t2">小程序需要获得您的微信授权才能正常使用</p>
      </div>
      <div>
        <form @submit="subFormId" report-submit="true">
          <button
            formType="submit"
            class="denglu"
            @getuserinfo="onGotUserInfo"
            open-type="getUserInfo"
          >授权微信用户信息</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { setUserinfo } from "@/utils/auth";
export default {
  components: {
    // card
  },
  data() {
    return {

    }
  },
  methods: {
    onGotUserInfo: function(e) {
      const that = this;
      if (!e.target.userInfo) {
        // console.log("用户拒绝授权");
        wx.showToast({
          title: '已取消',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      //保存基本信息在本地
      setUserinfo(e.target.userInfo);
       let options = {
        avatarUrl: e.target.userInfo.avatarUrl,
        city: e.target.userInfo.city,
        country: e.target.userInfo.country,
        gender:e.target.userInfo.gender,
        nickname: e.target.userInfo.nickName,
        province: e.target.userInfo.province
      }
      this.$api.user.saveUserProfile(options).then(res=>{
        if(+res.status){
          wx.navigateBack({
              delta: 1  // 返回上一级页面。
          })
        }
      })
    },
  created() {
   
  }
  }
}
</script>

<style>
.contain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 20% auto;
  /* padding: 40rpx; */
}
.footer {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  width: 100%;
  height: 150px;
  bottom: 0px;
  /* background-color: aqua */
}
.left {
  height: 150px;
  width: 210px;
  /* background-color: #000; */
  /* z-index: 9999 */
}
.left img {
  width: 100%;
  height: 100%;
}

.right {
  height: 150px;
  width: 270px;
}
.right img {
  width: 100%;
  height: 100%;
}
.ueraver {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  /* box-shadow: 1px 1px 1px -1px rgba(46, 30, 30, 0.2); */
}
.ueraver img {
  width: 100%;
  height: 100%;
}
.t1 {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 700;
  text-align: center;
  color: #000;
  margin-top: 15px;
}
.t2 {
  font-size: 15px;
  font-family: PingFang SC;
  text-align: center;
  color: #80848f;
  margin-top: 10px;
}
.denglu {
  background-color: #ee4133;
  color: #fff;
  font-size: 14px;
  font-family: PingFang SC;
  text-align: center;
  height: 35px;
  width: 145px;
  line-height: 35px;
  border-radius: 25px;
  margin-top: 50px;
}
.text{
  line-height: 30px;
}
</style>
