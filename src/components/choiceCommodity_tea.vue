<template>
  <!-- 选择商品 -->
  <div :class="spShow?'choiceSp_active choiceSp_box':'choiceSp_box'" @click.stop="closeSpdetails">
    <div class="choiceSp" :animation="ani1" @click.stop="">
      <div class="details_box">
        <div class="box">
          <div class="icon_box">
            <p class="icon" @click.stop="closeSpdetails"><i-icon type="close" color="#fff" size="20"/></p>
          </div>
          <div class="img">
            <img :src="choiceCommodityList.imgOne" alt="">
          </div>
          <div class="sp_msg">
            <p class="title">{{choiceCommodityList.goodsName}}</p>
            <p class="label">{{choiceCommodityList.remakes}}</p>
            <!-- <p class="text">纯牛奶|茉莉|芋头|燕麦</p> -->
          </div>
          <div class="skuGg_list">
            <div v-if="choiceSkuList.length">
              <div class="gg" v-for="(item,index) in choiceSkuList" :key="index">
                <p class="title">{{item.value}}</p>
                <div class="text" v-if="choiceSkuList[index].list.length">
                  
                  <p :class="choiceSkuList[index].index===i?'label on':'label'" v-for="(child,i) in item.list" :key="i" @click="onActive(index,i,child.id)">{{child.name}}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- 加入购物袋 -->
        <div class="addSp_box" :style="{paddingBottom:spPadding+'px'}">
          <div class="addSp">
            <div class="price_box">
              <div class="price">
                <p class="title">￥{{priceNum}}</p>
                <!-- <p class="text">热饮，标准糖</p> -->
              </div>
              <div class="jj_box">
                <p :class="{'jian':1,'add':1,'noneJi':spNum==1}" @click="reduce">-</p>
                <p class="num">{{spNum}}</p>
                <p class="jia add" @click="plus">+</p>
              </div>
            </div>
            <div v-if="stockNum>0">
            <p v-if="newGm === 1" class="add_button" @click="gmSubmit">立即购买</p>
            <p v-else class="add_button" @click="addGwc">加入购物袋</p>
            </div>
            <div v-else>
              <p  class="add_buttonNo" >暂无库存</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { easeAnimation } from '@/utils/animation'
export default {
  props:['spId','newGm'],
  data() {
    return{
      ani1:{},//展开商品详情动画
      idList:[],//获取选择的属性，进行匹配
      priceNum:'',//匹配完成获取价格\
       stockNum:'',//匹配完成获取库存
      spNum:1,//商品数量
      skuId:"",
      isIphoneX:false,
      carList:[],//获取购物车数量
      choiceCommodityList:[],//选择商品基本信息（图片，名字，介绍）
      choiceSkuPrice:[],//商品SKU价格
      choiceSkuList:[],//商品SKU
      buttonTitle:'',
      borderId:"",//立即购买-订单id
      spPadding:0
    }
  },
  onShow() {

  },
  methods: {
    /*
    *功能：关闭商品详情
    *开发人员：LRS
    *日期：2020.10.14
    * */
    closeSpdetails(){
      console.log("关闭")
      this.spNum=1
      easeAnimation.translate(0,0).step()
      this.ani1 = easeAnimation.export()
      this.$store.commit('SET_SPSHOWTEA', false);
    },
    /*
    *功能：组织冒泡事件
    *开发人员：LRS
    *日期：2020.10.14
    * */
    bubbling(){},

    //点击属性加选中状态
    onActive(index,i,id){
      this.choiceSkuList[index].index=+i
      this.idList[index]=id
      var priceArr = this.choiceSkuPrice.find(item=>item.idList === this.idList.join(''))
      this.priceNum = (priceArr.discountPrice/100).toFixed(2)
      this.stockNum=+priceArr.stockNumber
      this.skuId = priceArr.id
      console.log(priceArr.id)
    },
    //减商品
    reduce(){
      if(this.spNum === 1){
        return
      }else{
        this.spNum--
      }
    },
    //加商品
    plus(){
      this.spNum++
    },
    //加入购物车
    addGwc(){
      
      const _this = this;
      _this.carList = []
      let options = {
        goodsNum:this.spNum,
        skuId:this.skuId,
        storeId:_this.$store.state.user.storeId
      } 
     _this.$api.user.addShopCart(options).then(res=>{
        console.log(res)
        if(res.status){
          wx.showToast({
            title: '已加入购物袋',  
            icon: 'none',   
            duration: 1500 
          })
          this.getCarList()
          this.closeSpdetails()
        }
      })
    },
    //购物车列表
    getCarList(){
      var arr = []
      let options = {
          storeId:this.$store.state.user.storeId,
      }
      this.$api.user.selectShopCart(options).then(res=>{
        if(+res.status){
            // carList
          Object.keys(res.data.skuList).forEach(key => {
              arr.push(res.data.skuList[key])
          });
          this.carList = arr
          this.$emit('carListdata',this.carList);
        }
      })
    },
    //立即购买
    gmSubmit(){
      let _this = this
      var arrId = []
      arrId.push(this.skuId)
      wx.showToast({
        title: '加载中', 
        icon: 'loading', 
        duration: 10000
      });
      let options = {
        skuIds:arrId,
        storeId:this.$store.state.user.storeId
      }
      _this.$api.user.addOrder(options).then(res=>{
        console.log(res)
        if(res.status){
          _this.borderId = res.data
          wx.hideToast()
          this.closeSpdetails()
          wx.navigateTo({
              url: "../order/main?orderId="+_this.borderId
          });
        }else{
          wx.hideToast()
          wx.showToast({
            title: res.statusMessage, 
            icon: 'none', 
            duration: 1500
          });
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  computed:{
    spShow(){
      if(this.$store.getters.spShow_tea){
        console.log(this.choiceSkuList.length)
        if(this.choiceSkuList !== 0){//等商品sku加载完成在执行弹窗
          //展开背景
          wx.showToast({
            title: '加载中', 
            icon: 'loading', 
            duration: 10000
          });
          const query = wx.createSelectorQuery()
          setTimeout(()=>{
            query.select('.details_box')
            .boundingClientRect(res=>{
              console.log(res)
              easeAnimation.translate(0,-res.height-55).step()
              this.ani1 = easeAnimation.export()
            }).exec()
            wx.hideToast()
          },500)
        }
      }else{
        this.closeSpdetails()
      }
      console.log(this.$store.getters.spShow_tea)
      return this.$store.getters.spShow_tea
    },
  },
  onHide() {
    
  },
  onLoad() {
    // this.$store.commit('SET_SPSHOWTEA', false);
    let _this = this

    wx.getSystemInfo({
      success: res => {
        console.log('pppppppppppppppp'+res.model)
        let modelmes = res.model;
        if (modelmes.search("iPhone 11") != -1||modelmes.search("iPhone X") != -1||modelmes.search("iPhone XR") != -1||modelmes.search("iPhone XS") != -1) {
          this.spPadding = 40
        }else{
          this.spPadding = 0
        }
      }
    });
    
    
  },
  watch:{
    //商品SKU
    "spId":{
   immediate:true,
   handler:function(id){
   console.log(id)
      let _this = this;
      this.choiceSkuPrice = []
      this.choiceSkuList = []
      this.idList = []
      var arr = []
      var childValue = []
      var options = {
        productId:id,
        storeId:_this.$store.state.user.storeId
      }
      _this.$api.user.getProductAndSku(options).then(res=>{
        console.log(res)
        if(res.status){
          _this.choiceCommodityList = res.data.goods
          res.data.skus.forEach(item=>{
            let childIdList = []
            item.specsList.forEach(child=>{
              childIdList.push(child.valueId)
              item.idList = childIdList.join('')
              const nameIndex = arr.findIndex(i=>i.value === child.keyName)
              if(nameIndex !== -1){
                const valueIndex = arr[nameIndex].list.findIndex(i=>i.id === child.valueId)
                if(valueIndex===-1){
                  arr[nameIndex].list.push({
                    id:child.valueId,
                    name:child.valueName,
                  })
                }
              }else{
                const midOb={
                  value:child.keyName,
                  list:[],
                  index:0,
                  id:item.id
                }
                midOb.list.push({
                  id:child.valueId,
                  name:child.valueName,

                })
                arr.push(midOb)
              }
            })
          })
          _this.choiceSkuPrice = res.data.skus
          _this.choiceSkuList = arr

          //获取默认第一个skuID
          this.skuId = _this.choiceSkuList[0].id

          //获取sku属性ID
          _this.choiceSkuList.forEach((element) => {
            _this.idList.push(element.list[0].id)
          });
          
          //获取默认sku价格
          var priceArr = _this.choiceSkuPrice.find(item=>item.idList === this.idList.join(''))
          _this.priceNum = (priceArr.discountPrice/100).toFixed(2)
          _this.stockNum=+priceArr.stockNumber
          console.log(_this.priceNum)
        }
      })
   }
},
    // spId(id){
    //   console.log("ooooooooooooooooooooooooooooo")
      
    // },
    //立即购买
    newGm(val){
      console.log(val)
    },
  },
  onUnload() {},
  created() {}
};
</script>

<style  scoped>
.skuGg_list{
  /* width:100%;
  height:200rpx;
  overflow: auto; */
}
/*选择商品*/
.choiceSp_box{
  width:100%;
  height:100%;
  position: fixed;
  z-index: -1;
  top:0;
  left:0;
  transition: all 0.5s;
}
.choiceSp_active{
  width:100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 600;
}
.choiceSp_box .choiceSp{
  position: fixed;
left: 0;
bottom:0;
width: 100% !important;
height: 0%;
/* -webkit-transform: translateY(-100%);
transform: translateY(-100%); */

/* bottom: -1070rpx; */

}
.choiceSp_active .choiceSp{
  /* bottom: 0rpx; */
  width: 100% !important;
}
.choiceSp_active .details_box{
  z-index: 600;
  
}
.choiceSp_box .choiceSp .details_box{
  width: 100%;
background: #fff;
border-top-right-radius: 30rpx;
border-top-left-radius: 30rpx;
/* height: 500px; */
position: absolute;
top:0;
}
.choiceSp_box .choiceSp .box{
  width:94%;
  max-height:350px;
  overflow-y:auto;
  margin:0 auto;
}
.choiceSp_box .choiceSp .box .icon_box{
  position: fixed;
  top:20rpx;
  right:20rpx;
}
.choiceSp_box .choiceSp .box .icon{
  width:60rpx;
  height: 60rpx;
  line-height: 60rpx;
  background: #c1c1c1;
  text-align: center;
  border-radius: 50%;
}
.choiceSp_box .choiceSp .box .img{
  text-align: center;
  /* margin-top:50rpx; */
  margin-bottom:40rpx
}
.choiceSp_box .choiceSp .box .img image{
  width:300rpx;
  height:300rpx;
  margin:0 auto;
}
.choiceSp_box .choiceSp .box .sp_msg .title{
  font-size: 30rpx;
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height:50rpx
}
.choiceSp_box .choiceSp .box .sp_msg .label{
  display: inline-block;
  padding: 7rpx 11rpx;
  line-height: 34rpx;
  font-size: 22rpx;
  color: #9f7a46;
  background: #fbf8f1;
  border-radius: 6rpx;
}
.choiceSp_box .choiceSp .box .sp_msg .text{
  font-size: 24rpx;
  color: #959595;
}
.choiceSp_box .choiceSp .box .gg{
  margin-top:30rpx;
}
.choiceSp_box .choiceSp .box .gg .title{
  font-size:26rpx;
  color: #5a5a5a;
  margin-bottom:20rpx
}
.choiceSp_box .choiceSp .box .gg .text{
  display: flex;
}
.choiceSp_box .choiceSp .box .gg .text .label{
  /* width:140rpx; */
  /* height:62rpx;
  line-height: 62rpx; */
  background: #f8f8f8;
  color:#616161;
  font-size:28rpx;
  text-align: center;
  border-radius: 3px;
  margin-right:20rpx;
  padding: 8rpx 20rpx;
}
.choiceSp_box .choiceSp .box .gg .text .on{
  background: #ee4133;
  color:#fff;
}
/*加入购物袋*/
.choiceSp_box .choiceSp .addSp_box{
  width:100%;
  box-shadow: 0 10rpx 15rpx 15rpx #f0f0f0;
  margin-top:48rpx;
  border:1px solid #f0f0f0;
  background: #fff;
}
.choiceSp_box .choiceSp .addSp_box .addSp{
  width:94%;
  margin:0 auto;
}
.choiceSp_box .choiceSp .addSp_box .addSp .price_box{
  display: flex;
  justify-content:space-between;
  align-items: center;
  width:100%;
  height:130rpx;
}
.choiceSp_box .choiceSp .addSp_box .addSp .price_box .price .title{
font-size:35rpx;
  font-weight: 500;
  color:#000000;
  margin-bottom:10rpx;
}
.choiceSp_box .choiceSp .addSp_box .addSp .price_box .price .text{
  color:#959595;
  font-size:24rpx;
}
.choiceSp_box .choiceSp .addSp_box .addSp .price_box .jj_box{
  display: flex;
  margin-left:auto;
  align-items: center;
}
.choiceSp_box .choiceSp .addSp_box .addSp .price_box .jj_box .add{
  width:40rpx;
  height:40rpx;
  line-height: 40rpx;
  /* border:4rpx solid #6C8AF8; */
  /* border-radius: 50%; */
  text-align: center;
  font-size:45rpx;
  font-weight: 500;
}
.choiceSp_box .choiceSp .addSp_box .addSp .price_box .jj_box .num{
  /* font-size:32rpx;
  margin:0 20rpx; */
  width:100rpx;
  height:45rpx;
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
.noneJi{
  color: #f0f0f0 !important;
}
.choiceSp_box .choiceSp .addSp_box .addSp .price_box .jj_box .jian{
color:#000;
}
.choiceSp_box .choiceSp .addSp_box .addSp .price_box .jj_box .jia{
  /* background:#6C8AF8; */
color:#000;
}
.choiceSp_box .choiceSp .addSp_box .addSp .add_button{
  width:100%;
  height:96rpx;
  line-height: 96rpx;
  text-align: center;
  background: #ee4133;
  color:#fff;
  font-size:36rpx;
  border-radius: 50rpx;
  margin-bottom:62rpx;
}
.choiceSp_box .choiceSp .addSp_box .addSp .add_buttonNo{
 width:100%;
  height:96rpx;
  line-height: 96rpx;
  text-align: center;
  background: #d8d8d8;
  color:#fff;
  font-size:36rpx;
  border-radius: 50rpx;
  margin-bottom:62rpx;
}
</style>
