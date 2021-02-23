import baseUser from  '@/api/user'
import {
  getToken,
  setToken,
  getStoreId
} from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    //  baseurl: 'http://192.168.20.131:9000', //调试地址
    // baseurl: 'http://183.230.47.193:8088', //内网穿透地址
    // baseurl:'http://47.108.168.42:9000',
    baseurl:'https://gateway.jiuzhours.com',//线上地址
    type:0,
    tabIndex:0,
    // storeId:'1315489791034945545',//超市
    storeId:getStoreId(),//奶茶
    carNum:0,//超市选择商品数量
    spShow:false,//超市选择商品弹出
    spShow_tea:false,//奶茶选择商品弹出
    carNone:false,//清空购物车
    orderId:'',//订单id
    remark:'',//备注
    isGive:null,
    swicthStore:null,
    hbId:'',//个人红包ID
  },

  mutations: {
    SET_SWICTHSTORE: (state, swicth) => {
      state.swicthStore = swicth
    },
    SET_ISGIVE: (state, isGive) => {
      state.isGive = isGive
    },
    SET_REMARK: (state, remark) => {
      state.remark = remark
    },
    SET_ORDERID: (state, orderId) => {
      state.orderId = orderId
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_TAB: (state, tabIndex) => {
      state.tabIndex = tabIndex
    },
    SET_STOREID: (state, storeId) => {
      state.storeId = storeId
    },
    SET_CARNUM: (state, carNum) => {
      state.carNum = carNum
    },
    SET_SPSHOW: (state, spShow) => {
      state.spShow = spShow
    },
    SET_SPSHOWTEA: (state, spShow_tea) => {
      state.spShow_tea = spShow_tea
    },
    SET_CARNONE: (state, carNone) => {
      state.carNone = carNone
    },
    SET_HBID: (state, hbId) => {
      state.hbId = hbId
    },
  },

  actions: {
    // 用户名登录，获取token
    userLogin({commit}, options) {
      let _this = this;
      return new Promise((resolve, reject) => {
        baseUser.getUserOpenId(options).then((res) => {
          if (res.status) {
            commit('SET_TOKEN', res.data); //保存toke
            setToken(res.data); //保存token到本地缓存
            resolve(res)
          }
        }).catch((error) => {
          reject(error)
        });
      })
    },
  }
}

export default user