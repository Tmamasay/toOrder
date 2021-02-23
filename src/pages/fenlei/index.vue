<template>
  <div
    class="fenlei_box"
  >
    <!-- 骨架屏 -->
    <div
      class="gj_box"
      v-if="loadShow"
      :style="{ paddingTop: navBarHeight + 'px' }"
    >
      <div class="box">
        <div class="left">
          <p class="p" v-for="(item, index) in 7" :key="index"></p>
        </div>
        <div class="right">
          <div>
            <p class="title"></p>
            <div class="content" v-for="(item, index) in 4" :key="index">
              <p class="img"></p>
              <div class="msg">
                <p class="bt"></p>
                <p class="label"></p>
                <p class="js"></p>
                <div class="price_box">
                  <p class="price"></p>
                  <p class="gg"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- 主体内容（头部商家信息/左边分类/右边商品） -->
    <div v-else>
      <navigation-bar :backVisible="true" title=""></navigation-bar>
      <div class="address_box">
        <div class="address">
          <div>
            <p class="title">
              <img src="/static/images/wz.png" alt="" />{{ storeMsg.name }}
            </p>
            <p class="text">{{ storeMsg.address }}</p>
          </div>
          <p class="more" @click="moreMsg">更多信息 ></p>
        </div>
      </div>

      <div class="content_box" :style="{ height: bodyHeight1 + 'px' }">
        <scroll-view
          :style="{ height: bodyHeight1 + 'px' }"
          scroll-y
          id="left_box"
          class="left_box"
        >
          <div
            v-for="(item, index) in fenleiList"
            :key="index"
            :class="
              activeClassifyListId == item.index_i ? 'active left' : 'left'
            "
            @click="activeClassify(item.index_i, item)"
          >
            <div class="content">
              <img :src="item.img" alt="" />
              <p class="text">{{ item.name }}</p>
            </div>
            <p class="num" v-if="item.spNum">{{ item.spNum }}</p>
          </div>
        </scroll-view>
        <scroll-view
          :scroll-anchoring="true"
          :style="{ height: bodyHeight1 + 'px' }"
          class="right_box"
          :scroll-top="topNum"
          scroll-y
          scroll-with-animation
          :scroll-into-view="'item' + activeClassifyListId"
          @scroll="scroll"
        >
          <div class="banner_warp">
            <swiper
              class="banner"
              :autoplay="true"
              :circular="true"
              @change="bannerIndex"
            >
              <block>
                <swiper-item v-for="(item, index) in bannerList" :key="index">
                  <view class="li">
                    <img :src="item.img" alt="" />
                  </view>
                </swiper-item>
              </block>
            </swiper>
            <div class="dots">
              <p
                :class="banner_i === i ? 'on dot' : 'dot'"
                v-for="(item, i) in bannerList"
                :key="i"
              ></p>
            </div>
          </div>
          <div class="right_content">
            <div
              v-for="(item, index) in fenleiList"
              :key="index"
              :class="'list' + item.index_i"
              :id="isScroll ? 'item' + item.index_i : ''"
            >
              <!-- 一级 -->
              <p class="content_title">{{ item.name }}</p>
              <div class="commodity_list">
                <div
                  class="box"
                  v-for="(child, i) in item.children"
                  :key="i"
                  @click.stop="spdetails(index, i, child.id)"
                >
                  <div class="img">
                    <img :src="child.imgOne" alt="" mode="widthFix" />
                  </div>
                  <div class="msg">
                    <p class="title">{{ child.goodsName }}</p>
                    <p class="text">{{ child.remakes }}</p>
                    <p class="text1">已售{{ child.salesNum }}</p>
                    <!-- <p class="text">{{child.remakes}}</p> -->
                    <div class="price_box">
                      <p class="price">
                        ￥{{ child.showPrice / 100 }}<span class="qi">起</span>
                      </p>
                      <p class="add" v-if="storeTime">
                        选规格
                        <span class="num" v-if="child.spNum">{{
                          child.spNum
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
      <!-- 选择的商品背景 -->
      <div
        v-if="carList.length !== 0"
        :class="spShow ? 'xz_sp_box_active xz_sp_box' : 'xz_sp_box'"
        @click.stop="closeSpdetailsCar"
      >
        <!-- 选择的商品 -->
        <div class="positon" @click.stop=''>
            <div
            :animation="aniSpHop"
            class="xz_sp"
            :style="{ paddingBottom: isIphoneXnum + 'px' }"
          >
            <div class="title_box">
              <p class="title">已选商品</p>
              <p class="text" @click="clearCar">
                <i-icon
                  class="icon"
                  type="trash"
                  color="#8a8a8a"
                  size="20"
                />清空购物车
              </p>
            </div>
            <div class="sp_box" >
              <div class="sp" v-for="(item, index) in carList" :key="index">
                <img :src="item.goods.imgOne" alt="" />
                <div class="msg">
                  <p class="title">{{ item.goods.goodsName }}</p>
                  <p class="text">{{item.guige}}</p>
                  <div class="price_box">
                    <p class="price">￥{{ item.sku.discountPrice / 100 }}</p>
                    <div class="jia_jian">
                      <p class="jian" @click.stop="reduce(index, item)">-</p>
                      <p class="num">{{ item.goodsNum }}</p>
                      <p class="add" @click.stop="add(index, item)">+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 浮窗 -->
      <div class="car_fc_box" @click.stop="sp_pop" :style="{bottom:isIphoneXnum+'px'}">
        <div class="carPosition">
          <div class="car_xz" v-if="storeTime">
            <div class="pocket">
              <img src="/static/images/shopping_bag.png" alt="" />
              <p class="num">{{ carListLength ? carListLength : "0" }}</p>
            </div>
            <div class="price">
              ￥<span class="jg">{{ totalPriceNum }}</span>
            </div>
            <button
              class="submit"
              :disabled="isDisable"
              @click.stop="jiesuan"
              v-if="jsIshow"
            >
              去结算
            </button>
            <div class="qs_price" v-else>{{ syPrice }}</div>
          </div>
          <div v-else class="car_xz">
            <p class="text">该商店未营业</p>
          </div>
        </div>
      </div>
      <!-- 底部栏目 -->
      <teawithmilktabBar :tabBarindex="index"></teawithmilktabBar>
    </div>
    <!-- end -->
    
    <!-- 商家信息 -->
    <div
      :class="storeMsgShow ? 'options_box_on options_box' : 'options_box'"
      @click.stop="optionsBox"
      :catchtouchmove="true"
    >
      <div class="options" @click.stop="" :animation="ani1">
        <div class="storeName">
          <p class="title">
            <img src="/static/images/sj_store.png" alt="" />{{ storeMsg.name }}
          </p>
        </div>
        <div class="tell" @click="tell">
          <p class="title">
            <img src="/static/images/sj_tell.png" alt="" />
            {{ storeMsg.mobile }}
            <img class="right" src="/static/images/right.png" alt="" />
          </p>
        </div>
        <div class="dz">
          <p class="title">
            <img src="/static/images/sj_wz.png" alt="" />{{ storeMsg.address }}
          </p>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- 选择商品弹出层 -->
    <div :class="changeSpShow?'choiceSp_active choiceSp_box':'choiceSp_box'" @click.stop="closeSpdetails" :catchtouchmove='true'>
      <div class="choiceSp" :animation="spanimation" @click.stop="">
          <div class="details_box">
            <div class="sp_loading" v-if="!sp_loading">
              <img src="/static/images/load.gif" alt="">
            </div>

            <scroll-view scroll-y class="box" v-else>
              <div class="icon_box">
                <p class="icon" @click.stop="closeSpdetails"><i-icon type="close" color="#fff" size="20"/></p>
              </div>
              <div class="img" style="padding-top:20px">
                <p class="tp"><img :src="choiceCommodityList.imgOne" alt=""></p>
                <div class="sp_msg">
                  <p class="title">{{choiceCommodityList.goodsName}}</p>
                  <p class="text">已选：{{changeGg}}</p>
                  <div class="price_box">
                    <div class="price">
                      <p class="title"><span>￥</span>{{priceNum}}</p>
                    </div>
                    <!-- <div class="jj_box">
                      <p :class="{'jian':1,'add':1,'noneJi':spNum==1}" @click="reduceSp">-</p>
                      <p class="num">{{spNum}}</p>
                      <p class="jia add" @click="plus">+</p>
                    </div> -->
                  </div>
                </div>
              </div>
              
              <div class="skuGg_list">
                <div v-if="choiceSkuList.length">
                  <div class="gg" v-for="(item,index) in choiceSkuList" :key="index">
                    <p class="title">{{item.value}}</p>
                    <div class="text" v-if="choiceSkuList[index].list.length">
                      
                      <p :class="choiceSkuList[index].index===i?'label on':'label'" v-for="(child,i) in item.list" :key="i" @click="onActive(index,i,child.id,child.name)">{{child.name}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </scroll-view>
            <!-- 加入购物袋 -->
            <div class="addSp_box">
              <div class="addSp">
                
                <div v-if="stockNum>0">
                <p v-if="newGm === 1" class="add_button" @click="gmSubmit">立即购买</p>
                <p v-else class="add_button" @click="addGwc">选好了</p>
                </div>
                <div v-else>
                  <p  class="add_buttonNo" >暂无库存</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { easeAnimation,easeAnimation_sp, easeAnimation_reduce } from "@/utils/animation";
import navigationBar from "@/components/navigationBar";
import teawithmilktabBar from "@/components/teawithmilktabBar";
import { getUserinfo } from "@/utils/auth";
import {Debounce} from '@/utils/index'
export default {
  components: {
    navigationBar,
    teawithmilktabBar,
  },
  data() {
    return {
      info: getUserinfo(),
      isDisable: false,//去结算节流
      index: 1,//分类栏目
      leftTop: "", //获取左边导航距离头部的高度
      bodyHeight: this.$store.getters.bodyHeight, //获取屏幕高度
      bodyHeight1: 0,
      isScroll: false, //判断点击左边栏目还是滑动 false滑动，true点击栏目
      activeClassifyListId: 0, //获取左边栏目的下标
      bannerList: [], //banner轮播

      fenleiList: [], //商品分类列表
      statusBarHeight: "", // 状态栏高度
      titleBarHeight: "", // 标题栏高度
      navBarHeight: "", // 导航栏总高度
      loadShow: true, //骨架屏
      spShow: false,//是否显示购物车
      aniSpHop: {}, //展开商品详情动画
      ani1: {},//商家信息动画

      carList: [], //购物车列表
      carListLength: 0, //购物车数量
      totalPriceNum: 0, //商品总价

      qs_price: 0, //起送价格
      syPrice: 0, //起送价格-剩余价格
      jsIshow: false, //结算价、起送价格隐显
      storeTime: false,//是否营业状态
      banner_i: 0, //banner轮播下标
      topNum: 0,
      isIphoneXnum: 0,
      storeMsg: [],//商家信息
      storeMsgShow: false,//商家信息隐藏显示


      //选择商品
      spanimation:{},//展开商品详情动画
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
      spPadding:0,
      changeSpShow:false,

      changeGg:'',

      sp_loading:false,
    };
  },
  //获取头部导航的各个高度
  beforeMount() {
    const self = this;
    wx.getSystemInfo({
      success(system) {
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
      },
    });
  },
  methods: {
    //跳转授权页面
    getInfo() {
      wx.navigateTo({
        url: "../authorize/main",
      });
    },
    //获取banner下标
    bannerIndex(e) {
      console.log(e);
      this.banner_i = +e.target.current;
    },
    //获取轮播图
    getLunbo() {
      this.bannerBj = [];
      this.$api.user
        .getStoreChart({
          storeId: this.$store.state.user.storeId,
        })
        .then((res) => {
          if (res.status) {
            console.log(res);
            this.bannerList = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //左边栏目点击
    activeClassify(index, item) {
      this.topNum = 0;
      this.isScroll = true;
      setTimeout(() => {
        this.activeClassifyListId = index;
        const query = wx.createSelectorQuery();
        query
          .select(".banner_warp")
          .boundingClientRect((res) => {
            console.log(res);
            if (index === this.fenleiList[0].index_i) {
              this.topNum = -res.height;
            }
          })
          .exec();
      });
    },

    //右边产品内容滚动
    scroll() {
      this.isScroll = false;
      this.fenleiList.map((item) => {
        const query = wx.createSelectorQuery();
        query
          .select(".list" + item.index_i)
          .boundingClientRect((reft) => {
            if (
              0 < reft.top &&
              reft.top < this.bodyHeight1 - this.navBarHeight * 4
            ) {
              this.activeClassifyListId = item.index_i;
            }
          })
          .exec();
      });
    },

    //商品分类
    getFenlei() {
      const _this = this;
      let options = {
        storeId: _this.$store.state.user.storeId,
      };
      _this.$api.user.selectCanteenProductTypes(options).then((res) => {
        console.log(res.data.length);
        if (+res.status) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].index_i = i;
          }
          var arrlist = [];
          res.data.forEach((item) => {
            if (item.children.length !== 0) {
              arrlist.push(item);
            }
          });
          _this.fenleiList = arrlist;
          console.log("分类11111");
          console.log(_this.fenleiList)
          _this.activeClassifyListId = _this.fenleiList[0].index_i; //默认展示第一个
          setTimeout(()=>{
          _this.loadShow = false;
          },800)
        }
      });
    },

    //购物车弹窗
    sp_pop() {
      this.spShow = true;
      const query = wx.createSelectorQuery();
      query.select(".xz_sp").boundingClientRect((res) => {
        console.log(res);
        easeAnimation_sp.translateY(-130+'px').step();
        this.aniSpHop = easeAnimation_sp.export();
      }).exec();
      wx.hideToast();
    },

    //关闭购物车弹窗弹窗
    closeSpdetailsCar() {
      console.log("关闭");
      this.spShow = false;
      const query = wx.createSelectorQuery();
      query.select(".xz_sp").boundingClientRect((res) => {
        console.log(res);
        easeAnimation_sp.translateY(500+'px').step();
        this.aniSpHop = easeAnimation_sp.export();
      }) .exec();
    },

    //选规格弹窗-SKU选择
    spdetails:Debounce(function(index, i, id) {
      if (!this.info) {
        this.getInfo();
        return;
      }
      let _this = this;
      this.spNum = 1
      this.choiceSkuPrice = []
      this.choiceSkuList = []
      this.idList = []
      var arr = []
      var childValue = []
      this.changeGg = ''
      this.changeSpShow = true
      //展开背景
      // wx.showToast({
      //   title: '加载中', 
      //   icon: 'loading', 
      //   duration: 10000
      // });
      const query = wx.createSelectorQuery()
      query.select('.details_box')
      .boundingClientRect(res=>{
        console.log(res)
        easeAnimation.translate(0,-1000-_this.isIphoneXnum-56+'rpx').step()
        this.spanimation = easeAnimation.export()
      }).exec()


      setTimeout(res=>{
        var options = {
          productId:id,
          storeId:_this.$store.state.user.storeId
        }
        _this.$api.user.getProductAndSku(options).then(res=>{
          console.log(res)
          if(res.status){
            _this.sp_loading = true
            //默认已选
            res.data.skus[0].specsList.forEach(gg=>{
              this.changeGg += gg.valueName+','
            })
            this.changeGg = this.changeGg.substring(0,this.changeGg.length-1)

            wx.hideToast()
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
      },300)
    },200),
    //关闭选规格弹窗-SKU选择
    closeSpdetails(){
      this.changeSpShow = false
      this.sp_loading = false
      easeAnimation.translate(0,0).step()
      this.spanimation = easeAnimation.export()
    },

    //点击属性加选中状态-SKU
    onActive(index,i,id,name){
      this.changeGg = ''
      this.choiceSkuList[index].index=+i
      this.idList[index]=id
      var priceArr = this.choiceSkuPrice.find(item=>item.idList === this.idList.join(''))
      console.log(priceArr)
      if(priceArr){
        this.priceNum = (priceArr.discountPrice/100).toFixed(2)
        this.stockNum=+priceArr.stockNumber
        this.skuId = priceArr.id
        
        priceArr.specsList.forEach(res=>{
          console.log(res.valueName)
          this.changeGg += res.valueName+','
        })
        this.changeGg = this.changeGg.substring(0,this.changeGg.length-1)
        console.log(this.changeGg)
      }
      


      // console.log(priceArr.id)
      // console.log(name)
    },

    //选规格弹窗-减商品
    reduceSp(){
      if(this.spNum === 1){
        return
      }else{
        this.spNum--
      }
    },

    //选规格弹窗-加商品
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
    
    //算总价
    totalPrice() {
      var num = 0;
      this.carList.forEach((res) => {
        num += (res.sku.discountPrice * res.goodsNum) / 100;
      });
      this.totalPriceNum = num.toFixed(2);
      console.log(this.totalPriceNum);
      if (this.qs_price > this.totalPriceNum) {
        this.jsIshow = false;
        var price = (this.qs_price - this.totalPriceNum).toFixed(2);
        this.syPrice = `差${price}元起送`;
      } else {
        this.jsIshow = true;
      }
    },

    //购物车列表
    getCarList() {
      let _this = this;
      _this.carListLength = 0;
      var arr = [];
      _this.carList = [];
      let options = {
        storeId: _this.$store.state.user.storeId,
      };
      _this.$api.user.selectShopCart(options).then((res) => {
        if (+res.status) {
          if (res.data&&res.data.skuIdList.length) {
            Object.keys(res.data.skuList).forEach((key) => {
              arr.push(res.data.skuList[key]);
            });
            _this.carList = arr;
            _this.carList.forEach((res) => {
              //选择商品对应左侧栏目和选规格加对应的数量
              _this.carListLength += res.goodsNum;
              console.log(res.goodsNum);
              var spList = _this.fenleiList.filter(
                (item) => item.id === res.goods.goodsTypeId + ""
              );
              spList.forEach((child) => {
                if (child.children.length !== 0) {
                  var sp = child.children.filter(
                    (item) => item.id === res.sku.goodsId
                  );
                  sp.forEach((i) => {
                    var new_sp = _this.carList.filter((item) => item.sku.goodsId === i.id);
                    i.spNum=0
                    new_sp.forEach((a) => {
                      i.spNum ++;
                    //  i.spNum= i.spNum*res.goodsNum
                    });
                  });
                  child.spNum = 0;
                  child.children.forEach((arr) => {
                    if (arr.spNum) {
                      child.spNum += arr.spNum;
                      return;
                    }
                  });
                }
              });
              var ggList = ''
              res.sku.specsList.forEach(gg=>{
                ggList += gg.valueName+'/'
              })
              ggList = ggList.substring(0,ggList.length-1)
              res.guige = ggList
            });
            console.log("购物车");
            console.log(_this.carList)
            _this.totalPrice();
          } else {
            _this.clearXUZ();
          }
        }
      });
    },
    //购物车-减商品
    reduce(index, item) {
      console.log(item)
      let _this = this;
      console.log(index, item);
      var num = _this.carList[index].goodsNum--;
      console.log(_this.carList.length)
      if (num <= 1) {
        this.carList = this.carList.filter(i => i.sku.id !== item.sku.id)
        console.log(this.carList)
        let data = {
          skuId: item.sku.id,
          storeId: _this.$store.state.user.storeId,
        };
        _this.$api.user
          .delShopCartOneSku(data)
          .then((res) => {
            if (res.status) {
              _this.carListLength--;
              _this.reduceAdd(item,0);
              _this.totalPrice();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let options = {
          goodsNum: 1,
          skuId: item.sku.id,
          storeId: _this.$store.state.user.storeId,
        };
        _this.$api.user.reduceShopCart(options).then((res) => {
          console.log(res);
          if (res.status) {
            _this.carListLength--;
            // _this.reduceAdd(item,0);
          }
          _this.totalPrice();
        });
      }
      if (this.carList.length === 0) {
        this.closeSpdetailsCar();
      }

    },
    //购物车-加商品
    add(index, item) {
      let _this = this;
      var num = _this.carList[index].goodsNum++;
      let options = {
        goodsNum: 1,
        skuId: item.sku.id,
        storeId: _this.$store.state.user.storeId,
      };
      _this.$api.user.addShopCart(options).then((res) => {
        if (res.status) {
          console.log(item);
          this.carListLength++;
          // _this.reduceAdd(item,1);
        }
        _this.totalPrice();
      });
    },

    //购物车加减商品-对应列表label数量
    reduceAdd(arr,num) {
      this.fenleiList.forEach((list) => {
        if (list.children.length !== 0) {
          var sp = list.children.findIndex((child) => child.id === arr.sku.goodsId);
          if(sp!==-1){
            if(!num){
                 list.children[sp].spNum=list.children[sp].spNum--
                 console.log(list.children[sp].spNum--)
                 console.log(list.children[sp].spNum)
                 console.log('caaac------------------->')
                }else{
                  list.children[sp].spNum ++
                }
              list.spNum = 0;
              list.children.forEach((child) => {
            if (child.spNum) {
               list.spNum+=child.spNum
                console.log(list.spNum)
            }
          });
          console.log(list.children[sp].spNum)
          console.log('cnm----------')
          }
        }
      });
    },
    //结算
    jiesuan() {
      let _this = this;
      if (this.carList.length === 0) {
        wx.showToast({
          title: "请选择商品~",
          icon: "none",
          duration: 1000,
        });
        return;
      }
      this.isDisable = true;
      wx.showToast({
        title: "加载中",
        icon: "loading",
        duration: 10000,
      });
      var skuIdList = [];
      this.carList.forEach((res) => {
        skuIdList.push(res.sku.id);
      });
      console.log(skuIdList);
      let options = {
        skuIds: skuIdList,
        storeId: this.$store.state.user.storeId,
      };
      if (this.$store.getters.orderId !== "") {
        options.orderId = this.$store.getters.orderId;
      }
      _this.$api.user
        .addOrder(options)
        .then((res) => {
          console.log(res);
          if (+res.statusCode === 0) {
            _this.borderId = res.data;
            wx.hideToast();
            this.$store.commit("SET_ORDERID", _this.borderId);
            this.$store.commit("SET_REMARK", "");
            this.isDisable = false;
            wx.navigateTo({
              url: "../qr_order/main",
            });
          } else {
            wx.showToast({
              title: res.statusMessage,
              icon: "none",
              duration: 1500,
            });
            this.isDisable = false;
          }
        })
        .catch((err) => {
          this.isDisable = false;
        });
    },
    //清空购物车
    clearCar() {
      let _this = this;
      let options = {
        storeId: _this.$store.state.user.storeId,
      };
      wx.showModal({
        title: "提示",
        content: "确认清除购物车？",
        success(res) {
          console.log(res);
          if (res.confirm) {
            _this.$api.user.clearShopCart(options).then((res) => {
              console.log(res);
              if (res.status) {
                wx.showToast({
                  title: "已清空购物车",
                  icon: "none",
                  duration: 1000,
                });
                _this.carList.forEach((res) => {
                  var spList = _this.fenleiList.filter(
                    (item) => item.id === res.goods.goodsTypeId + ""
                  );
                  console.log(spList);
                  spList.forEach((child) => {
                    child.spNum = 0;
                    if (child.children.length !== 0) {
                      child.children.forEach((arr) => {
                        arr.spNum = 0;
                      });
                    }
                  });
                });
                _this.totalPriceNum = 0;
                _this.carListLength = 0;
                _this.getShezhi();
                _this.getCarList();
                _this.closeSpdetailsCar();
              }
            });
          } else {
            wx.showToast({
              title: "取消清除",
              icon: "none",
              duration: 1000,
            });
          }
        },
      });
    },
    //清空分类label标识位
    clearXUZ() {
      console.log('当前购物车没有商品，复位计数为0')
      let _this = this;
        _this.fenleiList.forEach((child) => {
          child.spNum = 0;
          if (child.children.length !== 0) {
            child.children.forEach((arr) => {
              arr.spNum = 0;
            });
          }
        });
      _this.totalPriceNum = 0;
      _this.carListLength = 0;
      _this.closeSpdetails();
    },
    //价格保留两位
    forMatPrice(price) {
      if (!price) return 0;

      return (price / 100).toFixed(2);
    },

    //获取商店设置
    getShezhi() {
      let _this = this;
      _this.jsIshow = false;
      _this.$api.user.getStoreSwitch({
      storeId:_this.$store.state.user.storeId,
      type:'public'
      }).then(res=>{
      const switchStore=res.data.switch
      console.log(switchStore)
      console.log('-----------=')
      if (_this.carList.length === 0) {
        //起送价格
        if (switchStore.startPrice === 0) {
          _this.jsIshow = true;
        } else {
          console.log("111");
          console.log(_this.totalPriceNum);
          if (
            +_this.totalPriceNum === 0 ||
            +_this.totalPriceNum === 0.0
          ) {
            console.log("000");
            _this.jsIshow = false;
            _this.qs_price = switchStore.startPrice; //起送价格
            _this.syPrice = `${_this.qs_price}元起送`;
          }
        }
      } else {
        console.log(_this.totalPriceNum);
        if (_this.totalPriceNum > _this.qs_price) {
          _this.jsIshow = true;
          console.log("aaaa");
        } else {
          if (_this.totalPriceNum === 0) {
            _this.jsIshow = false;
            _this.qs_price = switchStore.startPrice; //起送价格
            _this.syPrice = `￥${_this.qs_price}起送`;
          } else {
            _this.jsIshow = false;
            var price = (_this.qs_price - _this.totalPriceNum).toFixed(2);
            _this.syPrice = `差￥${price}起送`;
          }
        }
      }
      //当前时间
      const timeNow=new Date()
      var newTime = timeNow.getHours()*60 + timeNow.getMinutes();

      //开店时间
      var kd = switchStore.startTime.split(":");
      var kdTime = (+kd[0])*60 + (+kd[1]);

      //结束时间
      var js = switchStore.endTime.split(":");
      var jsTime = (+js[0])*60 + (+js[1]);

      console.log(newTime,kdTime,jsTime)
      if (+newTime > +kdTime && +newTime < +jsTime) {
        console.log("营业中");
        _this.storeTime = true;
      } else {
        console.log("未营业");
        _this.storeTime = false;
      }
      })
          
    },
    //商店信息
    getsdmsg() {
      var options = {
        storeId: this.$store.state.user.storeId,
      };
      this.$api.user.getStoreMessage(options).then((res) => {
        console.log(res);
        if (res.status) {
          this.storeMsg = res.data;
        }
      });
    },
    //拨打电话
    tell() {
      wx.makePhoneCall({
        phoneNumber: this.storeMsg.mobile,
      });
    },

    //商家信息
    moreMsg() {
      this.storeMsgShow = true;
      const query = wx.createSelectorQuery();
      query.select(".options").boundingClientRect((res) => {
        console.log(res);
        easeAnimation.translate(0, -240).step();
        this.ani1 = easeAnimation.export();
      }).exec();
    },

    //关闭商家信息
    optionsBox() {
      this.storeMsgShow = false;
      const query = wx.createSelectorQuery();
      query.select(".options").boundingClientRect((res) => {
        console.log(res);
        easeAnimation.translate(0, 0).step();
        this.ani1 = easeAnimation.export();
      }).exec();
    },
  },
  onLoad() {
    this.getFenlei();
    this.getShezhi();
    this.loadShow = true;
    Object.assign(this.$data, this.$options.data());

    //获取屏幕高度
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        setTimeout(() => {
          _this.bodyHeight = res.windowHeight;
        });
      },
    });

    //判断手机机型，动态给底部添加样式
    wx.getSystemInfo({
      success: (res) => {
        console.log("手机信息res" + res.model);
        let modelmes = res.model;
        if (
          modelmes.search("iPhone 12") != -1 ||
          modelmes.search("iPhone 11") != -1 ||
          modelmes.search("iPhone X") != -1 ||
          modelmes.search("iPhone XR") != -1 ||
          modelmes.search("iPhone XS") != -1
        ) {
          this.isIphoneXnum = 48;
        } else {
          this.isIphoneXnum = 0;
        }
      },
    });

    //给scroll-view动态计算高度
    setTimeout(() => {
      this.bodyHeight1 = wx.getSystemInfoSync().windowHeight-70-50-65-this.isIphoneXnum-this.navBarHeight-24
    }, 1000);
  },
  onPageScroll(e) {},
  onShow() {
    //提交按钮节流
    this.isDisable = false;

    //sku弹窗默认隐藏
    this.changeSpShow = false

    //进入页面-关闭购物车弹窗
    this.closeSpdetailsCar()

    //进入页面-关闭sku弹窗
    this.closeSpdetails();

    //获取用户信息
    this.info = getUserinfo() ? getUserinfo() : null;

    
    this.getLunbo();
    setTimeout(() => {
       this.getCarList();
    }, 500);
   
    this.getsdmsg();
  },
  onHide(){
    this.getFenlei();
    this.getShezhi();
  }
};
</script>

<style scoped>
page {
    height: 100%;
    overflow: hidden;
  }
  button {
    background-color: transparent;
    padding-left: 0;
    padding-right: 0;
    line-height: inherit;
  }
  button {
    border-radius: 0;
  }
  button::after {
    border: none;
  }
  /*分类*/
  .fenlei_box {
    height: 100%;
    /* background: #ffffff; */
    overflow-y: hidden;
  }
  .fenlei_box .content_box {
    display: flex;
    /* background: #fff; */
  }
  .fenlei_box .left_box {
    width: 26%;
    height: 100%;
    background: #fff;
    /* position: fixed;
    left:0; */
  }
  .fenlei_box .left_box .left {
    width: 100%;
    height: 140rpx;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #4d4d4d;
    position: relative;
    border-left: 8rpx solid transparent;
  }
  .fenlei_box .left_box .left .num {
    display: inline-block;
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    width: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    background: #ee4133;
    border-radius: 50%;
    text-align: center;
    font-size: 24rpx;
    color: #fff;
    border: 2rpx solid #fff;
  }
  .fenlei_box .left_box .active {
    background: #f6f6f6;
    color: #131313;
    border-left: 8rpx solid #ee4133;
  }
  .fenlei_box .left_box .left image {
    width: 60rpx;
    height: 60rpx;
    margin: 0 auto;
    margin-bottom: 10rpx;
  }
  .fenlei_box .right_box {
    padding-left: 26rpx;
    width: 72%;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    background: #f6f6f6;
  }
  .fenlei_box .right_box .sp_title {
    padding: 40rpx 0 30rpx 0;
    font-size: 26rpx;
    color: #333;
  }
  .content_title {
    font-size: 24rpx;
    color: #959595;
    padding: 30rpx 0;
  }
  /*骨架屏*/
  .gj_box {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    z-index: 9999999999;
    top: 0;
    left: 0;
  }
  .gj_box .head {
    width: 92%;
    margin: 0 auto;
    height: 80rpx;
    background: #f0f0f0;
    border-radius: 40rpx;
  }
  .gj_box .box {
    margin-top: 30rpx;
    display: flex;
  }
  .gj_box .box .left {
    width: 160rpx;
    height: 1000rpx;
    background: #f7f7f7;
  }
  .gj_box .box .left .p:first-child {
    margin-top: 30rpx;
  }
  .gj_box .box .left .p {
    width: 80%;
    height: 40rpx;
    background: #f0f0f0;
    margin: 0 auto;
    margin-bottom: 40rpx;
  }
  .gj_box .box .right {
    width: 72%;
    margin-left: 20rpx;
  }
  .gj_box .box .right .title {
    width: 120rpx;
    height: 40rpx;
    background: #f0f0f0;
    margin-bottom: 40rpx;
  }
  .gj_box .box .right .content {
    display: flex;
    width: 100%;
    margin-bottom: 30rpx;
  }
  .gj_box .box .right .content .img {
    width: 180rpx;
    height: 180rpx;
    background: #f0f0f0;
  }
  .gj_box .box .right .content .msg {
    margin-left: 30rpx;
    width: 60%;
  }
  .gj_box .box .right .content .msg .bt,
  .gj_box .box .right .content .msg .js {
    width: 100%;
    height: 30rpx;
    background: #f0f0f0;
  }
  .gj_box .box .right .content .msg .label {
    width: 100rpx;
    height: 30rpx;
    background: #f0f0f0;
    margin: 10rpx 0;
  }
  .gj_box .box .right .content .msg .price_box {
    display: flex;
    margin-top: 20rpx;
  }
  .gj_box .box .right .content .msg .price_box .price {
    width: 80rpx;
    height: 30rpx;
    background: #f0f0f0;
  }
  .gj_box .box .right .content .msg .price_box .gg {
    margin-left: auto;
    width: 80rpx;
    height: 30rpx;
    background: #f0f0f0;
  }
  /*产品列表*/
  .commodity_list {
    width: 96%;
    display: flex;
    flex-wrap: wrap;
  }
  .commodity_list .box {
    display: flex;
    width: 92%;
    height: 196rpx;
    margin-bottom: 24rpx;
    background: #fff;
    padding: 20rpx;
    border-radius: 10rpx;
    /* border-bottom:1px solid #aaa; */
  }
  .commodity_list .box:last-child {
    margin-bottom: 0;
  }
  .commodity_list .box .img image {
    width: 196rpx;
    height: 196rpx;
    border-radius: 5px;
  }
  .commodity_list .box .msg {
    width: 65%;
    margin-left: 30rpx;
    /* margin-left:auto; */
  }
  .commodity_list .box .msg .label {
    display: inline-block;
    font-size: 20rpx;
    padding: 4rpx 8rpx;
    background: #02b6fd;
    margin-bottom: 10rpx;
    color: #fff;
  }
  .commodity_list .box .msg .title {
    width: 84%;
    font-weight: 500;
    font-size: 27rpx;
    margin-bottom: 14rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #171a1f;
    margin-top: 10rpx;
  }
  .commodity_list .box .msg .text {
    display: inline-block;
    padding: 7rpx 11rpx;
    line-height: 34rpx;
    font-size: 22rpx;
    color: #9f7a46;
    background: #fbf8f1;
    border-radius: 3px;
    /* margin-bottom:2rpx; */
  }
  .commodity_list .box .msg .text1 {
    margin-top: 12rpx;
    color: #9a9a9a;
    font-size: 22rpx;
    margin-left: 6rpx;
  }
  .commodity_list .box .msg .price_box {
    display: flex;
    margin-top: 10rpx;
    width:126px;
  }
  .commodity_list .box .msg .price_box .price {
    font-size: 30rpx;
    font-weight: 500;
    color: #ec4233 !important;
  }
  .commodity_list .box .msg .price_box .price .qi {
    font-size: 22rpx;
    color: #989898;
    margin-left: 8rpx;
  }
  .commodity_list .box .msg .price_box .add {
    margin-left: auto;
    width: 100rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    background: #ee4133;
    border-radius: 40rpx;
    font-size: 22rpx;
    color: #fff;
    position: relative;
  }
  .commodity_list .box .msg .price_box .add .num {
    display: inline-block;
    position: absolute;
    top: -10rpx;
    right: -10rpx;
    width: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    background: #ee4133;
    border-radius: 50%;
    text-align: center;
    font-size: 24rpx;
    color: #fff;
    border: 1px solid #fff;
  }
  /*浮窗*/
  .car_fc_box {
    width: 100%;
    height: 130rpx;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 10;
  }
  .car_fc_box .car_xz {
    width: 92%;
    height: 50px;
    background: #323232;
    border-radius: 50rpx;
    margin: 0 auto;
    position: relative;
    top: -110rpx;
    display: flex;
    align-items: center;
  }
  .carPosition {
    position: relative;
  }
  .car_fc_box .car_xz .text {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 30rpx;
  }
  .car_fc_box .car_xz .pocket {
    position: relative;
    margin: 0 30rpx;
  }
  .car_fc_box .car_xz .pocket image {
    width: 64rpx;
    height: 64rpx;
  }
  .car_fc_box .car_xz .pocket .num {
    position: absolute;
    top: 0;
    right: -23rpx;
    width: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    background: #ee4133;
    border-radius: 50%;
    text-align: center;
    font-size: 24rpx;
    color: #fff;
  }
  
  .car_fc_box .car_xz .price {
    margin-left: 20rpx;
    color: #fff;
    font-size: 30rpx;
    font-weight: 600;
  }
  .car_fc_box .car_xz .price .jg {
    font-size: 36rpx;
  }
  .car_fc_box .car_xz .submit {
    width: 160rpx;
    height: 100rpx;
    line-height: 100rpx;
    background: #ee4133;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    border-top-right-radius: 50rpx;
    border-bottom-right-radius: 50rpx;
    margin-right: 0px;
    /* margin-left:auto; */
  }
  .car_fc_box .car_xz .qs_price {
    margin-left: auto;
    color: #fff;
    margin-right: 40rpx;
  }
  .right_content {
    padding-bottom: 20rpx;
    background: #f6f6f6;
  }
  /*选择商品*/
  .xz_sp_box {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.5s;
  }
  .xz_sp_box_active {
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 5;
  }
  .xz_sp_box .positon {
    width: 100%;
    height: 130rpx;
    background: #fff;
    position: fixed;
    bottom:130rpx;
    left: 0;
  }
  .xz_sp_box .xz_sp {
    position: fixed;
    bottom: 0rpx;
    width: 100%;
    background: #fff;
    border-top-right-radius: 30rpx;
    border-top-left-radius: 30rpx;
  }
  .xz_sp_box .xz_sp .title_box {
    width: 100%;
    height: 88rpx;
    background: #f1f1f1;
    border-top-right-radius: 30rpx;
    border-top-left-radius: 30rpx;
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #272727;
  }
  .xz_sp_box .xz_sp .title_box .title {
    margin-left: 35rpx;
  }
  .xz_sp_box .xz_sp .title_box .text {
    margin-right: 35rpx;
    margin-left: auto;
    font-size: 28rpx;
    color: #7c7c7c;
  }
  .xz_sp_box .xz_sp .title_box .text .icon {
    margin-right: 6rpx;
  }
  .xz_sp_box .xz_sp .sp_box {
    width: 92%;
    margin: 0 auto;
    margin-top: 30rpx;
    max-height: 320px;
    overflow-y: auto;
  }
  .xz_sp_box .xz_sp .sp_box .sp {
    display: flex;
    margin-bottom: 40rpx;
  }
  .xz_sp_box .xz_sp .sp_box .sp image {
    width: 110rpx;
    height: 110rpx;
    border-radius: 8rpx;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg {
    width: 80%;
    margin-left: 20rpx;
    position: relative;
    top: -6rpx;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg .title {
    font-size: 30rpx;
    margin-bottom: 6rpx;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg .text {
    font-size: 24rpx;
    color: #959595;
    margin-bottom: 2rpx;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg .price_box {
    display: flex;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg .price_box .price {
    font-size: 30rpx;
    font-weight: 500;
    color: #ee4133 !important;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg .price_box .jia_jian {
    display: flex;
    margin-left: auto;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg .price_box .jia_jian .jian {
    width: 36rpx;
    height: 36rpx;
    line-height: 36rpx;
    border: 2px solid #ee4133;
    border-radius: 50%;
    font-size: 28rpx;
    font-weight: 600;
    text-align: center;
    color: #ee4133;
    padding: 0px;
    display: table-cell;
    vertical-align: middle;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg .price_box .jia_jian .num {
    width: 55rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    font-size: 34rpx;
  }
  .xz_sp_box .xz_sp .sp_box .sp .msg .price_box .jia_jian .add {
    width: 40rpx;
    height: 40rpx;
    line-height: 40rpx;
    background: #ee4133;
    border-radius: 50%;
    color: #fff;
    font-size: 34rpx;
    font-weight: 600;
    text-align: center;
    padding: 0px;
    display: table-cell;
    vertical-align: middle;
  }
  /*轮播*/
  .banner_warp {
    width: 96%;
    height: 300rpx;
    margin: 20rpx auto 20rpx 0;
    border-radius: 20rpx;
    position: relative;
  }
  .banner_warp .banner {
    height: 400rpx;
    overflow: visible;
  }
  .banner_warp .li {
    border-radius: 20rpx;
    width: 100%;
    height: 300rpx;
    text-align: center;
  }
  .banner_warp image {
    display: inline-block;
    width: 100%;
    height: 300rpx;
    border-radius: 10rpx;
    margin: 0 auto;
    text-align: center;
  }
  .banner_warp .dots {
    position: absolute;
    bottom: 16rpx;
    left: 15rpx;
    display: flex;
  }
  .banner_warp .dots .dot {
    width: 36rpx;
    height: 6rpx;
    background: rgba(216, 216, 216, 0.5);
    margin-right: 12rpx;
    border-radius: 40rpx;
  }
  .banner_warp .dots .on {
    width: 36rpx;
    height: 6rpx;
    background: #fff;
  }
  /*地址*/
  .address_box {
    width: 100%;
    height: 70px;
    background: #fff;
    /* position: fixed;
    top:0;
    left:0; */
    z-index: 100;
    border-bottom: 1px solid #f2f3f7;
    /* box-shadow: 0rpx 20rpx 20rpx 20rpx #f2f3f7; */
    /* box-shadow: 0rpx 20rpx 10rpx #aaa */
  }
  .address_box .address {
    display: flex;
    width: 92%;
    height: 70px;
    margin: 0 auto;
    align-items: center;
  }
  .address_box .address img {
    width: 26rpx;
    height: 26rpx;
    margin-right: 10rpx;
  }
  .address_box .address div .title {
    font-size: 30rpx;
    color: #000000;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
  }
  .address_box .address div .text {
    font-size: 24rpx;
    color: #727272;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 10rpx;
  }
  .address_box .address .more {
    margin-left: auto;
    font-size: 26rpx;
    color: #727272;
  }
  .paddingShow .addSp_box {
    padding-bottom: 40px !important;
  }
  .paddingNone .addSp_box {
    padding-bottom: 0px !important;
  }
  .options_box {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  
    position: fixed;
    top: 0;
    z-index: -1;
    transition: all 0.5s;
  }
  .options_box_on {
    transition: all 0.5s;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.6);
  }
  .options_box .options {
    width: 100%;
    height: 240px;
    background: #fff;
    position: absolute;
    bottom: -240px;
    left: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-top: 20px;
  }
  .options_box .options div {
    width: 86%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #edf1f4;
    font-size: 14px;
    color: #333;
  }
  .options_box .options div .title {
    display: flex;
    align-items: center;
  }
  .options_box .options div img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .options_box .options div .title .right {
    margin-left: auto;
    margin-right: 0;
  }
  .options_box .options .storeName {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  .options_box .options .dz img {
    width: 20px;
    height: 20px;
  }
  
  
  /*选择商品*/
  .choiceSp_box{
    width:100%;
    height:100%;
    position: fixed;
    z-index: -10;
    top:0;
    left:0;
    transition: all 0.5s;
  }
  .choiceSp_active{
    width:100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 666;
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
  .sp_loading{
    width: 100%;
    height:100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 30rpx;
    border-top-left-radius: 30rpx;
  }
  .sp_loading img{
    width:190rpx;
    height:101rpx;
  }
  .choiceSp_box .choiceSp .details_box{
    width: 100%;
    background: #fff;
    border-top-right-radius: 30rpx;
    border-top-left-radius: 30rpx;
    height: 970rpx;
    position: absolute;
    top:0;
  }
  .choiceSp_box .choiceSp .box{
    width:92%;
    max-height:790rpx;
    overflow-y: scroll;
    margin:0 auto;
  }
  
::-webkit-scrollbar {

  width: 0;

  height: 0;

  color: transparent;

}
  .choiceSp_box .choiceSp .box .icon_box{
    position: fixed;
    top:20rpx;
    right:30rpx;
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
    /* text-align: center; */
    /* margin-top:50rpx; */
    margin-bottom:40rpx;
    display: flex;
  }
  .choiceSp_box .choiceSp .box .img .tp{
    width:200rpx;
    height:200rpx;
    border:1px solid #f8f8f8;
    border-radius: 5px;
  }
  .choiceSp_box .choiceSp .box .img image{
    display: inline-block;
    width:100%;
    height:100%;
    border-radius: 10rpx;
  }
  .choiceSp_box .choiceSp .box .sp_msg{
    margin-left:10px;
    width:60%;
  }
  .choiceSp_box .choiceSp .box .sp_msg .title{
    font-size: 34rpx;
    color: #000;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height:50rpx;
    font-weight: 600;
  }
  .choiceSp_box .choiceSp .box .sp_msg .text{
    display: inline-block;
    padding: 7rpx 0rpx;
    line-height: 34rpx;
    font-size: 22rpx;
    border-radius: 6rpx;
    margin:10rpx 0 50rpx 0;
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
    flex-wrap:wrap
  }
  .choiceSp_box .choiceSp .box .gg .text .label{
    /* width:140rpx; */
    /* height:62rpx;
    line-height: 62rpx; */
    background: #F6F6F6;
    color:#0F0F0F;
    font-size:28rpx;
    text-align: center;
    border-radius: 6px;
    margin-right:20rpx;
    width:210rpx;
    height:68rpx;
    line-height: 68rpx;
    margin-bottom:25rpx;
  }
  .choiceSp_box .choiceSp .box .gg .text .label:nth-child(3n){
    margin-right: 0;
  }
  .choiceSp_box .choiceSp .box .gg .text .on{
    background: #ee4133;
    color:#fff;
  }
  /*加入购物袋*/
  .choiceSp_box .choiceSp .addSp_box{
    width:100%;
    margin-top:48rpx;
    background: #fff;
    position: absolute;
    bottom:0;
  }
  .choiceSp_box .choiceSp .addSp_box .addSp{
    width:94%;
    margin:0 auto;
  }
  .choiceSp_box .choiceSp .price_box{
    display: flex;
    justify-content:space-between;
    align-items: center;
    width:100%;
  }
  .choiceSp_box .choiceSp .price_box .price .title{
  font-size:20px;
    font-weight: 500;
    color:#ec4233;
    margin-bottom:10rpx;
  }
  .choiceSp_box .choiceSp .price_box .price .title span{
    font-size:14px;
  }
  .choiceSp_box .choiceSp .price_box .price .text{
    color:#959595;
    font-size:24rpx;
  }
  .choiceSp_box .choiceSp .price_box .jj_box{
    display: flex;
    margin-left:auto;
    align-items: center;
  }
  .choiceSp_box .choiceSp .price_box .jj_box .add{
    width:40rpx;
    height:40rpx;
    line-height: 40rpx;
    /* border:4rpx solid #6C8AF8; */
    /* border-radius: 50%; */
    text-align: center;
    font-size:45rpx;
    font-weight: 500;
  }
  .choiceSp_box .choiceSp .price_box .jj_box .num{
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
  .choiceSp_box .choiceSp .price_box .jj_box .jian{
  color:#000;
  }
  .choiceSp_box .choiceSp .price_box .jj_box .jia{
    /* background:#6C8AF8; */
  color:#000;
  }
  .choiceSp_box .choiceSp .addSp_box .addSp .add_button{
    width:100%;
    height:80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #ee4133;
    color:#fff;
    font-size:36rpx;
    border-radius: 50rpx;
    margin-bottom:62rpx;
  }
  .choiceSp_box .choiceSp .addSp_box .addSp .add_buttonNo{
   width:100%;
    height:80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #d8d8d8;
    color:#fff;
    font-size:36rpx;
    border-radius: 50rpx;
    margin-bottom:62rpx;
  }
</style>