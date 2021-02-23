<template>
  <div class="loadCont">
    <div class="loadIm">
      <img src="/static/images/load.gif" alt="" srcset="">
    </div>
  </div>
</template>
 
<script>
import { getToken,setStoreId,getStoreId} from '@/utils/auth'
export default {
  components: {
  },
  data() {
    return{
    }
  },
  onShow() {
    let _this = this;
    console.log(_this.$root.$mp.query.scene)
    
    console.log(decodeURIComponent(_this.$root.$mp.query.scene))
    console.log(_this.$root.$mp.query.storeId)
    console.log('system sd------>')
    // const storeId=_this.$root.$mp.query.scene||_this.$root.$mp.query.storeId||getStoreId()||null
    const storeId='13154897910237'
    if(storeId){  
    if(!getToken()){
      wx.login({
        success:(res)=>{
          console.log(res)
          const code = res.code;
          if(code){
            const options={
            code:code,
            StoreId:storeId
          }
            _this.$store.dispatch("userLogin", options).then(res => {
              _this.$api.user.getStoreSwitch({
                storeId:storeId,
                type:'public'
              }).then(res=>{
                _this.$store.commit('SET_STOREID',res.data.switch.storeId)
                _this.$store.commit('SET_SWICTHSTORE',res.data.switch)
                setStoreId(res.data.switch.storeId)
                wx.reLaunch({
                  url: "../index/main"
                  // url: "../supermarket/car/main"
                });
              })
            });
          }
        }
      })
    }else{
      _this.$api.user.getStoreSwitch({
          storeId:storeId,
          type:'public'
      }).then(res=>{
        console.log("55555555555")
          _this.$store.commit('SET_STOREID',res.data.switch.storeId)
          _this.$store.commit('SET_SWICTHSTORE',res.data.switch)
          setStoreId(res.data.switch.storeId)
          wx.reLaunch({
            url: "/pages/index/main"
            // url:"/pages/my/integral/main"
          });
      })
    }
    }else{
     wx.redirectTo({
          url: "../start/main"
      });

    }
  },
  methods: {
    
  },
  onHide() {},
  onLoad() {
  },
  onUnload() {},
  created() {}
};
</script>

<style  scoped>
.loadCont{
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loadIm{
   width:95px;
   height: 50.5px;
   overflow: hidden;
   /* margin: 60% auto 0 auto; */
}
.loadIm img{
  width: 100%;
  height: 100%;
 }
</style>