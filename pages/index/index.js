//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Welcome To XZTX!',
    userInfo: {},
    flag:'Wait',
    isRegister:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  //事件处理函数
  login: function () {
    wx.navigateTo({
      url: '/pages/index/regist',
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getInitial:function()
  {
    var flag = wx.getStorageSync("regist")
    if (flag == 'Yes') {
      wx.switchTab({
        url: '/pages/activity/activity',
      })
    }
    else if (app.globalData.userInfo) {
      this.setData
        ({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
    }
    else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onLoad: function () 
  {
   //wx.removeStorageSync('regist')
   var that=this;
   console.log("ACCOUNT")
    console.log(wx.getStorageSync("account"))
    var flag = wx.getStorageSync('regist');
   if(flag=='')
   {//防止缓存被清的情况下，已注册的用户重新进入再次注册的情况
    wx.login({
      success: res => {
        console.log("openId");
        console.log(res)
        wx.request({
          url: 'http://localhost/volunteer/isRegister',
          data: {
            code: res.code,
            No:wx.getStorageSync("account")
          },
          method: 'GET',
          success: function (res)
           {
            console.log("APPJS")
            console.log(res)
            wx.setStorageSync("regist", res.data.flag)
            wx.setStorageSync("account", res.data.No)
           that.getInitial()
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   }
   else
   {
      this.getInitial()
   }   
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync("userinfo", e.detail.userInfo)
    wx.setStorageSync("hasUsrInfo", true)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
