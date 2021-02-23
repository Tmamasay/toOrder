import fetch from '@/utils/fetch.js'
//用户查询该商店的 热门 商品分类
const getHotProductTypes = params => {
  return fetch({
    url: `/tpp/applet/product/getHotProductTypes`,
    method: 'post',
    data: params
 
  })
}

//用户分页查询自己的订单
const selectMyOrderPage = params => {
  return fetch({
    url: `/tpp/applet/myOrder/selectMyOrderPage`,
    method: 'post',
    data: params
 
  })
}

//用户添加自己的地址
const addUserAddress = params => {
  return fetch({
    url: `/tpp/applet/myAddressManager/addUserAddress`,
    method: 'post',
    data: params
 
  })
}

//用户删除自己的地址
const delUserAddress = params => {
  return fetch({
    url: `/tpp/applet/myAddressManager/delUserAddress`,
    method: 'post',
    data: params
 
  })
}
//用户修改自己的地址
const updateUserAddress = params => {
  return fetch({
    url: `/tpp/applet/myAddressManager/updateUserAddress`,
    method: 'post',
    data: params
 
  })
}

//用户通过id查询自己的地址
const getUserAddressOne = params => {
  return fetch({
    url: `/tpp/applet/myAddressManager/getUserAddressOne`,
    method: 'post',
    data: params
 
  })
}
//用户自己的地址列表
const selectMyAddressList = params => {
  return fetch({
    url: `/tpp/applet/myOrder/selectMyAddressList`,
    method: 'post',
    data: params
 
  })
}
//用户发送推送消息
const sendMessage = params => {
  return fetch({
    url: `/tpp/applet/myOrder/sendMessage`,
    method: 'post',
    data: params
 
  })
}
//(用户端)积分商城展示所有的用户红包(满减)
const selectUserVoucherPage = params => {
  return fetch({                   
    url: `/tpp/store/userVoucherManager/selectUserVoucherPage`,
    method: 'post',
    data: params
 
  })
}
//积分商城兑换优惠券(我的)
const exchangeVouchers = params => {
  return fetch({                   
    url: `/tpp/applet/myUser/exchangeVouchers`,
    method: 'post',
    data: params
 
  })
}



const chengx = {
  exchangeVouchers,
  getHotProductTypes, //用户查询该商店的 热门 商品分类
  addUserAddress,
  updateUserAddress,
  delUserAddress,
  selectMyAddressList,
  getUserAddressOne,
  selectMyOrderPage,
  sendMessage,
  selectUserVoucherPage
}
export default chengx
