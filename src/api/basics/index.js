import fetch from '@/utils/fetch.js'
//查询粉丝用户
const getFans = params => {
  return fetch({
    url: `/v1/fans`,
    method: 'post',
    data: params
  })
}

//获取OpenId 
// const getUserOpenId = params => {
//   return fetch({
//     url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx20087bccdc7397f2&secret=c0e5d67b6c3e341c458cd3fe3e607e3b&js_code=${params.code}&grant_type=authorization_code`,
//     method: 'get'
//   })
// }



const basics = {

  getFans, //查询粉丝用户
  getUserOpenId, //获取openid
}
export default basics
