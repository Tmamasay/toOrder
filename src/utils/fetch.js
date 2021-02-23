//封装请求
"use strict";
import axios from "axios";
import JSONBig from 'json-bigint';
import store from "@/store";
import {
  getToken,
  getAppToken
} from "@/utils/auth";

axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    // console.log(config);
    // console.log(config.url);
    wx.request({
      url: config.url, //仅为示例，并非真实的接口地址
      method: config.method,
      data: config.data || config.params,
      header: config.headers,
      dataType: 'text',
      success: function (res) {
        resolve(JSONBig.parse(res.data));
        // console.log(res.data)
      },
      error: function (error) {
        reject(error);
      },
    });
  });
};

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    var instance = axios.create({
      baseURL: store.getters.baseurl,
      timeout: 1000,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      },
    });
    // http request 拦截器
    instance.interceptors.request.use(
      (config) => {
        console.log("请求进入")
        // wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
        // loading = window.$util.msg.loading()
        // config.headers['appToken'] = getAppToken()
        const token = getToken();
        if (token) {
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          config.headers["Authorization"] = token;
          config.headers["tokenType"] = 'applets';
        }

        if (/delete/i.test(config.method)) {
          const data = config.data || config.params;
          if (data) {
            const {
              url
            } = config;
            config.url = url + (url.includes("?") ? "&" : "?") + data;
            delete config.data;
            delete config.params;
          }
        }
        console.log("请求结束")
        // wx.hideToast()
        return config;
      },
      (err) => {
        console.log(error);
        return Promise.reject(err);
      }
    );

    // http response 拦截器
    // instance.interceptors.response.use(
    //   response => {
    //     console.log('响应拦截')
    //     // if (response.data && response) window.$store.commit('setToken', { token: response.data.token })
    //     if (response && response.status) {
    //     //   if (+response.status === 10001) {
    //     //     window.$native.openLogin(response.data)
    //     //   }
    //     }
    //     return response
    //   },
    //   error => {
    //     if (error) {
    //     console.log('响应拦截报错')
    //     console.log(error)
    //       if (error.response == null) {
    //           console.log('后台返回错误')
    //         // window.$util.msg.warn('后台返回错误')
    //         // alert('404')
    //         // router.replace({
    //         //   path: '404'
    //         // })
    //       } else {
    //         // switch (error.response.status) {
    //         //   case 401:
    //         //     // 返回 401 清除token信息并跳转到登录页面
    //         //     // store.commit(types.LOGOUT)
    //         //     // 去下载APP
    //         //     router.replace({
    //         //       path: 'login',
    //         //       query: {
    //         //         redirect: router.currentRoute.fullPath
    //         //       }
    //         //     })
    //         // }
    //       }
    //     }
    //     return Promise.reject(error) // 返回接口返回的错误信息
    //   }
    // )

    // 请求处理
    instance(options)
      .then((res) => {

        if (res.code === 303) {
          wx.navigateTo({
            url: `/pages/car/main`, //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
          });
        } else {
          resolve(res);
          // debugger
          // return false;
        }
        // 请求成功时,根据业务判断状态
        /*  if (code === port_code.success) {
        resolve({code, msg, data})
        return false
        } else if (code === port_code.unlogin) {
        setUserInfo(null)
        router.replace({name: "login"})
         } */
      })
      .catch((error) => {
        console.log("请求捕获到异常");
        console.log(error);
        // alert(JSON.stringify(error))
        if (error.response == null) {} else {
          //   if (+error.response.status === 401) {} else {
          //     // alert('没有权限获取数据')
          //   }
        }
        reject(error);
      });
  });
}
