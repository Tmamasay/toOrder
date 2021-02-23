const TokenKey = 'user_Token'//token
const Userinfo = 'user_info'//用户信息
const Usernum = 'user_num'//用户手机号
const CarNum = 'car_num'//购物车数量
const search = 'search'//搜索历史记录
const storeId = 'store_id'//商店ID
//存取token到本地--->本地缓存
export function getToken() {
  return wx.getStorageSync(TokenKey)
}

export function setToken(token) {
  try {
    return wx.setStorageSync(TokenKey, token)
  } catch (e) {
    return this.setstorage(TokenKey, token)
  }
}
export function removeToken() {
  return wx.removeStorageSync(TokenKey)
}

//存取用户信息--->本地缓存
export function getUserinfo() {
  return wx.getStorageSync(Userinfo)
}

export function setUserinfo(info) {
  try {
    return wx.setStorageSync(Userinfo, info)
  } catch (e) {
    return this.setstorage(Userinfo, info)
  }
}

export function removeUserinfo() {
  return wx.removeStorageSync(Userinfo)
}

//存取用户手机号--->本地缓存
export function getUsernum() {
  return wx.getStorageSync(Usernum)
}

export function setUsernum(info) {
  try {
    return wx.setStorageSync(Usernum, info)
  } catch (e) {
    return this.setstorage(Usernum, info)
  }
}

export function removeUsernum() {
  return wx.removeStorageSync(Usernum)
}

//获取购物车数量--->本地缓存
export function getCarNum() {
  return wx.getStorageSync(CarNum)
}

export function setCarNum(info) {
  try {
    return wx.setStorageSync(CarNum, info)
  } catch (e) {
    return this.setstorage(CarNum, info)
  }
}

export function removeCarNum() {
  return wx.removeStorageSync(CarNum)
}
//获取商店ID--->本地缓存
export function getStoreId() {
  return wx.getStorageSync(storeId)
}

export function setStoreId(info) {
  try {
    return wx.setStorageSync(storeId, info)
  } catch (e) {
    return this.setstorage(storeId, info)
  }
}

export function removeStoreId() {
  return wx.removeStorageSync(storeId)
}


//存取搜索记录--->本地缓存
export function getSearch() {
  return wx.getStorageSync(search)
}

export function setSearch(info) {
  try {
    return wx.setStorageSync(search, info)
  } catch (e) {
    return this.setstorage(search, info)
  }
}

export function removeSearch() {
  return wx.removeStorageSync(search)
}
