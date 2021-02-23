// 'use strict'
import apiList from './api'
//在vue原型链上自定义插件
const install=function (vue) {
    if(install.installed) return
    install.installed=true;

    Object.defineProperties(vue.prototype,{
        $api:{
            get(){
                return apiList;
            }
        }
    })
}

export default{
    install
}