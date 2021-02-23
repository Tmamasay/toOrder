# tanlaos

> 听书小程序

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

# 源码目录结构说明（src）
```
src
├── api                                   网络接口
├── components                            组件
├── pages                                 页面
|   ├── index                             首页相关
│   |   ├── activity                      活动专区
│   |   |   ├── detail                    活动详情
│   |   |   ├── essay                     征文详情
│   |   |   ├── reading                   作品阅读
│   |   |   └── speech                    演讲
│   |   ├── everydayread                  每日一读
│   |   ├── goOut                         webView广告跳转
│   |   ├── setUp                         我的
│   |   |   ├── about                     关于我们
│   |   |   ├── agreement                 隐私协议
│   |   |   ├── changePhone               绑定手机
│   |   |   ├── follow                    关注列表
│   |   |   ├── messageCenter             消息中心
│   |   |   ├── messageDetail             消息详情
│   |   |   ├── myCollection              我的收藏
│   |   |   ├── myStudy                   我的书房
│   |   |   ├── personalData              个人资料
│   |   |   └── settings                  设置
│   |   ├── voiceofchildren               少年之声列表
│   |   └── voiceofchildrendetail         少年之声详情
│   ├── mini                              可订阅音频详情
│   |   ├── about
│   |   └── phone
│   ├── read                              书屋相关
│   |   ├── catalog                       读本详情
│   |   └── introduce                     业务列表
│   └── car                          微信授权
├── store                                 数据中心
├── styles                                通用样式
├── utils                                 通用工具集
│   ├── auth.js                           数据缓存
│   ├── fetch.js                          网络请求
│   ├── index.js                          通用工具集
│   └── WXBizDataCrypt.js                 微信信息解密
├── app.json                              小程序页面配置文件
├── App.vue                               mpvue页面入口文件
└── main.js                               mpvue入口文件
```

## main.js文件说明
页面或组件挂载文件
```javascript
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
```

## main.json文件说明
页面或组件说明，可设置组件间的引用，页面级组件可设置页面导航栏信息


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
