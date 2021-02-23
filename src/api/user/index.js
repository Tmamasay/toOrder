import fetch from '@/utils/fetch.js'
import store from '@/store/index';

/*===========================基础接口信息=================================*/
//获取OpenId-唐豪 
const getUserOpenId = params => {
    return fetch({
        url: `/tpp/applet/user/login?code=${params.code}&StoreId=${params.StoreId}`,
        method: 'get'
    })
}

//获取用户手机号-唐豪 
const getUserNum = params => {
    return fetch({
        url: `/tpp/applet/myUser/setUserPhone`,
        method: 'post',
        data: params
    })
}

//手机信息表单 
const addRecruitStore = params => {
    return fetch({
        url: `/tpp/admin/recruitStore/addRecruitStore`,
        method: 'post',
        data: params
    })
}

//存用户基本信息（头像、昵称、性别、城市等）-唐豪 
const saveUserProfile = params => {
    return fetch({
        url: `/tpp/applet/myUser/setUserProfile`,
        method: 'post',
        data: params
    })
}

//获取用户基本信息（头像、昵称、性别、城市等）-唐豪 
const getUserProfile = params => {
    return fetch({
        url: `/tpp/applet/myUser/getUserProfile`,
        method: 'post',
        data: params
    })
}


/*===========================功能模块=================================*/
//获取用户基本信息（头像、昵称、性别、城市等）-唐豪 
const selectProductPage = params => {
    return fetch({
        url: `/tpp/applet/product/selectProductPage`,
        method: 'post',
        data: params
    })
}
//用户查询该商店的所有商品分类
const selectProductTypes = params => {
    return fetch({
        url: `/tpp/applet/product/selectProductTypes`,
        method: 'post',
        data: params
    })
}

//查询该商品的信息以及下的所有sku
const getProductAndSku = params => {
    return fetch({
        url: `/tpp/applet/product/getProductAndSku`,
        method: 'post',
        data: params
    })
}

//单查商品详情
const getProductOne = params => {
    return fetch({
        url: `/tpp/applet/product/getProductOne`,
        method: 'post',
        data: params
    })
}

//添加购物车
const addShopCart = params => {
    return fetch({
        url: `/tpp/applet/shopCart/addShopCart`,
        method: 'post',
        data: params
    })
}

//减少购物车
const reduceShopCart = params => {
    return fetch({
        url: `/tpp/applet/shopCart/reduceShopCart`,
        method: 'post',
        data: params
    })
}

//展示自己的购物车
const selectShopCart = params => {
    return fetch({
        url: `/tpp/applet/shopCart/selectShopCart`,
        method: 'post',
        data: params
    })
}

//用户提交订单
const addOrder = params => {
    return fetch({
        url: `/tpp/applet/myOrder/addOrder`,
        method: 'post',
        data: params
    })
}

//删除购物车指定商品
const delShopCartOneSku = params => {
    return fetch({
        url: `/tpp/applet/shopCart/delShopCartOneSku`,
        method: 'post',
        data: params
    })
}

//用户提交订单后(查询订单详情)
const getOrderById = params => {
    return fetch({
        url: `/tpp/applet/myOrder/getOrderById`,
        method: 'post',
        data: params
    })
}

//用户对订单发起支付
const payMyOrder = params => {
    return fetch({
        url: `/tpp/applet/myOrder/payMyOrder`,
        method: 'post',
        data: params
    })
}

//用户对订单设置地址(并保存地址(超过10条不保存))
const setOrderAddress = params => {
    return fetch({
        url: `/tpp/applet/myOrder/setOrderAddress`,
        method: 'post',
        data: params
    })
}

//(下单)用户自己的地址列表
const selectMyAddressList = params => {
    return fetch({
        url: `/tpp/applet/myOrder/selectMyAddressList`,
        method: 'post',
        data: params
    })
}

//查询渠道商的轮播图
const getStoreChart = params => {
    return fetch({
        url: `/tpp/applet/homePage/getStoreChart`,
        method: 'post',
        data: params
    })
}
//用户查询该商店的所有商品分类(食堂)
const selectCanteenProductTypes = params => {
    return fetch({
        url: `/tpp/applet/homePage/selectCanteenProductTypes`,
        method: 'post',
        data: params
    })
}

//查询商店下的所有设置
const getStoreSwitch = params => {
    return fetch({
        url: `/tpp/applet/product/getStoreSwitch`,
        method: 'post',
        data: params
    })
}

//清空购物车（奶茶）
const clearShopCart = params => {
    return fetch({
        url: `/tpp/applet/shopCart/clearShopCart`,
        method: 'post',
        data: params
    })
}

//查询该店铺所有的店铺优惠券（食堂）
const selectStoreVoucherList = params => {
    return fetch({
        url: `/tpp/applet/homePage/selectStoreVoucherList`,
        method: 'post',
        data: params
    })
}
//用户支付前使用折扣（食堂）
const useDiscountToOrder = params => {
    return fetch({
        url: `/tpp/applet/myOrder/useDiscountToOrder`,
        method: 'post',
        data: params
    })
}

//查询该用户可用红包个数（食堂）
const selectVoucherNum = params => {
    return fetch({
        url: `/tpp/applet/myOrder/selectVoucherNum`,
        method: 'post',
        data: params
    })
}

//展示自己的对应店铺的用户优惠券（食堂）
const getMyUserVouchers = params => {
    return fetch({
        url: `/tpp/applet/myOrder/getMyUserVouchers`,
        method: 'post',
        data: params
    })
}

//获取用户积分信息（食堂）
const getUserIntegral = params => {
    return fetch({
        url: `/tpp/applet/myUser/getUserIntegral`,
        method: 'post',
        data: params
    })
}

//用户支付前取消折扣（食堂）
const cancelDiscountToOrder = params => {
    return fetch({
        url: `/tpp/applet/myOrder/cancelDiscountToOrder`,
        method: 'post',
        data: params
    })
}

//展示自己的对应店铺的:店铺优惠券（食堂）
const selectStoreVouchers = params => {
    return fetch({
        url: `/tpp/applet/myOrder/selectStoreVouchers`,
        method: 'post',
        data: params
    })
}

//展示自己的对应店铺的:店铺优惠券（食堂）
const setDefaultAddress = params => {
    return fetch({
        url: `/tpp/applet/myAddressManager/setDefaultAddress`,
        method: 'post',
        data: params
    })
}
//获取用户的优惠券(我的)
const getMyStoreVouchers = params => {
    return fetch({
        url: `/tpp/applet/myUser/getMyStoreVouchers`,
        method: 'post',
        data: params
    })
}

//用户发起退款
const startRefundOrder = params => {
    return fetch({
        url: `/tpp/applet/myOrder/startRefundOrder`,
        method: 'post',
        data: params
    })
}
//商店信息
const getStoreMessage = params => {
    return fetch({
        url: `/tpp/applet/homePage/getStoreMessage`,
        method: 'post',
        data: params
    })
}
const user={
    addRecruitStore,//收集 信息
    getMyStoreVouchers,//获取用户的优惠券(我的)
    getUserOpenId,//获取openid
    getUserNum,//获取用户手机号
    saveUserProfile,//存用户基本信息
    getUserProfile,//获取用户基本信息
    selectProductPage,//查询该商店的所有商品
    selectProductTypes,//查询该商店的所有商品分类
    getProductAndSku,//查询该商品的信息以及下的所有sku
    getProductOne,//单查商品详情
    addShopCart,//添加购物车
    reduceShopCart,//减少购物车
    selectShopCart,//展示自己的购物车
    addOrder,//用户提交订单
    delShopCartOneSku,//删除购物车指定商品
    getOrderById,//用户提交订单后(查询订单详情)
    payMyOrder,//用户对订单发起支付
    setOrderAddress,//用户对订单设置地址(并保存地址(超过10条不保存))
    selectMyAddressList,//(下单)用户自己的地址列表
    getStoreChart,//查询渠道商的轮播图
    selectCanteenProductTypes,//用户查询该商店的所有商品分类(食堂)
    getStoreSwitch,//查询商店下的所有设置
    clearShopCart,//清空购物车
    selectStoreVoucherList,//查询该店铺所有的店铺优惠券（食堂）
    useDiscountToOrder,//用户支付前使用折扣
    selectVoucherNum,//查询该用户可用红包个数
    getMyUserVouchers,//展示自己的对应店铺的用户优惠券
    getUserIntegral,//获取用户积分信息
    cancelDiscountToOrder,//用户支付前取消折扣
    selectStoreVouchers,//展示自己的对应店铺的:店铺优惠券
    setDefaultAddress,//用户将一个地址设为默认地址
    startRefundOrder,//用户发起退款
    getStoreMessage,//商店信息
}
export default user;