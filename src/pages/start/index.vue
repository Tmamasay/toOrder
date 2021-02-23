<template>
  <div class="start">
    <img src="/static/images/start.jpg" alt="">
    <div><p @click="scanCode"></p></div>
  </div>
</template>
 
<script>
export default {
  components: {
  },
  data() {
    return{
      
    }
  },
  onShow() {},
  methods: {
    scanCode(){
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {												//扫码成功
        console.log(res)
        console.log('-----0000--------')
         wx.redirectTo({
                  url: `/${res.path}`
                }); 	
        //   wx.reLaunch({
        //   url: `/${res.path}`
        // }); 
        // var path = res.path;  									//把链接取出存到变量
   										//把链接取出存到变量
        // var reg = new RegExp('scene=', "g"); 			//然后创建一个正则表达式，截取scene=后面的数据部分
        // var scene = path.replace(reg, "");					//保留有用的部分重新存储到这个变量里
        // var scene = decodeURIComponent(scene);   //这是解码方式，把得到的链接数据进行解密
        // var pathArr = scene.split('?');	
      	// 				//然后通过 ？号截取问号之后的数据。
       	// 	console.log(pathArr)												 //截取成功以后的格式storeCode=10003060&tableNo=0001
        // var arrPara = pathArr[1].split("&");					//再通过&符进行截取数据之后格式为： //storeCode=10003060   tableNo=0001
        // var arr = [];
        // for (var i in arrPara) {
        // // 通过 = 号在截取一次   这是截取后的数据应该是 storeCode,10003060     tableNo,0001
        //    arr = arrPara[i].split("=");			
        //   //循环定义存到缓存，用的时候调用就可以了。					
        //    wx.setStorageSync(i == 0 ? "menu_storeCode" : "menu_tableNo", arr[1]);
        // }
     },
     fail: (res) => {
        wx.showToast({
           title: '扫码失败',
           icon: 'loading',
           duration: 1500
        })
     },
      })
    }
    
  },
  onHide() {},
  onLoad() {
    
  },
  onUnload() {},
  created() {}
};
</script>

<style  scoped>
  page{
    height:100vh;
  }
  .start{
    width:100%;
    height:100vh;
  }
  .start img{
    width:100%;
    height:100%;
  }
  .start div{
    width:100%;
    height:100rpx;
    position: fixed;
    bottom:200rpx
  }
  .start div p{
    width:100px;
    height:100px;
    /* background: #fff; */
    margin:0 auto;
  }
</style>
