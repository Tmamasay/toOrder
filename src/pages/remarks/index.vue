<template>
  <div class="remarks_box">
    <div class="remarks">
      <p class="title" @click="complete">完成</p>
      <textarea style="width: 74%" v-model="remarks" @input="textareChange" name="" maxlength="50" placeholder="请输入你的备注"></textarea>
      <p class="text"><span class="num">{{length}}</span> / 50</p>
    </div>
  </div>
</template>
 
<script>
export default {
  components: {
  },
  data() {
    return{
      remarks:'',
      length:0
    }
  },
  onShow() {
    this.remarks = this.$store.getters.remark?this.$store.getters.remark:''
  },
  methods: {
    textareChange(){
      this.length = this.remarks.length
      console.log(this.remarks.length)
    },
    complete(){
      this.$store.commit('SET_REMARK', this.remarks);
      wx.navigateBack({
        delta: 1
      }) 
    }
  },
  onHide() {},
  onLoad() {
    
  },
  onUnload() {
    
  },
  created() {}
};
</script>

<style  scoped>
  .remarks_box{
    width:100%;
  }
  .remarks_box .remarks{
    width:88%;
    height:300rpx;
    background: #FAFAFA;
    border-radius: 15rpx;
    margin:0 auto;
    border:1px solid #E8E8E8;
    margin-top:30rpx;
    padding:20rpx;
    position: relative;
    font-size:28rpx;
    color:#000
  }
  .remarks_box .remarks .title{
    font-size:30rpx;
    float:right;
    margin:0rpx 0 30rpx 0;
    color:#000;
  }
  .remarks_box .remarks .text{
    position: absolute;
    bottom:20rpx;
    right:20rpx;
  }
  .remarks_box .remarks .text .num{
    color:#B9B9B9
  }
</style>
